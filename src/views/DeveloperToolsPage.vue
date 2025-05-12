<!-- src/views/DeveloperToolsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Developer Tools & SDKs"
        subtitle="Integrate GenAI Labs seamlessly with our official Software Development Kits and Command Line Interface."
        bgShape="none"
      />
  
      <section class="section tools-section">
        <div class="container">
          <h2 class="section-title">Official <span class="gradient-text">Libraries</span></h2>
          <div class="tools-grid">
            <!-- Python SDK -->
            <div class="tool-card">
              <div class="tool-icon python-icon">🐍</div>
              <h3 class="tool-name">Python SDK</h3>
              <p class="tool-description">The official Python library for interacting with the GenAI Labs API. Ideal for backend applications, data science workflows, and scripting.</p>
              <div class="tool-actions">
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on PyPI</a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">GitHub Repo</a>
              </div>
              <div class="tool-quick-start">
                  <h4>Quick Install:</h4>
                  <code>pip install genailabs</code>
              </div>
            </div>
  
            <!-- JavaScript/Node.js SDK -->
            <div class="tool-card">
              <div class="tool-icon js-icon">JS</div>
              <h3 class="tool-name">JavaScript SDK</h3>
              <p class="tool-description">Integrate GenAI Labs into your Node.js backend or browser-based applications using our official JavaScript library.</p>
               <div class="tool-actions">
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on npm</a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">GitHub Repo</a>
              </div>
               <div class="tool-quick-start">
                  <h4>Quick Install:</h4>
                  <code>npm install genailabs</code>
              </div>
            </div>
  
            <!-- CLI Tool -->
            <div class="tool-card">
               <div class="tool-icon cli-icon">❯_</div>
              <h3 class="tool-name">GenAI CLI</h3>
              <p class="tool-description">Manage your models, training jobs, and resources directly from your terminal with our powerful Command Line Interface.</p>
               <div class="tool-actions">
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Installation Guide</a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">GitHub Repo</a>
              </div>
               <div class="tool-quick-start">
                  <h4>Quick Install (Example):</h4>
                  <code>pip install genailabs-cli</code>
              </div>
            </div>
  
            <!-- Add more tools/SDKs as needed -->
  
          </div>
        </div>
      </section>
  
       <section class="section related-resources-section">
          <div class="container">
              <h2 class="section-title">Related <span class="gradient-text">Resources</span></h2>
              <div class="links-list"> <!-- Reusing style from DeveloperPage -->
                  <RouterLink to="/user-dashboard/api" class="quick-link">API Reference</RouterLink>
                  <RouterLink to="/docs/getting-started" class="quick-link">Getting Started Guide</RouterLink>
                  <RouterLink to="/user-dashboard/api-keys" class="quick-link">Manage API Keys</RouterLink>
                  <RouterLink to="/support" class="quick-link">Developer Support</RouterLink>
              </div>
          </div>
      </section>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'DeveloperToolsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    }
  };
  </script>
  
  <style scoped>
  .tools-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .tool-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .tool-icon {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
  }
  .python-icon { color: #FFD43B; /* Python Yellow */ }
  .js-icon { color: #F0DB4F; background-color: #323330; /* JS Yellow on Dark */ }
  .cli-icon { color: #4CAF50; font-family: monospace; font-size: 2rem; }
  
  .tool-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .tool-description {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .tool-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .tool-actions .btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
  }
  .tool-actions .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .tool-actions .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .tool-quick-start {
      margin-top: auto; /* Push to bottom */
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .tool-quick-start h4 {
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0.8;
      margin-bottom: 0.5rem;
  }
  .tool-quick-start code {
      background-color: rgba(0,0,0,0.3);
      padding: 0.5rem 0.8rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9rem;
      color: #c5e1a5; /* Light green */
      display: block; /* Make it block level */
      word-break: break-all;
  }
  
  .related-resources-section {
      padding: 4rem 0;
  }
  /* Reusing quick links style from DeveloperPage */
  .links-list {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 1.5rem; margin-top: 2rem;
  }
  .quick-link {
      padding: 0.8rem 1.8rem; background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 50px;
      color: var(--color-text); opacity: 0.8; font-weight: 500;
      text-decoration: none; transition: all 0.3s ease;
  }
  .quick-link:hover {
      opacity: 1; background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px); color: var(--color-primary);
  }
  </style>