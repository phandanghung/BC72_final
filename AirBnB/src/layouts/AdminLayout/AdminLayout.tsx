import React from 'react';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import Header from './components/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex justify-center py-3">
        <Sidebar />
        <Box
          component="main"
          className=""
          sx={{ backgroundColor: 'transparent' }}
        >
            {children}

        </Box>
      </div>
    </div>
  );
};

export default AdminLayout;
