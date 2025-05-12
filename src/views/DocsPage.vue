<!-- src/views/DocsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="GenAI Labs Documentation"
        subtitle="Your comprehensive guide to understanding and using our platform, APIs, and models."
        bgShape="blob"
      >
          <template #extraContent>
              <div class="search-bar-container">
                  <input type="search" placeholder="Search documentation..." class="docs-search-input">
                  <button class="search-button">Search</button>
              </div>
          </template>
            <template #image>
                <div class="hero-sphere">
                <div class="sphere" />
                </div>
            </template>
      </HeroSection>
  
      <section class="section docs-overview-section">
        <div class="container">
          <h2 class="section-title">Explore Our <span class="gradient-text">Documentation</span></h2>
          <div class="docs-grid">
            <!-- Card for Getting Started -->
            <div class="docs-card">
              <div class="card-icon">🚀</div>
              <h3 class="card-title">Getting Started</h3>
              <p class="card-description">New to GenAI Labs? Start here with basic setup, platform overview, and quick start guides.</p>
              <RouterLink to="/docs/getting-started" class="btn btn-secondary">Start Guide</RouterLink> <!-- Placeholder link -->
            </div>
  
            <!-- Card for API Reference -->
            <div class="docs-card">
              <div class="card-icon">💻</div>
              <h3 class="card-title">API Reference</h3>
              <p class="card-description">Detailed information about our API endpoints, authentication, parameters, and responses.</p>
              <RouterLink to="/user-dashboard/api" class="btn btn-secondary">View API Docs</RouterLink> <!-- Link to UserApiDocsPage -->
            </div>
  
            <!-- Card for Model Guides -->
            <div class="docs-card">
              <div class="card-icon">🧠</div>
              <h3 class="card-title">Model Guides</h3>
              <p class="card-description">Learn about specific model types (GPT, ML, DL, Custom), their capabilities, and how to use them effectively.</p>
              <RouterLink to="/docs/models" class="btn btn-secondary">Model Info</RouterLink> <!-- Placeholder link -->
            </div>
  
            <!-- Card for Tutorials -->
            <div class="docs-card">
              <div class="card-icon">🎓</div>
              <h3 class="card-title">Tutorials & Examples</h3>
              <p class="card-description">Step-by-step tutorials and practical examples for common use cases and workflows.</p>
              <RouterLink to="/docs/tutorials" class="btn btn-secondary">Browse Tutorials</RouterLink> <!-- Placeholder link -->
            </div>
  
             <!-- Card for Platform Features -->
            <div class="docs-card">
              <div class="card-icon">⚙️</div>
              <h3 class="card-title">Platform Features</h3>
              <p class="card-description">Detailed explanations of platform features like project management, metrics, billing, and security.</p>
              <RouterLink to="/docs/platform" class="btn btn-secondary">Learn More</RouterLink> <!-- Placeholder link -->
            </div>
  
             <!-- Card for SDKs/Libraries -->
            <div class="docs-card">
              <div class="card-icon">📦</div>
              <h3 class="card-title">SDKs & Libraries</h3>
              <p class="card-description">Find documentation for our official SDKs (Python, JavaScript, etc.) to integrate easily.</p>
              <RouterLink to="/developer/tools" class="btn btn-secondary">View SDKs</RouterLink> <!-- Link to DeveloperToolsPage -->
            </div>
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
    name: 'DocsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    }
  };
  </script>
  
<style scoped>
.hero-sphere {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sphere {
  width: 300px;
  height: 300px;
  opacity: 1;
  
  background: radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-accent-3));
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 50px rgba(229, 170, 132, 0.5);
  animation: float 60s ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes float {
  0% {
    transform: translateY(0px);
    opacity: 1;
  },
  1%{
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2000px);
  }
  100% {
    transform: translateY(-20000px);
    opacity: 0;
  }
}

  /* Reuse styles from SupportPage for cards */
  .docs-overview-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  
  .search-bar-container {
      margin-top: 2rem;
      display: flex;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
  }
  .docs-search-input {
      flex-grow: 1;
      padding: 0.9rem 1.5rem;
      border-radius: 50px 0 0 50px; /* Rounded left */
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text);
      font-size: 1rem;
      outline: none;
  }
  .docs-search-input:focus {
      border-color: var(--color-primary);
  }
  .search-button {
      padding: 0.9rem 1.8rem;
      border-radius: 0 50px 50px 0; /* Rounded right */
      background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
      color: var(--color-text);
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;
  }
  .search-button:hover {
      opacity: 0.9;
  }
  
  
  .docs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .docs-card { /* Similar to support-card */
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .docs-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-icon { font-size: 3rem; margin-bottom: 1.5rem; line-height: 1; }
  .card-title { font-size: 1.4rem; font-weight: 600; margin-bottom: 1rem; }
  .card-description { opacity: 0.8; line-height: 1.6; margin-bottom: 2rem; flex-grow: 1; }
  
  .docs-card .btn { margin-top: auto; width: 80%; }
  .docs-card .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .docs-card .btn-secondary:hover { background: rgba(255, 255, 255, 0.15); }
  
  @media (max-width: 768px) {
      .search-bar-container {
          flex-direction: column;
          max-width: 100%;
      }
      .docs-search-input { border-radius: 50px; margin-bottom: 0.5rem; }
      .search-button { border-radius: 50px; }
  }
  </style>