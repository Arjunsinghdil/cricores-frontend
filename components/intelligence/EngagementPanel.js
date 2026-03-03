import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { MessageSquare, ThumbsUp, Heart, Zap, Award } from 'lucide-react-native';

const EngagementPanel = () => {
    const [pollVoted, setPollVoted] = useState(null);
    const [comments, setComments] = useState([
        { id: '1', user: 'CricFan99', text: 'Kohli is on fire tonight! 🔥', time: '2m ago' },
        { id: '2', user: 'Rahul_07', text: 'That catch was unbelievable 😱', time: '5m ago' }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([{
                id: Date.now().toString(),
                user: 'You',
                text: newComment,
                time: 'Just now'
            }, ...comments]);
            setNewComment('');
        }
    };

    return (
        <View style={styles.container}>
            {/* Poll Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Live Poll</Text>
                <Text style={styles.pollQuestion}>Who will win this match?</Text>
                <View style={styles.pollOptions}>
                    {['India', 'Australia'].map((option, idx) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.pollOption, pollVoted === option && styles.pollOptionActive]}
                            onPress={() => setPollVoted(option)}
                        >
                            <Text style={[styles.pollText, pollVoted === option && styles.pollTextActive]}>{option}</Text>
                            {pollVoted && (
                                <Text style={styles.percentage}>{idx === 0 ? '65%' : '35%'}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Reactions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reaction Wall</Text>
                <View style={styles.reactionRow}>
                    <TouchableOpacity style={styles.reactionBtn}>
                        <Zap size={24} color="#fbbf24" fill={pollVoted ? "#fbbf24" : "transparent"} />
                        <Text style={styles.reactionCount}>1.2k</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reactionBtn}>
                        <Heart size={24} color="#ef4444" />
                        <Text style={styles.reactionCount}>850</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reactionBtn}>
                        <Award size={24} color="#a855f7" />
                        <Text style={styles.reactionCount}>420</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Comments Section */}
            <View style={styles.section}>
                <View style={styles.commentHeader}>
                    <MessageSquare size={20} color="#38bdf8" />
                    <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>Fan Chat</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Say something..."
                        placeholderTextColor="#64748b"
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={handleAddComment}>
                        <Zap size={20} color="#0f172a" />
                    </TouchableOpacity>
                </View>

                {comments.map(comment => (
                    <View key={comment.id} style={styles.comment}>
                        <View style={styles.commentUserRow}>
                            <Text style={styles.commentUser}>{comment.user}</Text>
                            <Text style={styles.commentTime}>{comment.time}</Text>
                        </View>
                        <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginBottom: 32,
        backgroundColor: '#0f172a',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    sectionTitle: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    pollQuestion: {
        color: '#94a3b8',
        fontSize: 14,
        marginBottom: 16,
    },
    pollOptions: {
        gap: 12,
    },
    pollOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    pollOptionActive: {
        borderColor: '#38bdf8',
        backgroundColor: '#1e293b',
    },
    pollText: {
        color: '#f8fafc',
        fontSize: 15,
        fontWeight: '600',
    },
    pollTextActive: {
        color: '#38bdf8',
    },
    percentage: {
        color: '#38bdf8',
        fontWeight: 'bold',
    },
    reactionRow: {
        flexDirection: 'row',
        gap: 20,
    },
    reactionBtn: {
        alignItems: 'center',
        backgroundColor: '#1e293b',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        flex: 1,
    },
    reactionCount: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 4,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        paddingHorizontal: 16,
        color: '#f8fafc',
        height: 48,
    },
    sendBtn: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#38bdf8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    comment: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
    },
    commentUserRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    commentUser: {
        color: '#38bdf8',
        fontSize: 13,
        fontWeight: 'bold',
    },
    commentTime: {
        color: '#475569',
        fontSize: 11,
    },
    commentText: {
        color: '#cbd5e1',
        fontSize: 14,
    },
});

export default EngagementPanel;
