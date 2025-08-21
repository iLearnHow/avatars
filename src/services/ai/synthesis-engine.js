// src/services/ai/synthesis-engine.js - VERSION 2.0: Corrected & Complete Mock Data

/**
 * @file This is the AI Synthesis Engine.
 * For now, this is a mock service that returns pre-written, high-quality content.
 */

const moonContentLibrary = {
    concept_name: {
        '2': { neutral: 'The Gentle Moon', fun: 'Mr. Moon!', grandmother: 'The Night-Time Friend' },
        '5': { neutral: 'The Moon Changes Shape', fun: "The Moon's Magic Tricks!", grandmother: "The Moon's Different Faces" },
        '8': { neutral: 'The Moon and Tides', fun: "The Moon's Ocean Superpower!", grandmother: 'How the Moon Hugs the Ocean' },
        '12': { neutral: "The Moon's Craters", fun: 'Moon Scars!', grandmother: "The Moon's Ancient Marks" },
        '16': { neutral: 'Lunar Phases and Eclipses', fun: 'Cosmic Hide and Seek!', grandmother: "The Moon's Great Dance" },
        '25': { neutral: "The Moon's Influence on Culture", fun: 'Moonlit Stories!', grandmother: 'The Moon in Our Hearts' },
        '40': { neutral: 'The Moon as a Celestial Body', fun: 'Our Giant Space Rock!', grandmother: 'Our Constant Companion' },
        '60': { neutral: 'The Moon: A Historical Perspective', fun: 'The Race to the Moon!', grandmother: 'Reaching for the Moon' },
        '80': { neutral: 'The Moon: A Symbol of cycles', fun: 'The Ever-Turning Moon!', grandmother: "The Moon's Timeless Rhythm" },
        '102': { neutral: "The Moon's Cosmic Significance", fun: 'Our First Step to the Stars!', grandmother: "The Moon's Gentle Wisdom" },
    },
    question_1: {
        '8': { question: { neutral: 'What causes the ocean tides to rise and fall?'}, option_a: 'The wind', option_b: "The Moon's gravity", teaching_a: "Wind makes waves, but the Moon's pull is strong enough to move the whole ocean!", teaching_b: "Exactly! The Moon's gravity gently pulls on the Earth's oceans, creating tides." }
    },
    question_2: {
        '8': { question: { neutral: 'How long does it take for the moon to orbit the Earth?' }, option_a: 'About a day', option_b: 'About a month', teaching_a: 'It takes about a day for the Earth to spin around once, but the moon takes longer to travel around us.', teaching_b: 'That\'s right! The word "month" even comes from the word "moon"!' }
    },
    question_3: {
        '8': { question: { neutral: 'Have people ever walked on the moon?' }, option_a: 'No, it is too far away', option_b: 'Yes, astronauts have walked on it', teaching_a: 'It is very far, but brave astronauts have traveled there and back!', teaching_b: 'Correct! The Apollo missions took astronauts to the moon and they even brought back moon rocks!' }
    },
    wisdom: {
        'all': {
            neutral: 'The moon reminds us that even in darkness, there is light.',
            fun: 'The moon is like a giant disco ball in the sky! Shine on!',
            grandmother: 'Like the moon, you go through phases. Be patient with yourself.'
        }
    }
};

class AISynthesisEngine {
    static async generateContent({ topic, contentType, age, tone }) {
        console.log(`SYNTHESIZING: ${topic} - ${contentType} for age ${age} in a ${tone} tone.`);
        
        if (topic === 'the-moon') {
            if (contentType.startsWith('question_')) {
                const qKey = contentType.substring(0, 10); // "question_1", "question_2", etc.
                const contentSubType = contentType.substring(11); // "question", "option_a", etc.
                const q_data = moonContentLibrary[qKey] && (moonContentLibrary[qKey][age] || moonContentLibrary[qKey]['8']);
                
                if (!q_data) return { display_text: `Missing data for ${qKey}`, voice_over_script: `Missing data for ${qKey}`};

                if (contentSubType === 'question') return { display_text: q_data.question[tone] || q_data.question.neutral, voice_over_script: q_data.question[tone] || q_data.question.neutral };
                if (contentSubType === 'option_a') return { display_text: q_data.option_a, voice_over_script: q_data.option_a };
                if (contentSubType === 'option_b') return { display_text: q_data.option_b, voice_over_script: q_data.option_b };
                if (contentSubType === 'teaching_a') return { display_text: q_data.teaching_a, voice_over_script: q_data.teaching_a };
                if (contentSubType === 'teaching_b') return { display_text: q_data.teaching_b, voice_over_script: q_data.teaching_b };
            } else {
                 const text = moonContentLibrary[contentType][age][tone] || `Generated content for ${contentType}`;
                 return { display_text: text, voice_over_script: text };
            }
        }

        const fallbackText = `[${tone}] AI-generated content for ${topic}: ${contentType} for age ${age}.`;
        return { display_text: fallbackText, voice_over_script: fallbackText };
    }
}

module.exports = AISynthesisEngine;
