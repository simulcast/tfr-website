"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { loadProjects, Project } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeState, setFadeState] = useState<'visible' | 'hidden'>('visible');
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadInitialProjects = async () => {
      const tags = searchParams.get('tags');
      const allProjects = await loadProjects(tags || undefined);
      setProjects(allProjects);
      setIsLoading(false);
    };
    loadInitialProjects();
  }, [searchParams]);

  // Fisher-Yates shuffle with fade
  function shuffleProjects() {
    setFadeState('hidden');
    setTimeout(() => {
      setProjects((prevProjects) => {
        const shuffled = [...prevProjects];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
      setFadeState('visible');
    }, 500);
  }

  return (
    <section className="w-full px-6 md:px-12 lg:px-[7.5rem] pt-4 md:pt-6 lg:pt-4 pb-8 md:pb-12 lg:pb-16">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold font-space-grotesk text-primary-green">
              Featured work
            </h2>
            <button
              type="button"
              onClick={shuffleProjects}
              aria-label="Shuffle projects"
              className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] focus:outline-none hover:scale-110 transition-transform"
            >
              🔀
            </button>
          </div>
        </div>
        {/* Mobile: vertical list of 3 projects */}
        <div className="block md:hidden">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-[22.4375rem]">
              <span className="text-primary-green">Loading projects...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <ProjectCard key={project.id || index} {...project} />
              ))}
            </div>
          )}
        </div>
        {/* Tablet and up: horizontal carousel */}
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
                transition={{ duration: 0.5 }}
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
} 