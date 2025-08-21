/**
 * Synthesis API Handler
 * Secure Claude API proxy with caching and rate limiting
 */

export async function handleSynthesisAPI(request, env, ctx) {
  const url = new URL(request.url);
  
  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateLimitKey = `rate_limit:${clientIP}`;
  const currentRequests = await env.ILEARNHOW_CACHE.get(rateLimitKey) || 0;
  
  if (currentRequests > 100) { // 100 requests per hour
    return new Response(JSON.stringify({
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please try again later.'
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Increment rate limit counter
  await env.ILEARNHOW_CACHE.put(rateLimitKey, currentRequests + 1, { expirationTtl: 3600 });

  if (request.method === 'POST') {
    try {
      const { day, age, tone, topic, language = 'english' } = await request.json();
      
      // Validate parameters
      if (!day || !age || !tone || !topic) {
        return new Response(JSON.stringify({
          error: 'Missing required parameters',
          required: ['day', 'age', 'tone', 'topic']
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Check cache first
      const cacheKey = `synthesis:${day}:${age}:${tone}:${topic}:${language}`;
      const cachedResult = await env.ILEARNHOW_CACHE.get(cacheKey);
      
      if (cachedResult) {
        return new Response(cachedResult, {
          headers: { 
            'Content-Type': 'application/json',
            'X-Cache': 'HIT'
          }
        });
      }

      // Generate Claude API prompt
      const prompt = generateSynthesisPrompt(day, age, tone, topic, language);
      
      // Call Claude API
      const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!claudeResponse.ok) {
        const errorData = await claudeResponse.json().catch(() => ({}));
        throw new Error(`Claude API error: ${claudeResponse.status} - ${errorData.error?.message || claudeResponse.statusText}`);
      }

      const claudeData = await claudeResponse.json();
      
      if (!claudeData.content || !claudeData.content[0] || !claudeData.content[0].text) {
        throw new Error('Invalid response format from Claude API');
      }

      // Format response
      const result = {
        title: `Day ${day}: ${topic}`,
        content: claudeData.content[0].text,
        metadata: {
          day,
          age,
          tone,
          topic,
          language,
          generated: new Date().toISOString(),
          model: "claude-3-5-sonnet-20241022",
          tokens: claudeData.usage?.output_tokens || 0,
          synthesisMethod: 'claude-api',
          cacheHit: false
        }
      };

      // Cache the result for 24 hours
      await env.ILEARNHOW_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 });

      // Queue background job for analytics (if available)
      if (env.ILEARNHOW_QUEUE) {
        try {
          await env.ILEARNHOW_QUEUE.send({
            type: 'synthesis_completed',
            data: {
              day,
              age,
              tone,
              topic,
              tokens: claudeData.usage?.output_tokens || 0,
              timestamp: Date.now()
            }
          });
        } catch (error) {
          console.warn('Queue not available:', error.message);
        }
      }

      return new Response(JSON.stringify(result), {
        headers: { 
          'Content-Type': 'application/json',
          'X-Cache': 'MISS'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Synthesis failed',
        message: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({
    error: 'Method not allowed',
    allowed: ['POST']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

function generateSynthesisPrompt(day, age, tone, topic, language) {
  const ageGroup = getAgeGroup(age);
  const toneDescription = getToneDescription(tone);
  
  return `Create an educational lesson about "${topic}" for day ${day} of a 366-day learning journey.

TARGET AUDIENCE:
- Age: ${age} years old (${ageGroup})
- Tone: ${toneDescription}
- Language: ${language}

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

function getAgeGroup(age) {
  if (age < 6) return 'early childhood (3-5 years)';
  if (age < 12) return 'middle childhood (6-11 years)';
  if (age < 18) return 'adolescence (12-17 years)';
  return 'adulthood (18+ years)';
}

function getToneDescription(tone) {
  const tones = {
    'grandmother': 'warm, nurturing, and patient with gentle explanations and encouraging words',
    'fun': 'energetic, exciting, and engaging with lots of enthusiasm and interactive elements',
    'neutral': 'clear, educational, and balanced with straightforward explanations',
    'scientific': 'precise, analytical, and evidence-based with detailed explanations',
    'storyteller': 'narrative-driven, imaginative, and captivating with rich descriptions'
  };
  return tones[tone] || tones.neutral;
} 