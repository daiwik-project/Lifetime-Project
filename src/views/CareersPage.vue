<!-- src/views/CareersPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Join Our Team"
        subtitle="We're looking for passionate innovators to help us build the future of AI. Explore our open positions."
        bgShape="circle"
      />
  
      <!-- Introduction Section -->
      <section class="section intro-section">
        <div class="container">
          <h2 class="section-title">Work at <span class="gradient-text">GenAI Labs</span></h2>
          <div class="content-prose">
            <p>At GenAI Labs, we're not just building AI models; we're shaping the future of intelligence. We foster a collaborative, dynamic, and inclusive environment where creativity and innovation thrive. If you're driven by challenging problems and excited by the potential of AI, we want to hear from you.</p>
            <p>We offer competitive salaries, comprehensive benefits, and opportunities for professional growth. Join us in our mission to make advanced AI accessible and impactful.</p>
          </div>
        </div>
      </section>
  
      <!-- Job Listings Section -->
      <section class="section job-listings-section">
        <div class="container">
          <h2 class="section-title">Open <span class="gradient-text">Positions</span></h2>
          <div v-if="jobOpenings.length > 0" class="job-grid">
            <div class="job-card" v-for="job in jobOpenings" :key="job.id">
              <h3 class="job-title">{{ job.title }}</h3>
              <p class="job-location">{{ job.location }} <span class="job-type">({{ job.type }})</span></p>
              <p class="job-excerpt">{{ job.excerpt }}</p>
              <RouterLink :to="`/careers/${job.id}`" class="btn btn-secondary job-link">Learn More & Apply</RouterLink>
            </div>
          </div>
          <div v-else class="no-openings">
            <p>We don't have any open positions right now, but we're always looking for talent!</p>
            <p>Feel free to <RouterLink to="/contact" class="contact-link">send us your resume</RouterLink> for future consideration.</p>
          </div>
        </div>
      </section>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    name: 'CareersPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      // Placeholder job data - replace with actual data fetching
      const jobOpenings = ref([
        { id: 'ai-researcher-1', title: 'AI Research Scientist', location: 'San Francisco, CA', type: 'Full-time', excerpt: 'Conduct cutting-edge research in deep learning, NLP, and computer vision...' },
        { id: 'backend-engineer-2', title: 'Senior Backend Engineer (Python/Go)', location: 'Remote', type: 'Full-time', excerpt: 'Design, build, and maintain scalable backend systems for our AI platform...' },
        { id: 'frontend-dev-3', title: 'Frontend Developer (Vue.js)', location: 'San Francisco, CA / Remote', type: 'Full-time', excerpt: 'Develop intuitive and performant user interfaces for our AI tools...' },
        { id: 'product-manager-4', title: 'Product Manager - AI Platform', location: 'San Francisco, CA', type: 'Full-time', excerpt: 'Define the product strategy and roadmap for our core AI platform...' },
      ]);
  
      return {
        jobOpenings
      };
    }
  };
  </script>
  
  <style scoped>
  /* Reusing styles from PrivacyPolicyPage example for intro */
  .intro-section .content-prose {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    opacity: 0.9;
    color: var(--color-text);
    text-align: center;
  }
  .intro-section .content-prose p {
    margin-bottom: 1.5rem;
  }
  
  .job-listings-section {
    background-color: rgba(31, 41, 63, 0.2);
  }
  
  .job-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .job-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .job-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .job-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
  }
  
  .job-location {
    font-size: 0.95rem;
    opacity: 0.8;
    margin-bottom: 1rem;
  }
  .job-type {
      opacity: 0.7;
  }
  
  .job-excerpt {
    opacity: 0.9;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1; /* Pushes button down */
  }
  
  .job-link {
    margin-top: auto; /* Stick to bottom */
    text-align: center;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--color-text);
  }
  .job-link:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .no-openings {
      text-align: center;
      padding: 3rem 0;
      opacity: 0.8;
  }
  .no-openings p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
  }
  .contact-link {
      color: var(--color-primary);
      font-weight: 500;
  }
  .contact-link:hover {
      text-decoration: underline;
  }
  </style>