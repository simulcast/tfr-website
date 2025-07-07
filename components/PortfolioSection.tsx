"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { loadProjects, loadTagConfig, getNextTagConfig, generateHeaderText, Project, TagConfig } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioSectionRef {
  resetToFirstCategory: () => void;
}

const PortfolioSection = forwardRef<PortfolioSectionRef>((props, ref) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeState, setFadeState] = useState<'visible' | 'hidden'>('visible');
  const [tagConfig, setTagConfig] = useState<TagConfig[]>([]);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentHeaderText, setCurrentHeaderText] = useState("Featured work");
  const [scrambledText, setScrambledText] = useState("Featured work");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const searchParams = useSearchParams();

  // Scramble text function
  const scrambleText = (text: string): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return text.split('').map(char => {
      if (char === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
  };

  // Reset function for parent component
  const resetToFirstCategory = useCallback(() => {
    setCurrentTagIndex(0);
    setIsInitialLoad(true);
    setScrambledText("Featured work");
  }, []);

  // Expose reset function to parent component
  useImperativeHandle(ref, () => ({
    resetToFirstCategory
  }));

  // Load tag configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await loadTagConfig();
      setTagConfig(config.tagSequence);
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const loadInitialProjects = async () => {
      const tags = searchParams.get('tags');
      const collection = searchParams.get('collection');
      
      if ((tags || collection) && isInitialLoad) {
        // URL has custom tags or collection - load those projects and set header
        const allProjects = await loadProjects(tags || undefined, collection || undefined);
        setProjects(allProjects);
        
        if (collection) {
          // Find the collection config to get display name
          const collectionConfig = tagConfig.find(config => config.id === collection);
          if (collectionConfig) {
            const displayName = collectionConfig.displayName;
            setCurrentHeaderText(displayName);
            setScrambledText(displayName);
            // Set current index to this collection
            const index = tagConfig.findIndex(config => config.id === collection);
            setCurrentTagIndex(index >= 0 ? index : 0);
          }
        } else if (tags) {
          // Generate header text from URL tags
          const urlTags = tags.split('+').map(tag => tag.trim());
          const headerText = generateHeaderText(urlTags, tagConfig);
          setCurrentHeaderText(headerText);
          setScrambledText(headerText);
          // Reset to "Featured work" for next shuffle
          setCurrentTagIndex(0);
        }
              } else {
          // No URL params or not initial load - use current tag config
          const currentConfig = tagConfig[currentTagIndex];
          if (currentConfig) {
            const allProjects = await loadProjects(undefined, currentConfig.id);
            setProjects(allProjects);
            setCurrentHeaderText(currentConfig.displayName);
            setScrambledText(currentConfig.displayName);
          }
        }
      
      setIsLoading(false);
      setIsInitialLoad(false);
    };
    
    if (tagConfig.length > 0) {
      loadInitialProjects();
    }
  }, [searchParams, tagConfig, currentTagIndex, isInitialLoad]);

  // Tag-based shuffle with scramble animation
  const shuffleProjects = useCallback(async () => {
    if (tagConfig.length === 0) return;
    
    setFadeState('hidden');
    
    // Get the next category
    const { index: nextIndex, config: nextConfig } = getNextTagConfig(currentTagIndex, tagConfig);
    const nextTitle = nextConfig.displayName;
    
    // Start scramble animation
    let scrambleInterval: NodeJS.Timeout;
    let resolveInterval: NodeJS.Timeout;
    
    // Scramble phase (300ms)
    let scrambleCount = 0;
    scrambleInterval = setInterval(() => {
      setScrambledText(scrambleText(nextTitle));
      scrambleCount++;
      if (scrambleCount >= 6) { // Scramble 6 times over 300ms
        clearInterval(scrambleInterval);
      }
    }, 50);
    
    // Load new projects
    const newProjects = await loadProjects(undefined, nextConfig.id);
    setProjects(newProjects);
    setCurrentTagIndex(nextIndex);
    setCurrentHeaderText(nextTitle);
    
    // Resolve phase (300ms)
    setTimeout(() => {
      clearInterval(scrambleInterval);
      
      // Gradually resolve the text
      const finalText = nextTitle;
      const chars = finalText.split('');
      let resolvedIndex = 0;
      
      resolveInterval = setInterval(() => {
        if (resolvedIndex >= chars.length) {
          clearInterval(resolveInterval);
          setScrambledText(finalText);
          setFadeState('visible');
          return;
        }
        
        const resolvedChars = chars.slice(0, resolvedIndex + 1);
        const remainingChars = chars.slice(resolvedIndex + 1).map(() => 
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'[Math.floor(Math.random() * 70)]
        );
        
        setScrambledText([...resolvedChars, ...remainingChars].join(''));
        resolvedIndex++;
      }, 300 / chars.length); // Distribute 300ms across all characters
    }, 300);
  }, [tagConfig, currentTagIndex, scrambleText]);

  return (
    <section className="w-full px-6 md:px-12 lg:px-[7.5rem] pt-4 md:pt-6 lg:pt-4 pb-8 md:pb-12 lg:pb-16">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
                                  <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={shuffleProjects}
                aria-label="Shuffle projects"
                className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] focus:outline-none hover:scale-110 transition-transform"
              >
                🔀
              </button>
              <h2 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold font-space-grotesk text-primary-green">
                {scrambledText}
              </h2>
            </div>
        </div>
        
        {/* Mobile: vertical list with shuffle animation */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            {fadeState === 'visible' && (
              <motion.div
                key={projects.map(p => p.id || p.title).join(',')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full h-[22.4375rem]">
                    <span className="text-primary-green">Loading projects...</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {projects.map((project, index) => (
                      <ProjectCard key={project.id || index} {...project} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Tablet and up: horizontal carousel with shuffle animation */}
        <div 
          className="overflow-x-auto pb-8 scrollbar-hide -mx-6 md:-mx-12 lg:-mx-[7.5rem] hidden md:block"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {fadeState === 'visible' && (
              <motion.div
                key={projects.map(p => p.id || p.title).join(',')}
                className="flex w-max items-stretch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Left spacer to align first card with section header */}
                <div className="shrink-0 w-6 md:w-12 lg:w-[7.5rem]" aria-hidden="true" />
                {isLoading ? (
                  <div className="flex items-center justify-center w-[31rem] h-[22.4375rem]">
                    <span className="text-primary-green">Loading projects...</span>
                  </div>
                ) : (
                  projects.map((project, index) => {
                    const isLast = index === projects.length - 1;
                    return (
                      <div
                        key={project.id || index}
                        className={`scroll-snap-start${index !== 0 ? ' ml-8' : ''}${isLast ? ' md:mr-8' : ''}`}
                      >
                        <ProjectCard {...project} />
                      </div>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

PortfolioSection.displayName = 'PortfolioSection';

export default PortfolioSection; 