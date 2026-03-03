/**
 * Turning Point Detection Logic
 */

export const detectTurningPoint = (overRuns, wicketTimeline = []) => {
    // 1. Find highest run over
    let maxOver = 0;
    let maxRuns = 0;
    overRuns.forEach((runs, index) => {
        if (runs > maxRuns) {
            maxRuns = runs;
            maxOver = index + 1;
        }
    });

    // 2. Detect cluster of 2 wickets within 2 overs
    let clusterOver = null;
    for (let i = 0; i < wicketTimeline.length - 1; i++) {
        if (Math.abs(wicketTimeline[i + 1].over - wicketTimeline[i].over) <= 2) {
            clusterOver = wicketTimeline[i + 1].over;
            break;
        }
    }

    return clusterOver || maxOver;
};
