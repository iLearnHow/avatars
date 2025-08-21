const fs = require('fs');
const path = require('path');

const lessonPath = path.join(__dirname, '../mynextlesson.com/dna-templates/the-moon.json');

function addCorrectAnswers() {
  const data = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));
  const ages = Object.keys(data.core_lesson_structure.question_1.ages);

  ages.forEach(age => {
    ['question_1', 'question_2', 'question_3'].forEach(qKey => {
      const qBlock = data.core_lesson_structure[qKey].ages[age];
      if (!qBlock.correct_option) {
        // Hard-coded based on domain knowledge above – all correct answers are option B
        qBlock.correct_option = 'b';
      }
    });
  });

  fs.writeFileSync(lessonPath, JSON.stringify(data, null, 2));
  console.log('Moon lesson updated with correct_option flag for every question.');
}

addCorrectAnswers();