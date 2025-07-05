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
  video
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
            sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          />
        )}
      </div>
      
      {/* Metadata section */}
      <div className="bg-metadata-gray p-4 flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-[1rem] font-bold font-inter text-primary-green mb-2">
            {title}
          </h3>
          <p 
            className="text-[1rem] font-inter text-primary-green"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <span className="text-[1rem] font-inter text-primary-green whitespace-nowrap">
          {year}
        </span>
      </div>
    </>
  );
  
  return (
    <div className="relative bg-card-gray shadow-[0.75rem_0.75rem_0.5rem_0px_#397e58] hover:shadow-[1rem_1rem_0.75rem_0px_#4a8f6a] border-4 border-card-shadow-green flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[31rem] transition-all duration-300 ease-in-out">
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