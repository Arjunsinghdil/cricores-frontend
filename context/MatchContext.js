import React, { createContext, useState, useEffect, useContext } from 'react';
import { MatchService } from '../services/matchService';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshMatches = async () => {
        const data = await MatchService.getLiveMatches();
        setMatches(data);
        setLoading(false);
    };

    useEffect(() => {
        refreshMatches();
        const interval = setInterval(refreshMatches, 15000); // 15s polling
        return () => clearInterval(interval);
    }, []);

    return (
        <MatchContext.Provider value={{ matches, loading, refreshMatches }}>
            {children}
        </MatchContext.Provider>
    );
};

export const useMatches = () => useContext(MatchContext);
