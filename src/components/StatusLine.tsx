import React from 'react';
import { GitHubRepo } from '@/lib/github';
import { VscRepo, VscStarFull, VscSourceControl } from 'react-icons/vsc';

interface StatusLineProps {
  repos: GitHubRepo[];
  activeComponent?: string;
  username: string;
}

const StatusLine: React.FC<StatusLineProps> = ({ repos, activeComponent, username }) => {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stars, 0);
  // Remove unused totalForks
  
  // Format the active component for display
  const modeDisplay = activeComponent || 'idle';
  
  return (
    <div className="border-t border-gruvbox-gray/30 mt-4 pt-2 text-xs font-mono">
      <div className="flex justify-between items-center text-gruvbox-fg/70">
        {/* Left side - mode/status */}
        <div className="flex space-x-4">
          <span className="flex items-center space-x-1">
            <span className="bg-gruvbox-green text-gruvbox-bg px-1 rounded font-bold">NORMAL</span>
            <span className="text-gruvbox-yellow">{modeDisplay}</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <VscRepo className="text-gruvbox-blue" />
            <span>{repos.length} repos</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <VscStarFull className="text-gruvbox-yellow" />
            <span>{totalStars} stars</span>
          </span>
        </div>
        
        {/* Right side - git info */}
        <div className="flex space-x-4">
          <span className="flex items-center space-x-1">
            <VscSourceControl className="text-gruvbox-green" />
            <span>{username}</span>
          </span>
          
          <span className="flex items-center space-x-1 bg-gruvbox-bg-light px-2 rounded">
            <span className="text-gruvbox-green">●</span>
            <span>connected</span>
          </span>
          
          <span className="text-gruvbox-fg/50">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusLine;