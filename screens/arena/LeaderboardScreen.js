import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LeaderboardScreen() {
    const { colors, isDark } = useTheme();
    const [activeType, setActiveType] = useState('Global');

    const strategists = [
        { id: '1', rank: 1, name: 'MSD_Fan_7', cmr: 2850, accuracy: '94%', badges: ['tactical-genius'] },
        { id: '2', rank: 2, name: 'CricketGuru', cmr: 2720, accuracy: '89%', badges: ['risk-king'] },
        { id: '3', rank: 3, name: 'StrategyMaster', cmr: 2680, accuracy: '91%', badges: ['ice-pressure'] },
        { id: '4', rank: 4, name: 'ViruPaji', cmr: 2550, accuracy: '85%', badges: [] },
        { id: '5', rank: 5, name: 'RahulD', cmr: 2490, accuracy: '96%', badges: [] },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Strategists Board</Text>
                <View style={[styles.toggle, { backgroundColor: colors.surface }]}>
                    {['Global', 'Weekly'].map(type => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.toggleBtn, activeType === type && { backgroundColor: colors.primary }]}
                            onPress={() => setActiveType(type)}
                        >
                            <Text style={[styles.toggleText, { color: activeType === type ? '#fff' : colors.textSecondary }]}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Top 3 Podium */}
                <View style={styles.podium}>
                    <View style={[styles.podiumItem, styles.rank2]}>
                        <View style={[styles.avatarBox, { borderColor: '#94a3b8' }]}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=2' }} style={styles.avatar} />
                            <View style={[styles.rankBadge, { backgroundColor: '#94a3b8' }]}>
                                <Text style={styles.rankText}>2</Text>
                            </View>
                        </View>
                        <Text style={[styles.podiumName, { color: colors.text }]} numberOfLines={1}>{strategists[1].name}</Text>
                        <Text style={[styles.podiumCmr, { color: colors.primary }]}>{strategists[1].cmr}</Text>
                    </View>

                    <View style={[styles.podiumItem, styles.rank1]}>
                        <View style={[styles.avatarBox, { borderColor: '#f59e0b', width: 90, height: 90, borderRadius: 45 }]}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=1' }} style={styles.avatar} />
                            <MaterialCommunityIcons name="crown" size={24} color="#f59e0b" style={styles.crown} />
                            <View style={[styles.rankBadge, { backgroundColor: '#f59e0b' }]}>
                                <Text style={styles.rankText}>1</Text>
                            </View>
                        </View>
                        <Text style={[styles.podiumName, { color: colors.text, fontSize: 16 }]} numberOfLines={1}>{strategists[0].name}</Text>
                        <Text style={[styles.podiumCmr, { color: colors.primary, fontSize: 18 }]}>{strategists[0].cmr} CMR</Text>
                    </View>

                    <View style={[styles.podiumItem, styles.rank3]}>
                        <View style={[styles.avatarBox, { borderColor: '#b45309' }]}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=3' }} style={styles.avatar} />
                            <View style={[styles.rankBadge, { backgroundColor: '#b45309' }]}>
                                <Text style={styles.rankText}>3</Text>
                            </View>
                        </View>
                        <Text style={[styles.podiumName, { color: colors.text }]} numberOfLines={1}>{strategists[2].name}</Text>
                        <Text style={[styles.podiumCmr, { color: colors.primary }]}>{strategists[2].cmr}</Text>
                    </View>
                </View>

                {/* List View */}
                <View style={[styles.listView, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {strategists.slice(3).map((item) => (
                        <View key={item.id} style={[styles.listRow, { borderBottomColor: colors.border }]}>
                            <Text style={[styles.listRank, { color: colors.textSecondary }]}>{item.rank}</Text>
                            <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} style={styles.listAvatar} />
                            <View style={styles.listInfo}>
                                <Text style={[styles.listName, { color: colors.text }]}>{item.name}</Text>
                                <Text style={[styles.listMeta, { color: colors.textSecondary }]}>Accuracy: {item.accuracy}</Text>
                            </View>
                            <View style={styles.listRating}>
                                <Text style={[styles.listCmr, { color: colors.text }]}>{item.cmr}</Text>
                                <Text style={styles.cmrUnit}>CMR</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* User Status Card */}
                <LinearGradient
                    colors={['#2563eb', '#1d4ed8']}
                    style={styles.myRankCard}
                >
                    <Text style={styles.myRankLabel}>YOUR RANKING</Text>
                    <View style={styles.myRankRow}>
                        <View style={styles.myRankProfile}>
                            <Image source={{ uri: 'https://i.pravatar.cc/150?u=y' }} style={styles.myRankAvatar} />
                            <View>
                                <Text style={styles.myRankName}>Aarvi</Text>
                                <Text style={styles.myRankBadge}>Ice Under Pressure</Text>
                            </View>
                        </View>
                        <View style={styles.myRankPoints}>
                            <Text style={styles.myRankValue}>#1,245</Text>
                            <Text style={styles.myRankPointsValue}>1,450 CMR</Text>
                        </View>
                    </View>
                </LinearGradient>
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
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lexend-Black',
        marginBottom: 20,
    },
    toggle: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 12,
        width: '100%',
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleText: {
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    podium: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 40,
        height: 200,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    rank1: {
        zIndex: 2,
        bottom: 20,
    },
    rank2: {
        zIndex: 1,
    },
    rank3: {
        zIndex: 1,
    },
    avatarBox: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        padding: 4,
        position: 'relative',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    crown: {
        position: 'absolute',
        top: -24,
        left: '50%',
        marginLeft: -12,
    },
    rankBadge: {
        position: 'absolute',
        bottom: -10,
        left: '50%',
        marginLeft: -12,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    rankText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
    },
    podiumName: {
        marginTop: 15,
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
        width: 80,
        textAlign: 'center',
    },
    podiumCmr: {
        fontSize: 14,
        fontFamily: 'Lexend-Black',
    },
    listView: {
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 24,
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    listRank: {
        fontSize: 14,
        fontFamily: 'Lexend-Black',
        width: 30,
    },
    listAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    listInfo: {
        flex: 1,
    },
    listName: {
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    },
    listMeta: {
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
    },
    listRating: {
        alignItems: 'flex-end',
    },
    listCmr: {
        fontSize: 16,
        fontFamily: 'Lexend-Black',
    },
    cmrUnit: {
        fontSize: 8,
        fontFamily: 'Lexend-Bold',
        color: '#71717a',
    },
    myRankCard: {
        padding: 24,
        borderRadius: 24,
        elevation: 10,
        shadowColor: '#2563eb',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
    },
    myRankLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2,
        marginBottom: 16,
    },
    myRankRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    myRankProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    myRankAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    myRankName: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    myRankBadge: {
        color: '#39ff14',
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    myRankPoints: {
        alignItems: 'flex-end',
    },
    myRankValue: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Lexend-Black',
    },
    myRankPointsValue: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontFamily: 'Lexend-Medium',
    }
});
