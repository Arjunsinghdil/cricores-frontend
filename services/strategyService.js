import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    where,
    getDoc,
    setDoc,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';
import { db, auth } from './firebase';

// Room Management
export const createRoom = async (roomData) => {
    const roomRef = await addDoc(collection(db, 'rooms'), {
        ...roomData,
        createdAt: serverTimestamp(),
        status: 'waiting',
        currentTurn: 0,
    });
    return roomRef.id;
};

export const joinRoom = async (roomCode, userId) => {
    const q = query(collection(db, 'rooms'), where('roomCode', '==', roomCode));
    const querySnapshot = await getDoc(q);

    if (querySnapshot.exists()) {
        const roomId = querySnapshot.id;
        await setDoc(doc(db, 'rooms', roomId, 'members', userId), {
            joinedAt: serverTimestamp(),
            rating: 1200, // Starting CMR for the room
            streak: 0,
            accuracy: 0
        });
        return roomId;
    }
    throw new Error('Room not found');
};

// Real-time Decision Moments
export const subscribeToDecisions = (roomId, callback) => {
    const q = query(
        collection(db, 'rooms', roomId, 'decisions'),
        orderBy('createdAt', 'desc'),
    );

    return onSnapshot(q, (snapshot) => {
        const decisions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(decisions[0]); // Return the latest active decision
    });
};

// Decision Submission
export const submitDecision = async (roomId, decisionId, userId, choice, confidence) => {
    const decisionRef = doc(db, 'rooms', roomId, 'decisions', decisionId, 'userResponses', userId);
    await setDoc(decisionRef, {
        choice,
        confidence,
        timestamp: serverTimestamp()
    });
};

// Rating Logic Utility
export const calculateRatingChange = (isCorrect, confidence, isPressureMoment) => {
    let base = isCorrect ? 10 : -8;

    // Confidence Multiplier
    const multiMap = { 'Low': 1, 'Medium': 1.2, 'High': 2 };
    const multiplier = multiMap[confidence] || 1;

    let change = base * multiplier;

    // Pressure Bonus
    if (isCorrect && isPressureMoment) {
        change *= 2;
    }

    return Math.round(change);
};
