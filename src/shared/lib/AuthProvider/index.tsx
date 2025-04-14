import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

interface MyContextType {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
// Создаем контекст с типом ContextType
export const MyContext = createContext<MyContextType | undefined>(undefined);

export const AuthProvider = ({children}:PropsWithChildren) => {
    
    const [isAuth, setIsAuth] = useState(false);

    return (
        <MyContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </MyContext.Provider>
    )
}

// Экспортируем хук для удобного использования контекста
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw '';
    }
    return context;
};

