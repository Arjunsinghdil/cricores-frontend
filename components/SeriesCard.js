import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SeriesCard({ series, onPress }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onPress}
        >
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '10' }]}>
                <MaterialCommunityIcons
                    name={series.icon || 'trophy-outline'}
                    size={24}
                    color={colors.primary}
                />
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{series.title}</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    {series.matches} • {series.teams}
                </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: series.status === 'Ongoing' ? colors.live + '15' : colors.upcoming + '15' }]}>
                <Text style={[styles.badgeText, { color: series.status === 'Ongoing' ? colors.live : colors.upcoming }]}>
                    {series.status}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Lexend-Bold',
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Lexend-Medium',
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 9,
        fontFamily: 'Lexend-Black',
        textTransform: 'uppercase',
    }
});
