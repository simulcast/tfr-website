export interface Project {
  id?: string;
  title: string;
  description: string;
  year: string;
  image: string;
  url?: string;
  video?: string;
  tags?: string[];
}

// For now, we'll use static data. In production, this would be loaded from a CMS or API
const projectsData: Project[] = [
  {
    id: "canibringwinetothebowl",
    title: "canibringwinetothebowl.com",
    description: "A reliable answer to a difficult question",
    year: "2023",
    image: "/images/projects/canibringwinetothebowl.jpg",
    url: "https://canibringwinetothebowl.com"
  },
  {
    id: "splice-mic",
    title: "Splice Mic",
    description: "Voice to verse — anywhere",
    year: "2025",
    image: "/images/projects/splice-mic.jpg",
    video: "https://www.youtube.com/watch?v=OYkre6HtYPk4"
  },
  {
    id: "baseball-scores",
    title: "Baseball Scores",
    description: "Ambient soundtracks for the national pastime",
    year: "2025",
    image: "/images/projects/baseball-scores.jpg"
  },
  {
    id: "splice-skills",
    title: "Splice Skills",
    description: "Learn music production from the pros",
    year: "2024",
    image: "/images/projects/splice-skills.jpg",
    url: "https://splice.com/skills"
  },
  {
    id: "music-ai-research",
    title: "Music AI Research",
    description: "Exploring the intersection of ML and music creation",
    year: "2024",
    image: "/images/projects/music-ai-research.jpg"
  },
  {
    id: "concert-companion",
    title: "Concert Companion",
    description: "Real-time setlist tracking for live shows",
    year: "2023",
    image: "/images/projects/concert-companion.jpg"
  },
  {
    id: "sound-garden",
    title: "Sound Garden",
    description: "Interactive audio installation for public spaces",
    year: "2022",
    image: "/images/projects/sound-garden.jpg"
  },
  {
    id: "beat-mapper",
    title: "Beat Mapper",
    description: "Visual rhythm analysis for DJs",
    year: "2022",
    image: "/images/projects/beat-mapper.jpg"
  }
];

export async function loadProjects(): Promise<Project[]> {
  // Simulate async loading
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...projectsData]);
    }, 100);
  });
}

// Fisher-Yates shuffle algorithm for true randomization
export function shuffleProjects(projects: Project[]): Project[] {
  const shuffled = [...projects];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
} 