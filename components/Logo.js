import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

export default function Logo({ size = 42 }) {
    const { colors, isDark } = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.logoBadge, { width: size, height: size }]}>
                <Svg viewBox="0 0 100 100" style={{ width: size * 0.7, height: size * 0.7 }}>
                    {/* Clean Cricket Ball 'C' */}
                    <Path
                        d="M75 25C68 15 58 10 45 10C25 10 10 26 10 45C10 64 25 80 45 80C58 80 68 75 75 65"
                        stroke="#2563eb"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Professional Seam */}
                    <Path
                        d="M40 25C48 35 48 55 40 65"
                        stroke="#2563eb"
                        strokeWidth="4"
                        strokeDasharray="4 4"
                        fill="none"
                        opacity={0.5}
                    />
                    <Path
                        d="M50 22C60 35 60 55 50 68"
                        stroke="#2563eb"
                        strokeWidth="4"
                        strokeDasharray="4 4"
                        fill="none"
                        opacity={0.5}
                    />
                    {/* Accent Dot - Common in Sports Apps */}
                    <Circle cx="75" cy="25" r="8" fill="#16a34a" />
                </Svg>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: colors.text }]}>
                    CRI<Text style={{ color: '#2563eb' }}>CORES</Text>
                </Text>
                <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                    FASTEST LIVE UPDATES
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoBadge: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderBottomWidth: 2,
        borderBottomColor: '#f1f5f9',
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Lexend-Black',
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 8,
        fontFamily: 'Lexend-Bold',
        letterSpacing: 2,
        marginTop: -2,
    }
});
