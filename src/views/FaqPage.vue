<!-- src/views/FaqPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about GenAI Labs."
        bgShape="none"
      />
  
      <section class="section faq-section">
        <div class="container faq-container">
          <h2 class="section-title">Common <span class="gradient-text">Questions</span></h2>
  
          <div class="faq-list">
            <div class="faq-item" v-for="(item, index) in faqItems" :key="index" :class="{ open: openIndex === index }">
              <button class="faq-question" @click="toggleItem(index)">
                <span>{{ item.question }}</span>
                <!-- MODIFICATION 1: Always use '+', rotation will be handled by CSS -->
                <span class="faq-icon">+</span>
              </button>
              <!-- MODIFICATION 2: Remove v-show, CSS will handle animation -->
              <div class="faq-answer">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
  
          <div class="faq-contact-prompt">
              <h3>Can't find your answer?</h3>
              <p>If you have other questions, feel free to reach out to our support team.</p>
              <RouterLink to="/contact" class="btn btn-primary">Contact Support</RouterLink>
          </div>
        </div>
      </section>
    </MainLayout>
  </template>
  
  <script>
  // ... your existing script ...
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    name: 'FaqPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      const openIndex = ref(null); // Index of the currently open FAQ item
  
      // Placeholder FAQ data - replace with actual content
      const faqItems = ref([
        { question: 'What is GenAI Labs?', answer: 'GenAI Labs provides cutting-edge AI tools and models designed for efficiency, scalability, and ease of use, helping businesses accelerate innovation.' },
        { question: 'What types of AI models do you offer?', answer: 'We offer a range of models including Large Language Models (LLMs), Machine Learning (ML) classifiers/regressors, Deep Learning (DL) models for vision and sequences, NLP models, RAG systems, and tools to build custom fusion models.' },
        { question: 'How does the pricing work?', answer: 'We offer various pricing tiers, including a free tier for getting started, pro plans for individuals and teams, and custom enterprise solutions. Please visit our Pricing page for details.' },
        { question: 'Can I train models with my own data?', answer: 'Yes! Our platform allows you to upload your datasets (CSV, JSON, Parquet, etc.) to fine-tune existing models or train custom models from scratch.' },
        { question: 'Is my data secure?', answer: 'Data security is a top priority. We implement industry-standard security measures, encryption, and access controls. User data provided for training is isolated. Please see our Data Policy for more details.' },
        { question: 'How do I get started?', answer: 'Simply sign up for an account! You can start exploring our platform with the free tier or choose a plan that suits your needs. Check out our Documentation for guides and tutorials.' },
      ]);
  
      const toggleItem = (index) => {
        openIndex.value = openIndex.value === index ? null : index;
      };
  
      return {
        faqItems,
        openIndex,
        toggleItem
      };
    }
  };
  </script>
  
  <style scoped>
  .faq-section {
    background-color: rgba(31, 41, 63, 0.1);
    padding-bottom: 6rem;
    /* Add perspective to the container for 3D child elements */
    perspective: 1500px; 
  }
  
  .faq-container {
      max-width: 900px;
  }
  
  .faq-list {
    margin-top: 3rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    /* overflow: hidden; */ /* Removing this to allow box-shadows from scaled items to show fully */
                            /* We'll manage border-radius on items if needed */
  }
  
  .faq-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative; /* For z-index stacking */
    /* NEW: Transition for scale and box-shadow */
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), 
                box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .faq-item:last-child {
    border-bottom: none;
  }
  /* NEW: Styling for the open item to make it pop */
  .faq-item.open {
      transform: scale(1.03); /* Slightly scale up the open item */
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2); /* More prominent shadow */
      z-index: 10; /* Ensure it's above other items */
      border-radius: 8px; /* Maintain rounded corners if faq-list overflow:hidden is removed */
  }
  /* Ensure first and last open items also respect the main list's border radius */
  .faq-list > .faq-item:first-child.open {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
  }
  .faq-list > .faq-item:last-child.open {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
  }
  
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    color: var(--color-text);
    font-size: 1.1rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s ease, 
                color 0.3s ease,
                transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* NEW: transition for hover transform */
    position: relative; /* For z-index if needed, and to contain pseudo-elements if any */
    z-index: 1; /* Above the answer panel before it animates */
    border-radius: inherit; /* Inherit border-radius from .faq-item when it's open */
  }
  .faq-question:hover {
    background-color: rgba(255, 255, 255, 0.08);
    transform: translateX(8px); /* NEW: Nudge effect on hover */
  }
  .faq-item.open .faq-question {
      background-color: rgba(229, 170, 132, 0.1);
      color: var(--color-primary);
  }
  
  .faq-icon {
    font-size: 1.5rem; /* Keep this for sizing */
    line-height: 1; /* Ensure consistent vertical alignment */
    font-weight: normal; /* Let the content be the visual */
    margin-left: 1rem;
    display: inline-block;
    /* NEW: More dynamic transition for the icon */
    transition: transform 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bouncy effect */
    transform-origin: center center;
  }
  
  .faq-item.open .faq-icon {
    /* Rotate to form an 'X' and slightly scale up for emphasis */
    transform: rotate(225deg) scale(1.1); 
  }
  
  .faq-answer {
    background-color: rgba(0, 0, 0, 0.1);
    line-height: 1.7;
    font-size: 1rem;
    
    /* NEW: 3D Fold-down and Blur Animation properties */
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    padding-left: 1.5rem; /* Keep horizontal padding consistent */
    padding-right: 1.5rem;
    padding-top: 0;
    padding-bottom: 0;
    
    transform-origin: top center; /* Animation originates from the top */
    transform: perspective(600px) rotateX(-90deg) translateY(-20px); /* Initial 3D folded state & slightly up */
    filter: blur(5px); /* Start blurred */
    
    transition: max-height 0.5s ease-in-out,
                opacity 0.4s 0.1s ease-in-out, /* Opacity animates slightly later */
                transform 0.5s ease-in-out,
                filter 0.4s 0.1s ease-in-out, /* Blur animates slightly later */
                padding-top 0.5s ease-in-out,
                padding-bottom 0.5s ease-in-out;
    border-bottom-left-radius: inherit; /* Inherit from .faq-item when open */
    border-bottom-right-radius: inherit;
  }
  .faq-answer p {
      margin: 0;
  }
  
  .faq-item.open .faq-answer {
    max-height: 700px; /* Increased for potentially longer content + 3D effect */
    opacity: 0.9;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transform: perspective(600px) rotateX(0deg) translateY(0px); /* Flat open state */
    filter: blur(0px); /* Unblurred */
  }
  
  .faq-contact-prompt {
      margin-top: 4rem;
      text-align: center;
      padding: 2rem;
      background-color: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .faq-contact-prompt h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--color-primary);
  }
  .faq-contact-prompt p {
      opacity: 0.8;
      margin-bottom: 1.5rem;
  }
  </style>