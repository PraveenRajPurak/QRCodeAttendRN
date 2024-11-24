import { useState, createContext } from 'react';

const ProfContext = createContext();

const ProfProvider = ({ children }) => {

    const [prof, setProf] = useState(null);
    const [profaccessToken, setProfAccessToken] = useState(null);

    return (
        <ProfContext.Provider value={{ prof, setProf, profaccessToken, setProfAccessToken }}>
            {children}
        </ProfContext.Provider>
    )
}

export { ProfContext, ProfProvider }