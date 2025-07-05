"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { loadProjects, shuffleProjects } from "@/lib/projects";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [enableInfiniteScroll, setEnableInfiniteScroll] = useState(true);

  useEffect(() => {
    const loadInitialProjects = async () => {
      const allProjects = await loadProjects();
      setProjects(allProjects);
      setIsLoading(false);
    };
    loadInitialProjects();
  }, []);

  const handleShuffle = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Save current scroll position relative to container width
    const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
    
    const shuffled = shuffleProjects([...projects]);
    setProjects(shuffled);
    
    // Restore scroll position after shuffle
    setTimeout(() => {
      if (container) {
        const newScrollPosition = scrollPercentage * (container.scrollWidth - container.clientWidth);
        container.scrollLeft = newScrollPosition;
      }
    }, 100);
  };

  // Simpler infinite scroll approach
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || projects.length === 0 || !enableInfiniteScroll) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear the previous timeout
      clearTimeout(scrollTimeout);
      isScrolling = true;

      // Set a new timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        
        // Only reposition if we're at the very edges
        if (scrollLeft <= 0) {
          // At the beginning - smoothly scroll forward a bit
          container.scrollTo({
            left: 50,
            behavior: 'smooth'
          });
        } else if (scrollLeft >= maxScroll - 1) {
          // At the end - smoothly scroll back a bit
          container.scrollTo({
            left: maxScroll - 50,
            behavior: 'smooth'
          });
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [projects, enableInfiniteScroll]);

  // Render projects with optional clones at edges for infinite effect
  const renderProjects = () => {
    if (projects.length === 0) return null;
    
    const projectElements = projects.map((project, index) => (
      <motion.div
        key={`${project.id}-main-${index}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="scroll-snap-start"
      >
        <ProjectCard {...project} />
      </motion.div>
    ));

    if (enableInfiniteScroll && projects.length >= 3) {
      // Add clones at the beginning and end for smoother infinite scroll
      const firstClones = projects.slice(0, 2).map((project, index) => (
        <motion.div
          key={`${project.id}-end-clone-${index}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="scroll-snap-start"
        >
          <ProjectCard {...project} />
        </motion.div>
      ));

      const lastClones = projects.slice(-2).map((project, index) => (
        <motion.div
          key={`${project.id}-start-clone-${index}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="scroll-snap-start"
        >
          <ProjectCard {...project} />
        </motion.div>
      ));

      return [...lastClones, ...projectElements, ...firstClones];
    }

    return projectElements;
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-[120px] mt-16 md:mt-20 lg:mt-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold font-space-grotesk text-primary-green">
            Featured work
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShuffle}
              className="text-[24px] md:text-[28px] lg:text-[32px] hover:opacity-70 transition-opacity"
              aria-label="Shuffle projects"
              title="Shuffle projects"
            >
              🔀
            </button>
            <button
              onClick={() => setEnableInfiniteScroll(!enableInfiniteScroll)}
              className="text-[16px] md:text-[18px] font-inter text-primary-green hover:opacity-70 transition-opacity"
              aria-label="Toggle infinite scroll"
              title={enableInfiniteScroll ? "Disable infinite scroll" : "Enable infinite scroll"}
            >
              {enableInfiniteScroll ? "∞" : "—"}
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden -mx-6 md:-mx-12 lg:-mx-[120px] px-6 md:px-12 lg:px-[120px] pb-4 scrollbar-hide"
          style={{
            scrollSnapType: 'x proximity',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-8 w-max">
            {isLoading ? (
              <div className="flex items-center justify-center w-[496px] h-[359px]">
                <span className="text-primary-green">Loading projects...</span>
              </div>
            ) : (
              <AnimatePresence mode="sync">
                {renderProjects()}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 