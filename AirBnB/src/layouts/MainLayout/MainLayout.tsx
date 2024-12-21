import React from 'react'
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default MainLayout