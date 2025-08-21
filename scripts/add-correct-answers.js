const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'mynextlesson.com', 'dna-templates', 'the-sun.json');

// This is a mapping of question ID to the correct answer.
// In a real system, this would come from a database or CMS.
const correctAnswers = {
    "question_1": { "2": "b", "5": "a", "8": "b", "12": "a", "16": "b", "25": "a", "40": "b", "60": "a", "80": "b", "102": "a" },
    "question_2": { "2": "a", "5": "b", "8": "a", "12": "b", "16": "a", "25": "b", "40": "a", "60": "b", "80": "a", "102": "b" },
    "question_3": { "2": "b", "5": "a", "8": "b", "12": "a", "16": "b", "25": "a", "40": "b", "60": "a", "80": "b", "102": "a" }
};

try {
    const lessonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const questionKey in lessonData.core_lesson_structure) {
        if (Object.prototype.hasOwnProperty.call(lessonData.core_lesson_structure, questionKey)) {
            const question = lessonData.core_lesson_structure[questionKey];
            if (question.ages && correctAnswers[questionKey]) {
                for (const ageKey in question.ages) {
                    if (Object.prototype.hasOwnProperty.call(question.ages, ageKey) && correctAnswers[questionKey][ageKey]) {
                        question.ages[ageKey].correct_option = correctAnswers[questionKey][ageKey];
                    }
                }
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(lessonData, null, 4), 'utf8');
    console.log('✅ Success: a `correct_option` field has been added to every question in the-sun.json.');

} catch (error) {
    console.error('❌ Error updating the-sun.json:', error);
}
