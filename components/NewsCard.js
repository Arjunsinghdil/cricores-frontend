import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function NewsCard({ news, onPress }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { borderBottomColor: colors.border }]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <Text style={[styles.category, { color: colors.primary }]}>{news.category}</Text>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                    {news.title}
                </Text>
                <Text style={[styles.meta, { color: colors.textSecondary }]}>
                    {news.source} • {news.time}
                </Text>
            </View>
            <Image source={{ uri: news.image }} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    content: {
        flex: 1,
        marginRight: 16,
    },
    category: {
        fontSize: 10,
        fontFamily: 'Lexend-Black',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Lexend-Bold',
        lineHeight: 22,
        marginBottom: 6,
    },
    meta: {
        fontSize: 11,
        fontFamily: 'Lexend-Medium',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
    }
});
