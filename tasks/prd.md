# PRD: Portfolio Website v1

## Introduction/Overview

This PRD outlines the requirements for Tristan Rodman's portfolio website v1. The site serves as a professional showcase for a product leader with 15+ years of experience at the intersection of music and technology. The primary feature is an innovative shuffle-based portfolio display that allows visitors to discover projects in a playful, non-linear way.

The website needs to communicate credibility and creativity simultaneously, serving multiple audiences including tech recruiters, potential collaborators, arts organizations, and industry peers.

## Goals

1. Launch a live, functional portfolio website within 1-2 weeks
2. Showcase the breadth and depth of work through an engaging shuffle interface
3. Establish professional credibility while maintaining personality
4. Create a foundation that can be expanded with future features
5. Optimize for search engine discovery and social sharing

## User Stories

1. **As a tech recruiter**, I want to quickly understand Tristan's experience and capabilities so that I can assess fit for senior product roles.

2. **As a potential collaborator**, I want to explore Tristan's creative projects so that I can understand his approach and find connection points.

3. **As an arts organization leader**, I want to see relevant experience and understand how Tristan could help my organization so that I can decide whether to reach out.

4. **As a site visitor**, I want to discover projects in an engaging way so that I get a full picture of Tristan's capabilities without feeling overwhelmed.

## Functional Requirements

### Core Layout & Content

1. **Header Section**
   - Display name: "Tristan Friedberg Rodman" in monospace font
   - Professional photo (circular, with green overlay/border)
   - Tagline: "I solve problems for musicians, music lovers, and the organizations that support them."
   - Current status: "Currently: re-imagining music creation at Splice, finishing a master's degree in machine learning at USC Viterbi."
   - Skills line: "Fluent in research, strategy, and code."
   - Email contact: Display email address as plain text

2. **Portfolio Section**
   - Section header: "Featured work" with shuffle button (🔀 icon)
   - Infinite horizontal scroll container
   - Display 3-4 project cards visible at a time (responsive)
   - Smooth scroll behavior with touch/swipe support on mobile

3. **Footer Section**
   - Social links: LinkedIn | GitHub | Instagram
   - Links open in new tabs

### Project Cards

4. **Card Structure**
   - Project image/video thumbnail (16:9 ratio recommended)
   - Project title (links to external URL if available)
   - Year
   - One-line description
   - Clean card design with subtle shadow (as shown in mockup)
   - No hover effects or click interactions on the card itself

5. **Card Data Source**
   - Load project data from JSON files in `/data/projects/` directory
   - Support for required fields: title, image, year, description
   - Support for optional fields: url, video, tags

### Shuffle Functionality

6. **Shuffle Button Behavior**
   - Clicking shuffle randomizes the entire order of projects
   - Maintain current scroll position after shuffle
   - Smooth animation during reorder (not jarring)
   - Shuffle should feel instant and responsive

7. **Infinite Scroll**
   - Initially load 6-8 projects
   - Lazy load additional projects as user scrolls
   - Show all projects in randomized order
   - Smooth loading with no visible jump

### Responsive Design

8. **Mobile (< 768px)**
   - Stack layout vertically
   - Single project card visible at a time
   - Horizontal swipe to navigate projects
   - Adjusted font sizes for readability

9. **Tablet (768px - 1024px)**
   - Show 2-3 project cards
   - Maintain horizontal scroll

10. **Desktop (> 1024px)**
    - Show 3-4 project cards
    - Optimal reading width for text content

### SEO & Meta Tags

11. **OpenGraph Implementation**
    - Title: "Tristan Rodman - Product Leader in Music & Technology"
    - Description: Copy from tagline
    - Image: Professional headshot or custom OG image
    - Type: "website"

12. **Essential Meta Tags**
    - Proper `<title>` tag
    - Meta description
    - Viewport meta tag for responsive design
    - Canonical URL

## Non-Goals (Out of Scope)

1. Individual project detail pages
2. About page or additional content pages
3. Blog or writing section
4. Contact form (email link only)
5. Newsletter signup
6. Search functionality
7. Comments or social features
8. Analytics tracking
9. Dark mode toggle
10. Multi-language support

## Design Considerations

- **Typography**: Monospace font for name/headers, clean sans-serif for body text
- **Color Palette**: Green accent color (#colorcode from mockup), white background, dark text
- **Spacing**: Generous whitespace, clean and uncluttered
- **Animations**: Subtle and purposeful, not distracting
- **Accessibility**: Proper contrast ratios, keyboard navigation support

## Technical Considerations

1. **Stack Suggestions**
   - Next.js or similar React framework for SEO benefits
   - CSS Modules or Tailwind for styling
   - Framer Motion for shuffle animations
   - Static generation where possible for performance

2. **Performance**
   - Optimize images (WebP format, lazy loading)
   - Minimize JavaScript bundle size
   - Target 90+ Lighthouse scores

3. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - Graceful degradation for older browsers

4. **Deployment**
   - Vercel, Netlify, or similar JAMstack hosting
   - Automatic deployments from main branch

## Success Metrics

1. **Primary Success Criteria**
   - Website is live and accessible at custom domain
   - All projects load and display correctly
   - Shuffle functionality works smoothly
   - Responsive design works across devices
   - SEO meta tags properly implemented

2. **Quality Indicators**
   - Page loads in under 2 seconds
   - No console errors in production
   - Passes accessibility audit
   - Properly indexed by search engines

## Open Questions

1. How many total projects should be included in v1?
2. Should there be any subtle indication that the portfolio scrolls horizontally on desktop?
3. What should happen if a project has both image and video assets?
4. Should the shuffle animation style be a fade, slide, or something else?
5. Do we need a fallback for users with JavaScript disabled?
6. Should we implement basic error states (e.g., if image fails to load)?
7. What's the exact green color hex code from the mockup?

## Next Steps

1. Finalize project content (gather all images, write descriptions)
2. Set up repository and development environment
3. Implement core layout and responsive design
4. Add shuffle functionality
5. Test across devices and browsers
6. Deploy to production

---

*Document created: [Current Date]*
*Version: 1.0*