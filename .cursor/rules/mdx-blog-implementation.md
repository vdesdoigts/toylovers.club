# Toy Lovers - MDX Blog Implementation Rules

## MDX Articles System

This project implements a comprehensive MDX-based blog system with the following architecture:

### Dependencies

- `next-mdx-remote`: For server-side MDX rendering
- `@next/mdx`: Next.js MDX integration
- `@mdx-js/react`: React support for MDX
- `@mdx-js/loader`: MDX webpack loader
- `gray-matter`: Frontmatter parsing
- `@tailwindcss/typography`: Typography styling for prose content

### File Structure

```
src/
├── data/                          # MDX article files
│   ├── *.mdx                     # Individual articles with frontmatter
├── lib/
│   └── mdx.ts                    # MDX utility functions
├── app/
│   └── articles/
│       ├── page.tsx              # Articles index page
│       └── [slug]/
│           └── page.tsx          # Dynamic article page
└── components/
    └── post-client/
        └── post-client.tsx       # Client-side MDX wrapper
```

### MDX Article Format

Each article must have frontmatter with:

```yaml
---
title: "Article Title"
instagram: "Article instagram"
description: "Article description for SEO"
publishedAt: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2"]
covers:
  [
    {
      src: "/lovers/visualapproachphoto/visualapproachphotography_mando_00.jpg",
      alt: "Mando",
    },
  ]
---
```

### Key Functions (src/lib/mdx.ts)

- `getAllArticleSlugs()`: Returns array of article slugs
- `getArticleBySlug(slug)`: Returns article data and content
- `getAllArticles()`: Returns all articles sorted by date
- `getArticlesByTag(tag)`: Filter articles by tag
- `getAllTags()`: Get all unique tags

### Route Implementation

- `/articles`: Lists all articles with metadata
- `/articles/[slug]`: Individual article pages
- Uses `generateStaticParams` for SSG
- Uses `generateMetadata` for SEO and social sharing

### Best Practices

1. Always use server-side rendering (no "use client" on main pages)
2. Articles are statically generated at build time
3. PostClient component (from post-client folder) provides client-side wrapper when needed
4. Proper SEO metadata for all article pages
5. Typography plugin ensures consistent prose styling
6. Responsive design for all screen sizes

### Adding New Articles

1. Create `.mdx` file in `src/data/`
2. Include required frontmatter
3. Use standard Markdown/MDX syntax
4. Build will automatically include new articles

### Typography Integration

- Articles inherit typography settings from Toy Lovers design system
- @tailwindcss/typography provides consistent prose styling
- Typography changes affect article readability in real-time

### Performance Considerations

- Static generation for fast loading
- Proper meta tags for social sharing
- Optimized MDX rendering with next-mdx-remote
- Efficient frontmatter parsing with gray-matter

### Development Guidelines

- Follow existing component patterns
- Maintain consistent styling with design system
- Ensure accessibility standards are met
- Test on various screen sizes
- Validate MDX content before deployment
