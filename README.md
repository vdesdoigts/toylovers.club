# Toy Lovers

A comprehensive design system built with **Next.js 15**, **TypeScript**, **TailwindCSS**, and **Storybook**. Toy Lovers demonstrates modern web development practices through an interactive showcase and management system for design components, featuring dynamic typography customization and comprehensive component documentation.

## 🚀 Quick Start

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the main application.

### Storybook Development

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to explore the component library.

### Build for Production

```bash
npm run build
npm run build-storybook
```

## 🎨 Design System Components

Toy Lovers includes a comprehensive set of production-ready components:

### **Button Component**

- **3 variants**: Primary, Secondary, Outline
- **3 sizes**: Small, Medium, Large
- **States**: Default, Disabled, Loading
- **Use cases**: CTAs, form actions, navigation

### **Card Component**

- **4 variants**: Default, Elevated, Outlined, Filled
- **Features**: Header/footer support, interactive states, responsive padding
- **Use cases**: Content containers, product cards, information displays

### **Input Component**

- **3 variants**: Default, Filled, Outlined
- **Features**: Icons, validation states, loading indicators, labels
- **States**: Default, Error, Success, Disabled, Loading
- **Use cases**: Forms, search fields, data entry

### **Badge Component**

- **7 variants**: Primary, Secondary, Success, Warning, Danger, Info, Neutral
- **Features**: Dot indicators, icons, removable functionality, outlined styles
- **Use cases**: Status indicators, tags, notifications, labels

## 🔤 Typography System

### Dynamic Font Selection

- **7 font options**: Inter, Roboto, System, Georgia, Times New Roman, Fira Code, Monaco
- **Categories**: Sans-serif, Serif, Monospace
- **Real-time updates**: Changes apply instantly across all components
- **Persistent storage**: Preferences saved in localStorage

### Typography Testing in Storybook

- **Toolbar integration**: Switch fonts directly in Storybook
- **Component testing**: See how different fonts affect all components
- **Consistent application**: Typography changes apply to all stories

## 📁 Project Structure

```
toylovers.club/
├── src/
│   ├── components/           # Design system components
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   └── Badge.stories.tsx
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.stories.tsx
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.stories.tsx
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.stories.tsx
│   │   └── index.ts         # Component exports
│   ├── lib/
│   │   └── mdx.ts           # MDX utilities
│   └── app/                 # Next.js app directory
├── .storybook/              # Storybook configuration
│   ├── main.ts             # Core Storybook config
│   ├── preview.ts          # Global settings & decorators
│   └── typography-decorator.tsx  # Typography variation testing
└── docs/
    └── prd.md              # Product Requirements Document
```

## 🛠️ Technology Stack

### Core Technologies

- **[Next.js 15](https://nextjs.org/)**: React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety and developer experience
- **[TailwindCSS v4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Storybook 9](https://storybook.js.org/)**: Component documentation and testing

### Development Tools

- **ESLint**: Code linting and formatting
- **Vitest**: Component testing framework
- **Playwright**: Browser testing integration
- **Accessibility**: WCAG 2.1 AA compliance testing

## 📖 Storybook Features

### Component Documentation

- **Auto-generated docs**: Props, variants, and usage guidelines
- **Interactive controls**: Test component props in real-time
- **Accessibility testing**: Built-in a11y validation
- **Multiple story examples**: Real-world usage patterns

### Advanced Features

- **Typography variation testing**: Global font switching
- **Responsive testing**: View components at different screen sizes
- **Component isolation**: Test components independently
- **Visual regression testing**: Ensure consistent UI

## 🎯 Key Features

### Design System Benefits

- **Consistent styling**: Unified design language across components
- **Type safety**: Full TypeScript interfaces and props
- **Accessibility**: WCAG guidelines compliance
- **Performance**: Optimized components with minimal bundle size

### Developer Experience

- **Hot reloading**: Instant feedback during development
- **Component library**: Easy importing with `src/components/index.ts`
- **Comprehensive documentation**: Every component fully documented
- **Real-world examples**: Practical usage patterns and combinations

## 🚀 Usage Examples

### Importing Components

```typescript
import { Button, Card, Input, Badge } from "@/components";

// Or individual imports
import Button from "@/components/Button/Button";
import type { ButtonProps } from "@/components/Button/Button";
```

### Basic Usage

```tsx
// Button variations
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="outline" disabled>Disabled</Button>

// Card with header and footer
<Card
  variant="elevated"
  header={<h2>Product Title</h2>}
  footer={<Button variant="primary">Add to Cart</Button>}
>
  <p>Product description...</p>
</Card>

// Input with validation
<Input
  label="Email"
  type="email"
  error={hasError}
  errorMessage="Please enter a valid email"
  leadingIcon={<EmailIcon />}
/>

// Status badges
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" removable onRemove={() => {}}>Beta</Badge>
```

## 🎨 Customization

### Typography

The site uses fixed typography for consistency:

- **Poppins**: For headings, navigation, and UI elements (sans-serif)
- **Georgia**: For body text, articles, and reading content (serif)

To change fonts, modify the font imports in `src/app/layout.tsx` and update the CSS variables in `src/app/globals.css`.

### Component Styling

Components use TailwindCSS classes and can be customized via:

- **Props**: Built-in variant and size options
- **className prop**: Additional Tailwind classes
- **Global CSS**: Override default styles in `src/app/globals.css`

## 🔧 Development Workflow

### Adding New Components

1. Create component file in `src/components/ComponentName.tsx`
2. Create stories file `src/components/ComponentName.stories.tsx`
3. Export from `src/components/index.ts`
4. Document props with JSDoc comments
5. Test in Storybook with multiple variants

### Best Practices

- **TypeScript**: Define comprehensive prop interfaces
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Documentation**: Write descriptive Storybook stories
- **Testing**: Cover different states and edge cases
- **Consistency**: Follow established patterns from existing components

## 📚 Documentation

- **[Product Requirements Document](./docs/prd.md)**: Detailed project specifications
- **[Storybook Documentation](http://localhost:6006)**: Interactive component docs
- **Component Stories**: Each component includes multiple usage examples
- **TypeScript Interfaces**: Full type definitions for all props

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel platform
```

### Static Export

```bash
npm run build
npm run build-storybook
# Deploy static files from `out/` and `storybook-static/`
```

## 🤝 Contributing

1. Follow the established component patterns
2. Include comprehensive TypeScript types
3. Write multiple Storybook stories for each component
4. Test accessibility and responsive behavior
5. Document all props and usage examples

## 📄 License

This project is part of the Toy Lovers demonstration and follows modern web development best practices.

---

**Toy Lovers** - Built with ❤️ using Next.js 15, TypeScript, TailwindCSS, and Storybook.
