// scripts/check-duplicates.js
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '..', 'data', 'the-sun-dna.json');

function findDuplicates() {
    try {
        const rawData = fs.readFileSync(jsonFilePath, 'utf8');
        const lessonData = JSON.parse(rawData);

        const allText = [];

        // Helper to extract text from a tone object
        const extractFromToneObject = (obj) => {
            if (typeof obj === 'string') {
                allText.push(obj.trim());
            } else if (typeof obj === 'object' && obj !== null) {
                Object.values(obj).forEach(value => {
                    if (typeof value === 'string') {
                        allText.push(value.trim());
                    }
                });
            }
        };

        // Extract from age_expressions
        Object.values(lessonData.age_expressions).forEach(ageGroup => {
            extractFromToneObject(ageGroup.concept_name);
        });

        // Extract from core_lesson_structure (questions)
        Object.values(lessonData.core_lesson_structure).forEach(questionBlock => {
            Object.values(questionBlock.ages).forEach(ageData => {
                extractFromToneObject(ageData.question);
                if(ageData.option_a) allText.push(ageData.option_a.trim());
                if(ageData.option_b) allText.push(ageData.option_b.trim());
            });
        });

        // Extract from wisdom_phase_content
        extractFromToneObject(lessonData.wisdom_phase_content.fortune);

        const seen = new Set();
        const duplicates = [];

        allText.forEach(text => {
            if (seen.has(text)) {
                if (!duplicates.includes(text)) {
                    duplicates.push(text);
                }
            } else {
                seen.add(text);
            }
        });

        if (duplicates.length > 0) {
            console.log('🔴 Found duplicate content strings:');
            duplicates.forEach(dup => console.log(`   - "${dup}"`));
        } else {
            console.log('✅ No duplicate content found. All text strings are unique.');
        }

    } catch (error) {
        console.error('Error checking for duplicates:', error);
    }
}

findDuplicates();
