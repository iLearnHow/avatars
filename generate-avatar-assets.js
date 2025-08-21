/**
 * Avatar Asset Generator for iLearnHow
 * Generates all 12 mood-specific avatar images for each lesson
 * - 9 base combinations (3 ages × 3 tones)
 * - 3 additional states (introduction, conclusion, reflection)
 * - Each with unique expressions, backgrounds, and poses
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

class AvatarAssetGenerator {
    constructor() {
        this.avatarMoods = this.initializeAvatarMoods();
        this.outputDir = 'dist/assets/avatars';
        this.ensureOutputDirectory();
    }

    /**
     * Initialize all 12 avatar mood states with visual specifications
     */
    initializeAvatarMoods() {
        return {
            // Base 9 combinations (3 ages × 3 tones)
            'early_childhood_grandmother': {
                avatar: 'kelly',
                expression: 'warm_nurturing',
                background: 'warm_sunset',
                pose: 'gentle_caring',
                colors: {
                    primary: '#FF6B9D',
                    secondary: '#FFB3D1',
                    background: '#FFE4E1',
                    accent: '#FF8A80'
                },
                expression: {
                    eyes: 'soft_warm',
                    mouth: 'gentle_smile',
                    eyebrows: 'caring_arched'
                }
            },
            'early_childhood_fun': {
                avatar: 'ken',
                expression: 'excited_playful',
                background: 'bright_energy',
                pose: 'animated_gestures',
                colors: {
                    primary: '#4ECDC4',
                    secondary: '#45B7D1',
                    background: '#E0F7FA',
                    accent: '#00BCD4'
                },
                expression: {
                    eyes: 'bright_excited',
                    mouth: 'wide_smile',
                    eyebrows: 'raised_enthusiastic'
                }
            },
            'early_childhood_neutral': {
                avatar: 'kelly',
                expression: 'calm_educational',
                background: 'soft_blue',
                pose: 'patient_teaching',
                colors: {
                    primary: '#90A4AE',
                    secondary: '#B0BEC5',
                    background: '#ECEFF1',
                    accent: '#78909C'
                },
                expression: {
                    eyes: 'focused_calm',
                    mouth: 'gentle_neutral',
                    eyebrows: 'level_attentive'
                }
            },
            'youth_grandmother': {
                avatar: 'kelly',
                expression: 'wise_caring',
                background: 'warm_amber',
                pose: 'experienced_guidance',
                colors: {
                    primary: '#FF9800',
                    secondary: '#FFB74D',
                    background: '#FFF3E0',
                    accent: '#F57C00'
                },
                expression: {
                    eyes: 'wise_knowing',
                    mouth: 'warm_smile',
                    eyebrows: 'experienced_curved'
                }
            },
            'youth_fun': {
                avatar: 'ken',
                expression: 'energetic_adventurous',
                background: 'dynamic_orange',
                pose: 'enthusiastic_exploration',
                colors: {
                    primary: '#FF5722',
                    secondary: '#FF8A65',
                    background: '#FBE9E7',
                    accent: '#D84315'
                },
                expression: {
                    eyes: 'adventurous_sparkling',
                    mouth: 'enthusiastic_grin',
                    eyebrows: 'excited_raised'
                }
            },
            'youth_neutral': {
                avatar: 'kelly',
                expression: 'clear_focused',
                background: 'professional_blue',
                pose: 'attentive_teaching',
                colors: {
                    primary: '#2196F3',
                    secondary: '#64B5F6',
                    background: '#E3F2FD',
                    accent: '#1976D2'
                },
                expression: {
                    eyes: 'clear_focused',
                    mouth: 'professional_neutral',
                    eyebrows: 'attentive_level'
                }
            },
            'young_adult_grandmother': {
                avatar: 'kelly',
                expression: 'experienced_nurturing',
                background: 'mature_gold',
                pose: 'supportive_guidance',
                colors: {
                    primary: '#FFC107',
                    secondary: '#FFD54F',
                    background: '#FFF8E1',
                    accent: '#FF8F00'
                },
                expression: {
                    eyes: 'experienced_warm',
                    mouth: 'supportive_smile',
                    eyebrows: 'mature_gentle'
                }
            },
            'young_adult_fun': {
                avatar: 'ken',
                expression: 'enthusiastic_discovery',
                background: 'vibrant_green',
                pose: 'curious_exploration',
                colors: {
                    primary: '#4CAF50',
                    secondary: '#81C784',
                    background: '#E8F5E8',
                    accent: '#388E3C'
                },
                expression: {
                    eyes: 'curious_bright',
                    mouth: 'enthusiastic_smile',
                    eyebrows: 'exploring_raised'
                }
            },
            'young_adult_neutral': {
                avatar: 'kelly',
                expression: 'professional_educational',
                background: 'clean_white',
                pose: 'confident_teaching',
                colors: {
                    primary: '#607D8B',
                    secondary: '#90A4AE',
                    background: '#FAFAFA',
                    accent: '#455A64'
                },
                expression: {
                    eyes: 'professional_focused',
                    mouth: 'confident_neutral',
                    eyebrows: 'professional_level'
                }
            },
            // Additional 3 states
            'introduction': {
                avatar: 'kelly',
                expression: 'welcoming_engaging',
                background: 'inviting_warmth',
                pose: 'open_invitation',
                colors: {
                    primary: '#E91E63',
                    secondary: '#F48FB1',
                    background: '#FCE4EC',
                    accent: '#C2185B'
                },
                expression: {
                    eyes: 'welcoming_open',
                    mouth: 'inviting_smile',
                    eyebrows: 'welcoming_arched'
                }
            },
            'conclusion': {
                avatar: 'ken',
                expression: 'satisfied_accomplished',
                background: 'achievement_gold',
                pose: 'proud_completion',
                colors: {
                    primary: '#FFD700',
                    secondary: '#FFE082',
                    background: '#FFFDE7',
                    accent: '#FFB300'
                },
                expression: {
                    eyes: 'satisfied_proud',
                    mouth: 'accomplished_smile',
                    eyebrows: 'proud_arched'
                }
            },
            'reflection': {
                avatar: 'kelly',
                expression: 'thoughtful_contemplative',
                background: 'contemplative_purple',
                pose: 'reflective_introspection',
                colors: {
                    primary: '#9C27B0',
                    secondary: '#BA68C8',
                    background: '#F3E5F5',
                    accent: '#7B1FA2'
                },
                expression: {
                    eyes: 'thoughtful_contemplative',
                    mouth: 'reflective_neutral',
                    eyebrows: 'contemplative_curved'
                }
            }
        };
    }

    /**
     * Ensure output directory exists
     */
    ensureOutputDirectory() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Generate all avatar assets for a lesson
     */
    async generateAllAvatarAssets(lessonDay, topic) {
        console.log(`🎨 Generating avatar assets for lesson ${lessonDay}: ${topic}`);
        
        const generatedAssets = [];
        
        for (const [moodKey, moodSpec] of Object.entries(this.avatarMoods)) {
            console.log(`👤 Generating avatar for mood: ${moodKey}`);
            
            const avatarImage = await this.generateAvatarImage(moodKey, moodSpec, lessonDay, topic);
            generatedAssets.push({
                mood: moodKey,
                avatar: moodSpec.avatar,
                expression: moodSpec.expression,
                background: moodSpec.background,
                pose: moodSpec.pose,
                imagePath: avatarImage
            });
        }
        
        console.log(`✅ Generated ${generatedAssets.length} avatar assets`);
        return generatedAssets;
    }

    /**
     * Generate a single avatar image
     */
    async generateAvatarImage(moodKey, moodSpec, lessonDay, topic) {
        const canvas = createCanvas(400, 400);
        const ctx = canvas.getContext('2d');
        
        // Set background
        this.drawBackground(ctx, moodSpec);
        
        // Draw avatar base
        this.drawAvatarBase(ctx, moodSpec);
        
        // Draw expression
        this.drawExpression(ctx, moodSpec);
        
        // Draw pose elements
        this.drawPose(ctx, moodSpec);
        
        // Add lesson info
        this.drawLessonInfo(ctx, lessonDay, topic, moodKey);
        
        // Save image
        const filename = `${moodSpec.avatar}_${moodKey}_day${lessonDay}.jpg`;
        const filepath = path.join(this.outputDir, filename);
        
        const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
        fs.writeFileSync(filepath, buffer);
        
        console.log(`💾 Saved avatar: ${filename}`);
        return filepath;
    }

    /**
     * Draw background based on mood
     */
    drawBackground(ctx, moodSpec) {
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        
        switch (moodSpec.background) {
            case 'warm_sunset':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'bright_energy':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(0.5, moodSpec.colors.secondary);
                gradient.addColorStop(1, moodSpec.colors.accent);
                break;
            case 'soft_blue':
                gradient.addColorStop(0, moodSpec.colors.background);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'warm_amber':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'dynamic_orange':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(0.7, moodSpec.colors.secondary);
                gradient.addColorStop(1, moodSpec.colors.accent);
                break;
            case 'professional_blue':
                gradient.addColorStop(0, moodSpec.colors.background);
                gradient.addColorStop(1, moodSpec.colors.primary);
                break;
            case 'mature_gold':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'vibrant_green':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(0.5, moodSpec.colors.secondary);
                gradient.addColorStop(1, moodSpec.colors.accent);
                break;
            case 'clean_white':
                gradient.addColorStop(0, moodSpec.colors.background);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'inviting_warmth':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
            case 'achievement_gold':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(0.5, moodSpec.colors.secondary);
                gradient.addColorStop(1, moodSpec.colors.accent);
                break;
            case 'contemplative_purple':
                gradient.addColorStop(0, moodSpec.colors.primary);
                gradient.addColorStop(1, moodSpec.colors.secondary);
                break;
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
    }

    /**
     * Draw avatar base (head, body)
     */
    drawAvatarBase(ctx, moodSpec) {
        const isKelly = moodSpec.avatar === 'kelly';
        
        // Draw head
        ctx.fillStyle = isKelly ? '#FFE0B2' : '#D7CCC8';
        ctx.beginPath();
        ctx.arc(200, 150, 80, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw body
        ctx.fillStyle = moodSpec.colors.primary;
        ctx.fillRect(140, 230, 120, 120);
        
        // Draw arms
        ctx.fillStyle = moodSpec.colors.secondary;
        ctx.fillRect(120, 240, 30, 80);
        ctx.fillRect(250, 240, 30, 80);
    }

    /**
     * Draw expression based on mood
     */
    drawExpression(ctx, moodSpec) {
        const centerX = 200;
        const centerY = 150;
        
        // Draw eyes
        ctx.fillStyle = '#000';
        ctx.lineWidth = 2;
        
        switch (moodSpec.expression.eyes) {
            case 'soft_warm':
                this.drawSoftEyes(ctx, centerX, centerY);
                break;
            case 'bright_excited':
                this.drawBrightEyes(ctx, centerX, centerY);
                break;
            case 'focused_calm':
                this.drawFocusedEyes(ctx, centerX, centerY);
                break;
            case 'wise_knowing':
                this.drawWiseEyes(ctx, centerX, centerY);
                break;
            case 'adventurous_sparkling':
                this.drawAdventurousEyes(ctx, centerX, centerY);
                break;
            case 'clear_focused':
                this.drawClearEyes(ctx, centerX, centerY);
                break;
            case 'experienced_warm':
                this.drawExperiencedEyes(ctx, centerX, centerY);
                break;
            case 'curious_bright':
                this.drawCuriousEyes(ctx, centerX, centerY);
                break;
            case 'professional_focused':
                this.drawProfessionalEyes(ctx, centerX, centerY);
                break;
            case 'welcoming_open':
                this.drawWelcomingEyes(ctx, centerX, centerY);
                break;
            case 'satisfied_proud':
                this.drawSatisfiedEyes(ctx, centerX, centerY);
                break;
            case 'thoughtful_contemplative':
                this.drawThoughtfulEyes(ctx, centerX, centerY);
                break;
        }
        
        // Draw mouth
        switch (moodSpec.expression.mouth) {
            case 'gentle_smile':
                this.drawGentleSmile(ctx, centerX, centerY);
                break;
            case 'wide_smile':
                this.drawWideSmile(ctx, centerX, centerY);
                break;
            case 'gentle_neutral':
                this.drawGentleNeutral(ctx, centerX, centerY);
                break;
            case 'warm_smile':
                this.drawWarmSmile(ctx, centerX, centerY);
                break;
            case 'enthusiastic_grin':
                this.drawEnthusiasticGrin(ctx, centerX, centerY);
                break;
            case 'professional_neutral':
                this.drawProfessionalNeutral(ctx, centerX, centerY);
                break;
            case 'supportive_smile':
                this.drawSupportiveSmile(ctx, centerX, centerY);
                break;
            case 'enthusiastic_smile':
                this.drawEnthusiasticSmile(ctx, centerX, centerY);
                break;
            case 'confident_neutral':
                this.drawConfidentNeutral(ctx, centerX, centerY);
                break;
            case 'inviting_smile':
                this.drawInvitingSmile(ctx, centerX, centerY);
                break;
            case 'accomplished_smile':
                this.drawAccomplishedSmile(ctx, centerX, centerY);
                break;
            case 'reflective_neutral':
                this.drawReflectiveNeutral(ctx, centerX, centerY);
                break;
        }
        
        // Draw eyebrows
        switch (moodSpec.expression.eyebrows) {
            case 'caring_arched':
                this.drawCaringEyebrows(ctx, centerX, centerY);
                break;
            case 'raised_enthusiastic':
                this.drawRaisedEyebrows(ctx, centerX, centerY);
                break;
            case 'level_attentive':
                this.drawLevelEyebrows(ctx, centerX, centerY);
                break;
            case 'experienced_curved':
                this.drawExperiencedEyebrows(ctx, centerX, centerY);
                break;
            case 'excited_raised':
                this.drawExcitedEyebrows(ctx, centerX, centerY);
                break;
            case 'attentive_level':
                this.drawAttentiveEyebrows(ctx, centerX, centerY);
                break;
            case 'mature_gentle':
                this.drawMatureEyebrows(ctx, centerX, centerY);
                break;
            case 'exploring_raised':
                this.drawExploringEyebrows(ctx, centerX, centerY);
                break;
            case 'professional_level':
                this.drawProfessionalEyebrows(ctx, centerX, centerY);
                break;
            case 'welcoming_arched':
                this.drawWelcomingEyebrows(ctx, centerX, centerY);
                break;
            case 'proud_arched':
                this.drawProudEyebrows(ctx, centerX, centerY);
                break;
            case 'contemplative_curved':
                this.drawContemplativeEyebrows(ctx, centerX, centerY);
                break;
        }
    }

    /**
     * Draw pose elements
     */
    drawPose(ctx, moodSpec) {
        const centerX = 200;
        const centerY = 150;
        
        switch (moodSpec.pose) {
            case 'gentle_caring':
                this.drawGentlePose(ctx, centerX, centerY);
                break;
            case 'animated_gestures':
                this.drawAnimatedPose(ctx, centerX, centerY);
                break;
            case 'patient_teaching':
                this.drawPatientPose(ctx, centerX, centerY);
                break;
            case 'experienced_guidance':
                this.drawExperiencedPose(ctx, centerX, centerY);
                break;
            case 'enthusiastic_exploration':
                this.drawEnthusiasticPose(ctx, centerX, centerY);
                break;
            case 'attentive_teaching':
                this.drawAttentivePose(ctx, centerX, centerY);
                break;
            case 'supportive_guidance':
                this.drawSupportivePose(ctx, centerX, centerY);
                break;
            case 'curious_exploration':
                this.drawCuriousPose(ctx, centerX, centerY);
                break;
            case 'confident_teaching':
                this.drawConfidentPose(ctx, centerX, centerY);
                break;
            case 'open_invitation':
                this.drawOpenPose(ctx, centerX, centerY);
                break;
            case 'proud_completion':
                this.drawProudPose(ctx, centerX, centerY);
                break;
            case 'reflective_introspection':
                this.drawReflectivePose(ctx, centerX, centerY);
                break;
        }
    }

    /**
     * Draw lesson info
     */
    drawLessonInfo(ctx, lessonDay, topic, moodKey) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 350, 400, 50);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Lesson ${lessonDay}: ${topic}`, 200, 370);
        
        ctx.font = '12px Arial';
        ctx.fillText(`${moodKey}`, 200, 385);
    }

    // Eye drawing methods
    drawSoftEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawBrightEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 10, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 10, 0, 2 * Math.PI);
        ctx.fill();
        // Add sparkle
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - 22, y - 13, 2, 0, 2 * Math.PI);
        ctx.arc(x + 28, y - 13, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawFocusedEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawWiseEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawAdventurousEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 9, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 9, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawClearEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawExperiencedEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawCuriousEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawProfessionalEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawWelcomingEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 8, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawSatisfiedEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 7, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawThoughtfulEyes(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.arc(x + 25, y - 10, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Mouth drawing methods
    drawGentleSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 15, 0, Math.PI);
        ctx.stroke();
    }

    drawWideSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 20, 0, Math.PI);
        ctx.stroke();
    }

    drawGentleNeutral(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 10, y + 20);
        ctx.lineTo(x + 10, y + 20);
        ctx.stroke();
    }

    drawWarmSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 12, 0, Math.PI);
        ctx.stroke();
    }

    drawEnthusiasticGrin(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 18, 0, Math.PI);
        ctx.stroke();
    }

    drawProfessionalNeutral(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 20);
        ctx.lineTo(x + 8, y + 20);
        ctx.stroke();
    }

    drawSupportiveSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 14, 0, Math.PI);
        ctx.stroke();
    }

    drawEnthusiasticSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 16, 0, Math.PI);
        ctx.stroke();
    }

    drawConfidentNeutral(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 6, y + 20);
        ctx.lineTo(x + 6, y + 20);
        ctx.stroke();
    }

    drawInvitingSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 13, 0, Math.PI);
        ctx.stroke();
    }

    drawAccomplishedSmile(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y + 20, 11, 0, Math.PI);
        ctx.stroke();
    }

    drawReflectiveNeutral(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 5, y + 20);
        ctx.lineTo(x + 5, y + 20);
        ctx.stroke();
    }

    // Eyebrow drawing methods
    drawCaringEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 8, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 8, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawRaisedEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 30, 10, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 30, 10, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawLevelEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 30, y - 25);
        ctx.lineTo(x - 20, y - 25);
        ctx.moveTo(x + 20, y - 25);
        ctx.lineTo(x + 30, y - 25);
        ctx.stroke();
    }

    drawExperiencedEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 6, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 6, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawExcitedEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 32, 12, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 32, 12, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawAttentiveEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 28, y - 25);
        ctx.lineTo(x - 18, y - 25);
        ctx.moveTo(x + 18, y - 25);
        ctx.lineTo(x + 28, y - 25);
        ctx.stroke();
    }

    drawMatureEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 7, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 7, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawExploringEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 28, 9, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 28, 9, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawProfessionalEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x - 26, y - 25);
        ctx.lineTo(x - 16, y - 25);
        ctx.moveTo(x + 16, y - 25);
        ctx.lineTo(x + 26, y - 25);
        ctx.stroke();
    }

    drawWelcomingEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 8, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 8, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawProudEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 6, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 6, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    drawContemplativeEyebrows(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x - 25, y - 25, 5, Math.PI, 2 * Math.PI);
        ctx.arc(x + 25, y - 25, 5, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    // Pose drawing methods
    drawGentlePose(ctx, x, y) {
        // Draw gentle hand gesture
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 60, y + 50, 15, 0, Math.PI);
        ctx.stroke();
    }

    drawAnimatedPose(ctx, x, y) {
        // Draw animated gesture
        ctx.strokeStyle = '#D7CCC8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x - 60, y + 40, 20, 0, Math.PI);
        ctx.stroke();
    }

    drawPatientPose(ctx, x, y) {
        // Draw patient pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 100);
        ctx.lineTo(x, y + 120);
        ctx.stroke();
    }

    drawExperiencedPose(ctx, x, y) {
        // Draw experienced pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 50, y + 60, 12, 0, Math.PI);
        ctx.stroke();
    }

    drawEnthusiasticPose(ctx, x, y) {
        // Draw enthusiastic pose
        ctx.strokeStyle = '#D7CCC8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x - 50, y + 45, 18, 0, Math.PI);
        ctx.stroke();
    }

    drawAttentivePose(ctx, x, y) {
        // Draw attentive pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 100);
        ctx.lineTo(x, y + 115);
        ctx.stroke();
    }

    drawSupportivePose(ctx, x, y) {
        // Draw supportive pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 55, y + 55, 14, 0, Math.PI);
        ctx.stroke();
    }

    drawCuriousPose(ctx, x, y) {
        // Draw curious pose
        ctx.strokeStyle = '#D7CCC8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x - 55, y + 50, 16, 0, Math.PI);
        ctx.stroke();
    }

    drawConfidentPose(ctx, x, y) {
        // Draw confident pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 100);
        ctx.lineTo(x, y + 118);
        ctx.stroke();
    }

    drawOpenPose(ctx, x, y) {
        // Draw open pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 60, y + 50, 15, 0, Math.PI);
        ctx.stroke();
    }

    drawProudPose(ctx, x, y) {
        // Draw proud pose
        ctx.strokeStyle = '#D7CCC8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + 50, y + 60, 12, 0, Math.PI);
        ctx.stroke();
    }

    drawReflectivePose(ctx, x, y) {
        // Draw reflective pose
        ctx.strokeStyle = '#FFE0B2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 100);
        ctx.lineTo(x, y + 120);
        ctx.stroke();
    }
}

// Export for use
module.exports = AvatarAssetGenerator;

// Generate avatar assets if run directly
if (require.main === module) {
    const generator = new AvatarAssetGenerator();
    generator.generateAllAvatarAssets(28, 'The Sun')
        .then(assets => {
            console.log('🎉 Avatar generation complete!');
            console.log(`📊 Generated ${assets.length} avatar assets`);
        })
        .catch(error => {
            console.error('❌ Avatar generation failed:', error);
        });
} 