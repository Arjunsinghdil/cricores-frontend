import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getVenueById = async (venueId) => {
    try {
        const docRef = doc(db, 'venues', venueId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching venue:", error);
        return null;
    }
};

export const getMatchById = async (matchId) => {
    try {
        const docRef = doc(db, 'matches', matchId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching match:", error);
        return null;
    }
};

export const getMatchStats = async (matchId) => {
    try {
        const docRef = doc(db, 'matchStats', matchId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching match stats:", error);
        return null;
    }
};

export const subscribeToMatchStats = (matchId, callback) => {
    const docRef = doc(db, 'matchStats', matchId);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
    });
};
