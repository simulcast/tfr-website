"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { loadProjects, shuffleProjects } from "@/lib/projects";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const INITIAL_LOAD = 6;
  const LOAD_MORE = 3;

  useEffect(() => {
    const loadInitialProjects = async () => {
      const allProjects = await loadProjects();
      setProjects(allProjects);
      setDisplayedProjects(allProjects.slice(0, INITIAL_LOAD));
      setHasMore(allProjects.length > INITIAL_LOAD);
      setIsLoading(false);
    };
    loadInitialProjects();
  }, []);

  const handleShuffle = () => {
    const scrollPosition = scrollContainerRef.current?.scrollLeft || 0;
    const shuffled = shuffleProjects([...projects]);
    setProjects(shuffled);
    setDisplayedProjects(shuffled.slice(0, displayedProjects.length));
    
    // Restore scroll position after animation
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }, 100);
  };

  const loadMoreProjects = () => {
    const currentLength = displayedProjects.length;
    const nextProjects = projects.slice(currentLength, currentLength + LOAD_MORE);
    setDisplayedProjects([...displayedProjects, ...nextProjects]);
    setHasMore(currentLength + LOAD_MORE < projects.length);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !hasMore) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        loadMoreProjects();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [displayedProjects, hasMore, projects]);

  return (
    <section className="w-full px-6 md:px-12 lg:px-[120px] mt-16 md:mt-20 lg:mt-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold font-space-grotesk text-primary-green">
            Featured work
          </h2>
          <button
            onClick={handleShuffle}
            className="text-[24px] md:text-[28px] lg:text-[32px] hover:opacity-70 transition-opacity"
            aria-label="Shuffle projects"
          >
            🔀
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden -mx-6 md:-mx-12 lg:-mx-[120px] px-6 md:px-12 lg:px-[120px] pb-4 scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-8 w-max">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <div className="flex items-center justify-center w-[496px] h-[359px]">
                <span className="text-primary-green">Loading projects...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 