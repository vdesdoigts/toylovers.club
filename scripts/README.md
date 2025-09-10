# Image Optimization Scripts

## optimize-images.js

A comprehensive image optimization script for the toylovers.club project that processes all images in the `public/lovers` directory.

### Features

- **Smart Optimization**: Uses Sharp library for high-quality image processing
- **Format Support**: Handles JPG, JPEG, PNG, and WebP images
- **Backup Creation**: Automatically creates backups before optimization (optional)
- **Size Reduction**: Only keeps optimized versions if they achieve meaningful size reduction
- **WebP Conversion**: Optional conversion to modern WebP format
- **Resize Support**: Can resize images to maximum dimensions
- **Progress Tracking**: Shows detailed progress and statistics
- **Error Handling**: Robust error handling with detailed logging

### Usage

#### Basic Usage

```bash
npm run optimize-images
```

#### Advanced Options

```bash
# Skip creating backups
node scripts/optimize-images.js --no-backup

# Convert all images to WebP (preserves originals)
node scripts/optimize-images.js --webp

# Convert to WebP and remove originals
node scripts/optimize-images.js --webp-only

# Set custom quality (1-100)
node scripts/optimize-images.js --quality=90

# Set maximum dimensions
node scripts/optimize-images.js --max-width=1920 --max-height=1080

# Combine options
node scripts/optimize-images.js --quality=90 --max-width=1920 --no-backup
```

### Configuration

The script includes sensible defaults that can be modified in the `CONFIG` object:

- **jpegQuality**: 85 (JPEG quality, 0-100)
- **pngCompressionLevel**: 8 (PNG compression, 0-9)
- **webpQuality**: 85 (WebP quality, 0-100)
- **maxWidth**: 2048 (Maximum width in pixels)
- **maxHeight**: 2048 (Maximum height in pixels)
- **createBackups**: true (Create backups before optimization)
- **minSavingsPercent**: 5 (Minimum savings to keep optimized version)

### Output

The script provides detailed output including:

- Progress for each file processed
- File size before and after optimization
- Percentage savings per file
- Overall statistics and total savings
- Error reporting for any failed optimizations

### Safety

- Creates backups by default in `backup-images/` directory
- Only replaces original files if significant savings are achieved
- Preserves directory structure in backups
- Handles errors gracefully without corrupting files

### Requirements

- Node.js
- Sharp library (automatically added to package.json)
