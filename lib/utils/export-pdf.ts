// lib/utils/export-pdf.ts
// 🎯 Theme-aware PDF export utility

export async function exportResumeToPDF(
  elementId: string,
  filename = "resume.pdf"
): Promise<void> {
  const html = document.documentElement;
  const wasDark = html.classList.contains("dark");

  // Force light mode for accurate capture
  if (wasDark) html.classList.remove("dark");

  // Wait for DOM repaint
  await new Promise((r) => setTimeout(r, 150));

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Dynamic import — bundle size optimized
    const { default: html2canvas } = await import("html2canvas-pro");
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff", // ✅ Force white background
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    // A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Multi-page support agar resume lamba ho
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } finally {
    // Restore original theme
    if (wasDark) html.classList.add("dark");
  }
}