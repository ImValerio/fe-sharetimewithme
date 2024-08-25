import React from 'react'
import { useLoading } from '@/components/loadingContext'
import Loader from './loader';

interface AppProps {
    children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
    const { isLoading } = useLoading();

    if (!isLoading) {
        return <>{children}</>;
    }

    return <Loader />;
}

export default App