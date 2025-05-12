<!-- src/views/SupportPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="GenAI Labs Support Center"
        subtitle="Need help? Find answers, browse resources, or contact our support team."
        bgShape="square"
      />
  
      <section class="section support-options-section">
        <div class="container">
          <h2 class="section-title">How Can We <span class="gradient-text">Help You?</span></h2>
          <div class="support-grid">
            <!-- Option 1: Documentation -->
            <div class="support-card">
              <div class="card-icon">📚</div>
              <h3 class="card-title">Documentation</h3>
              <p class="card-description">Explore our comprehensive guides, tutorials, and API references to get the most out of GenAI Labs.</p>
              <RouterLink to="/docs" class="btn btn-secondary">Browse Docs</RouterLink>
            </div>
  
            <!-- Option 2: FAQ -->
            <div class="support-card">
              <div class="card-icon">❓</div>
              <h3 class="card-title">Frequently Asked Questions</h3>
              <p class="card-description">Find quick answers to common questions about our platform, billing, and features.</p>
              <RouterLink to="/faq" class="btn btn-secondary">View FAQ</RouterLink>
            </div>
  
            <!-- Option 3: Community -->
            <div class="support-card">
              <div class="card-icon">💬</div>
              <h3 class="card-title">Community Forums</h3>
              <p class="card-description">Connect with other users, ask questions, and share your knowledge in our community forums.</p>
              <RouterLink to="/community" class="btn btn-secondary">Visit Community</RouterLink>
            </div>
  
             <!-- Option 4: Contact Support -->
            <div class="support-card contact-card">
              <div class="card-icon">✉️</div>
              <h3 class="card-title">Contact Support</h3>
              <p class="card-description">Can't find what you need? Reach out to our dedicated support team for assistance.</p>
              <RouterLink to="/contact" class="btn btn-primary">Get In Touch</RouterLink>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Maybe add a section for system status -->
      <section class="section system-status-section">
          <div class="container">
              <h2 class="section-title">System <span class="gradient-text">Status</span></h2>
              <div class="status-indicator">
                  <span class="status-dot" :class="systemStatusClass"></span>
                  <span>{{ systemStatusMessage }}</span>
              </div>
              <p class="status-details">Check our <a href="#" class="status-link">status page</a> for detailed updates and incident history.</p>
          </div>
      </section>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  import { ref, computed } from 'vue';
  
  export default {
    name: 'SupportPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      // Placeholder system status - fetch this from an API
      const systemOperational = ref(true); // Simulate status
  
      const systemStatusClass = computed(() => systemOperational.value ? 'status-ok' : 'status-issue');
      const systemStatusMessage = computed(() => systemOperational.value ? 'All systems operational.' : 'Experiencing minor issues.');
  
      return {
          systemStatusClass,
          systemStatusMessage
      };
    }
  };
  </script>
  
  <style scoped>
  .support-options-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  
  .support-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .support-card {
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
  .support-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1;
  }
  
  .card-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .card-description {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 2rem;
    flex-grow: 1; /* Push button down */
  }
  
  .support-card .btn {
    margin-top: auto; /* Stick to bottom */
    width: 80%; /* Consistent button width */
  }
  .support-card .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .support-card .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  .contact-card {
      border-color: var(--color-primary); /* Highlight contact card */
  }
  
  .system-status-section {
      text-align: center;
      padding: 4rem 0;
  }
  .status-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 1rem;
  }
  .status-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
  }
  .status-ok { background-color: #34a853; box-shadow: 0 0 8px rgba(52, 168, 83, 0.5); }
  .status-issue { background-color: #fbbc05; box-shadow: 0 0 8px rgba(251, 188, 5, 0.5); }
  /* Add more status classes (e.g., status-outage with red) */
  
  .status-details {
      opacity: 0.7;
      font-size: 0.9rem;
  }
  .status-link {
      color: var(--color-primary);
      text-decoration: underline;
  }
  </style>