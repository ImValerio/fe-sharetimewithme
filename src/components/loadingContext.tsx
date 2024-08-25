import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

// Create the context with default undefined value
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Create a provider component
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Create a custom hook to use the LoadingContext
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
