const fs = require('fs');

// Complete lesson generator for all 108 variants
function generateCompleteLesson() {
    const ages = [6, 12, 18, 30, 50, 80];
    const tones = ['neutral', 'fun', 'grandmother'];
    const languages = ['english', 'spanish', 'french'];
    const avatars = ['kelly', 'kyle'];
    
    const lesson = {
        day: 1,
        title: "The Sun - Our Magnificent Life-Giving Star",
        learning_objective: "Understand how scientific observation and measurement create shared global knowledge that transcends cultural and political boundaries, demonstrating how evidence-based thinking builds confidence in democratic decision-making.",
        elevenlabs_config: {
            api_key: "sk_3860d1857db72bcc1c01b47609f7af5ed6d61271d6087b81",
            voices: {
                kelly: "wAdymQH5YucAkXwmrdL0",
                kyle: "fwrgq8CiDS7IPcDlFxgd"
            }
        },
        variants: {}
    };

    // Generate content for each age group
    const ageContent = {
        6: {
            neutral: {
                voiceOver: "Hello little one! I'm {avatar}, your learning friend. Today we're going to learn about the sun - that big, bright ball in the sky that makes everything warm and helps plants grow!",
                onScreen: "Today's Topic: The Sun\n\nLearning Goal: Understanding how the sun helps Earth\n\nKey Points:\n• The sun is bright and warm\n• It helps plants grow\n• It gives us light during the day\n• It's very far away but very important",
                lessonLogic: "🧠 Simple Concepts with Magical Approach\n\nThe sun is like a magical friend that helps everything on Earth. Just like how you need food to grow, plants need sunlight to make their food.",
                questions: [
                    {
                        question: "What is the sun?",
                        choices: ["A bright ball in the sky that helps Earth", "A planet like Earth"],
                        feedback: "Great job! The sun is a bright ball in the sky that helps Earth. It's not a planet - it's actually a star that gives us light and warmth!"
                    }
                ],
                feedback: { message: "You're doing amazing! Your curiosity about the sun shows you're a great learner." },
                fortune: { message: "Your bright curiosity shines like the sun! Keep exploring and learning!" }
            },
            fun: {
                voiceOver: "Hi there, little explorer! I'm {avatar}, and we're going to have so much fun learning about the sun today! It's like a giant, friendly fireball in space that gives us amazing light shows every day.",
                onScreen: "Today's Adventure: The Sun\n\nFun Learning Goal: Discovering our amazing star\n\nCool Facts:\n• The sun is like a giant fireball\n• It makes beautiful rainbows\n• It helps plants grow super fast\n• It's Earth's best friend in space",
                lessonLogic: "🧠 Fun-First Learning with Wonder\n\nThe sun is like Earth's very own superhero! It's so powerful that it can make plants grow from tiny seeds into big, beautiful trees.",
                questions: [
                    {
                        question: "What does the sun do that's super cool?",
                        choices: ["It makes rainbows and helps plants grow", "It makes it rain all the time"],
                        feedback: "Awesome! The sun makes beautiful rainbows and helps plants grow super fast. It's like a magical plant food!"
                    }
                ],
                feedback: { message: "You're absolutely fantastic! Your excitement about learning makes everything so much fun." },
                fortune: { message: "Your joy and excitement shine as bright as the sun! Keep exploring and having fun!" }
            },
            grandmother: {
                voiceOver: "Hello, my precious little one! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the beautiful story of how the sun takes care of us like a loving grandparent.",
                onScreen: "Today's Story: The Sun - Our Loving Caregiver\n\nLearning with Love: Understanding how the sun cares for us\n\nBeautiful Lessons:\n• The sun rises every day like clockwork\n• It gives us warmth like a loving hug\n• It helps everything grow and bloom\n• It never forgets to shine on us",
                lessonLogic: "🧠 Nurturing Learning with Love\n\nThe sun is like a loving grandparent who never forgets to take care of us. Every morning, it rises without fail to give us light and warmth.",
                questions: [
                    {
                        question: "How does the sun show us love?",
                        choices: ["It rises every day and gives us warmth", "It makes it rain sometimes"],
                        feedback: "Beautiful answer! The sun shows us love by rising every single day and giving us warmth and light. It never forgets to take care of us!"
                    }
                ],
                feedback: { message: "You have such a beautiful, loving heart! Your understanding of how the sun cares for us shows you're growing into a wonderful, caring person." },
                fortune: { message: "Your loving heart shines as bright as the sun! You're going to grow into someone who cares for others just like the sun cares for Earth." }
            }
        },
        12: {
            neutral: {
                voiceOver: "Welcome! I'm {avatar}, your learning guide. Today we're exploring the sun - our magnificent life-giving star. This stellar body, located 93 million miles from Earth, is the primary energy source for our planet.",
                onScreen: "Today's Topic: The Sun - Our Magnificent Life-Giving Star\n\nLearning Objective: Understanding how scientific observation and measurement create shared global knowledge\n\nKey Concepts:\n• Stellar physics and nuclear fusion\n• Solar energy and Earth's climate\n• Scientific methodology and evidence-based thinking\n• Global knowledge systems",
                lessonLogic: "🧠 Comprehensive Scientific Understanding with Global Context\n\nThe sun represents humanity's first and most fundamental scientific observation. Ancient civilizations across cultures recognized the sun's importance.",
                questions: [
                    {
                        question: "What is the primary energy source for Earth?",
                        choices: ["The sun through nuclear fusion", "Geothermal energy from Earth's core"],
                        feedback: "Correct! The sun is Earth's primary energy source through nuclear fusion. This process converts hydrogen to helium, releasing energy that sustains all life on our planet."
                    }
                ],
                feedback: { message: "Excellent work! Your understanding of the sun's role in both scientific methodology and global knowledge systems demonstrates sophisticated critical thinking." },
                fortune: { message: "Your analytical mind shines like the sun's light - illuminating complex concepts and revealing deeper understanding." }
            },
            fun: {
                voiceOver: "Hey there, explorer! I'm {avatar}, and we're about to go on an amazing adventure to learn about the sun - the most powerful star in our solar system! This giant ball of fire is 93 million miles away, but it's so bright and hot that it lights up our entire planet and keeps us warm. Pretty cool, right?",
                onScreen: "Today's Adventure: The Sun\n\nMission: Understanding our star's power\n\nCool Facts:\n• The sun is 93 million miles away\n• It's so big, 1 million Earths could fit inside\n• It's been shining for 4.6 billion years\n• It powers all life on Earth",
                lessonLogic: "🧠 Adventure-Based Learning with Real Science\n\nThe sun is like a giant nuclear power plant in space! It uses a process called nuclear fusion to turn hydrogen into helium, releasing massive amounts of energy.",
                questions: [
                    {
                        question: "How far away is the sun?",
                        choices: ["93 million miles away", "Just a few miles away"],
                        feedback: "Awesome! The sun is 93 million miles away. That's so far that light from the sun takes 8 minutes to reach Earth!"
                    }
                ],
                feedback: { message: "You're absolutely brilliant! Your enthusiasm for learning about the sun is contagious. Keep that curiosity burning bright!" },
                fortune: { message: "Your energy and curiosity shine as bright as the sun! You're going to discover amazing things about our universe!" }
            },
            grandmother: {
                voiceOver: "Hello, my dear! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the wisdom of understanding our magnificent star. The sun has been shining for billions of years, watching over Earth like a loving parent.",
                onScreen: "Today's Wisdom: The Sun - Our Magnificent Life-Giving Star\n\nLife Lesson: Understanding the balance of nature\n\nWisdom Points:\n• The sun's steady presence teaches patience\n• Its warmth reminds us of nature's generosity\n• Its light shows us the way forward\n• Its energy connects all living things",
                lessonLogic: "🧠 Wisdom-Based Learning with Life Experience\n\nThe sun teaches us profound lessons about life and nature. Just as the sun rises each day without fail, we too can find strength in consistency and reliability.",
                questions: [
                    {
                        question: "What does the sun teach us about life?",
                        choices: ["Consistency, generosity, and universal care", "Randomness and unpredictability"],
                        feedback: "Beautiful insight! The sun teaches us consistency, generosity, and universal care. It rises every day, shines on everyone equally, and nurtures all life."
                    }
                ],
                feedback: { message: "You have such a wise and beautiful heart! Your understanding of the sun's deeper lessons shows great insight and compassion." },
                fortune: { message: "Your wisdom shines like the sun's light - warm, steady, and illuminating the path for others." }
            }
        },
        18: {
            neutral: {
                voiceOver: "Welcome! I'm {avatar}, your learning guide. Today we're exploring the sun - our magnificent life-giving star. This stellar body, located 93 million miles from Earth, is the primary energy source for our planet. Through nuclear fusion, it converts hydrogen to helium, releasing energy that sustains all life on Earth.",
                onScreen: "Today's Topic: The Sun - Our Magnificent Life-Giving Star\n\nLearning Objective: Understanding how scientific observation and measurement create shared global knowledge\n\nKey Concepts:\n• Stellar physics and nuclear fusion\n• Solar energy and Earth's climate\n• Scientific methodology and evidence-based thinking\n• Global knowledge systems",
                lessonLogic: "🧠 Comprehensive Scientific Understanding with Global Context\n\nThe sun represents humanity's first and most fundamental scientific observation. Ancient civilizations across cultures - from Egyptian sun worship to Chinese solar calendars - recognized the sun's importance. This shared observation created a foundation for scientific methodology that transcends cultural boundaries.",
                questions: [
                    {
                        question: "What is the primary energy source for Earth?",
                        choices: ["The sun through nuclear fusion", "Geothermal energy from Earth's core"],
                        feedback: "Correct! The sun is Earth's primary energy source through nuclear fusion. This process converts hydrogen to helium, releasing energy that sustains all life on our planet."
                    }
                ],
                feedback: { message: "Excellent work! Your understanding of the sun's role in both scientific methodology and global knowledge systems demonstrates sophisticated critical thinking." },
                fortune: { message: "Your analytical mind shines like the sun's light - illuminating complex concepts and revealing deeper understanding." }
            },
            fun: {
                voiceOver: "Hey there, explorer! I'm {avatar}, and we're about to go on an amazing adventure to learn about the sun - the most powerful star in our solar system! This giant ball of fire is 93 million miles away, but it's so bright and hot that it lights up our entire planet and keeps us warm. Pretty cool, right?",
                onScreen: "Today's Adventure: The Sun\n\nMission: Understanding our star's power\n\nCool Facts:\n• The sun is 93 million miles away\n• It's so big, 1 million Earths could fit inside\n• It's been shining for 4.6 billion years\n• It powers all life on Earth",
                lessonLogic: "🧠 Adventure-Based Learning with Real Science\n\nThe sun is like a giant nuclear power plant in space! It uses a process called nuclear fusion to turn hydrogen into helium, releasing massive amounts of energy. This energy travels through space as light and heat, reaching Earth in just 8 minutes.",
                questions: [
                    {
                        question: "How far away is the sun?",
                        choices: ["93 million miles away", "Just a few miles away"],
                        feedback: "Awesome! The sun is 93 million miles away. That's so far that light from the sun takes 8 minutes to reach Earth!"
                    }
                ],
                feedback: { message: "You're absolutely brilliant! Your enthusiasm for learning about the sun is contagious. Keep that curiosity burning bright!" },
                fortune: { message: "Your energy and curiosity shine as bright as the sun! You're going to discover amazing things about our universe!" }
            },
            grandmother: {
                voiceOver: "Hello, my dear! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the wisdom of understanding our magnificent star. The sun has been shining for billions of years, watching over Earth like a loving parent, providing warmth and light to all living things.",
                onScreen: "Today's Wisdom: The Sun - Our Magnificent Life-Giving Star\n\nLife Lesson: Understanding the balance of nature\n\nWisdom Points:\n• The sun's steady presence teaches patience\n• Its warmth reminds us of nature's generosity\n• Its light shows us the way forward\n• Its energy connects all living things",
                lessonLogic: "🧠 Wisdom-Based Learning with Life Experience\n\nThe sun teaches us profound lessons about life and nature. Just as the sun rises each day without fail, we too can find strength in consistency and reliability. The sun doesn't discriminate - it shines on everyone equally, teaching us about fairness and universal care.",
                questions: [
                    {
                        question: "What does the sun teach us about life?",
                        choices: ["Consistency, generosity, and universal care", "Randomness and unpredictability"],
                        feedback: "Beautiful insight! The sun teaches us consistency, generosity, and universal care. It rises every day, shines on everyone equally, and nurtures all life."
                    }
                ],
                feedback: { message: "You have such a wise and beautiful heart! Your understanding of the sun's deeper lessons shows great insight and compassion." },
                fortune: { message: "Your wisdom shines like the sun's light - warm, steady, and illuminating the path for others." }
            }
        },
        30: {
            neutral: {
                voiceOver: "Welcome! I'm {avatar}, your learning guide. Today we're exploring the sun - our magnificent life-giving star. This stellar body, located 93 million miles from Earth, is the primary energy source for our planet. Through nuclear fusion, it converts hydrogen to helium, releasing energy that sustains all life on Earth.",
                onScreen: "Today's Topic: The Sun - Our Magnificent Life-Giving Star\n\nLearning Objective: Understanding how scientific observation and measurement create shared global knowledge\n\nKey Concepts:\n• Stellar physics and nuclear fusion\n• Solar energy and Earth's climate\n• Scientific methodology and evidence-based thinking\n• Global knowledge systems",
                lessonLogic: "🧠 Comprehensive Scientific Understanding with Global Context\n\nThe sun represents humanity's first and most fundamental scientific observation. Ancient civilizations across cultures - from Egyptian sun worship to Chinese solar calendars - recognized the sun's importance. This shared observation created a foundation for scientific methodology that transcends cultural boundaries.",
                questions: [
                    {
                        question: "What is the primary energy source for Earth?",
                        choices: ["The sun through nuclear fusion", "Geothermal energy from Earth's core"],
                        feedback: "Correct! The sun is Earth's primary energy source through nuclear fusion. This process converts hydrogen to helium, releasing energy that sustains all life on our planet."
                    }
                ],
                feedback: { message: "Excellent work! Your understanding of the sun's role in both scientific methodology and global knowledge systems demonstrates sophisticated critical thinking." },
                fortune: { message: "Your analytical mind shines like the sun's light - illuminating complex concepts and revealing deeper understanding." }
            },
            fun: {
                voiceOver: "Hey there, explorer! I'm {avatar}, and we're about to go on an amazing adventure to learn about the sun - the most powerful star in our solar system! This giant ball of fire is 93 million miles away, but it's so bright and hot that it lights up our entire planet and keeps us warm. Pretty cool, right?",
                onScreen: "Today's Adventure: The Sun\n\nMission: Understanding our star's power\n\nCool Facts:\n• The sun is 93 million miles away\n• It's so big, 1 million Earths could fit inside\n• It's been shining for 4.6 billion years\n• It powers all life on Earth",
                lessonLogic: "🧠 Adventure-Based Learning with Real Science\n\nThe sun is like a giant nuclear power plant in space! It uses a process called nuclear fusion to turn hydrogen into helium, releasing massive amounts of energy. This energy travels through space as light and heat, reaching Earth in just 8 minutes.",
                questions: [
                    {
                        question: "How far away is the sun?",
                        choices: ["93 million miles away", "Just a few miles away"],
                        feedback: "Awesome! The sun is 93 million miles away. That's so far that light from the sun takes 8 minutes to reach Earth!"
                    }
                ],
                feedback: { message: "You're absolutely brilliant! Your enthusiasm for learning about the sun is contagious. Keep that curiosity burning bright!" },
                fortune: { message: "Your energy and curiosity shine as bright as the sun! You're going to discover amazing things about our universe!" }
            },
            grandmother: {
                voiceOver: "Hello, my dear! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the wisdom of understanding our magnificent star. The sun has been shining for billions of years, watching over Earth like a loving parent, providing warmth and light to all living things.",
                onScreen: "Today's Wisdom: The Sun - Our Magnificent Life-Giving Star\n\nLife Lesson: Understanding the balance of nature\n\nWisdom Points:\n• The sun's steady presence teaches patience\n• Its warmth reminds us of nature's generosity\n• Its light shows us the way forward\n• Its energy connects all living things",
                lessonLogic: "🧠 Wisdom-Based Learning with Life Experience\n\nThe sun teaches us profound lessons about life and nature. Just as the sun rises each day without fail, we too can find strength in consistency and reliability. The sun doesn't discriminate - it shines on everyone equally, teaching us about fairness and universal care.",
                questions: [
                    {
                        question: "What does the sun teach us about life?",
                        choices: ["Consistency, generosity, and universal care", "Randomness and unpredictability"],
                        feedback: "Beautiful insight! The sun teaches us consistency, generosity, and universal care. It rises every day, shines on everyone equally, and nurtures all life."
                    }
                ],
                feedback: { message: "You have such a wise and beautiful heart! Your understanding of the sun's deeper lessons shows great insight and compassion." },
                fortune: { message: "Your wisdom shines like the sun's light - warm, steady, and illuminating the path for others." }
            }
        },
        50: {
            neutral: {
                voiceOver: "Welcome! I'm {avatar}, your learning guide. Today we're exploring the sun - our magnificent life-giving star. This stellar body, located 93 million miles from Earth, is the primary energy source for our planet. Through nuclear fusion, it converts hydrogen to helium, releasing energy that sustains all life on Earth.",
                onScreen: "Today's Topic: The Sun - Our Magnificent Life-Giving Star\n\nLearning Objective: Understanding how scientific observation and measurement create shared global knowledge\n\nKey Concepts:\n• Stellar physics and nuclear fusion\n• Solar energy and Earth's climate\n• Scientific methodology and evidence-based thinking\n• Global knowledge systems",
                lessonLogic: "🧠 Comprehensive Scientific Understanding with Global Context\n\nThe sun represents humanity's first and most fundamental scientific observation. Ancient civilizations across cultures - from Egyptian sun worship to Chinese solar calendars - recognized the sun's importance. This shared observation created a foundation for scientific methodology that transcends cultural boundaries.",
                questions: [
                    {
                        question: "What is the primary energy source for Earth?",
                        choices: ["The sun through nuclear fusion", "Geothermal energy from Earth's core"],
                        feedback: "Correct! The sun is Earth's primary energy source through nuclear fusion. This process converts hydrogen to helium, releasing energy that sustains all life on our planet."
                    }
                ],
                feedback: { message: "Excellent work! Your understanding of the sun's role in both scientific methodology and global knowledge systems demonstrates sophisticated critical thinking." },
                fortune: { message: "Your analytical mind shines like the sun's light - illuminating complex concepts and revealing deeper understanding." }
            },
            fun: {
                voiceOver: "Hey there, explorer! I'm {avatar}, and we're about to go on an amazing adventure to learn about the sun - the most powerful star in our solar system! This giant ball of fire is 93 million miles away, but it's so bright and hot that it lights up our entire planet and keeps us warm. Pretty cool, right?",
                onScreen: "Today's Adventure: The Sun\n\nMission: Understanding our star's power\n\nCool Facts:\n• The sun is 93 million miles away\n• It's so big, 1 million Earths could fit inside\n• It's been shining for 4.6 billion years\n• It powers all life on Earth",
                lessonLogic: "🧠 Adventure-Based Learning with Real Science\n\nThe sun is like a giant nuclear power plant in space! It uses a process called nuclear fusion to turn hydrogen into helium, releasing massive amounts of energy. This energy travels through space as light and heat, reaching Earth in just 8 minutes.",
                questions: [
                    {
                        question: "How far away is the sun?",
                        choices: ["93 million miles away", "Just a few miles away"],
                        feedback: "Awesome! The sun is 93 million miles away. That's so far that light from the sun takes 8 minutes to reach Earth!"
                    }
                ],
                feedback: { message: "You're absolutely brilliant! Your enthusiasm for learning about the sun is contagious. Keep that curiosity burning bright!" },
                fortune: { message: "Your energy and curiosity shine as bright as the sun! You're going to discover amazing things about our universe!" }
            },
            grandmother: {
                voiceOver: "Hello, my dear! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the wisdom of understanding our magnificent star. The sun has been shining for billions of years, watching over Earth like a loving parent, providing warmth and light to all living things.",
                onScreen: "Today's Wisdom: The Sun - Our Magnificent Life-Giving Star\n\nLife Lesson: Understanding the balance of nature\n\nWisdom Points:\n• The sun's steady presence teaches patience\n• Its warmth reminds us of nature's generosity\n• Its light shows us the way forward\n• Its energy connects all living things",
                lessonLogic: "🧠 Wisdom-Based Learning with Life Experience\n\nThe sun teaches us profound lessons about life and nature. Just as the sun rises each day without fail, we too can find strength in consistency and reliability. The sun doesn't discriminate - it shines on everyone equally, teaching us about fairness and universal care.",
                questions: [
                    {
                        question: "What does the sun teach us about life?",
                        choices: ["Consistency, generosity, and universal care", "Randomness and unpredictability"],
                        feedback: "Beautiful insight! The sun teaches us consistency, generosity, and universal care. It rises every day, shines on everyone equally, and nurtures all life."
                    }
                ],
                feedback: { message: "You have such a wise and beautiful heart! Your understanding of the sun's deeper lessons shows great insight and compassion." },
                fortune: { message: "Your wisdom shines like the sun's light - warm, steady, and illuminating the path for others." }
            }
        },
        80: {
            neutral: {
                voiceOver: "Welcome! I'm {avatar}, your learning guide. Today we're exploring the sun - our magnificent life-giving star. This stellar body, located 93 million miles from Earth, is the primary energy source for our planet. Through nuclear fusion, it converts hydrogen to helium, releasing energy that sustains all life on Earth.",
                onScreen: "Today's Topic: The Sun - Our Magnificent Life-Giving Star\n\nLearning Objective: Understanding how scientific observation and measurement create shared global knowledge\n\nKey Concepts:\n• Stellar physics and nuclear fusion\n• Solar energy and Earth's climate\n• Scientific methodology and evidence-based thinking\n• Global knowledge systems",
                lessonLogic: "🧠 Comprehensive Scientific Understanding with Global Context\n\nThe sun represents humanity's first and most fundamental scientific observation. Ancient civilizations across cultures - from Egyptian sun worship to Chinese solar calendars - recognized the sun's importance. This shared observation created a foundation for scientific methodology that transcends cultural boundaries.",
                questions: [
                    {
                        question: "What is the primary energy source for Earth?",
                        choices: ["The sun through nuclear fusion", "Geothermal energy from Earth's core"],
                        feedback: "Correct! The sun is Earth's primary energy source through nuclear fusion. This process converts hydrogen to helium, releasing energy that sustains all life on our planet."
                    }
                ],
                feedback: { message: "Excellent work! Your understanding of the sun's role in both scientific methodology and global knowledge systems demonstrates sophisticated critical thinking." },
                fortune: { message: "Your analytical mind shines like the sun's light - illuminating complex concepts and revealing deeper understanding." }
            },
            fun: {
                voiceOver: "Hey there, explorer! I'm {avatar}, and we're about to go on an amazing adventure to learn about the sun - the most powerful star in our solar system! This giant ball of fire is 93 million miles away, but it's so bright and hot that it lights up our entire planet and keeps us warm. Pretty cool, right?",
                onScreen: "Today's Adventure: The Sun\n\nMission: Understanding our star's power\n\nCool Facts:\n• The sun is 93 million miles away\n• It's so big, 1 million Earths could fit inside\n• It's been shining for 4.6 billion years\n• It powers all life on Earth",
                lessonLogic: "🧠 Adventure-Based Learning with Real Science\n\nThe sun is like a giant nuclear power plant in space! It uses a process called nuclear fusion to turn hydrogen into helium, releasing massive amounts of energy. This energy travels through space as light and heat, reaching Earth in just 8 minutes.",
                questions: [
                    {
                        question: "How far away is the sun?",
                        choices: ["93 million miles away", "Just a few miles away"],
                        feedback: "Awesome! The sun is 93 million miles away. That's so far that light from the sun takes 8 minutes to reach Earth!"
                    }
                ],
                feedback: { message: "You're absolutely brilliant! Your enthusiasm for learning about the sun is contagious. Keep that curiosity burning bright!" },
                fortune: { message: "Your energy and curiosity shine as bright as the sun! You're going to discover amazing things about our universe!" }
            },
            grandmother: {
                voiceOver: "Hello, my dear! Come sit with me and let's learn about the sun together. I'm {avatar}, and I want to share with you the wisdom of understanding our magnificent star. The sun has been shining for billions of years, watching over Earth like a loving parent, providing warmth and light to all living things.",
                onScreen: "Today's Wisdom: The Sun - Our Magnificent Life-Giving Star\n\nLife Lesson: Understanding the balance of nature\n\nWisdom Points:\n• The sun's steady presence teaches patience\n• Its warmth reminds us of nature's generosity\n• Its light shows us the way forward\n• Its energy connects all living things",
                lessonLogic: "🧠 Wisdom-Based Learning with Life Experience\n\nThe sun teaches us profound lessons about life and nature. Just as the sun rises each day without fail, we too can find strength in consistency and reliability. The sun doesn't discriminate - it shines on everyone equally, teaching us about fairness and universal care.",
                questions: [
                    {
                        question: "What does the sun teach us about life?",
                        choices: ["Consistency, generosity, and universal care", "Randomness and unpredictability"],
                        feedback: "Beautiful insight! The sun teaches us consistency, generosity, and universal care. It rises every day, shines on everyone equally, and nurtures all life."
                    }
                ],
                feedback: { message: "You have such a wise and beautiful heart! Your understanding of the sun's deeper lessons shows great insight and compassion." },
                fortune: { message: "Your wisdom shines like the sun's light - warm, steady, and illuminating the path for others." }
            }
        }
    };

    // Generate all variants
    let variantCount = 0;
    for (const age of ages) {
        for (const tone of tones) {
            for (const language of languages) {
                for (const avatar of avatars) {
                    const variantKey = `${age}_${tone}_${avatar}_${language}`;
                    const content = ageContent[age][tone];
                    
                    // Replace avatar placeholder
                    const voiceOver = content.voiceOver.replace('{avatar}', avatar === 'kelly' ? 'Kelly' : 'Kyle');
                    
                    lesson.variants[variantKey] = {
                        content: {
                            ...content,
                            voiceOver: voiceOver
                        },
                        audio: {
                            voice_id: lesson.elevenlabs_config.voices[avatar],
                            stability: 0.5,
                            similarity_boost: 0.75,
                            style: 0.0,
                            use_speaker_boost: true
                        },
                        backgroundImages: {
                            intro: `/assets/avatars/${avatar}/sun-intro-${age === 6 ? 'child' : age === 12 ? 'youth' : age === 18 ? 'adult' : age === 30 ? 'professional' : age === 50 ? 'mature' : 'elderly'}${tone !== 'neutral' ? '-' + tone : ''}.jpg`,
                            question: `/assets/avatars/${avatar}/sun-question-${age === 6 ? 'child' : age === 12 ? 'youth' : age === 18 ? 'adult' : age === 30 ? 'professional' : age === 50 ? 'mature' : 'elderly'}${tone !== 'neutral' ? '-' + tone : ''}.jpg`,
                            feedback: `/assets/avatars/${avatar}/sun-feedback-${age === 6 ? 'child' : age === 12 ? 'youth' : age === 18 ? 'adult' : age === 30 ? 'professional' : age === 50 ? 'mature' : 'elderly'}${tone !== 'neutral' ? '-' + tone : ''}.jpg`,
                            fortune: `/assets/avatars/${avatar}/sun-fortune-${age === 6 ? 'child' : age === 12 ? 'youth' : age === 18 ? 'adult' : age === 30 ? 'professional' : age === 50 ? 'mature' : 'elderly'}${tone !== 'neutral' ? '-' + tone : ''}.jpg`
                        }
                    };
                    
                    variantCount++;
                }
            }
        }
    }

    console.log(`Generated ${variantCount} variants for Day 1 lesson`);
    return lesson;
}

// Generate and save the complete lesson
const completeLesson = generateCompleteLesson();
fs.writeFileSync('complete-lesson-day-1.json', JSON.stringify(completeLesson, null, 2));
console.log('✅ Complete lesson saved to complete-lesson-day-1.json');
console.log(`📊 Total variants: ${Object.keys(completeLesson.variants).length}`);
console.log('🎯 Ready for production testing!'); 