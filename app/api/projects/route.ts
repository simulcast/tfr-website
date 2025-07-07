import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagsParam = searchParams.get('tags');
    const collectionParam = searchParams.get('collection');
    
    // Collection to tags mapping
    const collectionToTags: Record<string, string[]> = {
      'featured-work': ['mobile', 'music', 'AI', 'product'],
      'la-phil': ['la-phil'],
      'engineering-discography': ['engineering-discography'],
      'art-projects': ['webdev', 'silly-little-project'],
      'early-work': ['early-works'],
      'everything': []
    };
    
    // Determine which tags to use
    let tagsToUse = tagsParam;
    if (collectionParam && collectionToTags[collectionParam]) {
      // Collection takes precedence over tags parameter
      tagsToUse = collectionToTags[collectionParam].join('+');
    }
    
    const projectsDir = path.join(process.cwd(), 'data', 'projects');
    
    // Check if the directory exists
    if (!fs.existsSync(projectsDir)) {
      console.warn('Projects directory not found:', projectsDir);
      return NextResponse.json([]);
    }

    // Read all JSON files from the projects directory
    const files = fs.readdirSync(projectsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const projects: Project[] = [];
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const projectData = JSON.parse(fileContent);
        
        // Use filename (without .json extension) as the id
        const id = file.replace('.json', '');
        
        // Validate required fields
        if (!projectData.title || !projectData.description || !projectData.year) {
          console.warn(`Skipping ${file}: missing required fields (title, description, or year)`);
          continue;
        }
        
        // Require either image or video
        if (!projectData.image && !projectData.video) {
          console.warn(`Skipping ${file}: missing both image and video fields`);
          continue;
        }
        
        projects.push({
          id,
          ...projectData
        });
      } catch (error) {
        console.error(`Error loading project from ${file}:`, error);
      }
    }
    
    // If tags parameter is provided, filter and reorder projects
    if (tagsToUse) {
      const requestedTags = tagsToUse.split('+').map(tag => tag.toLowerCase().trim());
      
      // For collections, only show matching projects
      if (collectionParam && collectionToTags[collectionParam]) {
        const matchingProjects: Project[] = [];
        
        projects.forEach(project => {
          const projectTags = project.tags?.map(tag => tag.toLowerCase()) || [];
          const hasMatchingTag = requestedTags.some(tag => projectTags.includes(tag));
          
          if (hasMatchingTag) {
            matchingProjects.push(project);
          }
        });
        
        // Sort matching projects: defaultOrder first (if specified), then chronologically (newest to oldest)
        matchingProjects.sort((a, b) => {
          // If both have defaultOrder, sort by that
          if (a.defaultOrder !== undefined && b.defaultOrder !== undefined) {
            return a.defaultOrder - b.defaultOrder;
          }
          // If only one has defaultOrder, prioritize it
          if (a.defaultOrder !== undefined) return -1;
          if (b.defaultOrder !== undefined) return 1;
          // Otherwise sort chronologically (newest to oldest)
          return parseInt(b.year) - parseInt(a.year);
        });
        
        return NextResponse.json(matchingProjects);
      }
      
      // For custom tag combinations, show matching projects first, then non-matching
      const matchingProjects: Project[] = [];
      const nonMatchingProjects: Project[] = [];
      
      projects.forEach(project => {
        const projectTags = project.tags?.map(tag => tag.toLowerCase()) || [];
        const hasMatchingTag = requestedTags.some(tag => projectTags.includes(tag));
        
        if (hasMatchingTag) {
          matchingProjects.push(project);
        } else {
          nonMatchingProjects.push(project);
        }
      });
      
      // Sort matching projects: defaultOrder first (if specified), then chronologically (newest to oldest)
      matchingProjects.sort((a, b) => {
        // If both have defaultOrder, sort by that
        if (a.defaultOrder !== undefined && b.defaultOrder !== undefined) {
          return a.defaultOrder - b.defaultOrder;
        }
        // If only one has defaultOrder, prioritize it
        if (a.defaultOrder !== undefined) return -1;
        if (b.defaultOrder !== undefined) return 1;
        // Otherwise sort chronologically (newest to oldest)
        return parseInt(b.year) - parseInt(a.year);
      });
      
      // Sort non-matching projects the same way
      nonMatchingProjects.sort((a, b) => {
        if (a.defaultOrder !== undefined && b.defaultOrder !== undefined) {
          return a.defaultOrder - b.defaultOrder;
        }
        if (a.defaultOrder !== undefined) return -1;
        if (b.defaultOrder !== undefined) return 1;
        return parseInt(b.year) - parseInt(a.year);
      });
      
      return NextResponse.json([...matchingProjects, ...nonMatchingProjects]);
    }
    
    // Default sorting: defaultOrder first (if specified), then chronologically (newest to oldest)
    projects.sort((a, b) => {
      // If both have defaultOrder, sort by that
      if (a.defaultOrder !== undefined && b.defaultOrder !== undefined) {
        return a.defaultOrder - b.defaultOrder;
      }
      // If only one has defaultOrder, prioritize it
      if (a.defaultOrder !== undefined) return -1;
      if (b.defaultOrder !== undefined) return 1;
      // Otherwise sort chronologically (newest to oldest)
      return parseInt(b.year) - parseInt(a.year);
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json([], { status: 500 });
  }
} 