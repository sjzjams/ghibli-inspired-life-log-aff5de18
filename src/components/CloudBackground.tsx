
import React from 'react';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top left cloud */}
      <div className="cloud-decoration top-[10%] left-[5%]"></div>
      
      {/* Top right cloud */}
      <div className="cloud-decoration top-[15%] right-[10%] w-32 h-20" 
           style={{ animationDelay: '-2s' }}></div>
      
      {/* Middle left cloud */}
      <div className="cloud-decoration top-[40%] left-[15%] w-28 h-18"
           style={{ animationDelay: '-4s' }}></div>
           
      {/* Bottom right cloud */}
      <div className="cloud-decoration top-[70%] right-[5%] w-20 h-14"
           style={{ animationDelay: '-1s' }}></div>
           
      {/* Bottom left cloud */}
      <div className="cloud-decoration top-[85%] left-[20%] w-24 h-16"
           style={{ animationDelay: '-3.5s' }}></div>
           
      {/* Top center leaf */}
      <div className="leaf-decoration top-[25%] left-[45%]"
           style={{ animationDelay: '-1s' }}></div>
           
      {/* Bottom right leaf */}
      <div className="leaf-decoration top-[60%] right-[15%] w-10 h-14"
           style={{ animationDelay: '-3s' }}></div>
    </div>
  );
};

export default CloudBackground;
