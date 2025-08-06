# Kebab-Case Component Naming Convention

## Overview

All component files and folders in the Toy Lovers must use kebab-case naming convention for consistency, maintainability, and cross-platform compatibility.

## Folder Structure Requirements

### Component Directories

- **MUST** use kebab-case for all component folder names
- Each component **MUST** be in its own directory
- Directory name **MUST** match the component's purpose/name in kebab-case

```
✅ CORRECT:
src/components/
├── button/
├── card/
├── input/
├── badge/
├── post-client/
├── navigation-menu/
├── date-picker/
└── user-profile-card/

❌ INCORRECT:
src/components/
├── Button/
├── Card/
├── userProfile/
├── NavigationMenu/
├── date_picker/
└── UserProfileCard/
```

## File Naming Requirements

### Component Files

All files within component directories **MUST** use kebab-case:

```
✅ CORRECT:
button/
├── button.tsx
└── button.stories.tsx

card/
├── card.tsx
├── card.stories.tsx
└── card.test.tsx

❌ INCORRECT:
button/
├── Button.tsx
├── Button.stories.tsx
├── buttonComponent.tsx
└── button_stories.tsx
```

### File Extensions

- Component implementation: `component-name.tsx`
- Storybook stories: `component-name.stories.tsx`
- Tests: `component-name.test.tsx`
- Types (if separate): `component-name.types.ts`
- Utilities (if separate): `component-name.utils.ts`

## Import/Export Conventions

### Component Exports

```typescript
// ✅ CORRECT: Export from kebab-case file
export { default as Button } from "./button/button";
export type { ButtonProps } from "./button/button";

// ❌ INCORRECT: Mixed casing
export { default as Button } from "./Button/Button";
export { default as Button } from "./button/Button";
```

### Story Imports

```typescript
// ✅ CORRECT: Import from kebab-case files
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./button";

// ❌ INCORRECT: Capitalized imports
import Button from "./Button";
import Button from "./buttonComponent";
```

### Cross-Component Imports

```typescript
// ✅ CORRECT: Kebab-case paths throughout
import Button from "../button/button";
import { Card } from "../card/card";

// ❌ INCORRECT: Mixed casing
import Button from "../Button/Button";
import { Card } from "../Card/Card";
```

## Component Implementation Rules

### Component Definition

```typescript
// ✅ CORRECT: PascalCase component name with kebab-case file
// File: src/components/user-avatar/user-avatar.tsx
export interface UserAvatarProps {
  // props here
}

export default function UserAvatar({ ...props }: UserAvatarProps) {
  // implementation
}

// ❌ INCORRECT: Component name doesn't match purpose
export default function Avatar({ ...props }: UserAvatarProps) {
  // Should be UserAvatar to match user-avatar folder
}
```

### Story Configuration

```typescript
// ✅ CORRECT: Title matches folder structure
// File: src/components/navigation-menu/navigation-menu.stories.tsx
const meta: Meta<typeof NavigationMenu> = {
  title: "Design System/NavigationMenu", // PascalCase in title
  component: NavigationMenu,
  // ... other config
};
```

## Multi-Word Component Guidelines

### Naming Patterns

- Use kebab-case for files and folders
- Use PascalCase for component names and titles
- Maintain consistency between folder name and component purpose

```
✅ CORRECT Examples:
├── user-profile/
│   ├── user-profile.tsx          → exports UserProfile
│   └── user-profile.stories.tsx  → stories for UserProfile
├── date-range-picker/
│   ├── date-range-picker.tsx     → exports DateRangePicker
│   └── date-range-picker.stories.tsx
├── navigation-breadcrumb/
│   ├── navigation-breadcrumb.tsx → exports NavigationBreadcrumb
│   └── navigation-breadcrumb.stories.tsx
```

## Special Cases

### Utility Components

```
✅ CORRECT:
├── post-client/
│   └── post-client.tsx           → exports PostClient
├── theme-provider/
│   └── theme-provider.tsx        → exports ThemeProvider
```

### Compound Components

```
✅ CORRECT:
├── dropdown-menu/
│   ├── dropdown-menu.tsx         → exports DropdownMenu
│   ├── dropdown-menu.stories.tsx
│   ├── dropdown-item.tsx         → exports DropdownItem
│   └── dropdown-trigger.tsx      → exports DropdownTrigger
```

## Index File Requirements

### Main Components Index

```typescript
// ✅ CORRECT: src/components/index.ts
export { default as Button } from "./button/button";
export type { ButtonProps } from "./button/button";

export { default as Card } from "./card/card";
export type { CardProps } from "./card/card";

export { default as UserProfile } from "./user-profile/user-profile";
export type { UserProfileProps } from "./user-profile/user-profile";
```

## Migration Guidelines

### When Renaming Existing Components

1. **Create new kebab-case directory**
2. **Copy files with kebab-case names**
3. **Update all imports in new files**
4. **Update index.ts exports**
5. **Update all consuming files**
6. **Delete old PascalCase directory**
7. **Clear build cache** (rm -rf .next)

### Build Cache Considerations

- Always clear build cache after renaming components
- macOS filesystem case-sensitivity can cause issues
- Use `rm -rf .next node_modules/.cache` when necessary

## Enforcement Checklist

Before creating or modifying components, verify:

- [ ] Component folder uses kebab-case
- [ ] All files within folder use kebab-case
- [ ] Component export name uses PascalCase
- [ ] All imports use kebab-case paths
- [ ] Storybook title reflects component name properly
- [ ] Index.ts exports updated if applicable
- [ ] Cross-component references updated
- [ ] Build succeeds without case-sensitivity errors

## Tools and Automation

### Recommended VS Code Settings

```json
{
  "files.watcherExclude": {
    "**/.next/**": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "off"
}
```

### Git Considerations

```bash
# When renaming, use git mv to preserve history
git mv src/components/Button src/components/button-temp
git mv src/components/button-temp src/components/button
```

## Examples from Toy Lovers

### Current Structure (All Kebab-Case)

```
src/components/
├── badge/
│   ├── badge.tsx
│   └── badge.stories.tsx
├── button/
│   ├── button.tsx
│   └── button.stories.tsx
├── card/
│   ├── card.tsx
│   └── card.stories.tsx
├── input/
│   ├── input.tsx
│   └── input.stories.tsx
├── post-client/
│   └── post-client.tsx
└── index.ts
```

This structure ensures:

- **Consistency** across all components
- **Cross-platform compatibility**
- **Clear organization** with one component per folder
- **Predictable import paths**
- **No case-sensitivity build issues**

## Violation Examples

### Common Mistakes to Avoid

```
❌ Mixed casing in same project:
├── Button/           (PascalCase folder)
├── user-profile/     (kebab-case folder)
├── inputField/       (camelCase folder)
└── date_picker/      (snake_case folder)

❌ Inconsistent file naming:
button/
├── Button.tsx        (PascalCase file)
├── button.stories.tsx (kebab-case file)

❌ Import path mismatches:
import Button from "./Button/button";  // Mixed case path
import { Card } from "./card/Card";    // File case mismatch
```

Remember: **Consistency is key**. All components should follow the same kebab-case pattern for files and folders, with PascalCase only used for the actual component names and exports.
