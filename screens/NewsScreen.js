import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getNews } from '../services/api';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function NewsScreen() {
    const { colors } = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getNews();
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
                <Text style={[styles.title, { color: colors.text }]}>News</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {data.length > 0 ? (
                    data.map(n => <NewsCard key={n.id} news={n} />)
                ) : (
                    <EmptyState message="No news stories found" />
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
