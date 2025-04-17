import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

interface MyContextType {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const MyContext = createContext<MyContextType | undefined>(undefined);

export const AuthProvider = ({children}:PropsWithChildren) => {
    
    const [isAuth, setIsAuth] = useState(false);

    return (
        <MyContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw '';
    }
    return context;
};

