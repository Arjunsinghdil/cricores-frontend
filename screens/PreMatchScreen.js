import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getVenueById, getMatchById } from '../services/firestoreService';
import { calculateExpectedScoreRange, classifyScenario } from '../utils/matchCalculations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PreMatchScreen() {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [venue, setVenue] = useState(null);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        const fetchPreMatchData = async () => {
            // Using ID 'v1' and 'm101' for testing with mock-like IDs
            const venueData = await getVenueById('v1');
            const matchData = await getMatchById('m101');

            // Fallback for demonstration if Firestore is not yet populated
            const demoVenue = venueData || {
                name: "Wankhede Stadium",
                avgFirstInnings: 185,
                powerplayAvg: 48,
                middleOversAvg: 85,
                deathOversAvg: 52
            };

            setVenue(demoVenue);
            setMatch(matchData || { teamA: "India", teamB: "Australia" });
            setLoading(false);
        };

        fetchPreMatchData();
    }, []);

    if (loading) return (
        <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const expectedRange = calculateExpectedScoreRange(venue.avgFirstInnings);
    const scenario = classifyScenario(venue, { bowlingStrengthIndex: 88 }, { bowlingStrengthIndex: 82 });

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, { color: colors.primary }]}>INTELLIGENCE ENGINE</Text>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Pre-Match Intelligence</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* 1. Expected Score Card */}
                <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.blueprintCard}>
                    <Text style={styles.bpLabel}>EXPECTED SCORE RANGE</Text>
                    <Text style={styles.bpValue}>{expectedRange.min} — {expectedRange.max}</Text>
                    <View style={styles.divider} />
                    <View style={styles.bpDetails}>
                        <View>
                            <Text style={styles.detailLabel}>VENUE TREND</Text>
                            <Text style={[styles.detailValue, { color: '#39ff14' }]}>High Scoring</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>SCENARIO</Text>
                            <Text style={[styles.detailValue, { color: colors.primary }]}>{scenario}</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* 2. Venue Comparison Card */}
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Venue Capacity ({venue.name})</Text>
                    <View style={styles.comparisonRow}>
                        <View style={styles.compBox}>
                            <Text style={[styles.compValue, { color: colors.text }]}>{venue.powerplayAvg}</Text>
                            <Text style={styles.compSub}>PP Avg</Text>
                        </View>
                        <View style={styles.compBox}>
                            <Text style={[styles.compValue, { color: colors.text }]}>{venue.middleOversAvg}</Text>
                            <Text style={styles.compSub}>Middle Avg</Text>
                        </View>
                        <View style={styles.compBox}>
                            <Text style={[styles.compValue, { color: colors.text }]}>{venue.deathOversAvg}</Text>
                            <Text style={styles.compSub}>Death Avg</Text>
                        </View>
                    </View>
                </View>

                {/* 3. Team Form Bar */}
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Form Snapshot</Text>
                    <View style={styles.formSection}>
                        <View style={styles.formBar}>
                            <View style={[styles.formFill, { width: '85%', backgroundColor: '#16a34a' }]} />
                        </View>
                        <Text style={[styles.formLabel, { color: colors.textSecondary }]}>India Form Strength: 85%</Text>
                    </View>
                </View>

                {/* 4. Match Scenario Type */}
                <View style={styles.scenarioBox}>
                    <MaterialCommunityIcons name="sword-cross" size={24} color={colors.primary} />
                    <Text style={[styles.scenarioText, { color: colors.text }]}>MATCH TYPE: {scenario.toUpperCase()}</Text>
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
    blueprintCard: { padding: 24, borderRadius: 24, marginBottom: 20 },
    bpLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Lexend-Black' },
    bpValue: { color: '#fff', fontSize: 36, fontFamily: 'Lexend-Black', marginTop: 4 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 20 },
    bpDetails: { flexDirection: 'row', justifyContent: 'space-between' },
    detailLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'Lexend-Bold' },
    detailValue: { fontSize: 14, fontFamily: 'Lexend-Black', marginTop: 2 },
    card: { padding: 20, borderRadius: 24, borderWidth: 1, marginBottom: 16 },
    cardTitle: { fontSize: 15, fontFamily: 'Lexend-Black', marginBottom: 20 },
    comparisonRow: { flexDirection: 'row', justifyContent: 'space-between' },
    compBox: { alignItems: 'center', flex: 1 },
    compValue: { fontSize: 22, fontFamily: 'Lexend-Black' },
    compSub: { fontSize: 10, fontFamily: 'Lexend-Bold', color: '#71717a', marginTop: 4 },
    formSection: { gap: 10 },
    formBar: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
    formFill: { height: '100%' },
    formLabel: { fontSize: 11, fontFamily: 'Lexend-Medium' },
    scenarioBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 20, justifyContent: 'center' },
    scenarioText: { fontSize: 13, fontFamily: 'Lexend-Black' }
});
