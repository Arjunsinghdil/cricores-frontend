import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getSeries } from '../services/api';
import SeriesCard from '../components/SeriesCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function SeriesScreen() {
    const { colors } = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSeries();
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Series</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {data.length > 0 ? (
                    data.map(s => <SeriesCard key={s.id} series={s} />)
                ) : (
                    <EmptyState message="No series found" />
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    }
});
