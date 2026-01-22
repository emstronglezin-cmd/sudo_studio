import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] h-8 flex items-center px-4 border-b border-[#3c3c3c]">
      <span className="mr-4 cursor-pointer">File</span>
      <span className="mr-4 cursor-pointer">Edit</span>
      <span className="mr-4 cursor-pointer">View</span>
      <span className="mr-4 cursor-pointer">Run</span>
      <span className="cursor-pointer">Papito</span>
    </div>
  );
};

export default TopBar;