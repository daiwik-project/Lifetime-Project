<!-- src/views/PrivacyPolicyPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we collect, use, and protect your data."
        bgShape="none"
      />
      <section class="section text-content-section">
        <div class="container">
          <h2 class="section-title">Our <span class="gradient-text">Privacy Commitment</span></h2>
          <div class="content-prose">
            <h3>1. Information We Collect</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  
            <h3>2. How We Use Information</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ul>
              <li>Providing and improving our services.</li>
              <li>Personalizing your experience.</li>
              <li>Communicating with you.</li>
              <li>Ensuring security and compliance.</li>
            </ul>
  
            <h3>3. Data Sharing</h3>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
  
            <h3>4. Your Rights</h3>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.</p>
  
            <h3>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@genailabs.ai.</p>
            <p><em>Last Updated: {{ new Date().toLocaleDateString() }}</em></p>
          </div>
        </div>
      </section>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  
  export default {
    name: 'PrivacyPolicyPage',
    components: {
      MainLayout,
      HeroSection
    }
  };
  </script>
  
  <style scoped>
  .text-content-section {
    background-color: rgba(31, 41, 63, 0.1); /* Subtle background */
    padding-bottom: 6rem;
  }
  
  .content-prose {
    max-width: 800px; /* Limit width for readability */
    margin: 0 auto;
    line-height: 1.8;
    opacity: 0.9;
    color: var(--color-text);
  }
  
  .content-prose h3 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-primary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  .content-prose h3:first-child {
      margin-top: 0;
  }
  
  .content-prose p {
    margin-bottom: 1.5rem;
  }
  
  .content-prose ul {
    list-style: disc;
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .content-prose li {
    margin-bottom: 0.5rem;
  }
  
  .content-prose em {
      display: block;
      margin-top: 3rem;
      font-style: italic;
      opacity: 0.7;
      text-align: center;
  }
  
  /* Add more specific styles if needed */
  </style>