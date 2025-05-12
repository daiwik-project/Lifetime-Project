<!-- src/views/ApiPage.vue -->
<template>
    <MainLayout>
        <HeroSection
        title="GenAI Labs API"
        subtitle="Integrate the power of advanced AI into your applications programmatically."
        :hasButton="true"
        buttonText="View Documentation"
        buttonLink="/user-dashboard/api"
        
      >   <!--bgShape="circle"-->
          <template #image>
              <div class="api-illustration">
                   <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                      <!-- ADD CLASSES HERE -->
                      <path class="api-hook-1" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                      <path class="api-hook-2" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
                      <!-- <line class="api-line-1" x1="8" y1="2" x2="14" y2="8" opacity="0.3"></line>
                      <line class="api-line-2" x1="16" y1="16" x2="10" y2="22" opacity="0.3"></line> -->
                  </svg>
              </div>
          </template>
      </HeroSection>
  
      <section class="section api-features-section">
        <div class="container">
          <h2 class="section-title">Powerful & Flexible <span class="gradient-text">Integration</span></h2>
          <div class="features-grid"> <!-- Reusing FeatureCard component -->
            <FeatureCard
              title="Model Interaction"
              description="Run predictions, generate text/images, or interact with any model available on the platform via simple API calls."
              color="var(--color-primary)"
              icon="🤖"
            />
            <FeatureCard
              title="Training Management"
              description="Programmatically start, monitor, and manage your custom model training jobs without using the UI."
              color="var(--color-secondary)"
              icon="⏱️"
            />
            <FeatureCard
              title="Resource Management"
              description="Manage your projects, datasets, and other platform resources directly through the API."
              color="var(--color-accent-1)"
              icon="📁"
            />
             <FeatureCard
              title="RESTful Design"
              description="Built on standard REST principles with predictable resource-oriented URLs and JSON responses."
              color="var(--color-accent-2)"
              icon="↔️"
            />
             <FeatureCard
              title="Secure Authentication"
              description="Protect your access with secure API keys managed through your user dashboard."
              color="var(--color-accent-3)"
              icon="🔒"
            />
             <FeatureCard
              title="Scalable Infrastructure"
              description="Our API is backed by a robust and scalable infrastructure designed to handle high volumes of requests."
              color="var(--color-card-4)"
              icon="🚀"
            />
          </div>
        </div>
      </section>
  
      <section class="section code-snippet-section">
          <div class="container">
              <h2 class="section-title">Simple <span class="gradient-text">Integration</span></h2>
              <p class="section-subtitle">Get started quickly with simple code examples.</p>
              <div class="code-example-wrapper">
                  <h4>Example: Get Prediction (Python)</h4>
                  <pre><code>import requests
  import json
  
  API_KEY = "YOUR_API_KEY"
  MODEL_ID = "your_model_id"
  API_URL = f"https://api.genailabs.ai/v1/predict/{MODEL_ID}"
  
  headers = {
      "Authorization": f"Bearer {API_KEY}",
      "Content-Type": "application/json"
  }
  
  payload = json.dumps({
    "input_data": {
      "prompt": "What is the capital of France?"
    }
  })
  
  response = requests.post(API_URL, headers=headers, data=payload)
  
  if response.status_code == 200:
      print(response.json())
  else:
      print(f"Error: {response.status_code}", response.text)
  </code></pre>
              </div>
          </div>
      </section>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import FeatureCard from '../components/FeatureCard.vue'; // Reuse FeatureCard
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'ApiPage',
    components: {
      MainLayout,
      HeroSection,
      FeatureCard,
      RouterLink
    }
  };
  </script>
  
  <style scoped>
  /* --- General Section Entry Animation --- */
  .section {
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInSection 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  .api-features-section { animation-delay: 0.5s; }
  .code-snippet-section { animation-delay: 0.8s; }
  
  @keyframes fadeInSection {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* --- API Illustration Enhancements --- */
  .api-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Initial state for entry animation */
  transform: scale(0.6) rotateY(60deg) translateX(40px);
  opacity: 0;
  animation: showApiIllustration 1.3s 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes showApiIllustration {
  to {
    transform: scale(1) rotateY(0deg) translateX(0px);
    opacity: 1;
  }
}

.api-illustration svg {
  width: 280px; /* Larger */
  height: 280px;
  overflow: visible;
  filter: drop-shadow(0 5px 20px rgba(200, 200, 200, 0.35)) /* Cool Light Gray */
          drop-shadow(0 -2px 15px rgba(80, 190, 170, 0.25)); /* Muted Aqua */
}

.api-illustration .api-hook-1,
.api-illustration .api-hook-2 {
  stroke-width: 1.5; /* Thicker for more presence */
  stroke-dasharray: 200; /* Longer than path */
  stroke-dashoffset: 200;
  opacity: 0;
  transform-origin: center center;
}

.api-illustration .api-hook-1 {
  stroke: #50BFAA; /* Muted Aqua */
  animation: drawHook 1.2s 1s ease-out forwards,
             pulseHook 3s 2.2s ease-in-out infinite;
}

.api-illustration .api-hook-2 {
  stroke: #ecdf58; /* Soft Cool Gray */
  animation: drawHook 1.2s 1.2s ease-out forwards,
             pulseHookSecondary 3s 2.4s ease-in-out infinite;
}


  @keyframes drawHook {
    0% { opacity: 0; stroke-dashoffset: 200; transform: scale(0.8) rotate(-15deg); }
    60% { opacity: 1; transform: scale(1.05) rotate(5deg); } /* Overshoot slightly */
    100% { stroke-dashoffset: 0; opacity: 1; transform: scale(1) rotate(0deg); }
  }
  
  @keyframes pulseHook {
    0%, 100% { filter: drop-shadow(0 0 3px var(--color-primary)); transform: scale(1); }
    50% { filter: drop-shadow(0 0 10px var(--color-primary)); transform: scale(1.08); }
  }
  @keyframes pulseHookSecondary {
    0%, 100% { filter: drop-shadow(0 0 3px var(--color-secondary)); transform: scale(1); }
    50% { filter: drop-shadow(0 0 10px var(--color-secondary)); transform: scale(1.08); }
  }
  
  .api-illustration .api-line-1,
  .api-illustration .api-line-2 {
    stroke-width: 0.75;
    opacity: 0;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: drawConnectorLine 0.8s ease-out forwards;
  }
  .api-illustration .api-line-1 {
    stroke: var(--color-accent-1);
    animation-delay: 1.8s; /* After hooks start drawing */
  }
  .api-illustration .api-line-2 {
    stroke: var(--color-accent-2);
    animation-delay: 2s;
  }
  
  @keyframes drawConnectorLine {
    0% { opacity: 0; stroke-dashoffset: 50; }
    100% { opacity: 0.6; stroke-dashoffset: 0; } /* Keep them slightly less opaque */
  }
  
  
  /* --- API Features Section --- */
  .api-features-section {
    background-color: rgba(31, 41, 63, 0.1); /* Existing */
    padding-top: 5rem; /* More space */
    padding-bottom: 5rem;
    position: relative;
    overflow: hidden;
  }
  /* Subtle animated background dots for features section */
  .api-features-section::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 200%; height: 200%; /* Larger to allow movement */
      background-image: radial-gradient(rgba(var(--color-accent-3-rgb, 120, 180, 150), 0.1) 1px, transparent 1.5px);
      background-size: 30px 30px;
      opacity: 0;
      animation: fadeInDots 1.5s 0.8s forwards, moveDots 60s linear infinite;
      z-index: -1;
  }
  @keyframes fadeInDots {
      to { opacity: 1; }
  }
  @keyframes moveDots {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-50%, -50%); } /* Moves diagonally */
  }
  
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem; /* Increased gap */
    margin-top: 3.5rem;
  }
  
  .features-grid > * { /* Target FeatureCard root */
    opacity: 0;
    transform: perspective(800px) rotateY(20deg) translateX(40px) scale(0.9);
    animation: slideInCard 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
                box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .features-grid > *:hover {
      transform: translateY(-10px) scale(1.05) rotateY(-2deg); /* More dynamic hover */
      box-shadow: 0 15px 35px rgba(0,0,0,0.25);
  }
  
  /* Stagger card animations */
  .features-grid > *:nth-child(1) { animation-delay: calc(0.5s + 0.3s); }
  .features-grid > *:nth-child(2) { animation-delay: calc(0.5s + 0.4s); }
  .features-grid > *:nth-child(3) { animation-delay: calc(0.5s + 0.5s); }
  .features-grid > *:nth-child(4) { animation-delay: calc(0.5s + 0.6s); }
  .features-grid > *:nth-child(5) { animation-delay: calc(0.5s + 0.7s); }
  .features-grid > *:nth-child(6) { animation-delay: calc(0.5s + 0.8s); }
  
  @keyframes slideInCard {
    to {
      opacity: 1;
      transform: perspective(800px) rotateY(0deg) translateX(0px) scale(1);
    }
  }
  
  /* --- Code Snippet Section --- */
  .code-snippet-section {
    padding: 5rem 0 7rem 0; /* More padding */
    position: relative;
  }
  
  .code-example-wrapper {
    max-width: 800px;
    margin: 3rem auto 0 auto; /* Increased top margin */
    background-color: rgba(10, 20, 40, 0.6); /* Darker, more "codey" */
    border-radius: 10px; /* Slightly more rounded */
    border: 1px solid rgba(var(--color-primary-rgb, 229, 170, 132), 0.2);
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    /* Animation for the wrapper */
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    animation: popUpCodeBlock 0.9s 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .code-example-wrapper:hover {
      transform: translateY(-5px) scale(1.01);
      box-shadow: 0 15px 50px rgba(var(--color-primary-rgb, 229, 170, 132), 0.2);
  }
  
  @keyframes popUpCodeBlock {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .code-example-wrapper h4 {
    padding: 1.2rem 1.8rem; /* Increased padding */
    background: linear-gradient(90deg, rgba(var(--color-primary-rgb, 229, 170, 132), 0.15), rgba(var(--color-secondary-rgb, 100, 100, 200), 0.1) );
    font-size: 1.05rem; /* Slightly larger */
    font-weight: 600; /* Bolder */
    color: var(--color-heading);
    border-bottom: 1px solid rgba(var(--color-primary-rgb, 229, 170, 132), 0.2);
    display: flex;
    align-items: center;
  }
  .code-example-wrapper h4::before { /* Decorative element for title */
      content: '>';
      margin-right: 0.75rem;
      color: var(--color-primary);
      font-weight: bold;
      font-size: 1.2em;
  }
  
  
  .code-example-wrapper pre {
    margin: 0;
    padding: 1.8rem; /* Increased padding */
    overflow-x: auto;
    /* Add a subtle scanline effect to the code background */
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.015) 1px,
      rgba(255, 255, 255, 0.015) 2px
    );
  }
  .code-example-wrapper pre code {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; /* Better coding font */
    font-size: 0.95rem; /* Slightly larger */
    color: #d4d4d4; /* Common light text color for dark themes */
    line-height: 1.7; /* Increased line height */
    white-space: pre-wrap; /* Allow wrapping for long lines if needed, but pre keeps formatting */
  }
  
  /* Basic Syntax Highlighting (can be expanded or use a library) */
  .code-example-wrapper pre code .token.keyword { color: #569cd6; } /* e.g., import, if */
  .code-example-wrapper pre code .token.string { color: #ce9178; } /* e.g., "YOUR_API_KEY" */
  .code-example-wrapper pre code .token.comment { color: #6a9955; }
  .code-example-wrapper pre code .token.function { color: #dcdcaa; }
  .code-example-wrapper pre code .token.variable { color: #9cdcfe; }
  .code-example-wrapper pre code .token.number { color: #b5cea8; }
  
  /* You would need to wrap your code parts in spans with these classes,
     or use a JavaScript syntax highlighting library like Prism.js or Highlight.js
     for automatic and more comprehensive highlighting.
     Example for manual wrapping:
     <span class="token keyword">import</span> requests
  */
  
  /* Ensure you have these RGB variables defined in your global styles or :root */
  /*
  :root {
    --color-primary-rgb: 229, 170, 132;
    --color-secondary-rgb: 100, 100, 200;
    --color-accent-1-rgb: ...;
    --color-accent-2-rgb: ...;
    --color-accent-3-rgb: 120, 180, 150;
  }
  */
  </style>