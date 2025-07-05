"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full px-6 md:px-12 lg:px-[7.5rem] pt-12 md:pt-16 lg:pt-20">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* Text content */}
          <div className="flex-1 lg:max-w-[50rem]">
            <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold font-space-grotesk text-primary-green leading-[1.1] mb-8">
              Tristan Friedberg Rodman
            </h1>
            
            <div className="space-y-6 text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] font-inter text-primary-green">
              <p>
                I solve problems for musicians, music lovers, and the organizations
                that support them.
              </p>
              
              <p>
                Currently: re-imagining music creation for the AI era at Splice, finishing a master's
                degree in machine learning at USC Viterbi.
              </p>
              
              <p>Fluent in research, strategy, and code.</p>
            </div>
          </div>
          
          {/* Profile photo */}
          <div className="relative w-[12.5rem] h-[12.5rem] md:w-[17.5rem] md:h-[17.5rem] lg:w-[21.5625rem] lg:h-[21.5625rem] flex-shrink-0 mx-auto lg:mx-0">
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
        </div>
      </div>
    </header>
  );
} 