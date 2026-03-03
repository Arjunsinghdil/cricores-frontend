import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, TrendingUp, Zap, Target, Shield } from 'lucide-react-native';
import Svg, { Polyline, Circle, G, Line } from 'react-native-svg';
import playersData from '../../data/players_stats.json';

const { width } = Dimensions.get('window');

const PlayerDetailsScreen = ({ route, navigation }) => {
    const { playerId } = route.params || { playerId: 'p1' };
    const player = playersData.find(p => p.id === playerId) || playersData[0];

    const chartData = player.lastFiveScores || player.lastFiveWickets.map(w => w * 20); // Scale wickets for graph
    const maxVal = Math.max(...chartData, 50);
    const chartHeight = 120;
    const chartWidth = width - 80;
    const stepX = chartWidth / (chartData.length - 1);

    const points = chartData.map((val, i) => `${i * stepX},${chartHeight - (val / maxVal) * chartHeight}`).join(' ');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Player Profile</Text>
                <TouchableOpacity>
                    <Share2 size={24} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarText}>{player.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerTeam}>{player.team} • {player.role}</Text>
                    <View style={styles.formBadge}>
                        <Zap size={14} color="#fbbf24" fill="#fbbf24" />
                        <Text style={styles.formText}>Form: {player.form}</Text>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <TrendingUp size={20} color="#38bdf8" />
                        <Text style={styles.statVal}>{player.strikeRate || player.economyRate}</Text>
                        <Text style={styles.statLab}>{player.strikeRate ? 'Strike Rate' : 'Economy'}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Target size={20} color="#22c55e" />
                        <Text style={styles.statVal}>{player.boundaryPercent || player.strikeRate}%</Text>
                        <Text style={styles.statLab}>Boundaries</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Shield size={20} color="#a855f7" />
                        <Text style={styles.statVal}>{player.chasePerformance}%</Text>
                        <Text style={styles.statLab}>Clutch Rating</Text>
                    </View>
                </View>

                <View style={styles.chartSection}>
                    <Text style={styles.sectionTitle}>Form Tracker (Last 5)</Text>
                    <View style={styles.chartContainer}>
                        <Svg height={chartHeight} width={chartWidth}>
                            <G>
                                {/* Grid lines */}
                                <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#334155" strokeWidth="1" />
                                <Line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#334155" strokeWidth="1" />

                                <Polyline
                                    points={points}
                                    fill="none"
                                    stroke="#38bdf8"
                                    strokeWidth="3"
                                />
                                {chartData.map((val, i) => (
                                    <Circle
                                        key={i}
                                        cx={i * stepX}
                                        cy={chartHeight - (val / maxVal) * chartHeight}
                                        r="4"
                                        fill="#f8fafc"
                                    />
                                ))}
                            </G>
                        </Svg>
                        <View style={styles.chartLabels}>
                            {['M1', 'M2', 'M3', 'M4', 'M5'].map((m, i) => (
                                <Text key={i} style={styles.chartLabelText}>{m}</Text>
                            ))}
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.fantasyBtn}>
                    <Text style={styles.fantasyBtnText}>Add to Fantasy Team</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#38bdf8',
    },
    avatarText: {
        color: '#f8fafc',
        fontSize: 40,
        fontWeight: 'bold',
    },
    playerName: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: '900',
        marginTop: 16,
    },
    playerTeam: {
        color: '#94a3b8',
        fontSize: 16,
        marginTop: 4,
    },
    formBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
    },
    formText: {
        color: '#fbbf24',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 32,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0f172a',
        paddingVertical: 16,
        borderRadius: 16,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    statVal: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLab: {
        color: '#64748b',
        fontSize: 10,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    chartSection: {
        paddingHorizontal: 16,
        marginTop: 40,
    },
    sectionTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chartContainer: {
        backgroundColor: '#0f172a',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    chartLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 12,
    },
    chartLabelText: {
        color: '#475569',
        fontSize: 10,
    },
    fantasyBtn: {
        backgroundColor: '#38bdf8',
        marginHorizontal: 20,
        marginTop: 40,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fantasyBtnText: {
        color: '#020617',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PlayerDetailsScreen;
