
// Cloudflare Pages Deployment Test
// Run this in browser console after deployment

console.log('🧪 Testing Cloudflare Pages deployment...');

// Test 1: Check if site loads
if (document.title.includes('iLearn How')) {
    console.log('✅ Site title correct');
} else {
    console.log('❌ Site title incorrect');
}

// Test 2: Check for Cloudflare-specific elements
const tests = [
    { name: 'Avatar Container', selector: '#avatar-container', expected: true },
    { name: 'Lesson Info', selector: '#lesson-info', expected: true },
    { name: 'Navigation Icons', selector: '.nav-icons', expected: true },
    { name: 'Calendar Overlay', selector: '#calendar-overlay', expected: true },
    { name: 'Tone Overlay', selector: '#tone-overlay', expected: true },
    { name: 'Avatar Overlay', selector: '#avatar-overlay', expected: true }
];

let passedTests = 0;
tests.forEach(test => {
    const element = document.querySelector(test.selector);
    if (element === null && !test.expected) {
        console.log(`✅ ${test.name} - Not present (expected)`);
        passedTests++;
    } else if (element !== null && test.expected) {
        console.log(`✅ ${test.name} - Present`);
        passedTests++;
    } else {
        console.log(`❌ ${test.name} - ${test.expected ? 'Missing' : 'Unexpectedly present'}`);
    }
});

console.log(`\n🎯 Cloudflare Pages Test Results: ${passedTests}/${tests.length} tests passed`);

if (passedTests === tests.length) {
    console.log('🎉 CLOUDFLARE PAGES DEPLOYMENT SUCCESSFUL!');
} else {
    console.log('⚠️ Some tests failed - check deployment');
}

// Test 3: Check for Cloudflare headers
fetch(window.location.href)
    .then(response => {
        const server = response.headers.get('server');
        if (server && server.includes('cloudflare')) {
            console.log('✅ Cloudflare server detected');
        } else {
            console.log('⚠️ Cloudflare server not detected');
        }
    })
    .catch(error => {
        console.log('❌ Error checking server headers:', error);
    });
