import React from 'react';
import { GitHubRepo } from '@/lib/github';

interface StarGraphProps {
  repos: GitHubRepo[];
}

const StarGraph: React.FC<StarGraphProps> = ({ repos }) => {
  if (repos.length === 0) return null;

  const sortedByStars = [...repos].sort((a, b) => b.stars - a.stars).slice(0, 5);

  const graphOutput = [
    'Top Starred Repositories:',
    ...sortedByStars.map((repo, i) => 
      `  ${i + 1}. ${repo.name} - ${repo.stars} stars`
    ),
    '',
    `Type 'repos' to see the full list or 'help' for more commands.`
  ];

  return (
    <div className="font-mono text-gruvbox-fg space-y-1 border-t border-gruvbox-gray/30 pt-4">
      {graphOutput.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default StarGraph;