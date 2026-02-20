import React, { useState } from 'react';
import { GitHubRepo } from '@/lib/github';
import { VscRepo, VscCalendar } from 'react-icons/vsc';

interface RepoListProps {
  repos: GitHubRepo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 5;
  
  const displayedRepos = showAll ? repos : repos.slice(0, initialDisplayCount);
  const hasMoreRepos = repos.length > initialDisplayCount;

  const languageColors: Record<string, string> = {
    TypeScript: 'text-blue-400',
    JavaScript: 'text-yellow-400',
    Python: 'text-green-400',
    HTML: 'text-orange-400',
    CSS: 'text-purple-400',
    Rust: 'text-orange-600',
    Go: 'text-cyan-400',
    Default: 'text-gray-400',
  };

  return (
    <div className="space-y-2">
      {displayedRepos.map((repo) => (
        <div 
          key={repo.name}
          className="repo-entry border border-gruvbox-gray/30 rounded p-3 hover:border-gruvbox-yellow/50 transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <VscRepo className="text-gruvbox-green" />
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gruvbox-yellow hover:text-gruvbox-fg font-bold"
                >
                  {repo.name}
                </a>
              </div>
              
              <p className="text-gruvbox-fg/70 text-xs mt-1">
                {repo.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <span className={`flex items-center gap-1 ${languageColors[repo.language] || languageColors.Default}`}>
                  ● {repo.language}
                </span>
                
                <span className="flex items-center gap-1 text-gruvbox-yellow/70">
                  ★ {repo.stars}
                </span>
                
                <span className="flex items-center gap-1 text-gruvbox-blue/70">
                  ⎇ {repo.forks}
                </span>
                
                <span className="flex items-center gap-1 text-gruvbox-fg/50">
                  <VscCalendar size={12} /> {repo.updated_at}
                </span>
              </div>
              
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {repo.topics.slice(0, 3).map((topic: string) => (
                    <span 
                      key={topic}
                      className="text-xs px-2 py-0.5 bg-gruvbox-bg-light border border-gruvbox-gray/30 rounded-full text-gruvbox-fg/80"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {hasMoreRepos && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center py-2 text-sm text-gruvbox-yellow hover:text-gruvbox-fg border border-gruvbox-gray/30 rounded hover:border-gruvbox-yellow/50 transition-all"
        >
          {showAll ? 'Show less' : `Show ${repos.length - initialDisplayCount} more repositories`}
        </button>
      )}
      
      <div className="text-xs text-gruvbox-fg/50 text-right">
        Total repositories: {repos.length}
      </div>
    </div>
  );
};

export default RepoList;