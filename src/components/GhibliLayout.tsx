
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { CloudBackground } from './CloudBackground';

export const GhibliLayout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative background elements */}
      <CloudBackground />
      
      {/* Main content */}
      <div className="relative z-10">
        <NavBar />
        <main className="container px-4 mx-auto py-8 md:py-12">
          <Outlet />
        </main>
        
        <footer className="py-6 text-center text-muted-foreground mt-8">
          <div className="container mx-auto">
            <p>© 2023 Little Life Journal - Inspired by Studio Ghibli</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GhibliLayout;
