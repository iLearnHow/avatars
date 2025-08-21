/**
 * Claude API Synthesis Engine
 * Real content generation using Anthropic's Claude API
 * @author iLearnHow
 * @version 1.0.0
 */

class ClaudeSynthesisEngine {
  constructor() {
    this.apiKey = null;
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-3-5-sonnet-20241022';
    this.maxTokens = 2000;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async synthesizeLesson(day, age, tone, topic) {
    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }

    const ageGroup = this.getAgeGroup(age);
    const toneDescription = this.getToneDescription(tone);
    
    const prompt = this.buildPrompt(day, age, ageGroup, tone, toneDescription, topic);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: this.maxTokens,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response format from Claude API');
      }

      return {
        title: `Day ${day}: ${topic}`,
        content: data.content[0].text,
        metadata: {
          day,
          age,
          tone,
          topic,
          generated: new Date().toISOString(),
          model: this.model,
          tokens: data.usage?.output_tokens || 0
        }
      };
    } catch (error) {
      console.error('Claude synthesis failed:', error);
      throw new Error(`Content generation failed: ${error.message}`);
    }
  }

  getAgeGroup(age) {
    if (age < 6) return 'early childhood (3-5 years)';
    if (age < 12) return 'middle childhood (6-11 years)';
    if (age < 18) return 'adolescence (12-17 years)';
    return 'adulthood (18+ years)';
  }

  getToneDescription(tone) {
    const tones = {
      'grandmother': 'warm, nurturing, and patient with gentle explanations and encouraging words',
      'fun': 'energetic, exciting, and engaging with lots of enthusiasm and interactive elements',
      'neutral': 'clear, educational, and balanced with straightforward explanations',
      'scientific': 'precise, analytical, and evidence-based with detailed explanations',
      'storyteller': 'narrative-driven, imaginative, and captivating with rich descriptions'
    };
    return tones[tone] || tones.neutral;
  }

  buildPrompt(day, age, ageGroup, tone, toneDescription, topic) {
    return `Create an educational lesson about "${topic}" for day ${day} of a 366-day learning journey.

TARGET AUDIENCE:
- Age: ${age} years old (${ageGroup})
- Tone: ${toneDescription}

LESSON REQUIREMENTS:
1. INTRODUCTION (2-3 sentences)
   - Hook the learner's interest
   - Connect to their daily life
   - Set clear learning expectations

2. CORE CONCEPT EXPLANATION (4-6 sentences)
   - Explain the main idea clearly
   - Use age-appropriate language
   - Include key vocabulary
   - Make it relatable and understandable

3. REAL-WORLD EXAMPLES (2-3 examples)
   - Show how this concept appears in everyday life
   - Use concrete, familiar situations
   - Age-appropriate scenarios

4. INTERACTIVE ELEMENTS
   - Include 2-3 reflection questions
   - Add a simple activity or experiment
   - Encourage critical thinking

5. KEY TAKEAWAYS (3-4 bullet points)
   - Summarize main learning points
   - Make them memorable and actionable

FORMAT GUIDELINES:
- Use the exact tone specified: ${toneDescription}
- Keep language appropriate for ${age}-year-olds
- Make it engaging and interactive
- Include natural transitions between sections
- End with an encouraging note

RESPONSE FORMAT:
Return the lesson content in a clear, well-structured format that flows naturally from introduction to conclusion. Make it feel like a real teacher speaking directly to the learner.`;
  }

  // Fallback method for when API is not available
  async synthesizeLessonFallback(day, age, tone, topic) {
    const fallbackContent = `Day ${day}: ${topic}

Welcome to today's lesson about ${topic}! This is an exciting topic that we'll explore together.

What is ${topic}? It's something that affects our daily lives in many ways. Think about how ${topic} connects to things you see around you every day.

Here are some examples of ${topic} in the real world:
- Example 1: [Real-world connection]
- Example 2: [Everyday application]
- Example 3: [Personal relevance]

Let's think about this together:
• How does ${topic} make a difference in your life?
• What questions do you have about ${topic}?
• How could you share what you learned about ${topic} with others?

Key things to remember:
• ${topic} is important because...
• You can see ${topic} in action when...
• Understanding ${topic} helps you...

Great job exploring ${topic} today! Keep your curiosity alive and keep learning!`;

    return {
      title: `Day ${day}: ${topic}`,
      content: fallbackContent,
      metadata: {
        day,
        age,
        tone,
        topic,
        generated: new Date().toISOString(),
        fallback: true
      }
    };
  }
}

export default ClaudeSynthesisEngine; 