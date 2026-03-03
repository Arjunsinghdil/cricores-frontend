/**
 * Simple Rule-based Prediction Engine for Cricket Intelligence
 */

export const calculateWinProbability = (teamA, teamB, venue, tossWinner, tossDecision) => {
    // Base probability from historical win %
    let probA = teamA.winPercent || 50;
    let probB = teamB.winPercent || 50;

    // Normalizing
    const total = probA + probB;
    probA = (probA / total) * 100;
    probB = (probB / total) * 100;

    // Venue impact
    if (teamA.venueStrengths && teamA.venueStrengths[venue]) {
        probA += teamA.venueStrengths[venue] * 5;
    }
    if (teamB.venueStrengths && teamB.venueStrengths[venue]) {
        probB += teamB.venueStrengths[venue] * 5;
    }

    // Toss impact (simplified)
    if (tossWinner === teamA.id) {
        probA += 3;
    } else if (tossWinner === teamB.id) {
        probB += 3;
    }

    // Ensure they sum to 100
    const finalTotal = probA + probB;
    return {
        teamAProb: Math.round((probA / finalTotal) * 100),
        teamBProb: Math.round((probB / finalTotal) * 100),
        confidence: 0.75 + (Math.abs(probA - probB) / 100) * 0.2 // Simplified confidence meter
    };
};
