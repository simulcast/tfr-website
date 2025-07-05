import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Project {
  id?: string;
  title: string;
  description: string;
  year: string;
  image: string;
  url?: string;
  video?: string;
  tags?: string[];
  defaultOrder?: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagsParam = searchParams.get('tags');
    
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
        if (!projectData.title || !projectData.description || !projectData.year || !projectData.image) {
          console.warn(`Skipping ${file}: missing required fields`);
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
    if (tagsParam) {
      const requestedTags = tagsParam.split('+').map(tag => tag.toLowerCase().trim());
      
      // Separate projects into matching and non-matching
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
      
      // Sort matching projects by defaultOrder, then add non-matching projects
      matchingProjects.sort((a, b) => {
        const orderA = a.defaultOrder ?? parseInt(a.year);
        const orderB = b.defaultOrder ?? parseInt(b.year);
        return orderA - orderB;
      });
      
      nonMatchingProjects.sort((a, b) => {
        const orderA = a.defaultOrder ?? parseInt(a.year);
        const orderB = b.defaultOrder ?? parseInt(b.year);
        return orderA - orderB;
      });
      
      return NextResponse.json([...matchingProjects, ...nonMatchingProjects]);
    }
    
    // Default sorting by defaultOrder (0-indexed), fallback to year if not specified
    projects.sort((a, b) => {
      const orderA = a.defaultOrder ?? parseInt(a.year);
      const orderB = b.defaultOrder ?? parseInt(b.year);
      return orderA - orderB;
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json([], { status: 500 });
  }
} 