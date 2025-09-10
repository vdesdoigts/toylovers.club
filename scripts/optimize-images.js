#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

/**
 * Image optimization script for toylovers.club
 * Optimizes all images in public/lovers directory
 */

const LOVERS_DIR = path.join(__dirname, "..", "public", "lovers");
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const BACKUP_DIR = path.join(__dirname, "..", "backup-images");

// Configuration
const CONFIG = {
  // JPEG quality (0-100, higher = better quality but larger file)
  jpegQuality: 85,
  // PNG compression level (0-9, higher = better compression)
  pngCompressionLevel: 8,
  // WebP quality (0-100, higher = better quality but larger file)
  webpQuality: 85,
  // Maximum width for images (set to null to preserve original dimensions)
  maxWidth: 2048,
  // Maximum height for images (set to null to preserve original dimensions)
  maxHeight: 2048,
  // Whether to create backups before optimization
  createBackups: true,
  // Whether to convert all images to WebP format
  convertToWebP: false,
  // Whether to preserve original files when converting to WebP
  preserveOriginals: true,
  // Minimum file size reduction percentage to keep optimized version
  minSavingsPercent: 5,
};

class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      optimized: 0,
      skipped: 0,
      errors: 0,
      totalOriginalSize: 0,
      totalOptimizedSize: 0,
    };
  }

  /**
   * Get all image files recursively from a directory
   */
  async getImageFiles(dir) {
    const files = [];

    const items = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        const subFiles = await this.getImageFiles(fullPath);
        files.push(...subFiles);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }

    return files;
  }

  /**
   * Create backup of original file
   */
  async createBackup(filePath) {
    if (!CONFIG.createBackups) return;

    const relativePath = path.relative(path.join(__dirname, ".."), filePath);
    const backupPath = path.join(BACKUP_DIR, relativePath);
    const backupDir = path.dirname(backupPath);

    // Ensure backup directory exists
    await fs.promises.mkdir(backupDir, { recursive: true });

    // Copy original file to backup location
    await fs.promises.copyFile(filePath, backupPath);
  }

  /**
   * Get file size in bytes
   */
  async getFileSize(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.size;
  }

  /**
   * Format bytes to human readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Optimize a single image
   */
  async optimizeImage(filePath) {
    try {
      console.log(`Processing: ${path.relative(LOVERS_DIR, filePath)}`);

      const originalSize = await this.getFileSize(filePath);
      this.stats.totalOriginalSize += originalSize;

      // Create backup if enabled
      await this.createBackup(filePath);

      const ext = path.extname(filePath).toLowerCase();
      const tempPath = filePath + ".tmp";

      let sharpInstance = sharp(filePath);

      // Get image metadata
      const metadata = await sharpInstance.metadata();

      // Resize if image is larger than max dimensions
      if (CONFIG.maxWidth || CONFIG.maxHeight) {
        const shouldResize =
          (CONFIG.maxWidth && metadata.width > CONFIG.maxWidth) ||
          (CONFIG.maxHeight && metadata.height > CONFIG.maxHeight);

        if (shouldResize) {
          sharpInstance = sharpInstance.resize(
            CONFIG.maxWidth,
            CONFIG.maxHeight,
            {
              fit: "inside",
              withoutEnlargement: true,
            }
          );
        }
      }

      // Apply format-specific optimizations
      if (CONFIG.convertToWebP) {
        // Convert to WebP
        const webpPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
        await sharpInstance
          .webp({ quality: CONFIG.webpQuality })
          .toFile(webpPath);

        if (!CONFIG.preserveOriginals) {
          await fs.promises.unlink(filePath);
        }

        const optimizedSize = await this.getFileSize(webpPath);
        this.stats.totalOptimizedSize += optimizedSize;
      } else {
        // Optimize in original format
        switch (ext) {
          case ".jpg":
          case ".jpeg":
            sharpInstance = sharpInstance.jpeg({
              quality: CONFIG.jpegQuality,
              progressive: true,
              mozjpeg: true,
            });
            break;
          case ".png":
            sharpInstance = sharpInstance.png({
              compressionLevel: CONFIG.pngCompressionLevel,
              progressive: true,
            });
            break;
          case ".webp":
            sharpInstance = sharpInstance.webp({
              quality: CONFIG.webpQuality,
            });
            break;
        }

        // Save to temp file first
        await sharpInstance.toFile(tempPath);

        const optimizedSize = await this.getFileSize(tempPath);
        const savings = ((originalSize - optimizedSize) / originalSize) * 100;

        // Only replace original if we achieved minimum savings
        if (savings >= CONFIG.minSavingsPercent) {
          await fs.promises.rename(tempPath, filePath);
          this.stats.optimized++;
          this.stats.totalOptimizedSize += optimizedSize;

          console.log(
            `  ✓ Optimized: ${this.formatBytes(
              originalSize
            )} → ${this.formatBytes(optimizedSize)} (${savings.toFixed(
              1
            )}% reduction)`
          );
        } else {
          await fs.promises.unlink(tempPath);
          this.stats.skipped++;
          this.stats.totalOptimizedSize += originalSize;

          console.log(
            `  ⚡ Skipped: savings too small (${savings.toFixed(1)}%)`
          );
        }
      }

      this.stats.processed++;
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, error.message);
      this.stats.errors++;

      // Clean up temp file if it exists
      const tempPath = filePath + ".tmp";
      try {
        await fs.promises.unlink(tempPath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Main optimization function
   */
  async optimize() {
    console.log("🖼️  Starting image optimization for toylovers.club");
    console.log(`📁 Target directory: ${LOVERS_DIR}`);
    console.log("⚙️  Configuration:");
    console.log(`   - JPEG Quality: ${CONFIG.jpegQuality}%`);
    console.log(`   - PNG Compression: ${CONFIG.pngCompressionLevel}`);
    console.log(`   - WebP Quality: ${CONFIG.webpQuality}%`);
    console.log(
      `   - Max Dimensions: ${CONFIG.maxWidth || "original"} x ${
        CONFIG.maxHeight || "original"
      }`
    );
    console.log(`   - Create Backups: ${CONFIG.createBackups ? "Yes" : "No"}`);
    console.log(`   - Convert to WebP: ${CONFIG.convertToWebP ? "Yes" : "No"}`);
    console.log(`   - Min Savings: ${CONFIG.minSavingsPercent}%`);
    console.log("");

    try {
      // Get all image files
      const imageFiles = await this.getImageFiles(LOVERS_DIR);
      console.log(`📊 Found ${imageFiles.length} images to process`);
      console.log("");

      if (imageFiles.length === 0) {
        console.log("No images found to optimize.");
        return;
      }

      // Create backup directory if needed
      if (CONFIG.createBackups) {
        await fs.promises.mkdir(BACKUP_DIR, { recursive: true });
      }

      // Process each image
      for (let i = 0; i < imageFiles.length; i++) {
        const filePath = imageFiles[i];
        console.log(`[${i + 1}/${imageFiles.length}]`);
        await this.optimizeImage(filePath);
      }

      // Print final statistics
      this.printStats();
    } catch (error) {
      console.error("❌ Fatal error:", error.message);
      process.exit(1);
    }
  }

  /**
   * Print optimization statistics
   */
  printStats() {
    console.log("\n📈 Optimization Complete!");
    console.log("=====================================");
    console.log(`📊 Files processed: ${this.stats.processed}`);
    console.log(`✅ Files optimized: ${this.stats.optimized}`);
    console.log(`⚡ Files skipped: ${this.stats.skipped}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log("");
    console.log(
      `💾 Original total size: ${this.formatBytes(
        this.stats.totalOriginalSize
      )}`
    );
    console.log(
      `🗜️  Optimized total size: ${this.formatBytes(
        this.stats.totalOptimizedSize
      )}`
    );

    if (this.stats.totalOriginalSize > 0) {
      const totalSavings =
        this.stats.totalOriginalSize - this.stats.totalOptimizedSize;
      const totalSavingsPercent =
        (totalSavings / this.stats.totalOriginalSize) * 100;
      console.log(
        `💰 Total savings: ${this.formatBytes(
          totalSavings
        )} (${totalSavingsPercent.toFixed(1)}%)`
      );
    }

    if (CONFIG.createBackups) {
      console.log(`\n💾 Backups created in: ${BACKUP_DIR}`);
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  for (const arg of args) {
    if (arg === "--no-backup") {
      CONFIG.createBackups = false;
    } else if (arg === "--webp") {
      CONFIG.convertToWebP = true;
    } else if (arg === "--webp-only") {
      CONFIG.convertToWebP = true;
      CONFIG.preserveOriginals = false;
    } else if (arg.startsWith("--quality=")) {
      const quality = parseInt(arg.split("=")[1]);
      if (quality >= 1 && quality <= 100) {
        CONFIG.jpegQuality = quality;
        CONFIG.webpQuality = quality;
      }
    } else if (arg.startsWith("--max-width=")) {
      CONFIG.maxWidth = parseInt(arg.split("=")[1]) || null;
    } else if (arg.startsWith("--max-height=")) {
      CONFIG.maxHeight = parseInt(arg.split("=")[1]) || null;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`
Image Optimizer for toylovers.club

Usage: node scripts/optimize-images.js [options]

Options:
  --no-backup         Skip creating backups of original files
  --webp              Convert all images to WebP format (preserves originals)
  --webp-only         Convert to WebP and remove originals
  --quality=N         Set quality for JPEG/WebP (1-100, default: 85)
  --max-width=N       Set maximum width in pixels
  --max-height=N      Set maximum height in pixels
  --help, -h          Show this help message

Examples:
  node scripts/optimize-images.js
  node scripts/optimize-images.js --quality=90 --max-width=1920
  node scripts/optimize-images.js --webp --no-backup
      `);
      process.exit(0);
    }
  }

  const optimizer = new ImageOptimizer();
  await optimizer.optimize();
}

// Check if sharp is available
try {
  require.resolve("sharp");
} catch (error) {
  console.error(
    "❌ Sharp is not installed. Please run: npm install sharp --save-dev"
  );
  process.exit(1);
}

// Run the optimizer
if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });
}

module.exports = ImageOptimizer;
