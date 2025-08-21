// scripts/create-lesson.js - VERSION 2.0: AI-Powered Synthesis
const fs = require('fs').promises;
const path = require('path');
const AISynthesisEngine = require('../src/services/ai/synthesis-engine');

/**
 * AI-Powered Lesson Generation Engine
 * This script generates a new lesson DNA file by synthesizing content for a new topic
 * based on the structure of a master template.
 * 
 * Usage: node scripts/create-lesson.js <new_lesson_name>
 * Example: node scripts/create-lesson.js the-moon
 */

async function createLesson() {
    const newLessonName = process.argv[2];
    if (!newLessonName) {
        console.error('Error: Please provide a name for the new lesson (e.g., "the-moon").');
        process.exit(1);
    }

    const templatePath = path.join(__dirname, '..', 'dna-templates', 'the-sun.json');
    const newLessonPath = path.join(__dirname, '..', 'data', `${newLessonName}.json`);

    console.log(`🔥 Starting AI-powered lesson synthesis for topic: "${newLessonName}"...`);

    // 1. Load the structural template
    const templateStructure = JSON.parse(await fs.readFile(templatePath, 'utf8'));
    const newLesson = JSON.parse(JSON.stringify(templateStructure)); // Deep copy

    // 2. Update basic metadata
    newLesson.lesson_metadata.lesson_id = newLessonName;
    newLesson.lesson_metadata.universal_concept = `AI-synthesized concept for ${newLessonName}`;
    newLesson.lesson_metadata.learning_essence = `AI-synthesized essence for ${newLessonName}`;

    // 3. Synthesize content for every node in the lesson
    const synthesisPromises = [];

    // Age Expressions
    for (const age in newLesson.age_expressions) {
        for (const tone in newLesson.age_expressions[age].concept_name) {
            synthesisPromises.push(
                AISynthesisEngine.generateContent({ topic: newLessonName, contentType: 'concept_name', age, tone })
                    .then(content => { newLesson.age_expressions[age].concept_name[tone] = content; })
            );
        }
    }

    // Core Lesson Structure
    for (const qKey in newLesson.core_lesson_structure) { // question_1, question_2, ...
        for (const age in newLesson.core_lesson_structure[qKey].ages) {
            const ageBlock = newLesson.core_lesson_structure[qKey].ages[age];
            // Question
            for (const tone in ageBlock.question) {
                synthesisPromises.push(
                    AISynthesisEngine.generateContent({ topic: newLessonName, contentType: `${qKey}_question`, age, tone })
                        .then(content => { ageBlock.question[tone] = content; })
                );
            }
            // Options
            synthesisPromises.push(
                AISynthesisEngine.generateContent({ topic: newLessonName, contentType: `${qKey}_option_a`, age, tone: 'neutral' })
                    .then(content => { ageBlock.option_a = content; })
            );
            synthesisPromises.push(
                AISynthesisEngine.generateContent({ topic: newLessonName, contentType: `${qKey}_option_b`, age, tone: 'neutral' })
                    .then(content => { ageBlock.option_b = content; })
            );
            // Teaching Moments
            synthesisPromises.push(
                AISynthesisEngine.generateContent({ topic: newLessonName, contentType: `${qKey}_teaching_a`, age, tone: 'neutral' })
                    .then(content => { ageBlock.teaching_moments.option_a_response = content; })
            );
             synthesisPromises.push(
                AISynthesisEngine.generateContent({ topic: newLessonName, contentType: `${qKey}_teaching_b`, age, tone: 'neutral' })
                    .then(content => { ageBlock.teaching_moments.option_b_response = content; })
            );
        }
    }

    // Wisdom Phase
    for (const tone in newLesson.wisdom_phase_content.fortune) {
        synthesisPromises.push(
            AISynthesisEngine.generateContent({ topic: newLessonName, contentType: 'wisdom', age: 'all', tone })
                .then(content => { newLesson.wisdom_phase_content.fortune[tone] = content; })
        );
    }

    // 4. Wait for all AI content to be generated
    console.log(`Synthesizing ${synthesisPromises.length} content blocks... (this may take a moment)`);
    await Promise.all(synthesisPromises);

    // 5. Write the newly synthesized lesson file
    await fs.writeFile(newLessonPath, JSON.stringify(newLesson, null, 2), 'utf8');
    
    console.log(`\n✅ Success! AI-synthesized lesson created at: ${newLessonPath}`);
    console.log(`🔗 View it now: http://localhost:8000/universal-lesson-player.html?lesson=${newLessonName}`);
}

createLesson().catch(err => console.error("Lesson creation failed:", err));
