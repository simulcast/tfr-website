"use client";

export default function Links() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tristanrodman/' },
    { name: 'GitHub', url: 'https://github.com/tristanrodman' },
    { name: 'Instagram', url: 'https://www.instagram.com/tristanrodman/' },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-3">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[1rem] md:text-[1.125rem] font-inter text-primary-green hover:opacity-70 transition-opacity"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
} 