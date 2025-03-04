// scripts/generate-resume-pdf.mjs
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { generatePDF } from "astro-pdf/utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

async function generateResumePDF() {
  console.log("Generating resume PDF...");

  try {
    // Ensure dist directory exists
    const distDir = path.join(projectRoot, "dist");
    try {
      await fs.access(distDir);
    } catch (error) {
      console.error(
        "Error: dist directory does not exist. Run astro build first."
      );
      process.exit(1);
    }

    // Path to the PDF component
    const componentPath = path.join(
      projectRoot,
      "src/components/ResumePDF.astro"
    );

    // Output path
    const outputPath = path.join(distDir, "resume.pdf");

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
