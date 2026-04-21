const fs = require('fs');

const files = [
  'c:\\Users\\hp\\.gemini\\antigravity\\scratch\\public\\assets\\DarBox_Presentation_PIE_2025.html',
  'c:\\Users\\hp\\.gemini\\antigravity\\scratch\\public\\assets\\DarBox_Presentation_PIE_2026.html',
  'c:\\Users\\hp\\Documents\\Y2 PIYO\\DarBox_Presentation_PIE_2025.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Update the height clamp function for the logo at the conclusion slide.
  content = content.replace(
      /height:clamp\(48px,7vw,80px\);object-fit:contain;margin-bottom:24px;filter: brightness\(0\)/g, 
      "height:clamp(72px,12vw,140px);object-fit:contain;margin-bottom:24px;filter: brightness(0)"
  );
  
  fs.writeFileSync(file, content);
  console.log(`Increased logo size in: ${file}`);
});
