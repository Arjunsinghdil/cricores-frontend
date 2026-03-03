import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getMatches } from '../services/api';
import MatchCard from '../components/MatchCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function MatchesScreen() {
    const { colors } = useTheme();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Live');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMatches();
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader />;

    const getFilteredMatches = () => {
        if (!data) return [];
        switch (activeTab) {
            case 'Live': return data.live || [];
            case 'Upcoming': return data.upcoming || [];
            case 'Finished': return data.finished || [];
            default: return [];
        }
    };

    const matches = getFilteredMatches();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Matches</Text>
            </View>

            <View style={[styles.tabBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                {['Live', 'Upcoming', 'Finished'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && { backgroundColor: colors.primary }]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.textSecondary }]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {matches.length > 0 ? (
                    matches.map(m => <MatchCard key={m.id} match={m} />)
                ) : (
                    <EmptyState message={`No ${activeTab.toLowerCase()} matches`} />
                )}
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
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        padding: 4,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Lexend-Bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    }
});
