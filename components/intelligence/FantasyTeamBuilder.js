import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Trophy, Star, ChevronRight, User } from 'lucide-react-native';

const FantasyTeamBuilder = ({ players, onPlayerPress }) => {
    const captainSuggestion = players.find(p => p.form >= 9.5);
    const viceCaptainSuggestion = players.filter(p => p.form >= 9.0)[1] || players[1];

    const renderPlayer = ({ item }) => (
        <TouchableOpacity style={styles.playerCard} onPress={() => onPlayerPress(item)}>
            <View style={styles.playerInfo}>
                <View style={styles.avatar}>
                    <User size={20} color="#94a3b8" />
                </View>
                <View>
                    <Text style={styles.playerName}>{item.name}</Text>
                    <Text style={styles.playerSub}>{item.team} • {item.role}</Text>
                </View>
            </View>
            <View style={styles.playerStats}>
                <Text style={styles.statLabel}>Form</Text>
                <Text style={styles.statValue}>{item.form}</Text>
                {item.isSafePick && (
                    <View style={styles.safeTag}>
                        <Text style={styles.tagText}>SAFE</Text>
                    </View>
                )}
                {item.isDifferential && (
                    <View style={styles.diffTag}>
                        <Text style={styles.tagText}>DIFF</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.suggestionsContainer}>
                <View style={styles.suggestionBox}>
                    <Trophy size={20} color="#fbbf24" />
                    <Text style={styles.suggestionTitle}>Captain</Text>
                    <Text style={styles.suggestionName}>{captainSuggestion?.name}</Text>
                </View>
                <View style={styles.suggestionBox}>
                    <Star size={20} color="#a855f7" />
                    <Text style={styles.suggestionTitle}>VC</Text>
                    <Text style={styles.suggestionName}>{viceCaptainSuggestion?.name}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Player Picks</Text>
            <FlatList
                data={players}
                renderItem={renderPlayer}
                keyExtractor={item => item.id}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    suggestionsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    suggestionBox: {
        flex: 1,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    suggestionTitle: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 8,
    },
    suggestionName: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    sectionTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    playerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    playerName: {
        color: '#f8fafc',
        fontSize: 15,
        fontWeight: '600',
    },
    playerSub: {
        color: '#64748b',
        fontSize: 12,
    },
    playerStats: {
        alignItems: 'flex-end',
    },
    statLabel: {
        color: '#64748b',
        fontSize: 10,
    },
    statValue: {
        color: '#38bdf8',
        fontSize: 14,
        fontWeight: 'bold',
    },
    safeTag: {
        backgroundColor: '#065f46',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    diffTag: {
        backgroundColor: '#7e22ce',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
    },
});

export default FantasyTeamBuilder;
