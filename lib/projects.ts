export interface Project {
  id?: string;
  title: string;
  description: string;
  year: string;
  image?: string;
  url?: string;
  video?: string;
  tags?: string[];
  defaultOrder?: number;
}

export async function loadProjects(tags?: string): Promise<Project[]> {
  try {
    const url = tags ? `/api/projects?tags=${encodeURIComponent(tags)}` : '/api/projects';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
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