<template>
  <section class="hero-section" :class="bgShapeClass">
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p class="hero-subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
        <div v-if="hasButton" class="hero-buttons">
          <RouterLink :to="buttonLink || '#'" class="btn btn-primary">
            {{ buttonText || 'Get Started' }}
          </RouterLink>
          <slot name="extraButton" />
        </div>
        <slot name="extraContent" />
      </div>
      <div class="hero-image">
        <slot name="image" />
      </div>
    </div>
    <div class="bg-element bg-element-1" />
    <div class="bg-element bg-element-2" />
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'HeroSection',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    hasButton: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: ''
    },
    buttonLink: {
      type: String,
      default: ''
    },
    bgShape: {
      type: String,
      default: 'none',
      validator: value => ['circle', 'square', 'blob', 'none'].includes(value)
    }
  },
  setup(props) {
    const bgShapeClass = computed(() => {
      return props.bgShape ? `bg-shape-${props.bgShape}` : 'bg-shape-none'
    })

    return {
      ...props,
      bgShapeClass
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  padding: 8rem 0 6rem;
  overflow: hidden;
  background-color: var(--color-background);
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.hero-image {
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-element {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: 1;
}

.bg-element-1 {
  background: var(--color-primary);
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}

.bg-element-2 {
  background: var(--color-secondary);
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -100px;
}

.bg-shape-circle::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
  top: 60%;
  right: 10%;
  z-index: 1;
  opacity: 0.8;
}

.bg-shape-square::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent-1), var(--color-secondary));
  top: 40%;
  right: 15%;
  z-index: 1;
  opacity: 0.8;
  transform: rotate(45deg);
}

.bg-shape-blob::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, var(--color-accent-2), var(--color-secondary));
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: 40%;
  right: 10%;
  z-index: 1;
  opacity: 0.6;
}

@media (max-width: 992px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-image {
    order: -1;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0 4rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
