<!-- src/views/CommunityPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Join the GenAI Labs Community"
        subtitle="Connect with fellow AI enthusiasts, share knowledge, ask questions, and collaborate on projects."
        :hasButton="true"
        buttonText="Explore Forums"
        buttonLink="/community/questions"
        bgShape="square"
      />
  
      <!-- Features Section -->
      <section class="section community-features-section">
        <div class="container">
          <h2 class="section-title">Engage and <span class="gradient-text">Collaborate</span></h2>
          <p class="section-subtitle">
            Our community is the hub for learning, sharing, and growing together in the world of AI.
          </p>
  
          <div class="features-grid">
            <FeatureCard
              title="Discussion Forums"
              description="Engage in conversations about AI trends, techniques, challenges, and GenAI Labs tools. Share your insights and learn from others."
              color="var(--color-primary)"
              icon="💬"
              link="/community/questions"
            />
  
            <FeatureCard
              title="Q&A Hub"
              description="Got a question about AI or our platform? Ask the community and our experts. Find answers to common problems."
              color="var(--color-secondary)"
              icon="❓"
              link="/community/questions"
            />
  
            <FeatureCard
              title="Model Showcase"
              description="Share the models you've built using GenAI Labs. Get feedback, inspire others, and discover innovative applications."
              color="var(--color-accent-1)"
              icon="🏆"
              link="/explore/models"
            />
  
            <FeatureCard
              title="Resource Sharing"
              description="Find and share useful articles, tutorials, datasets, and tools relevant to AI development and GenAI Labs."
              color="var(--color-accent-2)"
              icon="📚"
              link="/community/resources" 
            />
          </div>
        </div>
      </section>
  
      <!-- Call to Action Section -->
      <section class="section cta-section">
          <div class="container cta-container">
              <div class="cta-content">
                  <h2 class="section-title">Ready to <span class="gradient-text">Get Involved?</span></h2>
                  <p class="section-subtitle">Sign up or log in to start participating in the GenAI Labs community today.</p>
                  <div class="cta-buttons">
                      <RouterLink to="/register" class="btn btn-primary">Create Account</RouterLink>
                      <RouterLink to="/login" class="btn btn-secondary">Login</RouterLink>
                  </div>
              </div>
               <div class="cta-graphic">
                  <!-- Placeholder graphic -->
                  <div class="graphic-element"></div>
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
    name: 'CommunityPage',
    components: {
      MainLayout,
      HeroSection,
      FeatureCard,
      RouterLink
    }
  };
  </script>
  
  <style scoped>
  .community-features-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  /* Inherits FeatureCard styles */
  
  .cta-section {
      background: linear-gradient(135deg, rgba(89, 171, 230, 0.1), rgba(229, 170, 132, 0.1));
      padding: 6rem 0;
  }
  .cta-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
  }
  .cta-content {
      flex: 1;
      max-width: 600px;
  }
  .cta-content .section-title, .cta-content .section-subtitle {
      text-align: left;
      margin-left: 0;
      margin-right: 0;
  }
  .cta-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
  }
  .btn-secondary { /* Define a secondary button style if needed */
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .cta-graphic {
      flex-shrink: 0;
      /* Style the graphic element */
  }
  .graphic-element {
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, var(--color-primary), var(--color-secondary));
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      opacity: 0.5;
      animation: blob-animation 15s infinite alternate; /* Reuse from HomePage */
  }
  
  @keyframes blob-animation { /* Copy from HomePage.vue if not global */
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
    50% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
    75% { border-radius: 30% 70% 40% 60% / 60% 40% 60% 40%; }
    100% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
  }
  
  @media (max-width: 768px) {
      .cta-container {
          flex-direction: column;
          text-align: center;
      }
       .cta-content .section-title, .cta-content .section-subtitle {
          text-align: center;
      }
      .cta-buttons {
          justify-content: center;
      }
      .cta-graphic {
          margin-top: 2rem;
      }
  }
  </style>