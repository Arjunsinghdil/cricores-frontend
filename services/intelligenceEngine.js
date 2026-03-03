/**
 * Cricores Intelligence Engine - Core Logic
 */

// 1. Pre-Match Intelligence
export const calculateExpectedScore = (venueAvg, teamStrengthIndex) => {
    // Basic logic: Venue Avg modified by batting strength (0.8 - 1.2 multiplier)
    const variance = venueAvg * 0.1; // 10% variance
    const baseExpected = venueAvg * (teamStrengthIndex / 100);
    return {
        min: Math.round(baseExpected - variance),
        max: Math.round(baseExpected + variance),
        mid: Math.round(baseExpected)
    };
};

export const getVenueTrend = (venueAvg, leagueAvg) => {
    const diff = ((venueAvg - leagueAvg) / leagueAvg) * 100;
    if (diff > 10) return "High Scoring";
    if (diff < -10) return "Bowling Dominant";
    return "Balanced";
};

export const calculateFormScore = (lastFive) => {
    // W = 20 pts, L = 0 pts
    const score = lastFive.reduce((acc, res) => acc + (res === 'W' ? 20 : 5), 0);
    return score; // Max 100
};

export const classifyScenario = (venue, teamA, teamB) => {
    if (venue.avgFirstInnings > 180) return "High Run Shootout";
    if (teamA.bowlingStrengthIndex > 85 && teamB.bowlingStrengthIndex > 85) return "Tactical Bowling Battle";
    return "Balanced Contest";
};

// 2. Post-Match Analysis
export const calculatePhasePerformance = (actual, venueAvg) => {
    const score = (actual / venueAvg) * 100;
    return Math.min(Math.round(score), 100);
};

export const detectTurningPoint = (overTimeline) => {
    // overTimeline = [{over: 1, runs: 4, wickets: 0}, ...]
    let maxImpact = 0;
    let turningOver = 1;

    overTimeline.forEach(o => {
        const impact = (o.runs * 1) + (o.wickets * 12); // Wickets carry high weight
        if (impact > maxImpact) {
            maxImpact = impact;
            turningOver = o.over;
        }
    });
    return turningOver;
};

export const generateMistakes = (stats, venueAvg) => {
    const mistakes = [];
    if (stats.powerplayScore < venueAvg.powerplayAvg * 0.8) {
        mistakes.push("Stagnant start in Powerplay");
    }
    if (stats.middleOversScore < venueAvg.middleOversAvg * 0.85) {
        mistakes.push("Middle-overs momentum loss");
    }
    if (stats.deathOversScore < venueAvg.deathOversAvg * 0.7) {
        mistakes.push("Failure to finish - Death overs collapse");
    }
    return mistakes;
};
