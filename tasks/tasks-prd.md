## Relevant Files

- `app/page.tsx` - Main homepage component containing header, portfolio section, and footer
- `app/page.test.tsx` - Unit tests for the homepage component
- `app/layout.tsx` - Root layout with metadata and global styles
- `app/layout.test.tsx` - Unit tests for layout component
- `components/` - Directory for all React UI components
- `components/Header.tsx` - Header section with name, photo, tagline, and contact info
- `components/Header.test.tsx` - Unit tests for Header component
- `components/PortfolioSection.tsx` - Portfolio section with shuffle functionality and project cards
- `components/PortfolioSection.test.tsx` - Unit tests for PortfolioSection component
- `components/ProjectCard.tsx` - Individual project card component
- `components/ProjectCard.test.tsx` - Unit tests for ProjectCard component
- `components/Footer.tsx` - Footer with social links
- `components/Footer.test.tsx` - Unit tests for Footer component
- `lib/` - Directory for utility functions and business logic
- `lib/projects.ts` - Utility functions for loading and managing project data
- `lib/projects.test.ts` - Unit tests for project utilities
- `data/projects/` - Directory containing project JSON files for portfolio
- `public/images/` - Directory for project images and assets

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Brand & Design System Reference

- **Color Palette:** Use the following CSS variables and hex codes from `tfr-identity-guidelines.md`:
  - Primary Green: `#004116` (`--color-primary-green`)
  - Background Green: `#eff6f2` (`--color-background-green`)
  - Card Gray: `#d9d9d9` (`--color-card-gray`)
  - Card Shadow Green: `#397e58` (`--color-card-shadow-green`)
  - Metadata Gray: `#ebebeb` (`--color-metadata-gray`)
- **Typography:**
  - Headings: `Space Grotesk, Bold, sans-serif` (e.g., 64px for main, 32px for section)
  - Body: `Inter, Regular, sans-serif` (24px main, 16px metadata)
  - Metadata/Highlights: `Inter, Bold, sans-serif`
- **Mobile Responsiveness:**
  - All components and layouts must be mobile-first and fully responsive, matching Figma wireframes for mobile, tablet, and desktop breakpoints.
  - Use Tailwind CSS breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px).
  - Ensure touch/swipe support and accessible tap targets on mobile.

## Tasks

- [x] 1.0 Set up project foundation and development environment
  - [x] 1.1 Initialize Next.js project with TypeScript support using `npx create-next-app@latest tfr-website --typescript --tailwind --app`
  - [x] 1.2 Install additional dependencies: `framer-motion` for animations, `sharp` for image optimization
  - [x] 1.3 Set up project structure: create `/components`, `/lib`, `/data/projects` directories
  - [x] 1.4 Configure Tailwind CSS with custom theme:
    - Import and use Space Grotesk and Inter fonts as per identity guidelines
    - Add color palette from identity guidelines as Tailwind custom colors
    - Set up breakpoints for mobile, tablet, desktop
  - [ ] 1.5 Set up Jest and React Testing Library for unit testing
  - [x] 1.6 Create sample project JSON files in `/data/projects/` with required fields (title, image, year, description) and optional fields (url, video, tags)
  - [x] 1.7 Add ESLint and Prettier configuration for code consistency

- [x] 2.0 Implement core layout structure and responsive design
  - [x] 2.1 Create `app/layout.tsx` with global styles, viewport meta tag, and font imports
    - Use background and text colors from identity guidelines
    - Ensure layout is mobile-first and adapts to all breakpoints
  - [x] 2.2 Build `components/Header.tsx`:
    - Circular profile photo with green border overlay
    - Name "Tristan Friedberg Rodman" in Space Grotesk, bold, correct size for each breakpoint
    - Responsive spacing and alignment for mobile, tablet, desktop
  - [x] 2.3 Add tagline, current status, and skills line to Header component with correct typography and responsive sizing
  - [x] 2.4 Implement plain text email display in Header (no mailto link as per Figma)
  - [x] 2.5 Create `components/Footer.tsx` with LinkedIn, GitHub, and Instagram links that open in new tabs
    - Ensure icons/links are accessible and touch-friendly on mobile
  - [x] 2.6 Set up responsive breakpoints in Tailwind config: mobile (<768px), tablet (768px-1024px), desktop (>1024px)
  - [x] 2.7 Implement responsive grid system for the main page layout with proper spacing and max-width constraints
    - Use Figma wireframe as reference for spacing and alignment at each breakpoint
  - [ ] 2.8 Write unit tests for Header and Footer components

