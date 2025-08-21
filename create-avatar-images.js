const fs = require('fs');
const { createCanvas } = require('canvas');

// Create Kelly avatar
function createKellyAvatar() {
    const canvas = createCanvas(400, 600);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#4285f4');
    gradient.addColorStop(1, '#3367d6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('KELLY', 200, 300);
    
    // Add subtitle
    ctx.font = '24px Arial';
    ctx.fillText('Learning Assistant', 200, 350);
    
    // Save as JPEG
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('dist/assets/avatars/kelly.jpg', buffer);
    console.log('✅ Created Kelly avatar image');
}

// Create Ken avatar
function createKenAvatar() {
    const canvas = createCanvas(400, 600);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#34a853');
    gradient.addColorStop(1, '#2d8f47');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('KEN', 200, 300);
    
    // Add subtitle
    ctx.font = '24px Arial';
    ctx.fillText('Learning Assistant', 200, 350);
    
    // Save as JPEG
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('dist/assets/avatars/ken.jpg', buffer);
    console.log('✅ Created Ken avatar image');
}

// Create both avatars
function createAvatarImages() {
    try {
        // Ensure directory exists
        if (!fs.existsSync('dist/assets/avatars')) {
            fs.mkdirSync('dist/assets/avatars', { recursive: true });
        }
        
        createKellyAvatar();
        createKenAvatar();
        
        console.log('🎉 Avatar images created successfully!');
    } catch (error) {
        console.error('❌ Failed to create avatar images:', error);
    }
}

createAvatarImages(); 