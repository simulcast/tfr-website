"use client";

import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function Bio() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-[7.5rem] py-8 md:py-12 lg:py-16">
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold font-space-grotesk text-primary-green leading-[1.1] mb-4 md:mb-6 lg:mb-4">
          Tristan Friedberg Rodman
        </h1>
        
        {/* Bio content with inline headshot */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          {/* Text content */}
          <div className="flex-1 lg:max-w-[50rem]">
            <div className="space-y-6 text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] font-inter text-primary-green">
              <p>
              I make products that solve problems for musicians, music lovers, and the organizations that support them.
              </p>
              
              <p>
                Currently: re-imagining music creation for the AI era at Splice, finishing a master&apos;s
                degree in machine learning at USC Viterbi.
              </p>
              
              <p>Fluent in research, strategy, and code.</p>
            </div>
          </div>
          
          {/* Profile photo and social icons */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-[12.5rem] h-[12.5rem] md:w-[17.5rem] md:h-[17.5rem] lg:w-[22rem] lg:h-[22rem] flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-primary-green"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/images/headshot.png"
                  alt="Tristan Friedberg Rodman"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
  );
} 