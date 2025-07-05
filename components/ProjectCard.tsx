"use client";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  year: string;
  image: string;
  url?: string;
  video?: string;
  tags?: string[];
}

// Helper function to parse video URLs
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | null; id: string | null } {
  // YouTube URL patterns
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }
  
  // Vimeo URL patterns
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] };
  }
  
  return { platform: null, id: null };
}

export default function ProjectCard({ 
  title, 
  description, 
  year, 
  image, 
  url,
  video,
  tags 
}: ProjectCardProps) {
  const videoInfo = video ? parseVideoUrl(video) : null;
  
  const CardContent = () => (
    <>
      {/* Project image/video */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
        {video && videoInfo?.platform ? (
          videoInfo.platform === 'youtube' ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoInfo.id}?modestbranding=1&rel=0`}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <iframe
              src={`https://player.vimeo.com/video/${videoInfo.id}?title=0&byline=0&portrait=0`}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      
      {/* Metadata section */}
      <div className="bg-metadata-gray p-4 flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-[16px] font-bold font-inter text-primary-green mb-2">
            {title}
          </h3>
          <p className="text-[16px] font-inter text-primary-green">
            {description}
          </p>
        </div>
        <span className="text-[16px] font-inter text-primary-green whitespace-nowrap">
          {year}
        </span>
      </div>
    </>
  );
  
  return (
    <div className="relative bg-card-gray shadow-[12px_12px_8px_0px_#397e58] border-4 border-card-shadow-green flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[496px]">
      {url ? (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <CardContent />
        </a>
      ) : (
        <CardContent />
      )}
    </div>
  );
} 