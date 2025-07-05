"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full px-6 md:px-12 lg:px-[120px] pt-12 md:pt-16 lg:pt-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* Text content */}
          <div className="flex-1 lg:max-w-[800px]">
            <h1 className="text-[40px] md:text-[48px] lg:text-[64px] font-bold font-space-grotesk text-primary-green leading-[1.1] mb-8">
              Tristan Friedberg Rodman
            </h1>
            
            <div className="space-y-6 text-[18px] md:text-[20px] lg:text-[24px] font-inter text-primary-green">
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
          <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[345px] lg:h-[345px] flex-shrink-0 mx-auto lg:mx-0">
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