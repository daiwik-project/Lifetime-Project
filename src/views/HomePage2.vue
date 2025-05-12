<script>
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../components/HeroSection.vue'
import FeatureCard from '../components/FeatureCard.vue'
import { RouterLink } from 'vue-router'; // Import RouterLink

export default {
  name: 'HomePage',
  components: {
    MainLayout,
    HeroSection,
    FeatureCard,
    RouterLink // Register RouterLink
  }
}
</script>

<template>
  <MainLayout>
    <!-- Hero Section -->
    <HeroSection
      title="Unlock the Full Potential of AI Models"
      subtitle="We develop cutting-edge AI tools to accelerate your innovation. Smarter, faster, and more efficient AI starts here."
      :hasButton="true"
      buttonText="Get Started"
      buttonLink="/gen"
      bgShape="blob"
    >
      <template #image>
        <div class="hero-sphere">
          <div class="sphere" />
        </div>
      </template>
    </HeroSection>

    <!-- Features Section -->
    <section class="section features-section">
      <div class="container">
        <h2 class="section-title">Your AI models <span class="gradient-text">deserve better</span></h2>
        <p class="section-subtitle">
          Building AI is challenging, but it shouldn't be a roadblock. We solve the biggest hurdles in AI training
          so you can focus on innovation, not limitations.
        </p>

        <div class="features-grid">
          <FeatureCard
            title="Training AI is Expensive & Time-Consuming"
            description="Our optimized models reduce training time and computational costs by up to 60%, making AI development more accessible."
            color="var(--color-primary)"
            icon="⏱️"
          />

          <FeatureCard
            title="Data Quality Limits AI Performance"
            description="We leverage high-quality, expertly curated datasets to train our AI models, ensuring precision, fairness, and adaptability across industries."
            color="var(--color-secondary)"
            icon="📊"
          />

          <FeatureCard
            title="Scaling AI Requires Complex Infrastructure"
            description="Our AI models are designed for seamless scalability, running efficiently on both cloud-based and on-premise infrastructures."
            color="var(--color-accent-1)"
            icon="🚀"
          />

          <FeatureCard
            title="Keeping Up with AI Advancements"
            description="Stay ahead with our continuously evolving AI models, designed for cutting-edge applications in various industries."
            color="var(--color-accent-2)"
            icon="🔄"
          />

          <FeatureCard
            title="AI Models Struggle to Adapt to New Data"
            description="With automated retraining pipelines and self-improving algorithms, our models evolve alongside your business, ensuring long-term accuracy."
            color="var(--color-accent-3)"
            icon="🧠"
          />

          <FeatureCard
            title="Lack of Explainability and Trust in AI"
            description="We develop AI models with explainability at their core, integrating interpretable architectures and transparent reporting."
            color="var(--color-card-4)"
            icon="🔍"
          />
        </div>
      </div>
    </section>

    <!-- Explore Our Ecosystem Section (NEW) -->
    <section class="section ecosystem-section">
      <div class="container">
        <h2 class="section-title">Explore Our <span class="gradient-text">Ecosystem</span></h2>
        <p class="section-subtitle">
          Discover powerful tools, a vibrant community, and the latest advancements from GenAI Labs.
        </p>
        <div class="features-grid">
          <FeatureCard
            title="Meet Our New GPT"
            description="Experience the next level of generative AI with our latest flagship GPT model, designed for enhanced creativity and understanding."
            color="var(--color-primary)"
            icon="✨"
            link="/newgpt"
          />
          <FeatureCard
            title="Model Marketplace"
            description="Browse, discover, and integrate a wide range of pre-trained and community-contributed AI models for your projects."
            color="var(--color-secondary)"
            icon="🛍️"
            link="/marketplace/models"
          />
          <FeatureCard
            title="Developer Portal"
            description="Access comprehensive documentation, APIs, SDKs, and tools to build and integrate AI with GenAI Labs."
            color="var(--color-accent-1)"
            icon="🛠️"
            link="/developer"
          />
          <FeatureCard
            title="Community Hub"
            description="Join discussions, ask questions, share your projects, and collaborate with fellow AI enthusiasts and experts."
            color="var(--color-accent-2)"
            icon="💬"
            link="/community"
          />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section stats-section">
      <div class="container">
        <h2 class="section-title">Why Our AI Trainers <span class="gradient-text">Make a Difference</span></h2>
        <p class="section-subtitle">
          AI training shouldn't be a bottleneck—it should be an accelerator. Our models are built for efficiency, precision, and scalability,
          helping you achieve faster training times, reduced costs, and higher accuracy.
        </p>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-number">3X</span>
            <span class="stat-label">Faster Training</span>
          </div>

          <div class="stat-card">
            <span class="stat-number">50%</span>
            <span class="stat-label">Lower Costs</span>
          </div>

          <div class="stat-card">
            <span class="stat-number">98%</span>
            <span class="stat-label">Model Accuracy</span>
          </div>

          <div class="stat-card">
            <span class="stat-number">100+</span>
            <span class="stat-label">Clients Worldwide</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="section partners-section">
      <div class="container">
        <h2 class="section-title">We collaborate with the <span class="gradient-text">best tech industries</span></h2>
        <p class="section-subtitle">
          Join the top innovators using our AI models to revolutionize their industries.
        </p>

        <div class="partners-grid">
          <div class="partner-logo">Partner 1</div>
          <div class="partner-logo">Partner 2</div>
          <div class="partner-logo">Partner 3</div>
          <div class="partner-logo">Partner 4</div>
          <div class="partner-logo">Partner 5</div>
        </div>

        <div class="partners-cta">
          <RouterLink to="/contact" class="btn btn-primary">Join Them</RouterLink>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="section-title">Stay Ahead of <span class="gradient-text">AI Innovations</span></h2>
          <p class="section-subtitle">
            Join our exclusive newsletter for the latest breakthroughs, trends, and AI training insights.
          </p>

          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Your email address" class="newsletter-input">
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
        <div class="newsletter-decoration">
          <div class="blob" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>


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
  background: radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-accent-3));
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 50px rgba(229, 170, 132, 0.5);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.features-section {
  background-color: rgba(31, 41, 63, 0.3);
}

