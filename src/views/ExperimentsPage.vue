<!-- src/views/ExperimentsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="GenAI Labs Experiments"
        subtitle="A glimpse into our ongoing research, development, and exploration in the field of Artificial Intelligence."
        bgShape="blob"
      />
  
      <!-- Introduction Section -->
      <section class="section intro-section">
        <div class="container">
          <h2 class="section-title">Pushing the <span class="gradient-text">Boundaries</span></h2>
          <div class="content-prose">
            <p>At GenAI Labs, innovation is at our core. We are constantly experimenting with new techniques, architectures, and applications to advance the state-of-the-art in AI. This page offers a look into some of the exciting areas we are exploring.</p>
            <p>Our experiments range from fundamental research to practical applications aimed at solving real-world problems more efficiently and effectively.</p>
          </div>
        </div>
      </section>
  
      <!-- Current Experiments Section -->
      <section class="section current-experiments-section">
        <div class="container">
          <h2 class="section-title">Currently <span class="gradient-text">Exploring</span></h2>
          <div class="experiment-grid">
            <div class="experiment-card" v-for="exp in currentExperiments" :key="exp.id">
              <div class="card-icon">{{ exp.icon }}</div>
              <h3 class="card-title">{{ exp.title }}</h3>
              <p class="card-description">{{ exp.description }}</p>
              <span class="card-status">Status: {{ exp.status }}</span>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Past Successes Section -->
      <section class="section past-experiments-section">
        <div class="container">
          <h2 class="section-title">Past <span class="gradient-text">Breakthroughs</span></h2>
           <div class="experiment-grid">
            <div class="experiment-card" v-for="exp in pastExperiments" :key="exp.id">
              <div class="card-icon">{{ exp.icon }}</div>
              <h3 class="card-title">{{ exp.title }}</h3>
              <p class="card-description">{{ exp.description }}</p>
              <span class="card-status result">Result: {{ exp.result }}</span>
            </div>
          </div>
        </div>
      </section>
  
       <!-- Future Directions Section -->
      <section class="section future-experiments-section">
        <div class="container">
          <h2 class="section-title">Future <span class="gradient-text">Directions</span></h2>
          <div class="content-prose">
            <p>We are continuously looking ahead. Some areas we are planning to explore further include:</p>
            <ul>
              <li>Explainable AI (XAI) for complex models.</li>
              <li>Federated learning for privacy-preserving training.</li>
              <li>AI for scientific discovery and material science.</li>
              <li>Energy-efficient AI model architectures.</li>
              <li>Multi-modal foundation models.</li>
            </ul>
            <p>Stay tuned for more updates on our research and development efforts!</p>
          </div>
        </div>
      </section>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { ref } from 'vue';
  
  export default {
    name: 'ExperimentsPage',
    components: {
      MainLayout,
      HeroSection
    },
    setup() {
      // Placeholder data for company experiments - manage this content as needed
      const currentExperiments = ref([
        { id: 'exp-c1', title: 'Efficient Transformer Architectures', icon: '⚡️', description: 'Investigating novel attention mechanisms and model pruning techniques to reduce the computational cost of large language models.', status: 'Ongoing Research' },
        { id: 'exp-c2', title: 'Cross-Modal Generation (Text-to-3D)', icon: '🧊', description: 'Developing models capable of generating 3D assets directly from textual descriptions for creative and simulation purposes.', status: 'Prototyping' },
        { id: 'exp-c3', title: 'Robustness in Adversarial Environments', icon: '🛡️', description: 'Testing model resilience against adversarial attacks and developing defense mechanisms for critical applications.', status: 'Testing Phase' },
      ]);
  
      const pastExperiments = ref([
         { id: 'exp-p1', title: 'Optimized Training Pipelines', icon: '⏱️', description: 'Developed automated pipelines that reduced average model training time by 30% across standard benchmarks.', result: 'Integrated into Platform' },
         { id: 'exp-p2', title: 'Low-Resource Language Adaptation', icon: '🌍', description: 'Successfully adapted pre-trained NLP models for effective performance on languages with limited training data.', result: 'Published Research Paper' },
      ]);
  
      return {
        currentExperiments,
        pastExperiments
      };
    }
  };
  </script>
  
  <style scoped>
  /* Reusing styles from AboutPage/SupportPage for consistency */
  .intro-section .content-prose,
  .future-experiments-section .content-prose {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    opacity: 0.9;
    color: var(--color-text);
    text-align: center;
  }
  .intro-section .content-prose p,
  .future-experiments-section .content-prose p {
    margin-bottom: 1.5rem;
  }
  .future-experiments-section .content-prose ul {
      list-style: disc;
      margin-left: 2rem;
      text-align: left; /* Align list items left */
      display: inline-block; /* Center the block */
  }
  .future-experiments-section .content-prose li {
      margin-bottom: 0.5rem;
  }
  
  
  .current-experiments-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  .past-experiments-section {
      /* Optional different background */
  }
  .future-experiments-section {
      background-color: rgba(31, 41, 63, 0.1);
  }
  
  
  .experiment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .experiment-card { /* Similar to support-card */
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .experiment-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    line-height: 1;
    height: 60px; /* Consistent height */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .card-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-primary);
  }
  
  .card-description {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1; /* Push status/result down */
  }
  
  .card-status {
    margin-top: auto; /* Stick to bottom */
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
    padding: 0.4rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
  }
  .card-status.result {
      color: var(--color-secondary); /* Different color for results */
      background-color: rgba(89, 171, 230, 0.1);
  }
  </style>