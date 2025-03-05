// scripts/generate-pdf.mjs
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { generatePDF } from "astro-pdf/utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

async function generateResumePDF() {
  console.log("Generating resume PDF...");

  try {
    // Use public directory instead of dist
    const publicDir = path.join(projectRoot, "public");

    // Ensure public directory exists
    try {
      await fs.access(publicDir);
    } catch (error) {
      // Create public directory if it doesn't exist
      await fs.mkdir(publicDir, { recursive: true });
      console.log("Created public directory");
    }

    // Path to the PDF component
    const componentPath = path.join(
      projectRoot,
      "src/components/ResumePDF.astro"
    );

    // Output path in public directory
    const outputPath = path.join(publicDir, "resume.pdf");

    // Generate the PDF
    await generatePDF({
      component: componentPath,
      props: {},
      output: outputPath,
    });

    console.log(`Resume PDF successfully generated at: ${outputPath}`);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    process.exit(1);
  }
}

// Run the function
generateResumePDF();
