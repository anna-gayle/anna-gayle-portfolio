export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated_at: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

export interface GitHubProfile {
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

// Define a type for the raw GitHub API response
interface GitHubApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const data: GitHubApiRepo[] = await response.json();
    
    return data.map((repo) => ({
      name: repo.name,
      description: repo.description || 'No description provided',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updated_at: new Date(repo.updated_at).toLocaleDateString(),
      html_url: repo.html_url,
      homepage: repo.homepage || '',
      topics: repo.topics || [],
    }));
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}

export async function fetchUserProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    return {
      name: data.name || username,
      login: data.login,
      bio: data.bio || 'No bio available',
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      avatar_url: data.avatar_url,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}