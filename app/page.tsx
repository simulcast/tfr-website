"use client";

import Bio from "@/components/Bio";
import PortfolioSection from "@/components/PortfolioSection";
import { Suspense, useRef, useCallback } from "react";

export default function Home() {
  const portfolioRef = useRef<{ resetToFirstCategory: () => void }>(null);

  const handleTitleClick = useCallback(() => {
    if (portfolioRef.current) {
      portfolioRef.current.resetToFirstCategory();
    }
  }, []);

  return (
    <main className="min-h-screen bg-background-green">
      <Bio onTitleClick={handleTitleClick} />
      <Suspense fallback={
        <section className="w-full px-6 md:px-12 lg:px-[7.5rem] mt-12 md:mt-16 lg:mt-20">
          <div className="max-w-[90rem] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-bold font-space-grotesk text-primary-green">
                Featured work
              </h2>
            </div>
            <div className="flex items-center justify-center w-[31rem] h-[22.4375rem]">
              <span className="text-primary-green">Loading projects...</span>
            </div>
          </div>
        </section>
      }>
        <PortfolioSection ref={portfolioRef} />
      </Suspense>
    </main>
  );
}
