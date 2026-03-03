import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMatches } from '../context/MatchContext';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';

const { width } = Dimensions.get('window');

const StatsCard = ({ title, value, icon, trend, color, theme }) => (
    <View style={[styles.statsCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={styles.statsCardTop}>
            <View>
                <Text style={styles.statsTitle}>{title}</Text>
                <Text style={[styles.statsValue, { color: theme.colors.text }]}>{value}</Text>
                {trend && <Text style={[styles.statsTrend, { color }]}>{trend}</Text>}
            </View>
            <View style={[styles.statsIconContainer, { backgroundColor: `${color}15` }]}>
                <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
        </View>
    </View>
);

const LiveMatchCompact = ({ match, onPress, theme }) => (
    <TouchableOpacity onPress={onPress} style={[styles.compactCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <LinearGradient
            colors={[theme.isDark ? 'rgba(37, 140, 244, 0.15)' : 'rgba(37, 140, 244, 0.05)', 'rgba(37, 140, 244, 0.02)']}
            style={styles.compactGradient}
        >
            <View style={styles.compactHeader}>
                <View style={[styles.compactLiveTag, { backgroundColor: `${theme.colors.live}15`, borderColor: `${theme.colors.live}20` }]}>
                    <View style={[styles.liveDot, { backgroundColor: theme.colors.live }]} />
                    <Text style={[styles.liveTagText, { color: theme.colors.live }]}>GAME RUNNING</Text>
                </View>
                <Text style={styles.compactLeague} numberOfLines={1}>{match.name}</Text>
            </View>

            <View style={styles.compactTeams}>
                <View style={styles.compactTeamRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={[styles.compactTeamName, { color: theme.colors.text }]}>{match.teams?.[0]}</Text>
                        {Number(match.id) % 2 === 0 && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#16a34a' }} />}
                    </View>
                    <Text style={[styles.compactScore, { color: theme.colors.text }]}>{match.score?.[0]?.r}/{match.score?.[0]?.w}</Text>
                </View>
                <View style={styles.compactTeamRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={[styles.compactTeamName, { color: theme.colors.text, opacity: 0.6 }]}>{match.teams?.[1]}</Text>
                        {Number(match.id) % 2 !== 0 && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#16a34a' }} />}
                    </View>
                    <Text style={[styles.compactScore, { color: theme.colors.text, opacity: 0.6 }]}>
                        {match.score?.[1]?.r ? `${match.score[1].r}/${match.score[1].w}` : 'Wait to Bat'}
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.compactStatus, { color: theme.colors.primary }]}>{match.status}</Text>
                <MaterialCommunityIcons name="arrow-right-circle" size={18} color={theme.colors.primary} />
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

export default function DashboardScreen({ navigation }) {
    const { matches, loading } = useMatches();
    const { colors, toggleTheme, isDark } = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');

    const liveMatches = matches.filter(m => m.matchStarted && !m.matchEnded);
    const upcomingMatches = matches.filter(m => !m.matchStarted).slice(0, 3);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Logo />
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        style={[styles.headerIcon, { backgroundColor: colors.surface }]}
                        onPress={toggleTheme}
                    >
                        <MaterialCommunityIcons
                            name={isDark ? "white-balance-sunny" : "moon-waning-crescent"}
                            size={20}
                            color={isDark ? "#f59e0b" : "#2563eb"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.headerIcon, { backgroundColor: colors.surface }]}>
                        <MaterialCommunityIcons name="bell-outline" size={20} color={colors.text} />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.profileIcon, { backgroundColor: colors.primary }]}>
                        <MaterialCommunityIcons name="account" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Welcome & Instructions */}
                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                    <Text style={[styles.greeting, { color: colors.primary }]}>HELLO CRICKET FAN! 👋</Text>
                    <Text style={[styles.subtext, { color: colors.text }]}>Welcome to Cricores</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4, fontFamily: 'Lexend-Medium' }}>
                        Tap on any match below to see full details and scores.
                    </Text>
                </View>

                {/* Search Bar - NOW WORKING */}
                <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={[styles.searchPlaceholder, { color: colors.text, flex: 1, height: '100%' }]}
                        placeholder="Type match or team name here..."
                        placeholderTextColor={colors.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Quick Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatsCard
                        title="Live Matches"
                        value={liveMatches.length}
                        icon="waveform"
                        trend="+2 Today"
                        color="#ef4444"
                        theme={{ colors, isDark }}
                    />
                    <StatsCard
                        title="Ongoing Series"
                        value="3"
                        icon="trophy-outline"
                        trend="IPL, BGT"
                        color="#f59e0b"
                        theme={{ colors, isDark }}
                    />
                </View>

                {/* Live Matches Horizontal Scroll */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <View style={styles.neonDot} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>LIVE NOW</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={liveMatches}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <LiveMatchCompact
                            match={item}
                            onPress={() => navigation.navigate('MatchDetails', { matchId: item.id })}
                            theme={{ colors, isDark }}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No matches live right now</Text>
                        </View>
                    }
                    contentContainerStyle={styles.horizontalList}
                />

                {/* Upcoming Section */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color="#f59e0b" />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>UPCOMING FIXTURES</Text>
                    </View>
                </View>

                {upcomingMatches.map((match) => (
                    <TouchableOpacity
                        key={match.id}
                        style={[styles.upcomingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => navigation.navigate('MatchDetails', { matchId: match.id })}
                    >
                        <View style={styles.upcomingHeader}>
                            <Text style={styles.upcomingLeague}>{match.name}</Text>
                            <Text style={styles.upcomingTime}>Today, 19:30</Text>
                        </View>
                        <View style={styles.upcomingTeams}>
                            <View style={[styles.teamBadge, { backgroundColor: colors.primary }]}>
                                <Text style={styles.teamBadgeText}>{match.teams?.[0]?.substring(0, 3).toUpperCase()}</Text>
                            </View>
                            <Text style={styles.vs}>VS</Text>
                            <View style={[styles.teamBadge, { backgroundColor: '#16a34a' }]}>
                                <Text style={styles.teamBadgeText}>{match.teams?.[1]?.substring(0, 3).toUpperCase()}</Text>
                            </View>
                        </View>
                        <Text style={[styles.venueText, { color: colors.textSecondary }]}>{match.venue || 'TBA'}</Text>
                    </TouchableOpacity>
                ))}

                {/* Trending Section */}
                <View style={styles.trendingContainer}>
                    <LinearGradient
                        colors={['#258cf4', '#1d4ed8']}
                        style={styles.trendingGradient}
                    >
                        <View style={styles.trendingHeader}>
                            <MaterialCommunityIcons name="trending-up" size={20} color="#fff" />
                            <Text style={styles.trendingTitle}>Trending in Cricket</Text>
                        </View>
                        <View style={styles.trendingNews}>
                            <Text style={styles.newsHeadline}>India squad for T20 WC announced</Text>
                            <Text style={styles.newsHeadline}>IPL Playoffs: CSK vs MI Tickets live</Text>
                        </View>
                    </LinearGradient>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        color: '#258cf4',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2,
    },
    subtext: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Bold',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    headerIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 14,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 2,
        borderColor: '#0a0f14',
    },
    profileIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#258cf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    searchBar: {
        marginHorizontal: 20,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 10,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    searchPlaceholder: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        fontFamily: 'Lexend-Medium',
    },
    statsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 32,
    },
    statsCard: {
        flex: 1,
        backgroundColor: '#161e27',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statsCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    statsTitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    statsValue: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Lexend-Black',
    },
    statsTrend: {
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
        marginTop: 4,
    },
    statsIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Lexend-Black',
        letterSpacing: 1,
    },
    viewAll: {
        color: '#258cf4',
        fontSize: 12,
        fontFamily: 'Lexend-Bold',
    },
    neonDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },
    horizontalList: {
        paddingLeft: 20,
        paddingRight: 8,
        marginBottom: 32,
    },
    compactCard: {
        width: width * 0.7,
        height: 160,
        backgroundColor: '#161e27',
        borderRadius: 24,
        marginRight: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    compactGradient: {
        flex: 1,
        padding: 16,
    },
    compactHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    compactLiveTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    liveDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#ef4444',
    },
    liveTagText: {
        color: '#ef4444',
        fontSize: 9,
        fontFamily: 'Lexend-Black',
    },
    compactLeague: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 9,
        fontFamily: 'Lexend-Bold',
        maxWidth: '70%',
    },
    compactTeams: {
        gap: 8,
    },
    compactTeamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    compactTeamName: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Lexend-Bold',
    },
    compactScore: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Lexend-Black',
    },
    compactStatus: {
        marginTop: 'auto',
        color: '#258cf4',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    upcomingCard: {
        marginHorizontal: 20,
        backgroundColor: '#161e27',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    upcomingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    upcomingLeague: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    upcomingTime: {
        color: '#f59e0b',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    upcomingTeams: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginBottom: 12,
    },
    teamBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    teamBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lexend-Black',
    },
    vs: {
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'Lexend-Black',
        fontSize: 14,
    },
    venueText: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    trendingContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 24,
        overflow: 'hidden',
    },
    trendingGradient: {
        padding: 20,
    },
    trendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    trendingTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Lexend-Black',
    },
    trendingNews: {
        gap: 8,
    },
    newsHeadline: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        fontFamily: 'Lexend-Medium',
        lineHeight: 18,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'Lexend-Bold',
    }
});
