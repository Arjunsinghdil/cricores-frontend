import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ArenaHomeScreen({ navigation }) {
    const { colors, isDark } = useTheme();
    const [roomCode, setRoomCode] = useState('');

    const activeRooms = [
        { id: '1', name: 'Elite Strategists', match: 'IND vs PAK', members: 8, max: 10, code: 'CRI123' },
        { id: '2', name: 'Global Cricket Mind', match: 'IPL: CSK vs RCB', members: 4, max: 15, code: 'MSD007' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.headerSubtitle, { color: colors.primary }]}>CRICORES ARENA</Text>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Strategy Room</Text>
                </View>
                <TouchableOpacity style={[styles.cmrBadge, { borderColor: colors.primary }]}>
                    <Text style={styles.cmrLabel}>GLOBAL CMR</Text>
                    <Text style={styles.cmrValue}>1,450</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Create & Join Section */}
                <View style={styles.actionGrid}>
                    <TouchableOpacity
                        style={[styles.actionCard, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('CreateRoom')}
                    >
                        <MaterialCommunityIcons name="plus-circle" size={32} color="#fff" />
                        <Text style={styles.actionText}>Create Room</Text>
                    </TouchableOpacity>

                    <View style={[styles.joinCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <TextInput
                            style={[styles.input, { color: colors.text }]}
                            placeholder="Enter Code"
                            placeholderTextColor={colors.textSecondary}
                            value={roomCode}
                            onChangeText={setRoomCode}
                        />
                        <TouchableOpacity style={[styles.joinBtn, { backgroundColor: colors.primary }]}>
                            <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Banner */}
                <LinearGradient
                    colors={['#059669', '#065f46']}
                    style={styles.banner}
                >
                    <View style={styles.bannerText}>
                        <Text style={styles.bannerTitle}>Strategy Challenge</Text>
                        <Text style={styles.bannerSubtitle}>Predict real-time decisions & win CMR Points</Text>
                    </View>
                    <MaterialCommunityIcons name="brain" size={40} color="rgba(255,255,255,0.4)" />
                </LinearGradient>

                {/* Active Rooms */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Rooms</Text>
                    <TouchableOpacity>
                        <Text style={{ color: colors.primary, fontSize: 12, fontFamily: 'Lexend-Bold' }}>View All</Text>
                    </TouchableOpacity>
                </View>

                {activeRooms.map((room) => (
                    <TouchableOpacity
                        key={room.id}
                        style={[styles.roomCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => navigation.navigate('Room', { roomId: room.id })}
                    >
                        <View style={styles.roomLeft}>
                            <View style={[styles.matchBadge, { backgroundColor: colors.background }]}>
                                <Text style={[styles.matchText, { color: colors.textSecondary }]}>{room.match}</Text>
                            </View>
                            <Text style={[styles.roomName, { color: colors.text }]}>{room.name}</Text>
                            <View style={styles.memberRow}>
                                <MaterialCommunityIcons name="account-group" size={14} color={colors.textSecondary} />
                                <Text style={[styles.memberText, { color: colors.textSecondary }]}>
                                    {room.members}/{room.max} Members
                                </Text>
                            </View>
                        </View>
                        <View style={styles.roomRight}>
                            <Text style={[styles.codeLabel, { color: colors.textSecondary }]}>CODE</Text>
                            <Text style={[styles.codeValue, { color: colors.primary }]}>{room.code}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    headerSubtitle: {
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        letterSpacing: 2.5,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Lexend-Black',
        marginTop: 4,
    },
    cmrBadge: {
        padding: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        alignItems: 'center',
    },
    cmrLabel: {
        fontSize: 8,
        fontFamily: 'Lexend-Bold',
        color: '#71717a',
    },
    cmrValue: {
        fontSize: 14,
        fontFamily: 'Lexend-Black',
        color: '#16a34a',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    actionCard: {
        flex: 1,
        height: 120,
        borderRadius: 24,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#2563eb',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
    },
    actionText: {
        color: '#fff',
        marginTop: 10,
        fontFamily: 'Lexend-Black',
        fontSize: 14,
    },
    joinCard: {
        flex: 1,
        borderRadius: 24,
        padding: 15,
        borderWidth: 1,
        justifyContent: 'center',
    },
    input: {
        fontFamily: 'Lexend-Bold',
        fontSize: 16,
        marginBottom: 10,
    },
    joinCardBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    joinBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    banner: {
        padding: 24,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    bannerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontFamily: 'Lexend-Medium',
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Lexend-Black',
    },
    roomCard: {
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    roomLeft: {
        flex: 1,
    },
    matchBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    matchText: {
        fontSize: 10,
        fontFamily: 'Lexend-Bold',
    },
    roomName: {
        fontSize: 16,
        fontFamily: 'Lexend-Bold',
        marginBottom: 4,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    memberText: {
        fontSize: 12,
        fontFamily: 'Lexend-Medium',
    },
    roomRight: {
        alignItems: 'flex-end',
    },
    codeLabel: {
        fontSize: 8,
        fontFamily: 'Lexend-Bold',
    },
    codeValue: {
        fontSize: 14,
        fontFamily: 'Lexend-Black',
    }
});
