import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MyContextType {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
// Создаем контекст с типом ContextType
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Экспортируем хук для удобного использования контекста
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};