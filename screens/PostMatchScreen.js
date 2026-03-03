import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { subscribeToMatchStats, getVenueById } from '../services/firestoreService';
import { classifyPhasePerformance, generateLossReasons } from '../utils/phaseAnalysis';
import { detectTurningPoint } from '../utils/turningPoint';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PostMatchScreen() {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [venue, setVenue] = useState(null);
    const [insights, setInsights] = useState({
        turningPoint: null,
        reasons: [],
        performance: ""
    });

    useEffect(() => {
        const matchId = 'm101'; // Default test match ID

        // 1. Fetch Venue Benchmarks
        const fetchVenue = async () => {
            const vData = await getVenueById('v1');
            setVenue(vData || {
                powerplayAvg: 48,
                middleOversAvg: 85,
                deathOversAvg: 52
            });
        };
        fetchVenue();

        // 2. Subscribe to Real-Time Match Stats
        const unsubscribe = subscribeToMatchStats(matchId, (updatedStats) => {
            setStats(updatedStats);

            // Recalculate Insights when data updates
            if (updatedStats && venue) {
                const tp = detectTurningPoint(updatedStats.overRuns || [], updatedStats.wicketTimeline || []);
                const lossReasons = generateLossReasons(updatedStats, venue);
                const perf = classifyPhasePerformance(updatedStats.powerplayScore, venue.powerplayAvg);

                setInsights({
                    turningPoint: tp,
                    reasons: lossReasons,
                    performance: perf
                });
            }
            setLoading(false);
        });

        // Fallback for demo if firestore is empty
        const timer = setTimeout(() => {
            if (!stats) {
                const mockStats = {
                    powerplayScore: 42,
                    middleOversScore: 78,
                    deathOversScore: 35,
                    overRuns: [6, 4, 12, 8, 4, 8, 15, 6, 4, 2],
                    wicketTimeline: [{ over: 5, player: "X" }, { over: 10, player: "Y" }]
                };
                setStats(mockStats);
                setLoading(false);
            }
        }, 2000);

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, [venue]);

    if (loading) return (
        <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, { color: colors.primary }]}>INTELLIGENCE ENGINE</Text>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Real-Time Insights</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* 1. Expectation vs Reality Section */}
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Phase Performance</Text>
                    <View style={styles.phaseRow}>
                        <View style={styles.phaseCol}>
                            <Text style={styles.phaseLabel}>POWERPLAY</Text>
                            <Text style={[styles.phaseScore, { color: colors.text }]}>{stats.powerplayScore}</Text>
                            <Text style={[styles.phaseStatus, { color: '#ef4444' }]}>Below Target</Text>
                        </View>
                        <View style={styles.phaseCol}>
                            <Text style={styles.phaseLabel}>MIDDLE</Text>
                            <Text style={[styles.phaseScore, { color: colors.text }]}>{stats.middleOversScore}</Text>
                            <Text style={[styles.phaseStatus, { color: '#fbbf24' }]}>Expected</Text>
                        </View>
                    </View>
                </View>

                {/* 2. Turning Point Highlight */}
                <LinearGradient colors={['#059669', '#065f46']} style={styles.turningPointCard}>
                    <View style={styles.tpHeader}>
                        <MaterialCommunityIcons name="lightning-bolt" size={28} color="#fff" />
                        <Text style={styles.tpTitle}>MATCH MOMENTUM SHIFT</Text>
                    </View>
                    <Text style={styles.tpValue}>Over {insights.turningPoint}</Text>
                    <Text style={styles.tpDesc}>This phase redefined the win probability based on wicket clusters detected.</Text>
                </LinearGradient>

                {/* 3. Mistake Analysis Section */}
                <View style={[styles.mistakeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Engine Analysis: Key Mistakes</Text>
                    {insights.reasons.length > 0 ? insights.reasons.map((r, i) => (
                        <View key={i} style={styles.reasonRow}>
                            <MaterialCommunityIcons name="alert-circle" size={20} color="#ef4444" />
                            <Text style={[styles.reasonText, { color: colors.textSecondary }]}>{r}</Text>
                        </View>
                    )) : (
                        <Text style={[styles.reasonText, { color: colors.textSecondary }]}>No major collapse patterns detected yet.</Text>
                    )}
                </View>

                {/* 4. Phase Breakdown Status */}
                <View style={styles.summaryBox}>
                    <Text style={[styles.summaryTitle, { color: colors.text }]}>Model Classification</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{insights.performance.toUpperCase()}</Text>
                    </View>
                    <Text style={[styles.summarySub, { color: colors.textSecondary }]}>
                        Intelligence engine detects a trend of middle-order stagnation.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 20 },
    headerSubtitle: { fontSize: 10, fontFamily: 'Lexend-Black', letterSpacing: 2 },
    headerTitle: { fontSize: 24, fontFamily: 'Lexend-Black', marginTop: 4 },
    content: { paddingHorizontal: 20, paddingBottom: 100 },
    card: { padding: 24, borderRadius: 24, borderWidth: 1, marginBottom: 20 },
    cardTitle: { fontSize: 15, fontFamily: 'Lexend-Black', marginBottom: 20 },
    phaseRow: { flexDirection: 'row', justifyContent: 'space-between' },
    phaseCol: { alignItems: 'center', flex: 1 },
    phaseLabel: { fontSize: 9, fontFamily: 'Lexend-Bold', color: '#71717a', marginBottom: 8 },
    phaseScore: { fontSize: 22, fontFamily: 'Lexend-Black' },
    phaseStatus: { fontSize: 10, fontFamily: 'Lexend-Black', marginTop: 4 },
    turningPointCard: { padding: 24, borderRadius: 24, marginBottom: 20 },
    tpHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    tpTitle: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'Lexend-Black', letterSpacing: 1 },
    tpValue: { color: '#fff', fontSize: 32, fontFamily: 'Lexend-Black' },
    tpDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Lexend-Medium', marginTop: 8, lineHeight: 20 },
    mistakeCard: { padding: 24, borderRadius: 24, borderWidth: 1, marginBottom: 20 },
    reasonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
    reasonText: { fontSize: 12, fontFamily: 'Lexend-Medium', flex: 1 },
    summaryBox: { padding: 20, alignItems: 'center' },
    summaryTitle: { fontSize: 12, fontFamily: 'Lexend-Black', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
    badge: { backgroundColor: '#258cf4', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 12 },
    badgeText: { color: '#fff', fontSize: 10, fontFamily: 'Lexend-Black' },
    summarySub: { fontSize: 12, fontFamily: 'Lexend-Medium', textAlign: 'center' }
});
