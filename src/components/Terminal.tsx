import React, { useState } from 'react';
import { VscTerminal } from 'react-icons/vsc';

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
}

const Terminal: React.FC<TerminalProps> = ({ children, title = 'anna@localhost:~' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`terminal-container ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="terminal-window border border-gruvbox-gray/30 rounded-lg overflow-hidden bg-gruvbox-bg/95 backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="terminal-header flex items-center justify-between px-4 py-2 bg-gruvbox-bg-light border-b border-gruvbox-gray/30">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-gruvbox-red"></div>
              <div className="w-3 h-3 rounded-full bg-gruvbox-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-gruvbox-green"></div>
            </div>
            <span className="text-gruvbox-fg/70 text-sm font-mono ml-2">
              <VscTerminal className="inline mr-1" />
              {title}
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-gruvbox-fg/70 hover:text-gruvbox-fg text-sm"
            >
              {isFullscreen ? '🗗' : '🗖'}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content p-4 font-mono text-sm text-gruvbox-fg overflow-auto max-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Terminal;