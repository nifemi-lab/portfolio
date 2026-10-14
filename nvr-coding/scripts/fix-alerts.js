const fs = require('fs');
let s = fs.readFileSync('js/app.js', 'utf8');
const bad = [
  /alert\('[^']*Backup imported!'\)/g,
  /alert\('[^']*valid backup file[^']*'\)/g,
  /alert\('[^']*Copied!'\)/g
];
s = s.replace(bad[0], "alert('✅ Backup imported!')");
s = s.replace(bad[1], "alert('⚠️ Not a valid backup file.')");
s = s.replace(bad[2], "alert('✅ Copied!')");
s = s.replace(/I'm learning with NVR Coding[^`]*XP/, "I'm learning with NVR Coding 🧠 — ${store.get('xp', 0)} XP");
s = s.replace(/shareBtn\.textContent = '[^']*'; setTimeout\(\(\) => shareBtn\.textContent = '[^']*'/, "shareBtn.textContent = '✅ Copied!'; setTimeout(() => shareBtn.textContent = '🔗 Copy my stats'");
fs.writeFileSync('js/app.js', s, 'utf8');
console.log('fixed alerts');
