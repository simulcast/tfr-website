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

export interface TagConfig {
  id: string;
  displayName: string;
  tags: string[];
}

export interface TagConfigData {
  tagSequence: TagConfig[];
}

// Cache for tag configuration
let tagConfigCache: TagConfigData | null = null;

// Cache for project data
const projectCache = new Map<string, Project[]>();

export async function loadTagConfig(): Promise<TagConfigData> {
  // Return cached config if available
  if (tagConfigCache) {
    return tagConfigCache;
  }

  try {
    const response = await fetch('/tag-config.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    // Cache the config
    tagConfigCache = config;
    return config;
  } catch (error) {
    console.error('Error loading tag config:', error);
    // Return default config if file can't be loaded
    const defaultConfig = {
      tagSequence: [
        {
          id: "featured-work",
          displayName: "Featured work",
          tags: ["mobile", "music", "AI", "product"]
        },
        {
          id: "all",
          displayName: "Everything",
          tags: []
        }
      ]
    };
    tagConfigCache = defaultConfig;
    return defaultConfig;
  }
}

export function getNextTagConfig(currentIndex: number, tagSequence: TagConfig[]): { index: number; config: TagConfig } {
  const nextIndex = (currentIndex + 1) % tagSequence.length;
  return { index: nextIndex, config: tagSequence[nextIndex] };
}

// Cache for header text generation
const headerTextCache = new Map<string, string>();

export function generateHeaderText(tags: string[], tagSequence: TagConfig[]): string {
  // Create cache key
  const cacheKey = `${tags?.join(',') || 'empty'}-${tagSequence.map(config => config.id).join(',')}`;
  
  // Return cached result if available
  if (headerTextCache.has(cacheKey)) {
    return headerTextCache.get(cacheKey)!;
  }

  let result: string;
  
  if (!tags || tags.length === 0) {
    result = "Everything";
  } else {
    // Find matching tag configs
    const matchingConfigs = tagSequence.filter(config => 
      config.tags.length > 0 && 
      config.tags.some(tag => tags.includes(tag))
    );
    
    if (matchingConfigs.length === 0) {
      // If no exact match, join the tags
      result = tags.join(" + ");
    } else if (matchingConfigs.length === 1) {
      result = matchingConfigs[0].displayName;
    } else {
      // Multiple matches - join display names
      result = matchingConfigs.map(config => config.displayName).join(" + ");
    }
  }
  
  // Cache the result
  headerTextCache.set(cacheKey, result);
  return result;
}

export async function loadProjects(tags?: string, collection?: string): Promise<Project[]> {
  // Create cache key
  const cacheKey = collection ? `collection:${collection}` : tags ? `tags:${tags}` : 'all';
  
  // Return cached data if available
  if (projectCache.has(cacheKey)) {
    return projectCache.get(cacheKey)!;
  }

  try {
    let url = '/api/projects';
    const params = new URLSearchParams();
    
    if (collection) {
      params.append('collection', collection);
    } else if (tags) {
      params.append('tags', tags);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    
    // Cache the results
    projectCache.set(cacheKey, projects);
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