import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Trophy, Medal, Star, Info } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderboardScreen = ({ navigation }) => {
    const [leaderboardData, setLeaderboardData] = useState([
        { id: '1', name: 'Aryan_P', points: 1250, rank: 1, avatar: 'A' },
        { id: '2', name: 'CricketGuru', points: 1120, rank: 2, avatar: 'C' },
        { id: '3', name: 'IPL_Fanatic', points: 1080, rank: 3, avatar: 'I' },
        { id: '4', name: 'Rahul.Stats', points: 950, rank: 4, avatar: 'R' },
        { id: '5', name: 'SuperStriker', points: 890, rank: 5, avatar: 'S' },
        { id: '6', name: 'You', points: 740, rank: 12, avatar: 'Y' },
    ]);

    const renderUser = ({ item }) => (
        <View style={[styles.userRow, item.name === 'You' && styles.currentUserRow]}>
            <View style={styles.rankContainer}>
                {item.rank <= 3 ? (
                    <Trophy size={20} color={item.rank === 1 ? '#fbbf24' : item.rank === 2 ? '#94a3b8' : '#b45309'} />
                ) : (
                    <Text style={styles.rankText}>#{item.rank}</Text>
                )}
            </View>

            <View style={styles.userInfo}>
                <View style={[styles.avatarSmall, { backgroundColor: item.rank === 1 ? '#fbbf24' : '#1e293b' }]}>
                    <Text style={[styles.avatarTextSmall, item.rank === 1 && { color: '#020617' }]}>{item.avatar}</Text>
                </View>
                <Text style={styles.userName}>{item.name}</Text>
            </View>

            <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{item.points}</Text>
                <Text style={styles.pointsLabel}>pts</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leaderboard</Text>
                <Info size={24} color="#94a3b8" />
            </View>

            <View style={styles.topThreeContainer}>
                <View style={[styles.podiumItem, { marginTop: 40 }]}>
                    <Medal size={32} color="#94a3b8" />
                    <View style={[styles.avatarMed, { borderColor: '#94a3b8' }]}>
                        <Text style={styles.avatarTextMed}>C</Text>
                    </View>
                    <Text style={styles.podiumName}>CricketGuru</Text>
                    <Text style={styles.podiumPoints}>1120</Text>
                </View>

                <View style={styles.podiumItem}>
                    <Trophy size={48} color="#fbbf24" />
                    <View style={[styles.avatarLarge, { borderColor: '#fbbf24' }]}>
                        <Text style={styles.avatarTextLarge}>A</Text>
                    </View>
                    <Text style={styles.podiumName}>Aryan_P</Text>
                    <Text style={styles.podiumPoints}>1250</Text>
                </View>

                <View style={[styles.podiumItem, { marginTop: 50 }]}>
                    <Medal size={28} color="#b45309" />
                    <View style={[styles.avatarMed, { borderColor: '#b45309' }]}>
                        <Text style={styles.avatarTextMed}>I</Text>
                    </View>
                    <Text style={styles.podiumName}>IPL_Fanatic</Text>
                    <Text style={styles.podiumPoints}>1080</Text>
                </View>
            </View>

            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>Global Rankings</Text>
                    <TouchableOpacity>
                        <Text style={styles.filterBtn}>Season 17 ▾</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={leaderboardData}
                    renderItem={renderUser}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />
            </View>
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
    topThreeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 30,
        backgroundColor: '#0f172a',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    avatarMed: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    avatarTextLarge: {
        color: '#f8fafc',
        fontSize: 32,
        fontWeight: 'bold',
    },
    avatarTextMed: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: 'bold',
    },
    podiumName: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: 'bold',
    },
    podiumPoints: {
        color: '#38bdf8',
        fontSize: 14,
        fontWeight: '900',
    },
    listContainer: {
        flex: 1,
        marginTop: 20,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    listHeaderTitle: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    filterBtn: {
        color: '#38bdf8',
        fontSize: 12,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 16,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    currentUserRow: {
        borderColor: '#38bdf8',
        backgroundColor: '#1e293b',
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
    },
    rankText: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    avatarSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    avatarTextSmall: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: 'bold',
    },
    userName: {
        color: '#f8fafc',
        fontSize: 15,
        fontWeight: '600',
    },
    pointsContainer: {
        alignItems: 'flex-end',
    },
    pointsText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pointsLabel: {
        color: '#64748b',
        fontSize: 10,
    },
});

export default LeaderboardScreen;
