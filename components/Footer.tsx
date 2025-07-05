"use client";

export default function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tristanrodman/' },
    { name: 'GitHub', url: 'https://github.com/tristanrodman' },
    { name: 'Instagram', url: 'https://www.instagram.com/tristanrodman/' },
  ];

  return (
    <footer className="w-full px-6 md:px-12 lg:px-[7.5rem] py-16 md:py-20 lg:py-24 mt-16 md:mt-20 lg:mt-24">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
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
      </div>
    </footer>
  );
} 