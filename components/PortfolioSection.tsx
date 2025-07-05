"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { loadProjects } from "@/lib/projects";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialProjects = async () => {
      const allProjects = await loadProjects();
      setProjects(allProjects);
      setIsLoading(false);
    };
    loadInitialProjects();
  }, []);

  return (
    <section className="w-full px-6 md:px-12 lg:px-[120px] mt-16 md:mt-20 lg:mt-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold font-space-grotesk text-primary-green">
            Featured work
          </h2>
        </div>
        <div 
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{
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
              projects.map((project, index) => (
                <div key={project.id || index} className="scroll-snap-start">
                  <ProjectCard {...project} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 