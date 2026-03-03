import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function EmptyState({ message = "No data available", icon = "database-off" }) {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={64} color={colors.textSecondary} />
            <Text style={[styles.text, { color: colors.textSecondary }]}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: 'Lexend-Medium',
        textAlign: 'center',
    }
});
