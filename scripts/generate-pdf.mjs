import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import puppeteer from "puppeteer";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

async function generateResumePDF() {
  console.log("Generating resume PDF...");

  try {
    // Use public directory
    const publicDir = path.join(projectRoot, "public");

    // Ensure public directory exists
    try {
      await fs.access(publicDir);
    } catch (error) {
      await fs.mkdir(publicDir, { recursive: true });
      console.log("Created public directory");
    }

    // Output path in public directory
    const outputPath = path.join(publicDir, "NeallePageCV.pdf");

    // Start a development server in the background
    console.log("Starting development server...");
    const devServer = execSync("npx astro preview --port 4321", {
      stdio: "pipe",
    });

    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to your CV page
    await page.goto("http://localhost:4321/NeallePageCV", {
      waitUntil: "networkidle2",
    });

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm",
      },
    });

    // Close browser
    await browser.close();

    // Kill the development server
    process.kill(devServer.pid);

    console.log(`Resume PDF successfully generated at: ${outputPath}`);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    process.exit(1);
  }
}

// Run the function
generateResumePDF();
