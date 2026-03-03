import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMatches } from '../context/MatchContext';
import { useTheme } from '../context/ThemeContext';
import { ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

export default function ScheduleScreen({ navigation }) {
    const { matches, loading } = useMatches();
    const { colors, isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('Live');

    const filteredMatches = matches.filter(m => {
        if (activeTab === 'Live') return m.matchStarted && !m.matchEnded;
        if (activeTab === 'Upcoming') return !m.matchStarted;
        if (activeTab === 'Finished') return m.matchEnded;
        return true;
    });

    if (loading && matches.length === 0) {
        return (
            <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={[styles.cricoresElite, { color: colors.primary }]}>CRICORES ELITE</Text>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>SCHEDULE</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <MaterialCommunityIcons name="magnify" size={24} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconButton, styles.calendarButton, { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}20` }]}>
                            <MaterialCommunityIcons name="calendar-today" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.tabContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {['Live', 'Upcoming', 'Finished'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabButton,
                                activeTab === tab && { backgroundColor: colors.primary }
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                { color: colors.textSecondary },
                                activeTab === tab && { color: '#fff' }
                            ]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: 10, textAlign: 'center', marginBottom: 12, fontFamily: 'Lexend-Medium', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Tap a button above to change view
                </Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.liveHeader}>
                    <View style={styles.neonDot} />
                    <Text style={[styles.liveHeaderText, { color: colors.textSecondary }]}>
                        {activeTab} Matches ({filteredMatches.length})
                    </Text>
                </View>

                {filteredMatches.map((match) => (
                    <TouchableOpacity
                        key={match.id}
                        style={[styles.matchCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => navigation.navigate('MatchDetails', { matchId: match.id })}
                    >
                        <LinearGradient
                            colors={[isDark ? 'rgba(37, 140, 244, 0.1)' : 'rgba(37, 140, 244, 0.05)', 'rgba(22, 30, 39, 0)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={[styles.leagueText, { color: colors.textSecondary }]}>{match.name}</Text>
                                {match.matchStarted && !match.matchEnded && (
                                    <View style={[styles.liveTag, { backgroundColor: `${colors.live}15`, borderColor: `${colors.live}20` }]}>
                                        <View style={[styles.liveDot, { backgroundColor: colors.live }]} />
                                        <Text style={[styles.liveTagText, { color: colors.live }]}>LIVE</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.teamsContainer}>
                                <View style={styles.teamRow}>
                                    <View style={styles.teamInfo}>
                                        <View style={[styles.flagCircle, { backgroundColor: colors.primary, borderColor: colors.border }]}>
                                            <Text style={styles.flagText}>{match.teams?.[0]?.substring(0, 3).toUpperCase() || 'T1'}</Text>
                                        </View>
                                        <Text style={[styles.teamName, { color: colors.text }]}>{match.teams?.[0] || 'Team 1'}</Text>
                                    </View>
                                    <View style={styles.scoreContainer}>
                                        <Text style={[styles.scoreText, { color: colors.text }]}>{match.score?.[0]?.r || '0'}/{match.score?.[0]?.w || '0'} </Text>
                                        {match.score?.[0]?.o ? <Text style={[styles.oversText, { color: colors.textSecondary }]}>({match.score[0].o})</Text> : null}
                                    </View>
                                </View>

                                <View style={styles.teamRow}>
                                    <View style={styles.teamInfo}>
                                        <View style={[styles.flagCircle, { backgroundColor: '#16a34a', borderColor: colors.border }]}>
                                            <Text style={styles.flagText}>{match.teams?.[1]?.substring(0, 3).toUpperCase() || 'T2'}</Text>
                                        </View>
                                        <Text style={[styles.teamName, { color: colors.text, opacity: 0.6 }]}>{match.teams?.[1] || 'Team 2'}</Text>
                                    </View>
                                    <View style={styles.scoreContainer}>
                                        <Text style={[styles.scoreText, { fontSize: 14, color: colors.text, opacity: 0.4 }]}>
                                            {match.score?.[1]?.r || 'Yet to bat'}
                                            {match.score?.[1]?.w ? `/${match.score[1].w}` : ''}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={[styles.summaryText, { color: colors.primary }]}>{match.status}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}

                <LinearGradient
                    colors={['#258cf4', '#1d4ed8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.premiumBanner}
                >
                    <View>
                        <Text style={styles.premiumLabel}>PREMIUM FEATURE</Text>
                        <Text style={styles.premiumTitle}>Unlock Advanced Analytics</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
                </LinearGradient>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0f14',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#0a0f14',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cricoresElite: {
        color: '#258cf4',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 2,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Lexend-Black',
        fontStyle: 'italic',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    calendarButton: {
        backgroundColor: 'rgba(37, 140, 244, 0.1)',
        borderColor: 'rgba(37, 140, 244, 0.2)',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#161e27',
        padding: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: '#258cf4',
    },
    tabText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    },
    activeTabText: {
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    liveHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    neonDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#39ff14',
        shadowColor: '#39ff14',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    liveHeaderText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    matchCard: {
        backgroundColor: '#161e27',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginBottom: 16,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    leagueText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    liveTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(57, 255, 20, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(57, 255, 20, 0.2)',
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#39ff14',
    },
    liveTagText: {
        color: '#39ff14',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
    },
    teamsContainer: {
        gap: 16,
        marginBottom: 16,
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    flagCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    flagText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    teamName: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Lexend-Bold',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    scoreText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    oversText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    summaryText: {
        color: '#258cf4',
        fontSize: 11,
        fontFamily: 'Lexend-Medium',
        marginBottom: 16,
    },
    probContainer: {
        marginTop: 4,
    },
    probLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    probText: {
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    probBar: {
        height: 6,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    probSegment: {
        height: '100%',
    },
    premiumBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginTop: 8,
    },
    premiumLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    premiumTitle: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0f14',
    }
});
