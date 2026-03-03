import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { colors, isDark, toggleTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.profileInfo}>
                        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                            <MaterialCommunityIcons name="account" size={40} color="#fff" />
                        </View>
                        <View style={styles.userDetails}>
                            <Text style={[styles.userName, { color: colors.text }]}>Aarvi</Text>
                            <Text style={[styles.userLevel, { color: colors.textSecondary }]}>Cricores Member</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <MaterialCommunityIcons name="moon-waning-crescent" size={24} color={colors.textSecondary} />
                            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={isDark ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <MaterialCommunityIcons name="bell-outline" size={24} color={colors.textSecondary} />
                            <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <MaterialCommunityIcons name="shield-check-outline" size={24} color={colors.textSecondary} />
                            <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Policy</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
                    </View>
                </TouchableOpacity>
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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lexend-Black',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userDetails: {
        marginLeft: 16,
    },
    userName: {
        fontSize: 18,
        fontFamily: 'Lexend-Bold',
    },
    userLevel: {
        fontSize: 14,
        fontFamily: 'Lexend-Medium',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingLabel: {
        fontSize: 16,
        fontFamily: 'Lexend-Medium',
    }
});
