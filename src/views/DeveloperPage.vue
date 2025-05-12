<!-- src/views/DeveloperPage.vue -->
<template>
    <MainLayout>
        <HeroSection
        title="Developer Hub"
        subtitle="Build powerful AI applications with GenAI Labs APIs, SDKs, and developer tools."
        :hasButton="true"
        buttonText="Explore API Docs"
        buttonLink="/user-dashboard/api"
        
        > <!--bgShape="square"-->
            <template #image>
                <div class="dev-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <!-- ADD CLASSES HERE -->
                        <polyline class="sg-arrow-1" points="16 18 22 12 16 6"></polyline>
                        <polyline class="sg-arrow-2" points="8 6 2 12 8 18"></polyline>
                        <line class="sg-center-line" x1="12" y1="4" x2="12" y2="20" opacity="0.3"></line>
                        <rect class="sg-bg-rect" x1="12" y1="4" x2="12" y2="20" opacity="0.0"></rect>
                    </svg>
                </div>
            </template>
        </HeroSection>
  
      <section class="section dev-resources-section">
        <div class="container">
          <h2 class="section-title">Empowering <span class="gradient-text">Developers</span></h2>
          <p class="section-subtitle">
              Access the tools and resources you need to seamlessly integrate GenAI Labs into your workflows and applications.
          </p>
  
          <div class="dev-grid">
            <!-- Card for API -->
            <FeatureCard
              title="Robust APIs"
              description="Leverage our comprehensive REST APIs to interact with models, manage training jobs, and access platform features programmatically."
              color="var(--color-primary)"
              icon="🔌"
              link="/user-dashboard/api"
            />
  
            <!-- Card for SDKs -->
            <FeatureCard
              title="SDKs & Libraries"
              description="Get started quickly with our official SDKs for popular languages like Python and JavaScript. Simplify integration and development."
              color="var(--color-secondary)"
              icon="📦"
              link="/developer/tools"
            />
  
            <!-- Card for Documentation -->
            <FeatureCard
              title="Comprehensive Docs"
              description="Find detailed guides, tutorials, API references, and best practices in our extensive documentation."
              color="var(--color-accent-1)"
              icon="📚"
              link="/docs"
            />
  
            <!-- Card for Community -->
             <FeatureCard
              title="Developer Community"
              description="Connect with other developers, ask technical questions, share solutions, and contribute to the ecosystem."
              color="var(--color-accent-2)"
              icon="💬"
              link="/community"
            />
          </div>
        </div>
      </section>
  
       <!-- Quick Links Section -->
      <section class="section quick-links-section">
          <div class="container">
              <h2 class="section-title">Quick <span class="gradient-text">Links</span></h2>
              <div class="links-list">
                  <RouterLink to="/user-dashboard/api-keys" class="quick-link">Manage API Keys</RouterLink>
                  <RouterLink to="/docs/getting-started" class="quick-link">Getting Started Guide</RouterLink>
                  <RouterLink to="/docs/tutorials" class="quick-link">Code Examples & Tutorials</RouterLink>
                  <a href="#" class="quick-link">API Status Page</a> <!-- External link example -->
                  <RouterLink to="/support" class="quick-link">Developer Support</RouterLink>
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
    name: 'DeveloperPage',
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
  transform: translateY(60px); /* Start slightly lower */
  animation: fadeInSection 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
/* Stagger section animations based on their appearance order */
.dev-resources-section { animation-delay: 0.6s; } /* After hero illustration is mostly done */
.quick-links-section { animation-delay: 0.9s; } /* After dev resources start appearing */

@keyframes fadeInSection {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Hero Illustration Enhancements --- */
.dev-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Initial state for entry animation */
  transform: scale(0.7) rotate(-15deg) translateY(30px);
  opacity: 0;
  animation: showDevIllustration 1.2s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes showDevIllustration {
  to {
    transform: scale(1) rotate(0deg) translateY(0);
    opacity: 1;
  }
}

.dev-illustration svg {
  width: 260px; /* Made it larger */
  height: 260px;
  overflow: visible; /* Important for stroke animations */
  filter: drop-shadow(0 4px 15px rgba(var(--color-primary-rgb, 229, 170, 132), 0.3)); /* Soft glow */
}

.dev-illustration .sg-bg-rect {
  opacity: 0.03; /* Very subtle base */
  fill: rgba(var(--color-secondary-rgb, 100, 100, 200), 0.1); /* Subtle fill */
  stroke: var(--color-secondary);
  stroke-width: 0.25;
  animation: pulseBgRect 5s ease-in-out infinite 1.5s; /* Delayed start for pulsing */
}

@keyframes pulseBgRect {
  0%, 100% { opacity: 0.03; transform: scale(1); }
  50% { opacity: 0.1; transform: scale(1.08); }
}

.dev-illustration .sg-arrow-1,
.dev-illustration .sg-arrow-2,
.dev-illustration .sg-center-line {
  stroke: var(--color-primary);
  stroke-width: 1.25; /* Slightly thicker for better visibility */
  stroke-dasharray: 150; /* Ensure this is longer than any path segment */
  stroke-dashoffset: 150; /* Start with the line "undrawn" */
  opacity: 0;
  transform-origin: center center;
}

.dev-illustration .sg-arrow-1 {
  animation: drawLine 1s 1.2s ease-out forwards, 
             pulseLine 2.5s 2.2s ease-in-out infinite;
}
.dev-illustration .sg-arrow-2 {
  stroke: var(--color-accent-1); /* Different color for variety */
  animation: drawLine 1s 1.4s ease-out forwards, 
             pulseLineAccent1 2.5s 2.4s ease-in-out infinite;
}
.dev-illustration .sg-center-line {
  stroke: var(--color-secondary);
  stroke-width: 0.75;
  animation: drawLine 0.8s 1.6s ease-out forwards, 
             pulseLineCenter 3s 2.6s ease-in-out infinite;
}

@keyframes drawLine {
  0% { opacity: 0; stroke-dashoffset: 150; }
  50% { opacity: 1; } /* Become visible midway through drawing */
  100% { stroke-dashoffset: 0; opacity: 1; }
}

@keyframes pulseLine {
  0%, 100% { stroke-width: 1.25px; opacity: 1; transform: scale(1); }
  50% { stroke-width: 2px; opacity: 0.8; transform: scale(1.05); filter: drop-shadow(0 0 5px var(--color-primary)); }
}
@keyframes pulseLineAccent1 {
  0%, 100% { stroke-width: 1.25px; opacity: 1; transform: scale(1); }
  50% { stroke-width: 2px; opacity: 0.8; transform: scale(1.05); filter: drop-shadow(0 0 5px var(--color-accent-1)); }
}
@keyframes pulseLineCenter {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.1); filter: drop-shadow(0 0 4px var(--color-secondary)); }
}


