import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Target, AlertCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PredictionCard = ({ teamA, teamB, probA, probB, confidence, riskLevel }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1e293b', '#0f172a']}
                style={styles.card}
            >
                <View style={styles.header}>
                    <TrendingUp size={20} color="#38bdf8" />
                    <Text style={styles.title}>Win Probability</Text>
                </View>

                <View style={styles.probContainer}>
                    <View style={styles.teamSection}>
                        <Text style={styles.teamName}>{teamA}</Text>
                        <Text style={styles.probText}>{probA}%</Text>
                    </View>

                    <View style={styles.divider}>
                        <View style={styles.vsCircle}>
                            <Text style={styles.vsText}>VS</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${probA}%` }]} />
                        </View>
                    </View>

                    <View style={styles.teamSection}>
                        <Text style={styles.teamName}>{teamB}</Text>
                        <Text style={styles.probText}>{probB}%</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.statItem}>
                        <Target size={16} color="#94a3b8" />
                        <Text style={styles.statLabel}>Confidence: </Text>
                        <Text style={styles.statValue}>{Math.round(confidence * 100)}%</Text>
                    </View>

                    <View style={styles.statItem}>
                        <AlertCircle size={16} color={riskLevel === 'High' ? '#ef4444' : '#22c55e'} />
                        <Text style={styles.statLabel}>Risk: </Text>
                        <Text style={[styles.statValue, { color: riskLevel === 'High' ? '#ef4444' : '#22c55e' }]}>
                            {riskLevel}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    probContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    teamSection: {
        alignItems: 'center',
    },
    teamName: {
        color: '#94a3b8',
        fontSize: 14,
        marginBottom: 4,
    },
    probText: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: '900',
    },
    divider: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    vsCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        marginBottom: 8,
    },
    vsText: {
        color: '#38bdf8',
        fontSize: 10,
        fontWeight: 'bold',
    },
    progressBarBg: {
        width: '100%',
        height: 6,
        backgroundColor: '#334155',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#38bdf8',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#334155',
        paddingTop: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        color: '#64748b',
        fontSize: 12,
        marginLeft: 4,
    },
    statValue: {
        color: '#f8fafc',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default PredictionCard;
