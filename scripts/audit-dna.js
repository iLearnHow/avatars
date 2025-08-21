const fs = require('fs');
const path = require('path');

function findMissingKeys(template, instance, path = '') {
    let missingKeys = [];
    if (typeof template !== 'object' || template === null) {
        return [];
    }
    for (const key in template) {
        if (Object.prototype.hasOwnProperty.call(template, key)) {
            const currentPath = path ? `${path}.${key}` : key;
            if (!Object.prototype.hasOwnProperty.call(instance, key)) {
                missingKeys.push(`Missing key: ${currentPath}`);
            } else if (typeof template[key] === 'object' && template[key] !== null && typeof instance[key] === 'object' && instance[key] !== null) {
                if (!Array.isArray(template[key]) && !Array.isArray(instance[key])) {
                    missingKeys = missingKeys.concat(findMissingKeys(template[key], instance[key], currentPath));
                }
            } else if (instance[key] === '' || instance[key] === null) {
                missingKeys.push(`Empty value for key: ${currentPath}`);
            }
        }
    }
    return missingKeys;
}

function auditDnaFile(templatePath, instancePath) {
    try {
        const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
        const instance = JSON.parse(fs.readFileSync(instancePath, 'utf8'));

        console.log(`\n--- Auditing ${path.basename(instancePath)} against ${path.basename(templatePath)} ---`);

        const missing = findMissingKeys(template, instance);

        if (missing.length === 0) {
            console.log(`✅ Integrity Check Passed: ${path.basename(instancePath)} is structurally complete.`);
            return true;
        } else {
            console.error(`❌ Integrity Check Failed: Found ${missing.length} issues in ${path.basename(instancePath)}:`);
            missing.forEach(issue => console.error(`   - ${issue}`));
            return false;
        }
    } catch (error) {
        console.error(`Error during audit of ${path.basename(instancePath)}: ${error.message}`);
        return false;
    }
}

// --- Main Execution ---
function runComprehensiveAudit() {
    const templateFile = path.join(__dirname, '..', 'ultimate-lesson-dna-template.json');
    const instancesDir = path.join(__dirname, '..', 'mynextlesson.com', 'dna-templates');
    let allPassed = true;

    console.log('--- Starting Comprehensive DNA Audit ---');

    const instanceFiles = fs.readdirSync(instancesDir).filter(file => file.endsWith('.json'));

    if (instanceFiles.length === 0) {
        console.warn('No lesson instances found to audit.');
        return;
    }

    for (const instanceFile of instanceFiles) {
        const instancePath = path.join(instancesDir, instanceFile);
        if (!auditDnaFile(templateFile, instancePath)) {
            allPassed = false;
        }
    }

    console.log('\n--- Audit Summary ---');
    if (allPassed) {
        console.log('✅ All lesson instances passed the integrity check.');
    } else {
        console.error('❌ Some lesson instances failed the integrity check. Please review the errors above.');
    }
}

runComprehensiveAudit();