/* --- Dev Resources Section --- */
.dev-resources-section {
  background-color: rgba(31, 41, 63, 0.2); /* Existing */
  position: relative; /* For pseudo-elements if needed */
  overflow: hidden; /* Contain any decorative elements */
}

.dev-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem; /* Slightly increased gap */
  margin-top: 3.5rem; /* Slightly increased margin */
}

/* Assuming FeatureCard component's root element can be targeted like this */
.dev-grid > * { /* Or .dev-grid > .feature-card-wrapper if FeatureCard has one */
  opacity: 0;
  transform: translateY(50px) scale(0.9); /* Start lower and smaller */
  animation: popInCard 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  /* Add a subtle continuous hover effect to the card itself */
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), 
              box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.dev-grid > *:hover {
    transform: translateY(-8px) scale(1.03); /* Lift and slightly enlarge on hover */
    box-shadow: 0 10px 30px rgba(0,0,0,0.2); /* More pronounced shadow on hover */
}

/* Stagger card animations - applied relative to section animation delay */
.dev-grid > *:nth-child(1) { animation-delay: calc(0.6s + 0.3s); } /* 0.6s is dev-resources-section delay */
.dev-grid > *:nth-child(2) { animation-delay: calc(0.6s + 0.45s); }
.dev-grid > *:nth-child(3) { animation-delay: calc(0.6s + 0.6s); }
.dev-grid > *:nth-child(4) { animation-delay: calc(0.6s + 0.75s); }

@keyframes popInCard {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* --- Quick Links Section --- */
.quick-links-section {
    padding: 5rem 0; /* Increased padding */
    position: relative;
}
/* Optional: Add a subtle animated background pattern */
.quick-links-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image:
        radial-gradient(circle at 10% 20%, rgba(var(--color-primary-rgb, 229, 170, 132), 0.05) 1px, transparent 1px),
        radial-gradient(circle at 90% 80%, rgba(var(--color-secondary-rgb, 100, 100, 200), 0.05) 1px, transparent 1px);
    background-size: 50px 50px, 60px 60px;
    opacity: 0;
    animation: fadeInPattern 1s 1.2s forwards; /* Delay matches section entry */
    z-index: -1;
}
@keyframes fadeInPattern {
    to { opacity: 0.5; }
}


.links-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.8rem; /* Increased gap */
    margin-top: 2.5rem;
}
.quick-link {
    padding: 0.9rem 2rem; /* Slightly larger padding */
    background-color: rgba(255, 255, 255, 0.02); /* Even more subtle base */
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 50px;
    color: var(--color-text);
    font-weight: 500;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15); /* Slightly stronger base shadow */

    /* Animation for entry */
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    animation: slideUpLink 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

/* Stagger quick link animations - applied relative to section animation delay */
.links-list .quick-link:nth-child(1) { animation-delay: calc(0.9s + 0.3s); } /* 0.9s is quick-links-section delay */
.links-list .quick-link:nth-child(2) { animation-delay: calc(0.9s + 0.4s); }
.links-list .quick-link:nth-child(3) { animation-delay: calc(0.9s + 0.5s); }
.links-list .quick-link:nth-child(4) { animation-delay: calc(0.9s + 0.6s); }
.links-list .quick-link:nth-child(5) { animation-delay: calc(0.9s + 0.7s); }

@keyframes slideUpLink {
  to {
    opacity: 0.8; /* Target opacity after animation */
    transform: translateY(0) scale(1);
  }
}

.quick-link::after { /* Shiny hover effect */
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 0;
  opacity: 0;
}

.quick-link span { /* If you wrap text in span for z-index */
  position: relative;
  z-index: 1;
}

.quick-link:hover {
    opacity: 1;
    background-color: rgba(var(--color-primary-rgb, 229, 170, 132), 0.15);
    transform: translateY(-5px) scale(1.08); /* More pop */
    color: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 8px 25px rgba(var(--color-primary-rgb, 229, 170, 132), 0.25);
}
.quick-link:hover::after {
  transform: scale(1);
  opacity: 1;
}

/* Ensure you have these RGB variables defined in your global styles or :root */
/*
:root {
  --color-primary-rgb: 229, 170, 132; // Example
  --color-secondary-rgb: 100, 100, 200; // Example
  --color-accent-1-rgb: ...; // Example
}
*/
</style>