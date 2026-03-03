import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ChevronLeft } from 'lucide-react-native';
import FantasyTeamBuilder from '../components/intelligence/FantasyTeamBuilder';
import playersData from '../data/players_stats.json';

const FantasyScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('All'); // All, Batting, Bowling

    const filteredPlayers = playersData.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterBy === 'All' ||
            (filterBy === 'Batting' && p.role === 'Batsman') ||
            (filterBy === 'Bowling' && p.role === 'Bowler');
        return matchesSearch && matchesFilter;
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fantasy Assistant</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color="#64748b" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search players..."
                            placeholderTextColor="#64748b"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <View style={styles.filterTabs}>
                    {['All', 'Batting', 'Bowling'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.filterTab, filterBy === tab && styles.activeTab]}
                            onPress={() => setFilterBy(tab)}
                        >
                            <Text style={[styles.tabText, filterBy === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FantasyTeamBuilder
                    players={filteredPlayers}
                    onPlayerPress={(player) => navigation.navigate('PlayerDetails', { playerId: player.id })}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: '#f8fafc',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    searchBarContainer: {
        px: 16,
        margin: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchInput: {
        flex: 1,
        color: '#f8fafc',
        marginLeft: 10,
        fontSize: 16,
    },
    filterTabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 20,
        gap: 8,
    },
    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1e293b',
    },
    activeTab: {
        backgroundColor: '#38bdf8',
    },
    tabText: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#0f172a',
    },
});

export default FantasyScreen;
