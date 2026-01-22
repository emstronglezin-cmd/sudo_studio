import React from 'react';

const SideBar = () => {
  return (
    <div className="bg-[#252526] text-[#d4d4d4] w-60 h-full border-r border-[#3c3c3c]">
      <div className="p-4">Explorer</div>
      <ul className="space-y-2 px-4">
        <li className="cursor-pointer">File 1</li>
        <li className="cursor-pointer">File 2</li>
        <li className="cursor-pointer">File 3</li>
      </ul>
    </div>
  );
};

export default SideBar;