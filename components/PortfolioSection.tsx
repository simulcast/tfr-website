"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { loadProjects, Project } from "@/lib/projects";

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <section className="w-full px-6 md:px-12 lg:px-[7.5rem] py-6 md:py-8 lg:py-10">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold font-space-grotesk text-primary-green">
            Featured work
          </h2>
        </div>
        <div 
          className="overflow-x-auto pb-8 scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-8 w-max">
            {isLoading ? (
              <div className="flex items-center justify-center w-[31rem] h-[22.4375rem]">
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