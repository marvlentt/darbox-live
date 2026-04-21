const fs = require('fs');

const files = [
  'c:\\Users\\hp\\.gemini\\antigravity\\scratch\\public\\assets\\DarBox_Presentation_PIE_2025.html',
  'c:\\Users\\hp\\.gemini\\antigravity\\scratch\\public\\assets\\DarBox_Presentation_PIE_2026.html',
  'c:\\Users\\hp\\Documents\\Y2 PIYO\\DarBox_Presentation_PIE_2025.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const replaceStr = `<img
        src="Darbox_Logo.svg"
        alt="DarBox" class="reveal"
        style="height:clamp(48px,7vw,80px);object-fit:contain;margin-bottom:24px;filter: brightness(0) invert(100%) sepia(5%) saturate(100%) hue-rotate(314deg) brightness(105%) contrast(95%);">`;
  
  // Notice there's a big base64 string right after `<img\s+src="data:image/png;base64,`
  // so we'll regex match until the end of the image tag `>`
  content = content.replace(/<img[\s\n]*src="data:image\/png;base64,[^>]*>/g, replaceStr);
  
  fs.writeFileSync(file, content);
  console.log(`Updated Base64 logo in: ${file}`);
});
