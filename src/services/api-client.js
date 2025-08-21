/**
 * API Client for iLearnHow Enterprise Synthesis Platform
 * Communicates with the deployed Cloudflare Worker
 * @version 1.0.0
 * @author iLearnHow
 */

class APIClient {
  constructor() {
    // Use the deployed Cloudflare Worker URL
    this.baseUrl = 'https://ilearnhow-enterprise-synthesis.nicoletterankin.workers.dev';
    this.clientId = this.generateClientId();
  }

  /**
   * Generate a unique client ID for rate limiting
   */
  generateClientId() {
    // Try to get from localStorage first
    let clientId = localStorage.getItem('ilearnhow-client-id');
    if (!clientId) {
      // Generate new client ID
      clientId = 'client_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('ilearnhow-client-id', clientId);
    }
    return clientId;
  }

  /**
   * Check if the API is healthy
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }

  /**
   * Synthesize a lesson using the deployed worker
   */
  async synthesizeLesson(lessonContent, age, tone) {
    try {
      const startTime = performance.now();
      
      const requestBody = {
        lessonContent,
        age,
        tone,
        clientId: this.clientId
      };
      
      console.log('API Request Body:', requestBody);
      
      const response = await fetch(`${this.baseUrl}/api/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      const synthesisTime = performance.now() - startTime;

      return {
        title: `Personalized Lesson for Age ${age}`,
        content: data.content,
        metadata: {
          age,
          tone,
          synthesisTime: data.synthesisTime || synthesisTime,
          cost: data.cost,
          cached: data.cached,
          generated: new Date().toISOString(),
          clientId: this.clientId
        }
      };

    } catch (error) {
      console.error('Synthesis API call failed:', error);
      throw error;
    }
  }

  /**
   * Get synthesis statistics
   */
  async getStats() {
    try {
      const response = await fetch(`${this.baseUrl}/api/stats`);
      if (!response.ok) {
        throw new Error(`Stats request failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stats API call failed:', error);
      throw error;
    }
  }

  /**
   * Test the API connection
   */
  async testConnection() {
    try {
      const health = await this.checkHealth();
      console.log('API Health Check:', health);
      return true;
    } catch (error) {
      console.error('API Connection Test Failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient(); 