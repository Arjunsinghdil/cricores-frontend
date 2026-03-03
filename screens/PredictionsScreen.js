import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PredictionCard from '../components/intelligence/PredictionCard';
import { calculateWinProbability } from '../utils/intelligenceEngine';
import iplHistory from '../data/ipl_history.json';
import { ChevronLeft, Info } from 'lucide-react-native';

const PredictionsScreen = ({ navigation }) => {
    const [tossImpact, setTossImpact] = useState(true);
    const [predictions, setPredictions] = useState([]);

    const teamA = iplHistory[0]; // CSK
    const teamB = iplHistory[1]; // MI
    const venue = 'Wankhede';

    useEffect(() => {
        const result = calculateWinProbability(
            teamA,
            teamB,
            venue,
            tossImpact ? teamA.id : null,
            'Bat'
        );
        setPredictions([
            {
                id: '1',
                teamA: teamA.id,
                teamB: teamB.id,
                probA: result.teamAProb,
                probB: result.teamBProb,
                confidence: result.confidence,
                riskLevel: result.teamAProb > 70 ? 'Low' : 'Medium'
            }
        ]);
    }, [tossImpact]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Predictions</Text>
                <Info size={24} color="#94a3b8" />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.controlPanel}>
                    <Text style={styles.controlTitle}>Prediction Variables</Text>
                    <View style={styles.toggleRow}>
                        <View>
                            <Text style={styles.toggleLabel}>Toss Impact</Text>
                            <Text style={styles.toggleSub}>Historical toss win advantage</Text>
                        </View>
                        <Switch
                            value={tossImpact}
                            onValueChange={setTossImpact}
                            trackColor={{ false: '#334155', true: '#38bdf8' }}
                            thumbColor={tossImpact ? '#f8fafc' : '#94a3b8'}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Featured Match</Text>
                {predictions.map(pred => (
                    <PredictionCard
                        key={pred.id}
                        teamA={pred.teamA}
                        teamB={pred.teamB}
                        probA={pred.probA}
                        probB={pred.probB}
                        confidence={pred.confidence}
                        riskLevel={pred.riskLevel}
                    />
                ))}

                <View style={styles.insightsCard}>
                    <Text style={styles.insightTitle}>Key Analytics</Text>
                    <View style={styles.insightRow}>
                        <Text style={styles.insightLabel}>Venue Factor</Text>
                        <Text style={styles.insightValue}>High advantage for MI</Text>
                    </View>
                    <View style={styles.insightRow}>
                        <Text style={styles.insightLabel}>Recent Form</Text>
                        <Text style={styles.insightValue}>CSK leading (4/5 W)</Text>
                    </View>
                </View>
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    controlPanel: {
        margin: 16,
        padding: 16,
        backgroundColor: '#1e293b',
        borderRadius: 16,
    },
    controlTitle: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleLabel: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '600',
    },
    toggleSub: {
        color: '#64748b',
        fontSize: 12,
    },
    sectionTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 8,
    },
    insightsCard: {
        margin: 16,
        padding: 20,
        backgroundColor: '#111827',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    insightTitle: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    insightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    insightLabel: {
        color: '#94a3b8',
        fontSize: 14,
    },
    insightValue: {
        color: '#38bdf8',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default PredictionsScreen;
