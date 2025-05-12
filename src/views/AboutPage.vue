<template>
  <MainLayout>
    <!-- Hero Section -->
    <HeroSection
      title="About GenAI Labs"
      subtitle="We're a team of AI innovators on a mission to make advanced AI accessible to everyone."
      bgShape="circle"
    >
      <template #image>
        <div class="team-illustration">
          <div class="team-sphere" />
        </div>
      </template>
    </HeroSection>

    <!-- Our Mission Section -->
    <section class="section mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">Our <span class="gradient-text">Mission</span></h2>
            <p class="mission-paragraph">
              At GenAI Labs, we believe that artificial intelligence should be a force for good, accessible to everyone
              and built with transparency at its core. Our mission is to democratize AI by creating tools and models that
              are efficient, explainable, and easy to integrate into any workflow.
            </p>
            <p class="mission-paragraph">
              We're committed to addressing the biggest challenges in AI today: high computational costs, data quality issues,
              scaling difficulties, and lack of transparency. By solving these problems, we empower organizations of all sizes
              to harness the transformative power of AI.
            </p>
          </div>
          <div class="mission-image">
            <div class="image-placeholder">
              <div class="shape shape-1" />
              <div class="shape shape-2" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="section story-section">
      <div class="container">
        <h2 class="section-title">Our <span class="gradient-text">Story</span></h2>
        <div class="story-timeline">
          <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
            <div class="timeline-date">{{ item.year }}</div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section team-section">
      <div class="container">
        <h2 class="section-title">Our <span class="gradient-text">Team</span></h2>
        <p class="section-subtitle">
          We're a diverse group of AI researchers, engineers, and designers united by a common goal:
          to make AI more accessible, efficient, and transparent.
        </p>

        <div class="team-grid">
          <div class="team-member" v-for="(member, index) in team" :key="index">
            <div class="member-photo" />
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>

        <div class="team-cta">
          <RouterLink to="/contact" class="btn btn-primary">Join Our Team</RouterLink>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section values-section">
      <div class="container">
        <h2 class="section-title">Our <span class="gradient-text">Values</span></h2>

        <div class="values-grid">
          <div class="value-card" v-for="(value, index) in values" :key="index">
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-text">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../components/HeroSection.vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'AboutPage',
  components: {
    MainLayout,
    HeroSection,
    RouterLink
  },
  data() {
    return {
      timeline: [
        {
          year: '2021',
          title: 'The Beginning',
          text: 'GenAI Labs was founded by a group of AI researchers and engineers...'
        },
        {
          year: '2022',
          title: 'First Breakthrough',
          text: 'We developed our first efficiency-focused AI training algorithm...'
        },
        {
          year: '2023',
          title: 'Scaling Up',
          text: 'As our user base grew, we expanded our team and opened offices...'
        },
        {
          year: '2024',
          title: 'Where We Are Today',
          text: 'Today, GenAI Labs serves over 100 clients worldwide...'
        }
      ],
      team: [
        { name: 'Sarah Chen', role: 'CEO & Co-founder' },
        { name: 'Michael Rodriguez', role: 'CTO & Co-founder' },
        { name: 'Aisha Patel', role: 'Head of Research' },
        { name: 'David Kim', role: 'Head of Engineering' }
      ],
      values: [
        {
          title: 'Innovation',
          text: 'We constantly push the boundaries of what’s possible with AI...'
        },
        {
          title: 'Transparency',
          text: 'We believe in making AI understandable and explainable...'
        },
        {
          title: 'Accessibility',
          text: 'We’re committed to democratizing AI by making it accessible...'
        },
        {
          title: 'Responsibility',
          text: 'We develop AI with ethical considerations in mind...'
        }
      ]
    }
  }
}
</script>

<style scoped>
.team-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.team-sphere {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at 30% 30%, var(--color-secondary), var(--color-accent-2));
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 50px rgba(89, 171, 230, 0.5);
  animation: pulse 6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.mission-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.mission-content {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.mission-text {
  flex: 1;
}

.mission-paragraph {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  opacity: 0.9;
}

.mission-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 400px;
  height: 300px;
  position: relative;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
  top: -50px;
  right: -50px;
  opacity: 0.7;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-accent-2));
  bottom: -30px;
  left: -30px;
  opacity: 0.7;
}

.story-timeline {
  margin-top: 4rem;
  position: relative;
}

.story-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 120px;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
}

.timeline-item {
  display: flex;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-date {
  width: 100px;
  margin-right: 40px;
  text-align: right;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--color-primary);
  padding-top: 0.5rem;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 120px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
  transform: translateX(-50%);
}

.timeline-content {
  flex: 1;
  padding-left: 2rem;
}

.timeline-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline-text {
  line-height: 1.6;
  opacity: 0.8;
}

.team-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.team-member {
  text-align: center;
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
}

.member-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.member-role {
  font-size: 0.9rem;
  opacity: 0.7;
}

.team-cta {
  text-align: center;
  margin-top: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.value-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.value-text {
  line-height: 1.6;
  opacity: 0.8;
}

@media (max-width: 992px) {
  .mission-content {
    flex-direction: column;
  }

  .mission-image {
    order: -1;
  }

  .image-placeholder {
    width: 100%;
  }

  .story-timeline::before {
    left: 20px;
  }

  .timeline-date {
    width: 60px;
    margin-right: 20px;
  }

  .timeline-item::after {
    left: 20px;
  }

  .timeline-content {
    padding-left: 1.5rem;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .team-grid, .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
