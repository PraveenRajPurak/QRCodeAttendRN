import { useState, createContext } from 'react';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {

    const [admin, setAdmin] = useState(null);
    const [adminaccessToken, setAdminAccessToken] = useState(null);

    return (
        <AdminContext.Provider value={{ admin, setAdmin, adminaccessToken, setAdminAccessToken }}>
            {children}
        </AdminContext.Provider>
    )
}

export { AdminContext, AdminProvider }