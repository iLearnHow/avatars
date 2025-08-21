/**
 * Variant Calculation Demonstration
 * Shows the exact logic for 81 variants (3x3x3) and 18 variants (3x2x1)
 */

console.log('📊 VARIANT CALCULATION DEMONSTRATION');
console.log('=' .repeat(50));

// Define parameters
const ageGroups = ['early_childhood', 'youth', 'young_adult'];
const contentTypes = ['voice_over_script', 'on_screen_text', 'lesson_logic'];
const questionTypes = ['question_1', 'question_2', 'question_3'];
const tones = ['grandmother', 'fun', 'neutral'];

console.log('3x3x3 FORMAT:');
console.log(`Age Groups: ${ageGroups.length}`);
console.log(`Content Types: ${contentTypes.length}`);
console.log(`Question Types: ${questionTypes.length}`);
console.log(`Tones: ${tones.length}`);
console.log(`Total: ${ageGroups.length} × ${contentTypes.length} × ${questionTypes.length} × ${tones.length} = ${ageGroups.length * contentTypes.length * questionTypes.length * tones.length}`);

console.log('\n3x2x1 FORMAT:');
const contentTypesReduced = ['voice_over_script', 'on_screen_text'];
const questionTypesReduced = ['question_1'];
console.log(`Age Groups: ${ageGroups.length}`);
console.log(`Content Types: ${contentTypesReduced.length} (reduced)`);
console.log(`Question Types: ${questionTypesReduced.length} (reduced)`);
console.log(`Tones: ${tones.length}`);
console.log(`Total: ${ageGroups.length} × ${contentTypesReduced.length} × ${questionTypesReduced.length} × ${tones.length} = ${ageGroups.length * contentTypesReduced.length * questionTypesReduced.length * tones.length}`);

console.log('\n✅ VERIFICATION:');
console.log(`3x3x3: ${ageGroups.length * contentTypes.length * questionTypes.length * tones.length} variants`);
console.log(`3x2x1: ${ageGroups.length * contentTypesReduced.length * questionTypesReduced.length * tones.length} variants`);

console.log('\n📋 DETAILED BREAKDOWN:');
console.log('\n3x3x3 Format Combinations:');
let count3x3x3 = 0;
for (const ageGroup of ageGroups) {
    for (const contentType of contentTypes) {
        for (const questionType of questionTypes) {
            for (const tone of tones) {
                count3x3x3++;
                if (count3x3x3 <= 5) {
                    console.log(`${count3x3x3}. ${ageGroup}_${tone}_${contentType}_${questionType}_A`);
                }
            }
        }
    }
}
console.log(`... (continues for all ${count3x3x3} combinations)`);

console.log('\n3x2x1 Format Combinations:');
let count3x2x1 = 0;
for (const ageGroup of ageGroups) {
    for (const contentType of contentTypesReduced) {
        for (const questionType of questionTypesReduced) {
            for (const tone of tones) {
                count3x2x1++;
                if (count3x2x1 <= 5) {
                    console.log(`${count3x2x1}. ${ageGroup}_${tone}_${contentType}_${questionType}_A`);
                }
            }
        }
    }
}
console.log(`... (continues for all ${count3x2x1} combinations)`);

console.log('\n🎯 FINAL RESULT:');
console.log(`✅ 3x3x3 format: ${count3x3x3} variants`);
console.log(`✅ 3x2x1 format: ${count3x2x1} variants`); 