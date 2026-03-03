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

import TabView from '../components/Loader'; // Reusing some concepts if needed but let's just stick to the pattern
import EngagementPanel from '../components/intelligence/EngagementPanel';

const { width } = Dimensions.get('window');

const TabButton = ({ label, icon, active, onPress, theme }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.tabButton, active && { backgroundColor: theme.colors.primary }]}
    >
        <MaterialCommunityIcons
            name={icon}
            size={18}
            color={active ? '#fff' : theme.colors.textSecondary}
        />
        <Text style={[styles.tabText, { color: theme.colors.textSecondary }, active && { color: '#fff' }]}>{label}</Text>
    </TouchableOpacity>
);

export default function MatchDetailsScreen({ route, navigation }) {
    const { matchId } = route.params;
    const { matches } = useMatches();
    const { colors, isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('Commentary');

    const match = matches.find(m => m.id === matchId) || {
        name: 'India vs Pakistan',
        teams: ['India', 'Pakistan'],
        score: [{ r: 185, w: 4, o: '20.0' }, { r: 120, w: 2, o: '14.2' }],
        status: 'India need 32 runs to win',
        venue: 'Melbourne'
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Custom Header */}
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>{match.name}</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <MaterialCommunityIcons name="share-variant" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            {/* Match Summary Header */}
            <View style={styles.scoreBoardContainer}>
                <LinearGradient
                    colors={['#258cf4', '#1d4ed8']}
                    style={styles.scoreBoard}
                >
                    <View style={styles.scoreBoardTop}>
                        <View style={styles.teamSection}>
                            <View style={styles.teamLogo}>
                                <Text style={styles.logoText}>{match.teams?.[0]?.[0]}</Text>
                            </View>
                            <Text style={styles.teamName}>{match.teams?.[0]}</Text>
                            <Text style={styles.scoreText}>{match.score?.[0]?.r}/{match.score?.[0]?.w}</Text>
                            <Text style={styles.oversSmall}>({match.score?.[0]?.o} ov)</Text>
                        </View>

                        <View style={styles.vsSection}>
                            <View style={styles.liveBadge}>
                                <Text style={styles.liveText}>LIVE</Text>
                            </View>
                            <View style={styles.vsLine} />
                            <Text style={styles.vsText}>VS</Text>
                            <View style={styles.vsLine} />
                        </View>

                        <View style={styles.teamSection}>
                            <View style={[styles.teamLogo, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <Text style={styles.logoText}>{match.teams?.[1]?.[0]}</Text>
                            </View>
                            <Text style={styles.teamName}>{match.teams?.[1]}</Text>
                            <Text style={styles.scoreText}>{match.score?.[1]?.r}/{match.score?.[1]?.w}</Text>
                            <Text style={styles.oversSmall}>({match.score?.[1]?.o} ov)</Text>
                        </View>
                    </View>
                    <View style={styles.statusBanner}>
                        <Text style={styles.statusMessage}>{match.status}</Text>
                    </View>
                </LinearGradient>
            </View>

            {/* Tabs */}
            <View style={[styles.tabsWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContainer}
                >
                    <TabButton
                        label="Info"
                        icon="information-outline"
                        active={activeTab === 'Info'}
                        onPress={() => setActiveTab('Info')}
                        theme={{ colors, isDark }}
                    />
                    <TabButton
                        label="Commentary"
                        icon="message-text-outline"
                        active={activeTab === 'Commentary'}
                        onPress={() => setActiveTab('Commentary')}
                        theme={{ colors, isDark }}
                    />
                    <TabButton
                        label="Scorecard"
                        icon="table-large"
                        active={activeTab === 'Scorecard'}
                        onPress={() => setActiveTab('Scorecard')}
                        theme={{ colors, isDark }}
                    />
                    <TabButton
                        label="Buzz"
                        icon="fire"
                        active={activeTab === 'Buzz'}
                        onPress={() => setActiveTab('Buzz')}
                        theme={{ colors, isDark }}
                    />
                    <TabButton
                        label="Fantasy"
                        icon="target"
                        active={activeTab === 'Fantasy'}
                        onPress={() => setActiveTab('Fantasy')}
                        theme={{ colors, isDark }}
                    />
                </ScrollView>
            </View>

            {/* Content Area */}
            <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
                {activeTab === 'Commentary' && (
                    <View style={styles.commentarySection}>
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} style={styles.commentaryItem}>
                                <View style={styles.commentaryLeft}>
                                    <View style={[styles.overCircle, { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}20` }]}>
                                        <Text style={[styles.overText, { color: colors.primary }]}>14.{5 - i}</Text>
                                    </View>
                                    <View style={[styles.timeline, { backgroundColor: colors.border }]} />
                                </View>
                                <View style={styles.commentaryRight}>
                                    <Text style={[styles.commentaryText, { color: colors.textSecondary }]}>
                                        Shaheen Afridi to Kohli, 1 run, tucked away to deep mid-wicket. The rotating strike is key here.
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'Info' && (
                    <View style={styles.infoSection}>
                        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.infoTitle, { color: colors.primary }]}>MATCH INFO</Text>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Match</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>{match.name}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Series</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>T20 World Cup 2024</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Venue</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>{match.venue || 'Melbourne Cricket Ground'}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {activeTab === 'Scorecard' && (
                    <View style={styles.emptyContent}>
                        <MaterialCommunityIcons name="table-large" size={48} color={colors.border} />
                        <Text style={[styles.emptyContentText, { color: colors.textSecondary }]}>Scorecard is being updated...</Text>
                    </View>
                )}

                {activeTab === 'Buzz' && (
                    <EngagementPanel />
                )}

                {activeTab === 'Fantasy' && (
                    <View style={styles.fantasyBanner}>
                        <LinearGradient
                            colors={[isDark ? 'rgba(37, 140, 244, 0.1)' : 'rgba(37, 140, 244, 0.05)', 'rgba(37, 140, 244, 0.02)']}
                            style={styles.fantasyInternal}
                        >
                            <MaterialCommunityIcons name="lightbulb-on" size={32} color="#f59e0b" />
                            <Text style={[styles.fantasyTitle, { color: colors.text }]}>Fantasy Insights</Text>
                            <Text style={[styles.fantasyDesc, { color: colors.textSecondary }]}>Our AI thinks Virat Kohli is the best captain pick for this match based on pitch conditions.</Text>
                            <TouchableOpacity style={[styles.fantasyBtn, { backgroundColor: colors.primary }]}>
                                <Text style={styles.fantasyBtnText}>UNLOCK PRO TIPS</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                )}
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
        paddingTop: 50,
        height: 100,
        backgroundColor: '#0a0f14',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    shareButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreBoardContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    scoreBoard: {
        borderRadius: 30,
        padding: 20,
        elevation: 10,
        shadowColor: '#258cf4',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    scoreBoardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamSection: {
        alignItems: 'center',
        width: width * 0.25,
    },
    teamLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    logoText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
    },
    teamName: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
        marginBottom: 4,
    },
    scoreText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    oversSmall: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    vsSection: {
        alignItems: 'center',
        flex: 1,
    },
    liveBadge: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    liveText: {
        color: '#fff',
        fontSize: 9,
        fontFamily: 'Lexend-Black',
    },
    vsLine: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    vsText: {
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'Lexend-Black',
        fontSize: 12,
        marginVertical: 4,
    },
    statusBanner: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    statusMessage: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    tabsWrapper: {
        backgroundColor: '#161e27',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    tabsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        gap: 8,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 6,
    },
    activeTabButton: {
        backgroundColor: '#258cf4',
    },
    tabText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    activeTabText: {
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    contentPadding: {
        padding: 20,
        paddingBottom: 50,
    },
    commentarySection: {
        gap: 0,
    },
    commentaryItem: {
        flexDirection: 'row',
        minHeight: 80,
    },
    commentaryLeft: {
        alignItems: 'center',
        width: 50,
    },
    overCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(37, 140, 244, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(37, 140, 244, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    overText: {
        color: '#258cf4',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
    },
    timeline: {
        width: 2,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 4,
    },
    commentaryRight: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 25,
    },
    commentaryText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontFamily: 'Lexend-Medium',
        lineHeight: 20,
    },
    infoSection: {
        gap: 15,
    },
    infoCard: {
        backgroundColor: '#161e27',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    infoTitle: {
        color: '#258cf4',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    infoLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        fontFamily: 'Lexend-Medium',
    },
    infoValue: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Lexend-Bold',
        maxWidth: '60%',
        textAlign: 'right',
    },
    emptyContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
        gap: 15,
    },
    emptyContentText: {
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'Lexend-Bold',
        fontSize: 14,
    },
    fantasyBanner: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    fantasyInternal: {
        padding: 25,
        alignItems: 'center',
        textAlign: 'center',
    },
    fantasyTitle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
        marginTop: 15,
        marginBottom: 10,
    },
    fantasyDesc: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontFamily: 'Lexend-Medium',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 25,
    },
    fantasyBtn: {
        backgroundColor: '#258cf4',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 15,
    },
    fantasyBtnText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Black',
    }
});
