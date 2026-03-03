/**
 * Phase Performance Analysis
 */

export const classifyPowerplay = (actual, expected) => {
    if (actual > expected + 10) return "Explosive Start";
    if (actual < expected - 10) return "Slow Start";
    return "Balanced Start";
};

export const classifyPhasePerformance = (actual, venueAvg) => {
    if (actual > venueAvg * 1.1) return "Above Expectation";
    if (actual < venueAvg * 0.9) return "Below Expectation";
    return "Within Expected Range";
};

export const generateLossReasons = (matchStats, venueData) => {
    const reasons = [];
    if (matchStats.powerplayScore < venueData.powerplayAvg * 0.9) {
        reasons.push("Inertia in the Powerplay - failed to exploit fielding restrictions.");
    }
    if (matchStats.middleOversScore < venueData.middleOversAvg * 0.9) {
        reasons.push("Middle overs stagnation - lost momentum against spin.");
    }
    if (matchStats.deathOversScore < venueData.deathOversAvg * 0.8) {
        reasons.push("Death overs collapse - inability to finish strongly.");
    }
    return reasons.slice(0, 3);
};