/* NEW Section Style */
.ecosystem-section {
  /* background-color: rgba(var(--color-secondary-rgb), 0.05); /* Optional: different background */
  /* You can use the default section background or a subtle variation */
}

.features-grid {
  display: grid;
  /* Adjusted minmax for potentially 4 cards in a row on wider screens */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
/* Ensure FeatureCard links are styled correctly if not already global */
.features-grid .feature-card .card-link {
    /* Styles are in FeatureCard.vue, this is just a reminder */
}


.stats-section {
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(199, 61, 22, 0.1), transparent 70%);
  z-index: -1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.8;
}

.partners-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.partners-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
}

.partner-logo {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  width: 180px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: var(--color-text);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

.partners-cta {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.newsletter-section {
  position: relative;
  overflow: hidden;
}

.newsletter-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  position: relative;
  z-index: 2;
}

.newsletter-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
}

.btn { /* This style for .btn might conflict if FeatureCard uses a different .btn style internally */
  border-radius: 50px; /* This is from your original HomePage.vue */
  padding: 1rem 2rem; /* This is from your original HomePage.vue */
}

.newsletter-decoration {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  z-index: 0;
  opacity: 0.2;
}

.blob {
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: blob-animation 15s infinite alternate;
}

@keyframes blob-animation {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  25% {
    border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
  }
  50% {
    border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
  }
  75% {
    border-radius: 30% 70% 40% 60% / 60% 40% 60% 40%;
  }
  100% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }
}

@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
  }

  .features-grid {
    grid-template-columns: 1fr; /* Stack cards on smaller screens */
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .partner-logo {
    width: 140px;
    height: 70px;
    padding: 1rem;
  }
}
</style>