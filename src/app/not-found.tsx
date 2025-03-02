import React from 'react';

function NotFound() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black text-white text-[96px] font-mono tracking-tighter relative">
      <div className="relative inline-block animate-bounce" title="404">404</div>
      <div className="relative inline-block animate-bounce" title="error">error</div>
    </div>
  );
}

export default NotFound;