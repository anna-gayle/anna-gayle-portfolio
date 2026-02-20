import React from 'react';
import { GitHubRepo } from '@/lib/github';

interface StatsDisplayProps {
  repos: GitHubRepo[];
}

interface LanguageCount {
  [key: string]: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ repos }) => {
  if (repos.length === 0) return null;

  const totalStars = repos.reduce((acc, repo) => acc + repo.stars, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks, 0);
  const languages = [...new Set(repos.map(r => r.language))].filter(Boolean);
  const mostStarred = repos.reduce((max, repo) => max.stars > repo.stars ? max : repo);
  const mostForked = repos.reduce((max, repo) => max.forks > repo.forks ? max : repo);
  const avgStars = (totalStars / repos.length).toFixed(1);
  
  const langCount: LanguageCount = {};
  repos.forEach(repo => {
    if (repo.language !== 'Unknown') {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  
  const topLanguage = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])[0];

  const statsOutput = [
    'Repository Statistics:',
    `  Total Repos     : ${repos.length}`,
    `  Total Stars     : ${totalStars}`,
    `  Total Forks     : ${totalForks}`,
    `  Average Stars   : ${avgStars}`,
    `  Most Starred    : ${mostStarred.name} (${mostStarred.stars} stars)`,
    `  Most Forked     : ${mostForked.name} (${mostForked.forks} forks)`,
    `  Languages Used  : ${languages.length}`,
    `  Top Language    : ${topLanguage ? topLanguage[0] : 'None'}`,
    '',
    `Type 'repos' to see the full list or 'help' for more commands.`
  ];

  return (
    <div className="font-mono text-gruvbox-fg space-y-1 border-t border-gruvbox-gray/30 pt-4">
      {statsOutput.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default StatsDisplay;