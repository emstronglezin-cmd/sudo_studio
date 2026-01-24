import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Editor from './Editor';
import Terminal from './Terminal';
import PapitoChat from './PapitoChat';
import EmulatorPanel from './EmulatorPanel';
import EnvironmentChecker from './EnvironmentChecker';
import SDKInstaller from './SDKInstaller';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideBar />
        <Editor />
        <PapitoChat />
      </div>
      <div className="flex flex-row">
        <Terminal />
        <EmulatorPanel />
      </div>
      <div className="flex flex-row p-4 bg-gray-800 text-white">
        <EnvironmentChecker />
        <SDKInstaller />
      </div>
    </div>
  );
};

export default Layout;