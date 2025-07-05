# TFR Website

A modern, responsive portfolio website for Tristan Friedberg Rodman, showcasing work in music technology and product leadership.

## Features

- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Dynamic Portfolio**: Shuffleable project cards with horizontal scroll
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Performance**: Optimized images, lazy loading, and smooth animations
- **Accessibility**: Semantic HTML and ARIA labels

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image component with Sharp

## Getting Started

### Prerequisites

- Node.js 18+ (required for Next.js 15)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tfr-website.git
cd tfr-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
tfr-website/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Homepage
│   └── globals.css   # Global styles and Tailwind imports
├── components/       # React components
│   ├── Header.tsx    # Header with bio and profile photo
│   ├── PortfolioSection.tsx # Project showcase with shuffle
│   ├── ProjectCard.tsx      # Individual project cards
│   └── Footer.tsx    # Footer with social links
├── lib/              # Utility functions
│   └── projects.ts   # Project data and shuffle logic
├── public/           # Static assets
│   └── images/       # Project images and headshot
└── data/            # Project data (JSON files)
    └── projects/    # Individual project JSON files
```

## Adding Projects

To add a new project, create a JSON file in `data/projects/` with the following structure:

```json
{
  "title": "Project Name",
  "description": "Brief description",
  "year": "2024",
  "image": "/images/projects/project-name.jpg",
  "url": "https://project-url.com",
  "video": "/videos/project-video.mp4",
  "tags": ["tag1", "tag2"]
}
```

Note: Currently using static data in `lib/projects.ts`. In production, implement dynamic loading from JSON files.

## Customization

### Colors
Edit the color palette in `tailwind.config.ts` and `app/globals.css`:
- Primary Green: `#004116`
- Background Green: `#eff6f2`
- Card Gray: `#d9d9d9`
- Card Shadow Green: `#397e58`
- Metadata Gray: `#ebebeb`

### Fonts
- Headings: Space Grotesk (Bold)
- Body: Inter (Regular/Bold)

## Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

Or deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tfr-website)

## License

This project is private and proprietary.
