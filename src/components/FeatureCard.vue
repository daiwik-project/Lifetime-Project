<template>
  <div class="feature-card" :style="cardStyle">
    <div class="icon-container">
      <slot name="icon">
        <div class="default-icon" v-if="!$slots.icon">
          {{ icon && icon.length > 0 ? icon.charAt(0) : 'A' }}
        </div>
      </slot>
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <slot name="extra" />
    <RouterLink v-if="link" :to="link" class="card-link">
      Learn more
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </RouterLink>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FeatureCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props, { slots }) {
    const cardStyle = computed(() => {
      if (!props.color) return {}
      return {
        '--card-color': props.color
      }
    })

    return {
      ...props,
      cardStyle,
      $slots: slots
    }
  }
}
</script>


<style scoped>
.feature-card {
  --card-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-color);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.icon-container {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--card-color);
}

.default-icon {
  font-size: 1.8rem;
  font-weight: bold;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.card-description {
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--card-color);
  transition: gap 0.3s ease;
}

.card-link:hover {
  gap: 0.8rem;
}
</style>
