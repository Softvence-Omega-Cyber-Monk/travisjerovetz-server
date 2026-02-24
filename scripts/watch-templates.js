const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src", "app", "config", "templates");
const distDir = path.join(__dirname, "..", "dist", "app", "config", "templates");

const copyTemplates = () => {
  if (!fs.existsSync(srcDir)) {
    console.warn("Templates source folder not found:", srcDir);
    return;
  }

  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(srcDir, distDir, { recursive: true });
  console.log("Templates synced to:", distDir);
};

copyTemplates();

if (process.argv.includes("--watch")) {
  fs.watch(srcDir, { recursive: true }, () => {
    try {
      copyTemplates();
    } catch (error) {
      console.error("Template sync failed:", error);
    }
  });

  console.log("Watching templates for changes...");
}