- [x] 3.0 Build project cards and portfolio display system
  - [x] 3.1 Create `lib/projects.ts` with functions to load and parse JSON files from `/data/projects/` directory
  - [x] 3.2 Build `components/ProjectCard.tsx`:
    - Match Figma design: 16:9 image ratio, title, year, description, subtle shadow (use Card Shadow Green)
    - Use Card Gray for background, correct font and color for text
    - Responsive card sizing: 1 per row (mobile), 2-3 (tablet), 3-4 (desktop)
  - [x] 3.3 Implement conditional rendering for project URL (make title clickable if URL exists)
  - [x] 3.4 Create `components/PortfolioSection.tsx` with "Featured work" header and shuffle button (🔀 icon)
    - Ensure section header uses correct font, size, and color
  - [x] 3.5 Implement horizontal scroll container with CSS scroll-snap for smooth scrolling
    - Ensure scroll works on mobile (touch/swipe) and desktop (mouse/trackpad)
  - [x] 3.6 Add touch/swipe support for mobile devices using CSS overflow-x and -webkit-overflow-scrolling
  - [x] 3.7 Configure responsive display: 1 card (mobile), 2-3 cards (tablet), 3-4 cards (desktop)
  - [x] 3.8 Implement lazy loading for project images using Next.js Image component
  - [ ] 3.9 Write unit tests for ProjectCard and initial PortfolioSection rendering

- [x] 4.0 Implement shuffle functionality and animations
  - [x] 4.1 Add shuffle state management in PortfolioSection using React useState
  - [x] 4.2 Implement Fisher-Yates shuffle algorithm in `lib/projects.ts` for true randomization
  - [x] 4.3 Create shuffle button click handler that randomizes project order
  - [x] 4.4 Integrate Framer Motion for smooth reordering animations (use layout animations)
  - [x] 4.5 Maintain scroll position after shuffle using useRef and scrollLeft preservation
  - [x] 4.6 Implement infinite scroll: initially load 6-8 projects, then lazy load more as user scrolls
    - Ensure infinite scroll works on all breakpoints and is touch-friendly
  - [x] 4.7 Add intersection observer for detecting when to load more projects
  - [x] 4.8 Ensure smooth loading transitions with no visible jumps
  - [ ] 4.9 Write unit tests for shuffle functionality and infinite scroll behavior

- [x] 5.0 Configure SEO, metadata, and deployment
  - [x] 5.1 Add OpenGraph meta tags in `app/layout.tsx`: title, description, image, type="website"
  - [x] 5.2 Configure proper `<title>` tag: "Tristan Rodman - Product Leader in Music & Technology"
  - [x] 5.3 Add meta description using tagline from Header component
  - [ ] 5.4 Set canonical URL and other essential meta tags
  - [ ] 5.5 Optimize all images: convert to WebP format, add blur placeholders
  - [ ] 5.6 Run Lighthouse audit and optimize for 90+ scores (performance, accessibility, SEO)
    - Test on mobile, tablet, and desktop
  - [ ] 5.7 Configure deployment settings for Vercel or Netlify with custom domain
  - [ ] 5.8 Set up GitHub Actions for automatic deployment from main branch
  - [ ] 5.9 Add error boundaries and fallback UI for failed image loads
  - [ ] 5.10 Test website across all major browsers and devices, including mobile and tablet 