import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the catalogue page
  console.log('Navigating to http://localhost:5173/catalogue...');
  await page.goto('http://localhost:5173/catalogue', { waitUntil: 'networkidle0' });
  
  // Wait a bit extra to ensure all animations and fonts finish
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Generating PDF...');
  const outputPath = join(__dirname, '..', 'public', 'assets', 'Catalogue_DarBox_2025.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  console.log(`PDF saved successfully to ${outputPath}`);
  await browser.close();
}

generatePDF().catch(console.error);
