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
}

export async function GET() {
  try {
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
    
    // Sort projects by year (newest first)
    projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json([], { status: 500 });
  }
} 