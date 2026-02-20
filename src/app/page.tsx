'use client'

import { useState, useEffect } from 'react';
import AsciiArt from '@/components/AsciiArt';
import Terminal from '@/components/Terminal';
import RepoList from '@/components/RepoList';
import StatsDisplay from '@/components/StatsDisplay';
import StarGraph from '@/components/StarGraph';
import CommandLine from '@/components/CommandLine';
import StatusLine from '@/components/StatusLine';
import { fetchUserRepos, fetchUserProfile, GitHubRepo, GitHubProfile } from '@/lib/github';

const USERNAME = 'anna-gayle'; 

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string[]>([]);
  const [showRepos, setShowRepos] = useState(true);
  const [activeComponent, setActiveComponent] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const [userRepos, userProfile] = await Promise.all([
        fetchUserRepos(USERNAME),
        fetchUserProfile(USERNAME)
      ]);
      setRepos(userRepos);
      setProfile(userProfile);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const command = trimmedCmd.toLowerCase();
    
    // Handle multi-word commands
    if (command === 'who am i' || command === 'whoami') {
      setOutput([`${profile?.name || USERNAME}`]);
      setShowRepos(false);
      setActiveComponent('');
      return;
    }
    
    // Split into command and args if needed
    const commandParts = command.split(' ');
    const mainCommand = commandParts[0];
    
    switch(mainCommand) {
      case 'help':
        setOutput([
          'Available commands:',
          '  help     - Show this help message',
          '  repos    - Show repository list',
          '  stats    - Show repository statistics',
          '  graph    - Show star graph of top repos',
          '  clear    - Clear the terminal',
          '  profile  - Show user profile',
          '  whoami   - Display current user',
          '  date     - Show current date and time',
        ]);
        setShowRepos(false);
        setActiveComponent('');
        break;
        
      case 'repos':
        setOutput([]);
        setShowRepos(true);
        setActiveComponent('');
        break;
        
      case 'stats':
        setOutput([]);
        setShowRepos(false);
        setActiveComponent('stats');
        break;
        
      case 'graph':
        setOutput([]);
        setShowRepos(false);
        setActiveComponent('graph');
        break;
        
      case 'clear':
        setOutput([]);
        setShowRepos(false);
        setActiveComponent('');
        break;
        
      case 'profile':
        if (profile) {
          setOutput([
            `Name: ${profile.name}`,
            `Username: ${profile.login}`,
            `Bio: ${profile.bio}`,
            `Public Repos: ${profile.public_repos}`,
            `Followers: ${profile.followers}`,
            `Following: ${profile.following}`,
          ]);
        }
        setShowRepos(false);
        setActiveComponent('');
        break;
        
      case 'whoami':
        setOutput([`${profile?.name || USERNAME}`]);
        setShowRepos(false);
        setActiveComponent('');
        break;
        
      case 'date':
        setOutput([new Date().toString()]);
        setShowRepos(false);
        setActiveComponent('');
        break;
        
      default:
        // Show error with full help text
        setOutput([
          `Command not found: ${trimmedCmd}`,
          '',
          'Available commands:',
          '  help     - Show this help message',
          '  repos    - Show repository list',
          '  stats    - Show repository statistics',
          '  graph    - Show star graph of top repos',
          '  clear    - Clear the terminal',
          '  profile  - Show user profile',
          '  whoami   - Display current user',
          '  date     - Show current date and time',
        ]);
        setShowRepos(false);
        setActiveComponent('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gruvbox-bg text-gruvbox-fg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading terminal...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gruvbox-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Terminal title={`anna@${USERNAME}:~`}>
          <AsciiArt className="mb-6 text-gruvbox-fg" />
          
          <div className="space-y-4">
            <div className="text-gruvbox-fg/80">
              Welcome to Anna Gayle&apos;s terminal portfolio. Type <span className="text-gruvbox-yellow">&apos;help&apos;</span> for available commands.
            </div>

            {/* Show repositories */}
            {showRepos && (
              <>
                <div className="text-gruvbox-fg/70 text-sm border-t border-gruvbox-gray/30 pt-4">
                    Latest repositories:
                </div>
                <RepoList repos={repos} />
              </>
            )}

            {/* Show stats component */}
            {activeComponent === 'stats' && !showRepos && (
              <StatsDisplay repos={repos} />
            )}

            {/* Show graph component */}
            {activeComponent === 'graph' && !showRepos && (
              <StarGraph repos={repos} />
            )}

            {/* Show regular text output */}
            {output.length > 0 && !showRepos && activeComponent === '' && (
              <div className="space-y-1 text-gruvbox-fg/90 border-t border-gruvbox-gray/30 pt-4">
                {output.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            )}
            
            <CommandLine onCommand={handleCommand} />
          </div>
          
          {/* Airline-style status line */}
          <StatusLine 
            repos={repos} 
            activeComponent={activeComponent}
            username={USERNAME} 
          />
        </Terminal>
        
        <div className="mt-4 text-gruvbox-fg/50 text-xs text-center">
          <span className="animate-pulse text-gruvbox-green">●</span> System ready. Type &apos;help&apos; for commands.
        </div>
      </div>
    </main>
  );
}