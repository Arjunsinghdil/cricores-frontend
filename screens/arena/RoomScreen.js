import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoomScreen({ route, navigation }) {
    const { colors } = useTheme();
    const [timeLeft, setTimeLeft] = useState(60);
    const [selectedOption, setSelectedOption] = useState(null);
    const [confidence, setConfidence] = useState('Medium');
    const [streak, setStreak] = useState(2);

    // Mock Decision data
    const activeDecision = {
        scenario: "IND 148/4, 18.2 Overs. Need 22 from 10 balls.",
        question: "What strategic move should India make next?",
        options: [
            { id: 'A', text: 'Target weak bowler (Long-on)', risk: 'Low' },
            { id: 'B', text: 'Rotate strike & run hard', risk: 'Medium' },
            { id: 'C', text: 'All-out attack every ball', risk: 'High' }
        ],
        type: 'Death Over'
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderOption = (option) => {
        const isSelected = selectedOption === option.id;
        return (
            <TouchableOpacity
                key={option.id}
                style={[
                    styles.optionCard,
                    { backgroundColor: colors.surface, borderColor: isSelected ? colors.primary : colors.border }
                ]}
                onPress={() => setSelectedOption(option.id)}
            >
                <View style={styles.optionContent}>
                    <Text style={[styles.optionId, { color: isSelected ? colors.primary : colors.textSecondary }]}>{option.id}</Text>
                    <Text style={[styles.optionText, { color: colors.text }]}>{option.text}</Text>
                </View>
                {isSelected && <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Room Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.roomInfo}>
                    <Text style={[styles.roomName, { color: colors.text }]}>ELITE STRATEGISTS</Text>
                    <Text style={[styles.matchInfo, { color: colors.textSecondary }]}>IND vs PAK • Live</Text>
                </View>
                <View style={styles.streakBadge}>
                    <Text style={styles.streakText}>{streak}</Text>
                    <MaterialCommunityIcons name="fire" size={16} color="#f59e0b" />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Timer & Reward Info */}
                <View style={styles.turnInfo}>
                    <View style={styles.timerContainer}>
                        <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>DECISION TIME</Text>
                        <Text style={[styles.timerValue, { color: timeLeft < 10 ? colors.live : colors.text }]}>
                            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </Text>
                    </View>
                    <View style={styles.rewardBox}>
                        <Text style={styles.rewardLabel}>PRESSURE BONUS</Text>
                        <Text style={styles.rewardValue}>2X POINTS</Text>
                    </View>
                </View>

                {/* Scenario Card */}
                <LinearGradient
                    colors={['#1e293b', '#0f172a']}
                    style={styles.scenarioCard}
                >
                    <Text style={styles.scenarioScore}>{activeDecision.scenario}</Text>
                    <Text style={styles.scenarioQuestion}>{activeDecision.question}</Text>
                </LinearGradient>

                {/* Strategy Options */}
                <View style={styles.optionsList}>
                    {activeDecision.options.map(renderOption)}
                </View>

                {/* Confidence Multiplier */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>CONFIDENCE LEVEL</Text>
                <View style={styles.confidenceRow}>
                    {['Low', 'Medium', 'High'].map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.confidenceBtn,
                                { backgroundColor: colors.surface, borderColor: confidence === level ? colors.primary : colors.border }
                            ]}
                            onPress={() => setConfidence(level)}
                        >
                            <Text style={[styles.confidenceText, { color: confidence === level ? colors.primary : colors.textSecondary }]}>
                                {level}
                            </Text>
                            <Text style={styles.multiplierText}>
                                {level === 'Low' ? '1x' : level === 'Medium' ? '1.2x' : '2x'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Submit Action */}
                <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: selectedOption ? colors.primary : colors.border }]}
                    disabled={!selectedOption}
                >
                    <Text style={styles.submitBtnText}>LOCK DECISION</Text>
                </TouchableOpacity>

                {/* Ad Placeholder */}
                <View style={[styles.adPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.adText, { color: colors.textSecondary }]}>AD REWARD: +5 CMR</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    roomInfo: {
        alignItems: 'center',
    },
    roomName: {
        fontSize: 14,
        fontFamily: 'Lexend-Black',
    },
    matchInfo: {
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    streakBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    streakText: {
        color: '#f59e0b',
        fontSize: 14,
        fontFamily: 'Lexend-Black',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    turnInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    timerContainer: {
        flex: 1,
    },
    timerLabel: {
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
    },
    timerValue: {
        fontSize: 32,
        fontFamily: 'Lexend-Black',
    },
    rewardBox: {
        backgroundColor: '#ef4444',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    rewardLabel: {
        color: '#fff',
        fontSize: 7,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
    },
    rewardValue: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Lexend-Black',
    },
    scenarioCard: {
        padding: 24,
        borderRadius: 24,
        marginBottom: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
    },
    scenarioScore: {
        color: '#39ff14',
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
        marginBottom: 8,
    },
    scenarioQuestion: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
        lineHeight: 28,
    },
    optionsList: {
        gap: 12,
        marginBottom: 24,
    },
    optionCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    optionId: {
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    optionText: {
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
        marginBottom: 12,
    },
    confidenceRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 32,
    },
    confidenceBtn: {
        flex: 1,
        padding: 12,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: 'center',
    },
    confidenceText: {
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    multiplierText: {
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        color: '#16a34a',
        marginTop: 2,
    },
    submitBtn: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2,
    },
    adPlaceholder: {
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    adText: {
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    }
});
