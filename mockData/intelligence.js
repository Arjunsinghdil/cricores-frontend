export const mockIntelligenceData = {
    venues: [
        {
            id: 'v1',
            name: 'Wankhede Stadium, Mumbai',
            avgFirstInnings: 185,
            avgSecondInnings: 172,
            powerplayAvg: 48,
            middleOversAvg: 85,
            deathOversAvg: 52,
            chasingWinPercent: 62,
            leagueComparisonIndex: 1.12 // 12% higher than league
        }
    ],
    teams: {
        'IND': {
            name: 'India',
            lastFive: ['W', 'W', 'L', 'W', 'W'],
            battingStrengthIndex: 92,
            bowlingStrengthIndex: 88,
            powerplayEfficiency: 85,
            deathOversEfficiency: 90
        },
        'AUS': {
            name: 'Australia',
            lastFive: ['W', 'L', 'W', 'W', 'L'],
            battingStrengthIndex: 89,
            bowlingStrengthIndex: 91,
            powerplayEfficiency: 88,
            deathOversEfficiency: 86
        }
    },
    activeMatchAnalysis: {
        matchId: 'm101',
        teamA: 'IND',
        teamB: 'AUS',
        tossWinner: 'IND',
        tossDecision: 'Bat',
        venueId: 'v1'
    },
    postMatchAnalysis: {
        matchId: 'm100',
        actualStats: {
            powerplayScore: 42,
            middleOversScore: 78,
            deathOversScore: 45
        },
        overTimeline: [
            { over: 6, runs: 12, wickets: 1 },
            { over: 12, runs: 18, wickets: 0 },
            { over: 15, runs: 4, wickets: 2 }, // Turning point
            { over: 19, runs: 22, wickets: 0 }
        ]
    }
};
