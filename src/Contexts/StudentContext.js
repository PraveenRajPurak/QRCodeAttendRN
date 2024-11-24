import { useState, createContext } from 'react';

const studentContext = createContext();

const StudentProvider = ({ children }) => {

    const [student, setStudent] = useState(null);

    return (
        <studentContext.Provider value={{ student, setStudent}}>
            {children}
        </studentContext.Provider>
    )
}

export { studentContext, StudentProvider }