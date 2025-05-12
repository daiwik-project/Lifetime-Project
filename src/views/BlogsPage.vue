<!-- src/views/BlogsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="GenAI Labs Blog"
        subtitle="Insights, tutorials, and news from the forefront of Artificial Intelligence."
        bgShape="blob"
      />
  
      <section class="section blog-section">
        <div class="container">
          <h2 class="section-title">Latest <span class="gradient-text">Articles</span></h2>
  
          <!-- Add filtering/search options here if needed -->
          <!-- <div class="blog-filters"> ... </div> -->
  
          <div v-if="blogPosts.length > 0" class="blog-grid">
            <div class="blog-card" v-for="post in blogPosts" :key="post.id">
              <RouterLink :to="`/blog/${post.slug}`" class="card-image-link">
                <img :src="post.imageUrl" :alt="post.title" class="card-image">
              </RouterLink>
              <div class="card-content">
                <p class="card-meta">
                  <span class="card-date">{{ formatDate(post.date) }}</span> |
                  <span class="card-category">{{ post.category }}</span>
                </p>
                <h3 class="card-title">
                  <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
                </h3>
                <p class="card-excerpt">{{ post.excerpt }}</p>
                <RouterLink :to="`/blog/${post.slug}`" class="card-read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </RouterLink>
              </div>
            </div>
          </div>
          <div v-else class="no-posts">
            <p>No blog posts found. Check back soon!</p>
          </div>
  
          <!-- Add pagination controls here if needed -->
          <!-- <div class="blog-pagination"> ... </div> -->
  
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
    name: 'BlogsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      // Placeholder blog data - replace with actual data fetching
      const blogPosts = ref([
        { id: 1, slug: 'understanding-large-language-models', title: 'Understanding Large Language Models (LLMs)', category: 'AI Concepts', date: '2024-03-10', excerpt: 'A deep dive into the architecture and capabilities of modern LLMs like GPT-4.', imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31' },
        { id: 2, slug: 'fine-tuning-models-for-specific-tasks', title: 'Fine-Tuning Models for Specific Tasks', category: 'Tutorials', date: '2024-03-05', excerpt: 'Learn how to adapt pre-trained models to your unique datasets and requirements.', imageUrl: 'https://source.unsplash.com/random/800x600/?code,settings' },
        { id: 3, slug: 'the-ethics-of-generative-ai', title: 'The Ethics of Generative AI', category: 'Industry Trends', date: '2024-02-28', excerpt: 'Exploring the ethical considerations and challenges surrounding generative AI technologies.', imageUrl: 'https://source.unsplash.com/random/800x600/?ethics,balance' },
        { id: 4, slug: 'optimizing-ai-training-costs', title: 'Optimizing AI Training Costs with GenAI Labs', category: 'Case Studies', date: '2024-02-20', excerpt: 'How our platform helps reduce computational expenses during model training.', imageUrl: 'https://source.unsplash.com/random/800x600/?server,money' },
      ]);
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  
      return {
        blogPosts,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .blog-section {
    background-color: rgba(31, 41, 63, 0.1);
  }
  
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }
  
  .blog-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  .card-image-link {
      display: block;
  }
  .card-image {
    width: 100%;
    height: 200px; /* Fixed height for consistency */
    object-fit: cover; /* Crop image nicely */
    display: block;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Ensure content fills space */
  }
  
  .card-meta {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .card-category {
      color: var(--color-secondary);
      font-weight: 500;
  }
  
  .card-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  .card-title a {
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.3s ease;
  }
  .card-title a:hover {
      color: var(--color-primary);
  }
  
  .card-excerpt {
    opacity: 0.85;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1; /* Push read more link down */
  }
  
  .card-read-more {
    display: inline-flex; /* Use inline-flex */
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--color-primary);
    margin-top: auto; /* Stick to bottom */
    align-self: flex-start; /* Align left */
    transition: gap 0.3s ease;
  }
  
  .card-read-more:hover {
    gap: 0.8rem;
  }
  .card-read-more svg {
      transition: transform 0.3s ease;
  }
  .card-read-more:hover svg {
      transform: translateX(3px);
  }
  
  .no-posts {
      text-align: center;
      padding: 3rem 0;
      opacity: 0.8;
      font-size: 1.1rem;
  }
  </style>