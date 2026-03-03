import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getMatches } from '../services/api';
import MatchCard from '../components/MatchCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const result = await getMatches();
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) return <Loader />;

    const liveMatches = data?.live || [];
    const upcomingMatches = data?.upcoming || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Logo size={36} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
            >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>LIVE NOW</Text>
                {liveMatches.length > 0 ? (
                    liveMatches.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            onPress={() => navigation.navigate('PreMatch')}
                        />
                    ))
                ) : (
                    <EmptyState message="No live matches currently" icon="cricket" />
                )}

                <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>UPCOMING FIXTURES</Text>
                {upcomingMatches.length > 0 ? (
                    upcomingMatches.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            onPress={() => navigation.navigate('PreMatch')}
                        />
                    ))
                ) : (
                    <EmptyState message="No upcoming matches found" icon="calendar-clock" />
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
        paddingBottom: 15,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Lexend-Black',
        marginBottom: 15,
        letterSpacing: 1,
    }
});
