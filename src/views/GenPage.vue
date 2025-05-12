<script>
import { ref, computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../components/HeroSection.vue'

export default {
  name: 'GenPage',
  components: {
    MainLayout,
    HeroSection
  },
  setup() {
    // Generation modes
    const modes = [
      { id: 'text', label: 'Text', icon: '📝' },
      { id: 'image', label: 'Image', icon: '🖼️' },
      { id: 'code', label: 'Code', icon: '💻' },
      { id: 'chat', label: 'Chat', icon: '💬' }
    ]

    const selectedMode = ref('text')
    const prompt = ref('')
    const generating = ref(false)
    const generationComplete = ref(false)
    const resultText = ref('')
    const resultImage = ref('')
    const resultCode = ref('')
    const chatMessages = ref([
      { role: 'system', content: 'Welcome to GenAI Chat! How can I help you today?' }
    ])

    // Predefined prompts for different modes
    const examplePrompts = {
      text: [
        'Write a short story about a robot learning to paint',
        'Create a marketing description for a new AI-powered smartwatch',
        'Explain quantum computing to a 10-year old'
      ],
      image: [
        'A futuristic city with flying cars and neon lights',
        'A serene landscape with mountains, a lake, and sunset',
        'A photorealistic portrait of a robot with human features'
      ],
      code: [
        'Create a React component for a todo list',
        'Write a Python function to sort a list of dictionaries by value',
        'Generate HTML/CSS for a responsive navigation bar'
      ],
      chat: [
        'Tell me about the latest advancements in AI',
        'How can I improve my coding skills?',
        'What are some creative ways to use machine learning in everyday life?'
      ]
    }

    const currentExamples = computed(() => {
      return examplePrompts[selectedMode.value] || []
    })

    const setExamplePrompt = (example) => {
      prompt.value = example
    }

    const generate = () => {
      if (!prompt.value.trim()) return

      generating.value = true
      generationComplete.value = false

      // Clear previous results
      resultText.value = ''
      resultImage.value = ''
      resultCode.value = ''

      // Simulate AI generation with a delay
      setTimeout(() => {
        generating.value = false
        generationComplete.value = true

        // Generate mock results based on the selected mode
        if (selectedMode.value === 'text') {
          resultText.value = generateMockText()
        } else if (selectedMode.value === 'image') {
          resultImage.value = generateMockImage()
        } else if (selectedMode.value === 'code') {
          resultCode.value = generateMockCode()
        } else if (selectedMode.value === 'chat') {
          // Add user message
          chatMessages.value.push({ role: 'user', content: prompt.value })
          // Add AI response
          setTimeout(() => {
            chatMessages.value.push({ role: 'system', content: generateMockText() })
            prompt.value = ''
          }, 1000)
        }

        if (selectedMode.value !== 'chat') {
          prompt.value = ''
        }
      }, 3000)
    }

    // Mock result generators
    const generateMockText = () => {
      const responses = [
        "The future of AI is incredibly promising. As we continue to develop more sophisticated models and techniques, we're seeing applications in healthcare, education, creative arts, and many other fields. The key will be ensuring these technologies are developed ethically and responsibly, with human well-being at the center.",
        "Artificial Intelligence has transformed from science fiction into a reality that affects our daily lives. From recommendation systems that suggest what to watch next, to voice assistants that help manage our schedules, AI is now ubiquitous. The next frontier involves more nuanced understanding of human language and generating creative content.",
        "Machine learning models are becoming increasingly powerful at understanding patterns in data. This allows them to make predictions, classifications, and generate new content with remarkable accuracy. As these models scale, we're seeing emergent capabilities that weren't explicitly programmed."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    const generateMockImage = () => {
      const images = [
        'https://source.unsplash.com/random/800x600/?ai,technology',
        'https://source.unsplash.com/random/800x600/?digital,art',
        'https://source.unsplash.com/random/800x600/?future,robot'
      ]
      return images[Math.floor(Math.random() * images.length)]
    }

    const generateMockCode = () => {
      const codeSnippets = [
        `// React component for a simple counter
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;`,
        `# Python function to find the most common words in a text
def find_most_common_words(text, num_words=5):
    """Find the most common words in a given text.""" 
    import re
    from collections import Counter

    words = re.findall(r'\\w+', text.lower())
    word_counts = Counter(words)
    return word_counts.most_common(num_words)

text = "This is a sample text. This text contains repeated words."
print(find_most_common_words(text))`,
        `/* CSS for a responsive card layout */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}` 
      ]
      return codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    }

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault()
      generate()
    }

    const changeMode = (mode) => {
      selectedMode.value = mode
      // Reset state when changing modes
      generationComplete.value = false
      resultText.value = ''
      resultImage.value = ''
      resultCode.value = ''
    }

    return {
      modes,
      selectedMode,
      prompt,
      generating,
      generationComplete,
      resultText,
      resultImage,
      resultCode,
      chatMessages,
      currentExamples,
      setExamplePrompt,
      generate,
      handleSubmit,
      changeMode
    }
  }
}
</script>

<template>
  <MainLayout>
    <!-- Hero Section -->
    <HeroSection
      title="AI Generation Lab"
      subtitle="Create text, images, code, and more with our advanced AI models. Just enter a prompt and let our AI do the rest."
      :hasButton="false"
      bgShape="circle"
    />

    <!-- Generation Interface -->
    <section class="section gen-section">
      <div class="container">
        <div class="gen-container">
          <!-- Mode Selection -->
          <div class="mode-selection">
            <div
              v-for="mode in modes"
              :key="mode.id"
              class="mode-option"
              :class="{ active: selectedMode === mode.id }"
              @click="changeMode(mode.id)"
            >
              <span class="mode-icon">{{ mode.icon }}</span>
              <span class="mode-label">{{ mode.label }}</span>
            </div>
          </div>

          <!-- Main Interface -->
          <div class="gen-interface">
            <!-- Input Area -->
            <form @submit="handleSubmit" class="input-area">
              <div v-if="selectedMode === 'chat' && chatMessages.length > 1" class="chat-messages">
                <div
                  v-for="(message, index) in chatMessages"
                  :key="index"
                  class="chat-message"
                  :class="{ 'user-message': message.role === 'user', 'system-message': message.role === 'system' }"
                >
                  <div class="message-content">{{ message.content }}</div>
                </div>
              </div>

              <div class="prompt-container">
                <textarea
                  v-model="prompt"
                  class="prompt-input"
                  :placeholder="`Enter your ${selectedMode} prompt...`"
                  :rows="selectedMode === 'chat' ? 3 : 5"
                />
                <button
                  type="submit"
                  class="btn btn-primary generate-btn"
                  :disabled="generating || !prompt.trim()"
                >
                  <span v-if="generating" class="generating-indicator">
                    <span class="dot" />
                    <span class="dot" />
                    <span class="dot" />
                  </span>
                  <span v-else>Generate</span>
                </button>
              </div>
            </form>

            <!-- Example Prompts -->
            <div class="example-prompts">
              <h3>Example Prompts</h3>
              <div class="example-list">
                <button
                  v-for="(example, index) in currentExamples"
                  :key="index"
                  class="example-item"
                  @click="setExamplePrompt(example)"
                >
                  {{ example }}
                </button>
              </div>
            </div>

            <!-- Results Area -->
            <div v-if="generationComplete && selectedMode !== 'chat'" class="results-area">
              <h3>Generated Result</h3>

              <!-- Text Result -->
              <div v-if="selectedMode === 'text' && resultText" class="text-result">
                <p>{{ resultText }}</p>
                <div class="result-actions">
                  <button class="action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M9 12h4"></path>
                    </svg>
                    Copy Text
                  </button>
                </div>
              </div>

              <!-- Image Result -->
              <div v-if="selectedMode === 'image' && resultImage" class="image-result">
                <img :src="resultImage" alt="Generated Image" />
                <div class="result-actions">
                  <button class="action-btn">Download Image</button>
                </div>
              </div>

              <!-- Code Result -->
              <div v-if="selectedMode === 'code' && resultCode" class="code-result">
                <pre>{{ resultCode }}</pre>
                <div class="result-actions">
                  <button class="action-btn">Copy Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>


<style scoped>
.gen-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.gen-container {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.mode-selection {
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mode-option {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.mode-option:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.05);
}

.mode-option.active {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 -2px 0 var(--color-primary);
}

.mode-icon {
  font-size: 1.2rem;
}

.mode-label {
  font-weight: 500;
}

.gen-interface {
  padding: 2rem;
}

.input-area {
  margin-bottom: 2rem;
}

.chat-messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-message {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  max-width: 85%;
}

.user-message {
  align-self: flex-end;
  background-color: var(--color-primary);
  opacity: 0.9;
}

.system-message {
  align-self: flex-start;
  background-color: rgba(255, 255, 255, 0.1);
}

.prompt-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.prompt-input {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.prompt-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.generate-btn {
  align-self: flex-end;
  padding: 0.75rem 2rem;
  min-width: 150px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.generating-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: var(--color-text);
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.example-prompts {
  margin-bottom: 2rem;
}

.example-prompts h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.example-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.example-item {
  padding: 0.6rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.example-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.results-area {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.results-area h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.text-result, .code-result {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.7;
}

.code-result pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.image-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.result-image {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.result-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.features-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-description {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .mode-selection {
    overflow-x: auto;
    white-space: nowrap;
  }

  .mode-option {
    padding: 1rem;
  }

  .gen-interface {
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
