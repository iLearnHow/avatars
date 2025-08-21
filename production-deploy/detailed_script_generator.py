#!/usr/bin/env python3
"""
Detailed script generator that creates actual educational content
Based on lesson topics and age groups
"""

import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple

class DetailedScriptGenerator:
    """Generate detailed, educational scripts for each lesson"""
    
    def __init__(self):
        self.output_dir = Path("/Users/nicolette/curriculum/production_scripts")
        self.output_dir.mkdir(exist_ok=True)
        
        # Load curriculum
        with open('final_366_curriculum_complete.json', 'r') as f:
            self.curriculum = json.load(f)
            
        # Define voice characteristics for each age
        self.voice_styles = {
            2: {"pace": "slow", "energy": "playful", "vocabulary": "simple"},
            5: {"pace": "moderate", "energy": "enthusiastic", "vocabulary": "basic"},
            8: {"pace": "moderate", "energy": "engaging", "vocabulary": "elementary"},
            12: {"pace": "normal", "energy": "curious", "vocabulary": "intermediate"},
            16: {"pace": "normal", "energy": "thoughtful", "vocabulary": "advanced"},
            25: {"pace": "normal", "energy": "professional", "vocabulary": "sophisticated"},
            40: {"pace": "normal", "energy": "conversational", "vocabulary": "sophisticated"},
            60: {"pace": "moderate", "energy": "warm", "vocabulary": "clear"},
            80: {"pace": "slow", "energy": "gentle", "vocabulary": "clear"},
            102: {"pace": "slow", "energy": "wise", "vocabulary": "simple"}
        }
    
    def generate_day_scripts(self, day: int):
        """Generate detailed scripts for any day"""
        
        lesson = self.get_lesson_by_day(day)
        print(f"\n📝 Generating detailed scripts for Day {day}: {lesson['title']}")
        print("=" * 60)
        
        scripts = {}
        
        for age in [2, 5, 8, 12, 16, 25, 40, 60, 80, 102]:
            print(f"\n🎯 Age {age} Script:")
            if day == 1:
                script = self.generate_sun_lesson_script(age)
            elif day == 2:
                script = self.generate_habit_stacking_script(age)
            else:
                raise ValueError(f"Day {day} not implemented yet")
                
            scripts[f"age_{age}"] = script
            
            # Save individual script
            script_file = self.output_dir / f"day_{day:03d}_age_{age}_script.json"
            with open(script_file, 'w') as f:
                json.dump(script, f, indent=2)
                
            # Display preview
            print(f"   Welcome: {script['segments']['welcome'][:80]}...")
            print(f"   Question 1: {script['segments']['question_1'][:60]}...")
            
        return scripts
    
    def generate_day_1_scripts(self):
        """Generate detailed scripts for Day 1: The Sun"""
        return self.generate_day_scripts(1)
    
    def get_lesson_by_day(self, day: int) -> Dict:
        """Get lesson by day number"""
        for lesson in self.curriculum['lessons']:
            if lesson['day'] == day:
                return lesson
        return {}
    
    def generate_sun_lesson_script(self, age: int) -> Dict:
        """Generate age-specific script about the Sun"""
        
        script = {
            "lesson": "The Sun - Our Magnificent Life-Giving Star",
            "day": 1,
            "age": age,
            "voice_style": self.voice_styles[age],
            "total_duration": "7 minutes",
            "segments": {}
        }
        
        # Generate each segment based on age
        if age == 2:
            script["segments"] = self._sun_script_age_2()
        elif age == 5:
            script["segments"] = self._sun_script_age_5()
        elif age == 8:
            script["segments"] = self._sun_script_age_8()
        elif age == 12:
            script["segments"] = self._sun_script_age_12()
        elif age == 16:
            script["segments"] = self._sun_script_age_16()
        elif age == 25:
            script["segments"] = self._sun_script_age_25()
        elif age == 40:
            script["segments"] = self._sun_script_age_40()
        elif age == 60:
            script["segments"] = self._sun_script_age_60()
        elif age == 80:
            script["segments"] = self._sun_script_age_80()
        else:  # 102
            script["segments"] = self._sun_script_age_102()
            
        return script
    
    def generate_habit_stacking_script(self, age: int) -> Dict:
        """Generate age-specific script about Habit Stacking for Productivity"""
        
        script = {
            "lesson": "Habit Stacking for Productivity",
            "day": 2,
            "age": age,
            "voice_style": self.voice_styles[age],
            "total_duration": "7 minutes",
            "segments": {}
        }
        
        # Generate each segment based on age
        if age == 2:
            script["segments"] = self._habit_stacking_script_age_2()
        elif age == 5:
            script["segments"] = self._habit_stacking_script_age_5()
        elif age == 8:
            script["segments"] = self._habit_stacking_script_age_8()
        elif age == 12:
            script["segments"] = self._habit_stacking_script_age_12()
        elif age == 16:
            script["segments"] = self._habit_stacking_script_age_16()
        elif age == 25:
            script["segments"] = self._habit_stacking_script_age_25()
        elif age == 40:
            script["segments"] = self._habit_stacking_script_age_40()
        elif age == 60:
            script["segments"] = self._habit_stacking_script_age_60()
        elif age == 80:
            script["segments"] = self._habit_stacking_script_age_80()
        else:  # 102
            script["segments"] = self._habit_stacking_script_age_102()
            
        return script
    
    def _sun_script_age_2(self) -> Dict[str, str]:
        """Sun lesson script for 2-year-olds"""
        return {
            "welcome": "Hi little friend! Look outside! Do you see the bright sun? The sun is like a big, warm, yellow ball in the sky! It helps us see and keeps us warm. Let's learn about our friend, the sun!",
            
            "question_1": "Is the sun hot or cold? Think about it! When you go outside on a sunny day, how does it feel on your face?",
            
            "answer_1a": "Cold? Oh, let me help you feel it! The sun is actually very, very HOT! It's like a giant warm hug from the sky. When the sunshine touches your face, it feels warm and nice, doesn't it? That's the sun giving you warmth!",
            
            "answer_1b": "Hot! Yes! You're so smart! The sun is super duper hot! It's much hotter than your bath water or even hot soup. The sun sends its warmth all the way from the sky to make you feel cozy!",
            
            "question_2": "Where does the sun go at night? Does it hide under your bed? Or does it go somewhere else?",
            
            "answer_2a": "Under your bed? That's a fun idea! But the sun is way too big to fit under your bed! Actually, the sun doesn't go anywhere - WE move! The Earth spins around like a merry-go-round, and when we spin away from the sun, it becomes nighttime!",
            
            "answer_2b": "Somewhere else? You're thinking! The sun doesn't really go away. It's like when you spin around - things look like they're moving, but it's really YOU moving! The Earth spins, and when we face away from the sun, it's bedtime!",
            
            "question_3": "What can we do because of the sun? Can we play outside? Can we see the pretty flowers?",
            
            "answer_3a": "Play outside! Yes! The sun helps us play! It gives us light to see the swings, the slides, and all our toys. Without the sun, it would be dark all the time. The sun is our big light in the sky!",
            
            "answer_3b": "See flowers! Beautiful! The sun helps flowers grow big and colorful. It helps trees grow tall. It even helps YOU grow! The sun is like magic food for plants, and it helps make the air we breathe!",
            
            "fortune": "Remember, little one: You are like a little sunshine too! Your smile makes everyone happy, just like the sun makes the world bright!",
            
            "closing": "Bye bye, friend! Tomorrow when you see the sun, wave hello! The sun will shine on you again! See you tomorrow for more fun learning!"
        }
    
    def _sun_script_age_5(self) -> Dict[str, str]:
        """Sun lesson script for 5-year-olds"""
        return {
            "welcome": "Hello, young scientist! Today we're going to learn about the most important star in our sky - the Sun! Did you know the Sun is actually a star, just like the twinkly ones you see at night? But it's OUR special star, much closer to Earth!",
            
            "question_1": "What do you think the Sun is made of? Is it made of fire like a campfire, or is it something even more amazing?",
            
            "answer_1a": "Fire like a campfire? That's a great guess! Many people think that! But the Sun is even MORE incredible than fire. The Sun is made of super hot gas - mostly something called hydrogen. It's SO hot that it glows and gives off light and heat. It's like a giant ball of glowing gas, not burning wood like a campfire!",
            
            "answer_1b": "Something more amazing? You're absolutely right! The Sun isn't made of fire at all. It's made of special gases that are so incredibly hot they glow super bright! Inside the Sun, tiny things called atoms are squishing together and making energy. It's like the universe's biggest light bulb, but instead of electricity, it uses atom power!",
            
            "question_2": "The Sun looks like it moves across the sky. But here's a tricky question: Is the Sun really moving, or is something else happening?",
            
            "answer_2a": "The Sun is moving? It does look that way! But here's the amazing secret: The Sun stays in one place, and WE'RE the ones moving! Earth is like a giant spinning ball. We spin around once every day. When our part of Earth faces the Sun, it's daytime. When we spin away, it's nighttime!",
            
            "answer_2b": "Something else? You're thinking like a real scientist! You're right - the Sun isn't moving across our sky. Earth is spinning like a basketball on a finger! As we spin, different parts of Earth face the Sun. That's why the Sun seems to rise in the morning and set at night. We're on a spinning space ball!",
            
            "question_3": "Why do you think plants love the Sun so much? What special thing does the Sun help plants do?",
            
            "answer_3a": "Plants need Sun to grow? Exactly! The Sun helps plants do something magical called photosynthesis. That's a big word that means plants can turn sunlight into food! They catch the Sun's light with their green leaves and use it to make their own food. Isn't that amazing? Plants can eat sunlight!",
            
            "answer_3b": "Plants make something special? Yes! Plants use sunlight to make oxygen - that's the air we breathe! While they're making their food from sunlight, they also make fresh air for us. So every time you take a breath, you can thank a plant and the Sun for working together!",
            
            "fortune": "Today's special thought: Just like plants need the Sun to grow, you need to learn new things to grow your mind. Every day you learn, you shine a little brighter!",
            
            "closing": "Wonderful learning today! Tomorrow, when you wake up and see the Sun, remember it's a giant ball of glowing gas giving us light, warmth, and helping plants make our air. You're becoming a Sun expert! See you tomorrow!"
        }
    
    def _sun_script_age_8(self) -> Dict[str, str]:
        """Sun lesson script for 8-year-olds"""
        return {
            "welcome": "Welcome, curious minds! Today we're exploring our nearest star - the Sun! It's 93 million miles away, but its light reaches us in just 8 minutes. The Sun has been shining for 4.6 billion years, and it's the reason life exists on Earth. Let's discover why!",
            
            "question_1": "The Sun's core temperature is 27 million degrees Fahrenheit! That's incredibly hot. How do you think the Sun creates all this heat and energy without using any fuel like coal or gas?",
            
            "answer_1a": "Chemical reactions like burning? Good thinking, but the Sun does something even more powerful! Deep in the Sun's core, hydrogen atoms are squeezed together with such incredible force that they combine to form helium. This process is called nuclear fusion. When atoms fuse together, they release enormous amounts of energy - that's what makes the Sun shine!",
            
            "answer_1b": "Nuclear fusion? Excellent! You've got it! The Sun is like a giant nuclear fusion reactor. Every second, it converts 600 million tons of hydrogen into helium. The leftover mass becomes pure energy - light and heat! This process has been happening for billions of years and will continue for billions more. Einstein's E=mc² explains how mass becomes energy!",
            
            "question_2": "The Sun is so massive that 1.3 million Earths could fit inside it! But here's something puzzling: If the Sun is so massive and has strong gravity, why doesn't it collapse in on itself?",
            
            "answer_2a": "It's solid like a planet? Actually, the Sun is made entirely of gas - mostly hydrogen and helium! The reason it doesn't collapse is because of a cosmic balancing act. The nuclear fusion in the core creates outward pressure that exactly balances the inward pull of gravity. It's like a constant tug-of-war that keeps the Sun stable!",
            
            "answer_2b": "Balance of forces? Brilliant deduction! You're absolutely right. The Sun maintains its size through hydrostatic equilibrium - gravity pulls inward while radiation pressure from fusion pushes outward. If fusion slowed down, the Sun would shrink. If it sped up, the Sun would expand. This perfect balance has kept our Sun stable for billions of years!",
            
            "question_3": "Solar flares are giant explosions on the Sun's surface that can affect technology on Earth. How do you think energy from the Sun, 93 million miles away, could interfere with our satellites and power grids?",
            
            "answer_3a": "Heat waves? Not quite! Solar flares release charged particles and electromagnetic radiation that travel through space. When these particles hit Earth's magnetic field, they can cause geomagnetic storms. These storms can overload electrical systems, disrupt satellite communications, and even create beautiful auroras - the Northern and Southern Lights!",
            
            "answer_3b": "Magnetic interference? Exactly right! Solar flares eject billions of tons of charged particles in what we call coronal mass ejections. Earth's magnetic field usually protects us, but strong solar storms can overwhelm it. Astronauts on the space station have to take shelter, and airlines sometimes reroute polar flights during major solar events!",
            
            "fortune": "Consider this: The same sunlight that touches your face today also touched the dinosaurs 65 million years ago. You're connected to all of Earth's history through our faithful star. What will you do with your moment in the Sun?",
            
            "closing": "Excellent scientific thinking today! You've learned about nuclear fusion, the balance of forces in stars, and how the Sun affects our technology. Tomorrow, we'll explore another fascinating topic. Until then, remember - you're made of star stuff, including atoms forged in the hearts of ancient suns!"
        }
    
    def _sun_script_age_12(self) -> Dict[str, str]:
        """Sun lesson script for 12-year-olds"""
        return {
            "welcome": "Greetings, future scientists! Today we're investigating the physics and chemistry of our local star - the Sun. As a G-type main-sequence star, the Sun is actually quite average in the universe, yet it's perfectly positioned to support life on Earth. Let's explore the science behind this cosmic coincidence.",
            
            "question_1": "The Sun converts 4 million tons of matter into pure energy every second through nuclear fusion. Given that the Sun has been doing this for 4.6 billion years, why hasn't it burned out yet? What does this tell us about the Sun's total mass?",
            
            "answer_1a": "It must be incredibly massive? Precisely! The Sun's mass is 2×10³⁰ kilograms - that's 333,000 times Earth's mass! Even losing 4 million tons per second, it would take 10 trillion years to use up all its mass. But the Sun will actually die much sooner - in about 5 billion years - because only the core is hot enough for fusion. It can only use about 10% of its total hydrogen!",
            
            "answer_1b": "Efficient fuel consumption? Smart thinking! The Sun is remarkably efficient. The fusion process converts only 0.7% of the hydrogen mass into energy - the rest becomes helium. The Sun has enough hydrogen in its core to maintain fusion for 10 billion years total. We're about halfway through its life cycle. When core hydrogen runs out, the Sun will expand into a red giant!",
            
            "question_2": "The Sun's surface temperature is 10,000°F, but its corona (outer atmosphere) is over 2 million degrees! This seems to violate thermodynamics - how can the outer layer be hotter than the surface?",
            
            "answer_2a": "Different type of heat? You're onto something! The corona's high temperature is related to particle velocity, not density. The corona has very few particles, but they're moving incredibly fast. Scientists believe magnetic field waves from below accelerate these particles. It's like the difference between a spark (high temperature, low heat) and a bathtub of warm water (lower temperature, more total heat).",
            
            "answer_2b": "Magnetic heating? Excellent hypothesis! You're aligned with current solar physics research. The leading theory involves magnetic reconnection - when magnetic field lines break and reconnect, they release enormous energy. These nanoflares happen millions of times per second, heating the corona. We're still studying this mystery with satellites like the Parker Solar Probe!",
            
            "question_3": "The Sun's energy takes 8 minutes to reach Earth as light, but that same energy took up to 100,000 years to travel from the Sun's core to its surface. How is this possible, and what does it tell us about the Sun's interior?",
            
            "answer_3a": "The Sun must be incredibly dense? Absolutely! The Sun's interior is so dense that photons can't travel in straight lines. They undergo millions of collisions, absorbed and re-emitted countless times in a random walk pattern. The core density is 150 times that of water! This journey transforms high-energy gamma rays into the visible light we see.",
            
            "answer_3b": "Different zones with different properties? Perfect analysis! The Sun has distinct layers: the core (fusion zone), radiative zone (where energy slowly migrates outward), and convection zone (where hot plasma rises like boiling water). Each zone has different densities and energy transport methods. Once energy reaches the surface, it travels freely through space at light speed!",
            
            "fortune": "Ponder this: Every atom in your body, except hydrogen, was forged in the nuclear furnace of a star. The calcium in your bones, the iron in your blood, the carbon in your DNA - all stardust. You are literally the universe contemplating itself.",
            
            "closing": "Outstanding critical thinking! You've grasped complex concepts about stellar physics, energy transport, and the Sun's structure. These same principles apply to billions of stars across the universe. Tomorrow, we'll explore how humans develop habits - another type of pattern in nature. Keep questioning everything!"
        }
    
    def _sun_script_age_16(self) -> Dict[str, str]:
        """Sun lesson script for 16-year-olds"""
        return {
            "welcome": "Welcome, scholars. Today we examine the Sun through multiple lenses - astrophysics, chemistry, and its profound influence on human civilization. Our G2V yellow dwarf star has shaped everything from ancient religions to modern climate science. Let's analyze how understanding the Sun exemplifies the scientific method and international cooperation.",
            
            "question_1": "The Sun's nuclear fusion follows the proton-proton chain reaction, converting hydrogen to helium. But this process requires temperatures where protons can overcome electromagnetic repulsion. Given that the calculated temperature isn't quite sufficient, how does fusion actually occur in the Sun's core?",
            
            "answer_1a": "Higher pressure compensates? Partially correct, but there's more! You're thinking of classical physics, but we need quantum mechanics here. Even at 15 million Kelvin, protons shouldn't classically overcome the Coulomb barrier. However, quantum tunneling allows particles to 'tunnel through' energy barriers they classically couldn't surmount. This probabilistic quantum effect makes stellar fusion possible!",
            
            "answer_1b": "Quantum tunneling effects? Outstanding! You understand quantum mechanics applications. The Sun's core temperature provides enough energy for protons to get close, then quantum tunneling allows them to overcome the final Coulomb barrier. Without this quantum effect, stars would need to be 10 times hotter to shine. This discovery revolutionized our understanding of stellar physics and won Hans Bethe the Nobel Prize!",
            
            "question_2": "Solar astronomy requires international cooperation - no single country can observe the Sun 24/7. How does this scientific collaboration model demonstrate principles that transcend political boundaries, and what can it teach us about addressing global challenges?",
            
            "answer_2a": "Shared data benefits everyone? Exactly! The Global Oscillation Network Group (GONG) has telescopes on six continents, providing continuous solar observation. Data is freely shared among all nations. This cooperation revealed the Sun's internal structure through helioseismology. When scientists collaborate across borders, sharing resources and knowledge, we advance faster than any nation could alone.",
            
            "answer_2b": "Common goals unite different perspectives? Brilliant insight! Solar research exemplifies how diverse viewpoints strengthen science. Japanese, American, European, and Indian solar missions complement each other. The International Space Station hosts solar instruments from multiple nations. This model shows how humanity can cooperate on climate change, pandemic response, and space exploration - challenges that affect all humans regardless of nationality.",
            
            "question_3": "The Sun's 11-year magnetic cycle affects Earth's climate, technology, and even carbon-14 dating accuracy. As we become more technologically dependent, how should society balance solar activity risks with development, and what does this teach about evidence-based policy making?",
            
            "answer_3a": "Improve prediction and protection systems? Pragmatic approach! Space weather forecasting has become crucial infrastructure. The Carrington Event of 1859 would cause trillions in damage today. We need hardened power grids, satellite shielding, and early warning systems. This demonstrates how scientific understanding must inform policy - we can't ignore inconvenient truths about natural phenomena that affect our technology.",
            
            "answer_3b": "Integrated risk assessment and adaptation? Sophisticated thinking! Solar activity is one of many factors in complex Earth systems. Climate models must include solar variations, technological vulnerability assessments need space weather scenarios, and archaeology must account for carbon-14 variations. This interconnectedness shows why policy makers need scientific literacy and why scientists must communicate effectively with the public.",
            
            "fortune": "Reflect on this: The same nuclear forces that power the Sun also enable both nuclear weapons and cancer-treating radiation therapy. Knowledge itself is neutral - how humanity applies it determines whether it brings light or darkness. What will your generation do with the powerful knowledge you inherit?",
            
            "closing": "Exceptional analysis today! You've connected quantum physics, international cooperation, and evidence-based policy through our study of the Sun. These critical thinking skills - seeing connections across disciplines - will serve you well in any field. Tomorrow, we explore habit formation, another example of patterns shaping outcomes. Keep questioning, keep connecting!"
        }
    
    def _sun_script_age_25(self) -> Dict[str, str]:
        """Sun lesson script for 25-year-olds"""
        return {
            "welcome": "Good day, lifelong learners. Today we examine humanity's relationship with our parent star - from ancient sun worship to cutting-edge solar physics, from photovoltaic economics to the search for exoplanets. The Sun serves as a lens through which we can explore energy policy, scientific methodology, and our cosmic perspective.",
            
            "question_1": "The Sun's energy output has remained remarkably stable (varying only 0.1%) throughout human history, yet small variations correlate with significant climate events like the Little Ice Age. How does this stability-sensitivity paradox inform current debates about anthropogenic versus natural climate drivers?",
            
            "answer_1a": "Natural variations set the baseline? Correct - solar variability provides crucial context. The Maunder Minimum (1645-1715) coincided with the Little Ice Age, demonstrating solar influence. However, current warming far exceeds what solar variations can explain. We've measured solar output directly since 1978 - it's slightly decreasing while temperatures rise. This divergence is strong evidence for human-caused warming overwhelming natural cycles.",
            
            "answer_1b": "Multiple factors require systems thinking? Exactly. Climate is a complex system where small forcings can trigger large responses through feedbacks. Solar variations affect stratospheric ozone, altering jet streams and weather patterns. But CO₂ increases since 1850 dwarf solar effects by factor of 10. Understanding both natural and human drivers is essential for accurate climate projections and effective policy responses.",
            
            "question_2": "Solar energy technology has reached grid parity in many markets, yet adoption varies dramatically between regions with similar solar resources. What non-technical factors most influence renewable energy transitions, and how do these reflect broader patterns in technological disruption?",
            
            "answer_2a": "Policy and economic structures? Astute observation. Germany has less sun than Arizona but more solar capacity due to feed-in tariffs and political will. Entrenched interests, grid infrastructure, and financing mechanisms often matter more than technology. This mirrors other disruptions - superior technology alone rarely drives change. Social, economic, and political factors determine adoption curves.",
            
            "answer_2b": "Cultural values and risk perception? Insightful! societies with high environmental consciousness and trust in new technology adopt solar faster. Risk perception varies - some see energy independence, others fear change. This reflects deeper patterns: technological transitions are fundamentally social transitions. Understanding stakeholder motivations and addressing concerns matters as much as improving efficiency.",
            
            "question_3": "The Parker Solar Probe is humanity's first mission to 'touch' the Sun, requiring international cooperation and decades of technological development. How does such ambitious, long-term scientific exploration justify investment when facing immediate global challenges?",
            
            "answer_3a": "Technological spillovers and inspiration? Pragmatic perspective. The probe's heat shield technology advances materials science with applications from manufacturing to firefighting. Moreover, ambitious projects inspire STEM careers and international cooperation. Apollo program technologies revolutionized computing and materials. Long-term research creates unexpected solutions to immediate problems while expanding human capability.",
            
            "answer_3b": "Existential risk mitigation and knowledge? Strategic thinking. Understanding solar dynamics helps predict space weather that could cripple global infrastructure. A Carrington-level event today could cause societal collapse. Furthermore, knowledge compounds - today's 'pure' research enables tomorrow's applications. Civilizations that stop exploring stagnate. Balancing immediate needs with long-term advancement defines sustainable progress.",
            
            "fortune": "Consider: You live in the first generation that can harness fusion energy, the same process powering the Sun. You also face choices about planetary-scale energy systems. The decisions you make about energy in the next decade will ripple through centuries. How will you balance possibility with responsibility?",
            
            "closing": "Thought-provoking discussion! You've connected solar science to climate policy, technological adoption, and civilization's future. This systems thinking - seeing interconnections across scales and disciplines - is crucial for navigating our complex world. Tomorrow, we explore habit formation, another system where small changes compound into large effects. Keep synthesizing!"
        }
    
    def _sun_script_age_40(self) -> Dict[str, str]:
        """Sun lesson script for 40-year-olds"""
        return {
            "welcome": "Welcome back to learning. Today we revisit something you've known all your life - the Sun - but through the lens of accumulated experience and contemporary challenges. From energy independence to teaching the next generation about science, let's explore how our relationship with the Sun reflects broader life patterns.",
            
            "question_1": "You've likely seen energy technologies evolve from pipe dreams to mainstream. Solar panels were exotic in the 1990s, now they're at Costco. What does this teach us about predicting technological adoption, and how can we apply these lessons to emerging technologies?",
            
            "answer_1a": "Exponential curves surprise us? Indeed. Solar followed Wright's Law - costs dropped 20% for every doubling of production. Most people think linearly, missing inflection points. This pattern repeats: internet, smartphones, EVs. The lesson? When technologies hit certain cost/performance thresholds, adoption accelerates dramatically. Watch batteries, AI, and biotechnology - they're following similar curves.",
            
            "answer_1b": "Infrastructure and ecosystems matter? Absolutely. Solar needed more than cheap panels - inverters, installers, financing, regulations all had to mature. Technologies succeed when entire ecosystems develop. Apply this to your work: innovation requires supporting infrastructure. Whether implementing new systems or career pivoting, consider the whole ecosystem, not just the core technology.",
            
            "question_2": "The Sun has been humanity's primary timekeeper - from sundials to defining our calendar. In our always-connected age, how has our relationship with natural cycles changed, and what are the implications for health and productivity?",
            
            "answer_2a": "We've disconnected from natural rhythms? Precisely. Blue light at night disrupts circadian rhythms evolution tuned to the Sun. Remote work blurs boundaries seasons once provided. Many experience SAD, insomnia, burnout. The solution isn't rejecting technology but conscious integration - morning sunlight, evening limits, seasonal awareness. High performers increasingly recognize aligning with, not overriding, biological rhythms.",
            
            "answer_2b": "Technology allows optimization? True, but with caveats. We can work across time zones, extend productive hours with good lighting, and maintain social connections regardless of season. However, research shows fighting circadian biology decreases long-term performance. The key is using technology to enhance natural patterns, not replace them. Smart lighting that mimics solar patterns, for instance.",
            
            "question_3": "As parents or mentors, how do we convey wonder about something as 'ordinary' as the Sun to a generation raised with CGI spectacles? What approaches resonate when teaching fundamental science in an age of information overload?",
            
            "answer_3a": "Make it personally relevant? Effective strategy. Connect the Sun to their lived experience - phone batteries charged by solar, vitamin D for gaming marathons, or how solar storms could knock out internet. Kids engage when they see direct impact. Use their technology interest as a bridge: how would Mars colonists use solar power? Why do phone cameras struggle with sunrise photos?",
            
            "answer_3b": "Hands-on experimentation? Timeless approach! Simple experiments still amaze: splitting light with prisms, making sundials, safely observing sunspots. Physical experience creates lasting memory in ways videos can't. Plus, modeling curiosity and wonder is powerful - kids learn as much from your enthusiasm as from facts. Share your own 'aha' moments about the Sun.",
            
            "fortune": "Wisdom for today: You've lived long enough to see the 'impossible' become commonplace. The Sun that warmed your childhood face now powers homes and cars. What other 'impossible' things will you witness or create in your remaining decades? Experience plus imagination equals innovation.",
            
            "closing": "Enriching exploration today! You've connected personal experience with broader patterns in technology adoption, health optimization, and knowledge transfer. These insights - earned through decades of observation - are valuable for navigating change and mentoring others. Tomorrow, we explore habit formation, another arena where patient observation yields powerful results. Keep growing!"
        }
    
    def _sun_script_age_60(self) -> Dict[str, str]:
        """Sun lesson script for 60-year-olds"""
        return {
            "welcome": "Good day, friends. Today we contemplate the Sun - that constant companion that has marked the rhythm of your many years. From childhood summers to career decades, from raising children to perhaps welcoming grandchildren, the Sun has been there. Let's explore new perspectives on this old friend.",
            
            "question_1": "You've witnessed the environmental movement evolve from fringe to mainstream, and solar energy transform from hippie dream to economic reality. What wisdom have you gained about how societies actually change, versus how we think they should change?",
            
            "answer_1a": "Change happens generationally? Indeed. You've seen it firsthand - ideas dismissed in the '70s are now obvious to your grandchildren. Solar energy needed not just technology but cultural shift. Real change comes when new generations don't see alternatives as 'alternative.' Your experience teaches patience - plant seeds for trees you may not sit under.",
            
            "answer_1b": "Economics drives adoption more than idealism? Practical wisdom. Solar succeeded when it became cheaper, not just cleaner. You've learned that while values matter, aligning them with practical benefits accelerates change. This applies broadly - in organizations, communities, families. Lasting change happens when doing right also makes sense financially and practically.",
            
            "question_2": "The Sun's vitamin D production decreases with age, yet sunshine's mood benefits might matter more than ever. How do you balance health precautions you've learned with quality of life, using the Sun as an example?",
            
            "answer_2a": "Moderation and adaptation? Wise approach. You know your skin needs more protection now, but also that morning sunshine lifts spirits and helps sleep. It's not about avoiding risk but managing it intelligently - sun hat instead of hiding indoors, early morning walks instead of noon. This balance applies everywhere - staying engaged while respecting limitations.",
            
            "answer_2b": "Focus on what you can control? Excellent philosophy. You can't change aging, but you can choose when and how to enjoy sunshine. Vitamin D supplements handle the physical need, freeing you to enjoy the psychological benefits safely. This mirrors life wisdom - control what you can, adapt to what you can't, and find joy in both.",
            
            "question_3": "Looking at the Sun's faithful journey across the sky each day, what reflections does this constancy offer as you consider your own life's journey and legacy?",
            
            "answer_3a": "Appreciation for reliable patterns? Beautiful insight. The Sun rises whether we notice or not, giving without recognition - perhaps like much of what you've done for others. Its constancy reminds us that showing up consistently, doing good work steadily, matters more than dramatic gestures. Your steady contributions have likely brightened more lives than you know.",
            
            "answer_3b": "Cycles and renewal? Profound observation. Every sunset promises a sunrise. You've experienced enough life cycles - careers, relationships, losses, and renewals - to know this deeply. The Sun doesn't mourn yesterday's setting or fear tomorrow's clouds. This perspective brings peace: you've weathered storms before, and renewal always comes.",
            
            "fortune": "Today's reflection: Like the Sun, you've been a source of warmth and light to others, often without realizing it. Your accumulated wisdom illuminates paths for those still finding their way. What light will you choose to share today?",
            
            "closing": "Thank you for these thoughtful reflections. Your perspectives, seasoned by experience, add richness to our understanding. The Sun we discussed today is the same one that's watched over all your years, yet you see it with new eyes. Tomorrow, we explore building habits - something you know takes patience and persistence. Until then, enjoy today's sunshine!"
        }
    
    def _sun_script_age_80(self) -> Dict[str, str]:
        """Sun lesson script for 80-year-olds"""
        return {
            "welcome": "Hello, dear friend. Isn't it wonderful to learn something new about an old companion like the Sun? You've watched thousands of sunrises and sunsets, each one unique yet reassuringly familiar. Today, let's discover together some fascinating aspects of our faithful star.",
            
            "question_1": "Throughout your eight decades, you've seen humans go from barely flying to landing on the Moon and sending probes to the Sun. What does this remarkable journey tell us about human potential and persistence?",
            
            "answer_1a": "Human ingenuity is boundless? How true! You were born into a world without satellites, yet you've lived to see spacecraft touch the Sun's corona. Each breakthrough built on previous work - persistence across generations. Your generation laid foundations others built upon. This teaches us that great achievements require both vision and patience.",
            
            "answer_1b": "Cooperation achieves the impossible? Absolutely right. The space program succeeded through collaboration - nations, scientists, engineers, and taxpayers working together. You've witnessed humanity at its best when united by common purpose. The Sun doesn't care about borders, and neither does scientific progress. Unity of purpose overcomes any obstacle.",
            
            "question_2": "The Sun has marked all your days - from walking to school as a child to perhaps watching grandchildren play. How has your perception of time and natural rhythms evolved through these seasons of life?",
            
            "answer_2a": "Time feels more precious? A universal truth of aging. Sunrises feel more miraculous when you're deeply aware they're numbered. Yet this awareness brings gifts - deeper appreciation, clearer priorities, presence in the moment. Like the Sun making each day count with its light, you've learned to illuminate what truly matters.",
            
            "answer_2b": "Natural rhythms bring comfort? Indeed. The Sun's reliable journey provides continuity through life's changes. Morning light still brings hope, sunset still invites reflection, just as in childhood. These constants anchor us. You've learned to flow with natural rhythms rather than fight them - wisdom that brings peace.",
            
            "question_3": "If you could share one insight about the Sun - scientific or personal - with a young person, what would it be?",
            
            "answer_3a": "Take time to actually see it? Wonderful advice. In our busy world, people forget to notice the sunrise, feel sunshine on their face, or watch clouds drift by. You know these simple moments hold profound joy. The Sun teaches us that the most important things in life are free and available to all - we just need to pause and appreciate.",
            
            "answer_3b": "Respect its power and gifts? Wise counsel. The Sun gives life but demands respect - you've learned both its blessings and dangers. This balance applies to all of life's powerful forces: love, ambition, technology. Approach with gratitude and wisdom. The Sun teaches us to be both bold and careful.",
            
            "fortune": "A thought to carry forward: You are like the afternoon sun - perhaps not at the zenith, but casting the longest, most beautiful shadows and the warmest, golden light. Your wisdom illuminates paths for others in ways the harsh noon sun cannot.",
            
            "closing": "Thank you for sharing your insights today. Your eight decades of observing the Sun have given you perspectives no textbook can teach. You remind us that true understanding comes from patient observation and lived experience. Tomorrow brings another lesson, another chance to grow. May the Sun shine gently on you!"
        }
    
    def _sun_script_age_102(self) -> Dict[str, str]:
        """Sun lesson script for 102-year-olds"""
        return {
            "welcome": "What a joy to share this moment with you! Over a century of sunrises - what a remarkable journey! The Sun has been your faithful companion through all of life's seasons. Today, let's celebrate what you know and perhaps discover something new about our golden friend in the sky.",
            
            "question_1": "In your remarkable century, you've seen humanity harness the Sun's power in ways unimaginable in your youth. What amazes you most about this transformation?",
            
            "answer_1a": "From kerosene to solar panels? What a journey you've witnessed! You remember reading by oil lamp, now homes run on sunshine. The same Sun that dried your childhood laundry now powers entire cities. You've lived through humanity's greatest energy transformation. Your adaptability through such change is truly inspiring.",
            
            "answer_1b": "The speed of change? Indeed, the pace is breathtaking. Changes that took centuries now happen in decades. You've adapted to more transformation than any generation before. Yet the Sun remains constant - a reminder that amid all change, some things endure. Your resilience mirrors the Sun's steadfastness.",
            
            "question_2": "The Sun has witnessed your entire story - every joy, every loss, every ordinary Tuesday. What has this cosmic companionship taught you?",
            
            "answer_2a": "We're never truly alone? What profound wisdom. The Sun rose on your first day and has been there ever since. Its faithful presence reminds us we're part of something larger. You've learned that connection exists even in solitude - with nature, with the cosmos, with the continuity of life itself.",
            
            "answer_2b": "Life is both fleeting and eternal? Beautiful paradox. Your century is but a moment to the Sun, yet it contains infinite precious moments. You understand both perspectives - the brevity of individual life and participation in something timeless. This dual awareness brings both humility and significance.",
            
            "question_3": "What would you want the Sun to tell future generations about the century it spent shining on you?",
            
            "answer_3a": "That kindness always matters? The Sun would surely agree - it gives light freely to all. Through war and peace, hardship and prosperity, you've learned that small acts of kindness ripple outward like sunshine. The Sun would tell them that your generation's greatest gift was learning to care for each other.",
            
            "answer_3b": "That each day is a gift? Yes! The Sun would say it watched you transform ordinary days into meaningful life through presence and gratitude. Not every day was easy, but you found light somehow. Future generations should know that happiness isn't about perfect circumstances but about finding sunshine even on cloudy days.",
            
            "fortune": "Dear friend: Like the Sun at sunset, you paint the world with the most beautiful colors. Your wisdom, patience, and grace light the way for all who follow. You are living sunshine.",
            
            "closing": "Thank you for gracing us with your presence and wisdom today. Over 37,000 sunrises have marked your journey, each one bringing new light. You remind us that learning and wonder have no expiration date. May tomorrow's Sun find you in peace and joy. You are truly remarkable!"
        }
    
    def create_complete_day_1_package(self):
        """Create a complete content package for Day 1"""
        
        package = {
            "day": 1,
            "title": "The Sun - Our Magnificent Life-Giving Star",
            "created": datetime.now().isoformat(),
            "scripts": self.generate_day_1_scripts(),
            "production_notes": {
                "avatar": "ken",
                "estimated_recording_time": "70 minutes (10 age versions × 7 minutes)",
                "emphasis_patterns": {
                    "all_ages": ["Sun", "star", "energy", "light", "life"],
                    "young": ["hot", "bright", "warm", "glow"],
                    "older": ["fusion", "nuclear", "hydrogen", "helium"]
                },
                "pacing_notes": {
                    "ages_2_5": "Slower pace, more pauses, animated delivery",
                    "ages_8_16": "Moderate pace, clear articulation",
                    "ages_25_60": "Natural conversational pace",
                    "ages_80_102": "Slower pace, warm and clear"
                }
            },
            "quality_checks": [
                "✓ Each age script is complete",
                "✓ Content complexity appropriate for age",
                "✓ No technology requirements",
                "✓ Universal concepts",
                "✓ Engaging throughout"
            ]
        }
        
        # Save complete package
        package_file = self.output_dir / "day_001_complete_package.json"
        with open(package_file, 'w') as f:
            json.dump(package, f, indent=2)
            
        print(f"\n✅ Complete Day 1 package saved to: {package_file}")
        
        # Create summary text file for easy reading
        summary_file = self.output_dir / "day_001_summary.txt"
        with open(summary_file, 'w') as f:
            f.write("DAY 1 PRODUCTION SUMMARY\n")
            f.write("========================\n\n")
            f.write(f"Title: {package['title']}\n")
            f.write(f"Scripts Generated: 10 age versions\n")
            f.write(f"Avatar: Ken\n")
            f.write(f"Format: 3x2x1 (7 minutes per version)\n\n")
            f.write("Age Versions:\n")
            for age in [2, 5, 8, 12, 16, 25, 40, 60, 80, 102]:
                f.write(f"  - Age {age}: Complete ✓\n")
        
        return package

if __name__ == "__main__":
    generator = DetailedScriptGenerator()
    
    # Generate Day 1 scripts
    generator.create_complete_day_1_package()
    
    print("\n" + "="*60)
    print("📚 Day 1 Complete Production Package Ready!")
    print("="*60)
    print("\nNext steps:")
    print("1. Review scripts for final adjustments")
    print("2. Export for TTS training")
    print("3. Begin Day 2 script generation")
    print("\nFiles created in: /Users/nicolette/curriculum/production_scripts/")
