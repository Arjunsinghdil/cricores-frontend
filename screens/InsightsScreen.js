import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function InsightsScreen() {
    const { colors } = useTheme();

    const seasonStats = [
        { label: 'Predictions Made', value: '42' },
        { label: 'Variance Rate', value: '±8%' },
        { label: 'Model Success', value: '71%' },
        { label: 'In-Depth Reports', value: '12' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, { color: colors.primary }]}>SEASON MEMORY</Text>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Intel Dashboard</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* 1. Main Accuracy Card */}
                <View style={[styles.accuracyCard, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.accLabel, { color: colors.textSecondary }]}>OVERALL INTEL ACCURACY</Text>
                    <Text style={[styles.accValue, { color: colors.text }]}>68.4%</Text>
                    <View style={styles.trendRow}>
                        <MaterialCommunityIcons name="trending-up" size={16} color="#16a34a" />
                        <Text style={styles.trendText}>+4% increase from last month</Text>
                    </View>
                </View>

                {/* 2. Stats Grid */}
                <View style={styles.statsGrid}>
                    {seasonStats.map((stat, i) => (
                        <View key={i} style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* 3. Performance Prediction Memory */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Intelligence Accuracy This Season</Text>
                <LinearGradient colors={['#2563eb', '#1d4ed8']} style={styles.banner}>
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Cricores Intelligence is 68% accurate this season.</Text>
                        <Text style={styles.bannerSub}>Across 42 major tournaments and venues.</Text>
                    </View>
                    <MaterialCommunityIcons name="chart-areaspline" size={40} color="rgba(255,255,255,0.4)" />
                </LinearGradient>

                {/* 4. Recent Accuracy Logs */}
                <View style={[styles.logContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.logTitle, { color: colors.text }]}>Recent Model Performance</Text>
                    {[
                        { match: 'IND vs PAK', accuracy: '92%', type: 'High Accuracy' },
                        { match: 'AUS vs NZ', accuracy: '84%', type: 'High Accuracy' },
                        { match: 'SA vs BAN', accuracy: '56%', type: 'Low Samples' }
                    ].map((log, i) => (
                        <View key={i} style={[styles.logRow, { borderBottomColor: colors.border }]}>
                            <View>
                                <Text style={[styles.logMatch, { color: colors.text }]}>{log.match}</Text>
                                <Text style={[styles.logType, { color: colors.textSecondary }]}>{log.type}</Text>
                            </View>
                            <Text style={[styles.logAcc, { color: colors.primary }]}>{log.accuracy}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 10 },
    headerSubtitle: { fontSize: 10, fontFamily: 'Lexend-Black', letterSpacing: 2 },
    headerTitle: { fontSize: 26, fontFamily: 'Lexend-Black', marginTop: 4 },
    content: { paddingHorizontal: 20, paddingBottom: 100 },
    accuracyCard: { paddingVertical: 30, borderBottomWidth: 1, alignItems: 'center' },
    accLabel: { fontSize: 10, fontFamily: 'Lexend-Black', letterSpacing: 1.5 },
    accValue: { fontSize: 56, fontFamily: 'Lexend-Black', marginVertical: 8 },
    trendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    trendText: { fontSize: 12, fontFamily: 'Lexend-Medium', color: '#16a34a' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24, marginBottom: 24 },
    statBox: { width: (width - 52) / 2, padding: 20, borderRadius: 20, borderWidth: 1 },
    statValue: { fontSize: 20, fontFamily: 'Lexend-Black' },
    statLabel: { fontSize: 10, fontFamily: 'Lexend-Bold', marginTop: 4 },
    sectionTitle: { fontSize: 14, fontFamily: 'Lexend-Black', marginBottom: 16 },
    banner: { padding: 24, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
    bannerTitle: { color: '#fff', fontSize: 16, fontFamily: 'Lexend-Black' },
    bannerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'Lexend-Medium', marginTop: 4 },
    logContainer: { borderRadius: 24, borderWidth: 1, padding: 20 },
    logTitle: { fontSize: 14, fontFamily: 'Lexend-Black', marginBottom: 16 },
    logRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
    logMatch: { fontSize: 14, fontFamily: 'Lexend-Bold' },
    logType: { fontSize: 10, fontFamily: 'Lexend-Medium' },
    logAcc: { fontSize: 16, fontFamily: 'Lexend-Black' }
});
