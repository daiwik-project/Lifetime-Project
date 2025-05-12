<!-- src/views/PricingPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Pricing Plans"
        subtitle="Choose the plan that fits your needs. Simple, transparent pricing for everyone."
        bgShape="square"
      />
      <section class="section pricing-section">
        <div class="container">
          <h2 class="section-title">Find Your <span class="gradient-text">Perfect Plan</span></h2>
          <p class="section-subtitle">
            Whether you're an individual developer, a startup, or a large enterprise, we have a plan for you.
          </p>
  
          <div class="pricing-grid">
            <!-- Example Plan Card (Repeat for other plans) -->
            <div class="pricing-card">
              <div class="plan-header">
                <h3 class="plan-name">Free Tier</h3>
                <p class="plan-price">$0 <span class="plan-period">/ month</span></p>
                <p class="plan-description">Get started with basic features.</p>
              </div>
              <ul class="plan-features">
                <li><span class="check-icon">✓</span> Feature 1</li>
                <li><span class="check-icon">✓</span> Feature 2 (Limited)</li>
                <li><span class="check-icon">✓</span> Community Support</li>
                <li><span class="cross-icon">✗</span> Advanced Feature A</li>
                <li><span class="cross-icon">✗</span> Priority Support</li>
              </ul>
              <div class="plan-cta">
                <RouterLink to="/register" class="btn btn-secondary">Get Started</RouterLink>
              </div>
            </div>
  
            <div class="pricing-card featured">
               <div class="featured-badge">Most Popular</div>
              <div class="plan-header">
                <h3 class="plan-name">Pro Plan</h3>
                <p class="plan-price">$49 <span class="plan-period">/ month</span></p>
                <p class="plan-description">For professionals and small teams.</p>
              </div>
              <ul class="plan-features">
                <li><span class="check-icon">✓</span> All Free Features</li>
                <li><span class="check-icon">✓</span> Feature 2 (Unlimited)</li>
                <li><span class="check-icon">✓</span> Advanced Feature A</li>
                <li><span class="check-icon">✓</span> Priority Support</li>
                <li><span class="check-icon">✓</span> Feature 3</li>
              </ul>
              <div class="plan-cta">
                <RouterLink to="/register" class="btn btn-primary">Choose Pro</RouterLink>
              </div>
            </div>
  
            <div class="pricing-card">
              <div class="plan-header">
                <h3 class="plan-name">Enterprise</h3>
                <p class="plan-price">Custom</p>
                <p class="plan-description">Tailored solutions for large organizations.</p>
              </div>
              <ul class="plan-features">
                <li><span class="check-icon">✓</span> All Pro Features</li>
                <li><span class="check-icon">✓</span> Dedicated Account Manager</li>
                <li><span class="check-icon">✓</span> Custom Integrations</li>
                <li><span class="check-icon">✓</span> SLA & Premium Support</li>
                <li><span class="check-icon">✓</span> Volume Discounts</li>
              </ul>
              <div class="plan-cta">
                <RouterLink to="/contact" class="btn btn-secondary">Contact Sales</RouterLink>
              </div>
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
    name: 'PricingPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    }
  };
  </script>
  
  <style scoped>
  .pricing-section {
    background-color: rgba(31, 41, 63, 0.2);
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    align-items: stretch; /* Make cards same height */
  }
  
  .pricing-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .pricing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .pricing-card.featured {
      border-color: var(--color-primary);
      box-shadow: 0 0 30px rgba(229, 170, 132, 0.2);
  }
  
  .featured-badge {
      position: absolute;
      top: 15px;
      right: -30px;
      background: var(--color-primary);
      color: var(--color-background);
      padding: 0.3rem 2rem;
      font-size: 0.8rem;
      font-weight: bold;
      transform: rotate(45deg);
      text-align: center;
  }
  
  
  .plan-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .plan-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .plan-price {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }
  
  .plan-period {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
  }
  
  .plan-description {
    opacity: 0.8;
    font-size: 0.9rem;
  }
  
  .plan-features {
    list-style: none;
    margin-bottom: 2rem;
    flex-grow: 1; /* Pushes CTA to bottom */
  }
  
  .plan-features li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.95rem;
  }
  
  .check-icon, .cross-icon {
      font-weight: bold;
  }
  .check-icon {
      color: var(--color-secondary); /* Or a green color */
  }
  .cross-icon {
      color: #ef4444; /* Red color */
      opacity: 0.6;
  }
  
  .plan-cta {
    margin-top: auto; /* Pushes button to bottom */
    text-align: center;
  }
  
  .plan-cta .btn {
      width: 100%;
  }
  
  .btn-secondary { /* Define a secondary button style if needed */
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  </style>