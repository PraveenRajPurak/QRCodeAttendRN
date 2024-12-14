import {useState, createContext} from 'react';

const CollegeContext = createContext();

const CollegeProvider = ({children}) => {
    const [college, setCollege] = useState(null);
    return(
        <CollegeContext.Provider value={{college, setCollege}}>
            {children}
        </CollegeContext.Provider>
    )
}

export {CollegeContext, CollegeProvider};