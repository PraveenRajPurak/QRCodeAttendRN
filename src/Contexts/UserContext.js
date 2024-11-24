import { useState, createContext } from 'react';

const userContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    return (
        <userContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserProvider }