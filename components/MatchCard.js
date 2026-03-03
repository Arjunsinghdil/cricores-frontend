import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MatchCard({ match, onPress }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onPress}
        >
            <View style={styles.header}>
                <Text style={[styles.league, { color: colors.textSecondary }]} numberOfLines={1}>
                    {match.name}
                </Text>
                {match.isLive && (
                    <View style={[styles.liveBadge, { backgroundColor: colors.live + '20' }]}>
                        <View style={[styles.dot, { backgroundColor: colors.live }]} />
                        <Text style={[styles.liveText, { color: colors.live }]}>LIVE</Text>
                    </View>
                )}
            </View>

            <View style={styles.teams}>
                <View style={styles.teamRow}>
                    <Text style={[styles.teamName, { color: colors.text }]}>{match.teams[0]}</Text>
                    {match.score && match.score[0] && (
                        <Text style={[styles.score, { color: colors.text }]}>
                            {match.score[0].r}/{match.score[0].w}
                            {match.score[0].o && <Text style={styles.overs}> ({match.score[0].o})</Text>}
                        </Text>
                    )}
                </View>
                <View style={styles.teamRow}>
                    <Text style={[styles.teamName, { color: colors.text, opacity: 0.7 }]}>{match.teams[1]}</Text>
                    {match.score && match.score[1] && (
                        <Text style={[styles.score, { color: colors.text, opacity: 0.7 }]}>
                            {match.score[1].r ? `${match.score[1].r}/${match.score[1].w}` : 'Yet to Bat'}
                        </Text>
                    )}
                </View>
            </View>

            <Text style={[styles.status, { color: colors.primary }]}>
                {match.status || match.time || 'Upcoming'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    league: {
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        flex: 1,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    liveText: {
        fontSize: 10,
        fontFamily: 'Lexend-Black',
    },
    teams: {
        gap: 8,
        marginBottom: 12,
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamName: {
        fontSize: 16,
        fontFamily: 'Lexend-Bold',
    },
    score: {
        fontSize: 16,
        fontFamily: 'Lexend-Black',
    },
    overs: {
        fontSize: 12,
        fontFamily: 'Lexend-Regular',
        opacity: 0.6,
    },
    status: {
        fontSize: 12,
        fontFamily: 'Lexend-Medium',
    }
});
