# anna-gayle · terminal

A terminal-styled GitHub portfolio with a Gruvbox theme. View your repositories in a fancy command-line interface.

```
 █████╗ ███╗   ██╗███╗   ██╗ █████╗       ██████╗  █████╗ ██╗   ██╗██╗     ███████╗
██╔══██╗████╗  ██║████╗  ██║██╔══██╗      ██╔════╝ ██╔══██╗╚██╗ ██╔╝██║     ██╔════╝
███████║██╔██╗ ██║██╔██╗ ██║███████║█████╗██║  ███╗███████║ ╚████╔╝ ██║     █████╗  
██╔══██║██║╚██╗██║██║╚██╗██║██╔══██║╚════╝██║   ██║██╔══██║  ╚██╔╝  ██║     ██╔══╝  
██║  ██║██║ ╚████║██║ ╚████║██║  ██║      ╚██████╔╝██║  ██║   ██║   ███████╗███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝       ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
```

## Features

- Terminal-style interface with authentic command-line feel
- Real-time GitHub repository fetching via public API
- Interactive command system with multiple commands
- Gruvbox dark theme for that riced terminal aesthetic
- Responsive design works on desktop and mobile
- Pagination for repository list (handles unlimited repos)
- Static export for easy GitHub Pages deployment

## Available Commands

Type any of these commands in the terminal prompt:

- `help` - Show available commands
- `repos` - Display repository list
- `stats` - Show repository statistics
- `graph` - Display star graph of top repos
- `profile` - View GitHub profile information
- `whoami` - Display current user
- `date` - Show current date and time
- `clear` - Clear the terminal output

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- GitHub REST API
- Gruvbox Theme

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A GitHub account

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/anna-gayle-terminal.git
cd anna-gayle-terminal
```

2. Install dependencies
```bash
npm install
```

3. Update your GitHub username
   
   Open `src/app/page.tsx` and change:
```typescript
const USERNAME = 'your-github-username';
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
anna-gayle-terminal/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── AsciiArt.tsx   # ASCII art display
│   │   ├── CommandLine.tsx # Interactive prompt
│   │   ├── RepoList.tsx   # Repository list with pagination
│   │   ├── StatsDisplay.tsx # Statistics display
│   │   ├── StarGraph.tsx  # Star graph visualization
│   │   └── Terminal.tsx   # Terminal window wrapper
│   └── lib/               # Utilities
│       └── github.ts      # GitHub API functions
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## Deployment to GitHub Pages

### Option 1: Deploy manually

```bash
# Build the project
npm run build

# Export static files
npm run export

# Create .nojekyll file (Windows)
mkdir out
type nul > out\.nojekyll

# Deploy using gh-pages
npx gh-pages -d out -b gh-pages
```

### Option 2: Automatic with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

After deployment, your site will be available at:
`https://your-username.github.io/anna-gayle-terminal`

## Customization

### Changing the Theme

Edit the color variables in `src/app/globals.css`:

```css
@theme {
  --color-gruvbox-bg: #282828;
  --color-gruvbox-fg: #ebdbb2;
  --color-gruvbox-green: #98971a;
  --color-gruvbox-yellow: #d79921;
  /* ... */
}
```

### Modifying the ASCII Art

Update the art in `src/components/AsciiArt.tsx` with your own design.

### Adding New Commands

Extend the `handleCommand` function in `src/app/page.tsx`:

```typescript
case 'your-command':
  setOutput(['Your custom output']);
  setShowRepos(false);
  setActiveComponent('');
  break;
```

## Future-Proofing

The repository list includes pagination that:
- Shows 5 repositories initially
- Displays a "Show more" button when you have more than 5 repos
- Scales gracefully as your GitHub profile grows

## Troubleshooting

### API Rate Limits

The GitHub API allows 60 requests per hour without authentication. If you exceed this, wait an hour or add a GitHub token:

1. Create a token at [github.com/settings/tokens](https://github.com/settings/tokens)
2. Add it to `.env.local`:
```
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

### Build Errors

If you encounter build errors, try:

```bash
# Clear Next.js cache
rm -rf .next out

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## License

MIT

## Acknowledgments

- Inspired by r/unixporn terminal aesthetics
- Built with Next.js and Tailwind CSS
- Gruvbox theme by morhetz
