// Test script for Universal Lesson Player buttons
console.log('🧪 Starting button tests...');

// Test avatar buttons
function testAvatarButtons() {
    console.log('Testing Avatar buttons...');
    const kellyBtn = document.querySelector('button[onclick*="selectAvatar(\'kelly\')"]');
    const kenBtn = document.querySelector('button[onclick*="selectAvatar(\'ken\')"]');
    
    if (kellyBtn) {
        kellyBtn.click();
        console.log('✅ Kelly button clicked');
    }
    
    if (kenBtn) {
        kenBtn.click();
        console.log('✅ Ken button clicked');
    }
}

// Test age buttons
function testAgeButtons() {
    console.log('Testing Age buttons...');
    const ageButtons = document.querySelectorAll('button[onclick*="selectAge"]');
    ageButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.click();
            console.log(`✅ Age button ${index + 1} clicked: ${btn.textContent}`);
        }, index * 200);
    });
}

// Test tone buttons
function testToneButtons() {
    console.log('Testing Tone buttons...');
    const toneButtons = document.querySelectorAll('button[onclick*="selectTone"]');
    toneButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.click();
            console.log(`✅ Tone button ${index + 1} clicked: ${btn.textContent}`);
        }, index * 200);
    });
}

// Test language buttons
function testLanguageButtons() {
    console.log('Testing Language buttons...');
    const langButtons = document.querySelectorAll('button[onclick*="selectLanguage"]');
    langButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.click();
            console.log(`✅ Language button ${index + 1} clicked: ${btn.textContent}`);
        }, index * 200);
    });
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting comprehensive button tests...');
    
    setTimeout(() => testAvatarButtons(), 1000);
    setTimeout(() => testAgeButtons(), 3000);
    setTimeout(() => testToneButtons(), 8000);
    setTimeout(() => testLanguageButtons(), 12000);
    
    setTimeout(() => {
        console.log('✅ All button tests completed!');
        console.log('Current settings:', window.player?.settings);
    }, 15000);
}

// Auto-run tests when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
} 