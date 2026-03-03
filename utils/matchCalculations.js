/**
 * Core Match Calculations
 */

export const calculateExpectedScoreRange = (avgScore) => {
    return {
        min: Math.round(avgScore * 0.9),
        max: Math.round(avgScore * 1.1)
    };
};

export const classifyScenario = (venue, teamA, teamB) => {
    if (venue.avgFirstInnings > 180) return "High Run Shootout";
    if (teamA.bowlingStrengthIndex > 85 && teamB.bowlingStrengthIndex > 85) return "Tactical Bowling Battle";
    return "Balanced Contest";
};
