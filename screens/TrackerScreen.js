import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function TrackerScreen() {
    const { colors, isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.backButton}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.headerTitle, { color: colors.accent }]}>LIVE MATCH TRACKER</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>ICC CHAMPIONS TROPHY • FINAL</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={[styles.liveBadge, { backgroundColor: `${colors.live}15`, borderColor: `${colors.live}20` }]}>
                        <View style={styles.liveDotContainer}>
                            <View style={[styles.liveDotPing, { backgroundColor: colors.live }]} />
                            <View style={[styles.liveDot, { backgroundColor: colors.live }]} />
                        </View>
                        <Text style={[styles.liveBadgeText, { color: colors.live }]}>LIVE</Text>
                    </View>
                    <MaterialCommunityIcons name="bell-outline" size={20} color={colors.textSecondary} />
                </View>
            </View>

            <LinearGradient
                colors={[isDark ? '#111827' : colors.surface, isDark ? '#05070a' : colors.background]}
                style={styles.scoreSection}
            >
                <View style={styles.mainScoreRow}>
                    <View style={styles.teamBrand}>
                        <View style={[styles.flagBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={[styles.miniFlag, { backgroundColor: colors.primary }]} />
                        </View>
                        <Text style={[styles.teamShortName, { color: colors.text }]}>IND</Text>
                    </View>

                    <View style={styles.scoreDisplay}>
                        <Text style={[styles.scoreNumber, { color: colors.text }]}>
                            245<Text style={[styles.scoreSlash, { color: colors.accent }]}>/4</Text>
                        </Text>
                        <Text style={[styles.oversText, { color: colors.textSecondary }]}>38.2 OVERS</Text>
                    </View>

                    <View style={styles.teamBrand}>
                        <Text style={[styles.teamShortName, { color: colors.textSecondary }]}>AUS</Text>
                        <View style={[styles.flagBox, { opacity: 0.5, backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={[styles.miniFlag, { backgroundColor: '#eab308' }]} />
                        </View>
                    </View>
                </View>

                <View style={[styles.statsStrip, { backgroundColor: `${colors.accent}08`, borderColor: `${colors.accent}15` }]}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>CRR</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>6.39</Text>
                    </View>
                    <View style={[styles.verticalDivider, { backgroundColor: colors.border }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>TARGET</Text>
                        <Text style={[styles.statValue, { color: colors.accent }]}>312</Text>
                    </View>
                    <View style={[styles.verticalDivider, { backgroundColor: colors.border }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>RRR</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>5.74</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTag}>LIVE ACTION</Text>
                        <Text style={styles.cardStatus}>Free-hit Available</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.playerRow}>
                            <View style={[styles.playerTile, styles.activePlayer]}>
                                <MaterialCommunityIcons name="star" size={12} color="#d9ff00" style={styles.starIcon} />
                                <View style={styles.playerNameContainer}>
                                    <Text style={styles.playerName}>V. Kohli</Text>
                                    <View style={styles.activeDot} />
                                </View>
                                <View style={styles.playerScoreContainer}>
                                    <Text style={styles.playerScore}>45*</Text>
                                    <Text style={styles.playerBalls}>(32)</Text>
                                </View>
                                <View style={styles.srContainer}>
                                    <Text style={styles.srLabel}>SR</Text>
                                    <Text style={styles.srValue}>140.62</Text>
                                </View>
                            </View>
                            <View style={styles.playerTile}>
                                <Text style={[styles.playerName, { color: '#94a3b8' }]}>K.L. Rahul</Text>
                                <View style={styles.playerScoreContainer}>
                                    <Text style={[styles.playerScore, { color: '#cbd5e1' }]}>12*</Text>
                                    <Text style={styles.playerBalls}>(18)</Text>
                                </View>
                                <View style={styles.srContainer}>
                                    <Text style={styles.srLabel}>SR</Text>
                                    <Text style={styles.srValue}>66.67</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bowlerBanner}>
                            <View style={styles.bowlerInfo}>
                                <View style={styles.bowlerAvatar}>
                                    <MaterialCommunityIcons name="account" size={20} color="#64748b" />
                                </View>
                                <View>
                                    <Text style={styles.bowlerName}>P. CUMMINS</Text>
                                    <Text style={styles.bowlerType}>Fast Medium</Text>
                                </View>
                            </View>
                            <View style={styles.bowlerStats}>
                                <Text style={styles.bowlerFigures}>1/42 <Text style={styles.bowlerOvers}>(7.2)</Text></Text>
                                <View style={styles.econContainer}>
                                    <Text style={styles.srLabel}>ECON</Text>
                                    <Text style={[styles.srValue, { color: '#d9ff00' }]}>5.72</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>LAST 12 DELIVERIES</Text>
                    <Text style={styles.sectionSubtitle}>OVER 38 & 39</Text>
                </View>

                <View style={styles.overStrip}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ballsScroll}>
                        {[1, 4, 0, 2, 'W', 1].map((ball, i) => (
                            <View key={i} style={styles.ballContainer}>
                                <View style={[
                                    styles.ball,
                                    ball === 4 && styles.boundaryBall,
                                    ball === 'W' && styles.wicketBall
                                ]}>
                                    <Text style={[
                                        styles.ballText,
                                        ball === 4 && styles.boundaryBallText,
                                        ball === 'W' && styles.wicketBallText
                                    ]}>{ball}</Text>
                                </View>
                                <Text style={styles.ballOver}>37.{i + 1}</Text>
                            </View>
                        ))}
                        <View style={styles.overDivider} />
                        {[0, '1wd'].map((ball, i) => (
                            <View key={i + 10} style={styles.ballContainer}>
                                <View style={styles.ball}>
                                    <Text style={[styles.ballText, ball === '1wd' && { color: '#d9ff00' }]}>{ball}</Text>
                                </View>
                                <Text style={styles.ballOver}>38.{i + 1}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={[styles.tabText, styles.activeTabText]}>OVERVIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>SCORECARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>COMMENTARY</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.winProbSection}>
                    <View style={styles.winProbHeader}>
                        <Text style={styles.winProbTitle}>WIN PROBABILITY</Text>
                        <Text style={styles.winProbValue}>84.2% IND</Text>
                    </View>
                    <View style={styles.winProbCard}>
                        <View style={styles.winProbBarContainer}>
                            <View style={[styles.winProbBar, { width: '84%' }]} />
                        </View>
                        <View style={styles.winProbLegends}>
                            <View style={styles.legend}>
                                <View style={[styles.legendDot, { backgroundColor: '#d9ff00' }]} />
                                <Text style={styles.legendText}>India (84%)</Text>
                            </View>
                            <View style={styles.legend}>
                                <Text style={styles.legendText}>Australia (16%)</Text>
                                <View style={[styles.legendDot, { backgroundColor: '#334155' }]} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05070a',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: '#d9ff00',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1.5,
    },
    headerSubtitle: {
        color: '#64748b',
        fontSize: 9,
        fontFamily: 'Lexend-Medium',
        letterSpacing: 0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(217, 255, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(217, 255, 0, 0.2)',
    },
    liveDotContainer: {
        width: 6,
        height: 6,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveDotPing: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d9ff00',
        opacity: 0.5,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d9ff00',
    },
    liveBadgeText: {
        color: '#d9ff00',
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
    },
    scoreSection: {
        padding: 24,
        paddingTop: 32,
    },
    mainScoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    teamBrand: {
        alignItems: 'center',
        gap: 8,
    },
    flagBox: {
        width: 40,
        height: 40,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    miniFlag: {
        width: 32,
        height: 32,
        borderRadius: 4,
    },
    teamShortName: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
        fontStyle: 'italic',
    },
    scoreDisplay: {
        alignItems: 'center',
    },
    scoreNumber: {
        color: '#fff',
        fontSize: 40,
        fontFamily: 'Lexend-Black',
        letterSpacing: -2,
    },
    scoreSlash: {
        color: '#d9ff00',
        fontSize: 24,
    },
    oversText: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 2,
        marginTop: 4,
    },
    statsStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(217, 255, 0, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(217, 255, 0, 0.1)',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        color: '#64748b',
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
    },
    statValue: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    content: {
        flex: 1,
    },
    contentPadding: {
        padding: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#111827',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        marginBottom: 24,
    },
    cardHeader: {
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    cardTag: {
        color: '#d9ff00',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1.5,
    },
    cardStatus: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    cardBody: {
        padding: 16,
    },
    playerRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    playerTile: {
        flex: 1,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        position: 'relative',
    },
    activePlayer: {
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    starIcon: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
    playerNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    playerName: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d9ff00',
    },
    playerScoreContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
        marginBottom: 8,
    },
    playerScore: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
    },
    playerBalls: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    srContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    srLabel: {
        color: '#64748b',
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
    },
    srValue: {
        color: '#d9ff00',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    bowlerBanner: {
        padding: 12,
        backgroundColor: 'rgba(217, 255, 0, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(217, 255, 0, 0.1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bowlerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bowlerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bowlerName: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
        fontStyle: 'italic',
    },
    bowlerType: {
        color: '#64748b',
        fontSize: 9,
        fontFamily: 'Lexend-Medium',
    },
    bowlerFigures: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Black',
        textAlign: 'right',
    },
    bowlerOvers: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    econContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2.5,
    },
    sectionSubtitle: {
        color: '#d9ff00',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    overStrip: {
        backgroundColor: '#111827',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20,
    },
    ballsScroll: {
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 4,
    },
    ballContainer: {
        alignItems: 'center',
        gap: 6,
    },
    ball: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ballText: {
        color: '#fff',
        fontSize: 11,
        fontFamily: 'Lexend-Black',
    },
    boundaryBall: {
        backgroundColor: '#00ff88',
        borderColor: 'rgba(0, 255, 136, 0.3)',
    },
    boundaryBallText: {
        color: '#05070a',
    },
    wicketBall: {
        backgroundColor: '#ff3131',
        borderColor: 'rgba(255, 49, 49, 0.3)',
    },
    wicketBallText: {
        color: '#fff',
    },
    ballOver: {
        color: '#334155',
        fontSize: 8,
        fontFamily: 'Lexend-Bold',
    },
    overDivider: {
        width: 1,
        height: 32,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginHorizontal: 4,
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        marginTop: 16,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 12,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#d9ff00',
    },
    tabText: {
        color: '#64748b',
        fontSize: 11,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
    },
    activeTabText: {
        color: '#d9ff00',
        fontFamily: 'Lexend-Black',
    },
    winProbSection: {
        gap: 12,
    },
    winProbHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    winProbTitle: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2,
    },
    winProbValue: {
        color: '#d9ff00',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    winProbCard: {
        backgroundColor: '#111827',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    winProbBarContainer: {
        height: 12,
        backgroundColor: '#1e293b',
        borderRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    winProbBar: {
        height: '100%',
        backgroundColor: '#d9ff00',
        shadowColor: '#d9ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    winProbLegends: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        color: '#cbd5e1',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    }
});
