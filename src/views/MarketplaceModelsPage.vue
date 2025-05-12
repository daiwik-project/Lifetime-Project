<!-- src/views/MarketplaceModelsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Model Marketplace"
        subtitle="Discover premium and specialized AI models ready for integration into your projects."
        bgShape="blob"
      >
          <template #extraContent>
              <div class="search-bar-container"> <!-- Reusing style from DocsPage -->
                  <input type="search" v-model="searchTerm" placeholder="Search marketplace models..." class="docs-search-input">
                  <button class="search-button" @click="searchModels">Search</button>
              </div>
          </template>
      </HeroSection>
  
      <section class="section models-gallery-section"> <!-- Reusing class from Explore -->
        <div class="container">
          <div class="gallery-controls"> <!-- Reusing class from Explore -->
              <div class="filters">
                  <label>Category:</label>
                  <select v-model="filterCategory">
                      <option value="">All</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="creative">Creative Tools</option>
                      <option value="enterprise">Enterprise Solutions</option>
                  </select>
                   <label>Pricing:</label>
                  <select v-model="filterPricing">
                      <option value="">All</option>
                      <option value="subscription">Subscription</option>
                      <option value="pay-per-use">Pay-per-use</option>
                      <option value="free-trial">Free Trial</option>
                  </select>
              </div>
          </div>
  
          <div v-if="isLoading" class="loading-indicator">Loading marketplace models...</div>
          <div v-else-if="filteredMarketplaceModels.length > 0" class="models-grid"> <!-- Reusing class from Explore -->
            <div class="model-card marketplace-card" v-for="model in filteredMarketplaceModels" :key="model.id"> <!-- Added marketplace-card class -->
              <div class="card-header">
                  <span :class="['model-type-badge', `type-${model.type.toLowerCase()}`]">{{ model.type.toUpperCase() }}</span>
                  <span class="model-provider">by {{ model.provider }}</span>
              </div>
              <h3 class="model-name">{{ model.name }}</h3>
              <p class="model-description">{{ model.description }}</p>
              <div class="model-pricing">
                  <span class="price">{{ model.price }}</span>
                  <span class="pricing-type">{{ model.pricingType }}</span>
              </div>
              <div class="model-actions">
                  <RouterLink :to="`/marketplace/models/${model.id}`" class="btn btn-secondary">View Details</RouterLink> <!-- Placeholder link -->
                  <button @click="subscribeOrPurchase(model.id)" class="btn btn-primary">{{ model.actionText || 'Get Model' }}</button>
              </div>
            </div>
          </div>
          <div v-else class="no-data-message">
            No marketplace models found matching your criteria.
          </div>
  
          <!-- Pagination -->
           <div class="pagination-controls" v-if="totalPages > 1">
              <button @click="currentPage--" :disabled="currentPage === 1">« Prev</button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage === totalPages">Next »</button>
          </div>
        </div>
      </section>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  
  export default {
    name: 'MarketplaceModelsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      const isLoading = ref(false);
      const allMarketplaceModels = ref([]);
      const searchTerm = ref('');
      const filterCategory = ref('');
      const filterPricing = ref('');
      const currentPage = ref(1);
      const itemsPerPage = ref(9); // Adjust as needed
  
      const fetchMarketplaceModels = () => {
          isLoading.value = true;
          console.log("Fetching marketplace models...");
          setTimeout(() => {
              allMarketplaceModels.value = [
                  { id: 'fin-risk-v1', name: 'Financial Risk Predictor', type: 'Tabular', provider: 'FinAnalytics Inc.', description: 'Predict credit default risk using advanced ML techniques.', price: '$199', pricingType: '/month', actionText: 'Subscribe', category: 'finance', pricingFilter: 'subscription' },
                  { id: 'med-img-dx', name: 'Medical Image Diagnosis Aid', type: 'Computer Vision', provider: 'HealthAI Solutions', description: 'Assists radiologists in identifying anomalies in medical scans.', price: '$0.50', pricingType: '/scan', actionText: 'Use API', category: 'healthcare', pricingFilter: 'pay-per-use' },
                  { id: 'logo-gen-pro', name: 'Pro Logo Generator', type: 'Generative', provider: 'Creative Sparks', description: 'Generate unique, professional logos based on descriptions.', price: '$29', pricingType: '/month (Trial Available)', actionText: 'Start Free Trial', category: 'creative', pricingFilter: 'free-trial' },
                  { id: 'hr-analytics', name: 'HR Attrition Predictor', type: 'Tabular', provider: 'Enterprise AI', description: 'Identify employees at risk of leaving using historical HR data.', price: 'Contact Sales', pricingType: '', actionText: 'Request Demo', category: 'enterprise', pricingFilter: 'enterprise' },
                   // Add more marketplace models
              ];
               isLoading.value = false;
          }, 1000);
      };
  
      const filteredMarketplaceModels = computed(() => {
          // Simple frontend filtering simulation
          return allMarketplaceModels.value.filter(m =>
              (searchTerm.value === '' || m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
              (filterCategory.value === '' || m.category === filterCategory.value) &&
              (filterPricing.value === '' || m.pricingFilter === filterPricing.value)
          )
          // Add pagination logic here if needed (similar to ExploreModelsPage)
          .slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value);
      });
  
       const totalPages = computed(() => {
          // Proper calculation needed based on total filtered items
           const totalFiltered = allMarketplaceModels.value.filter(m =>
              (searchTerm.value === '' || m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
              (filterCategory.value === '' || m.category === filterCategory.value) &&
              (filterPricing.value === '' || m.pricingFilter === filterPricing.value)
          ).length;
          return Math.ceil(totalFiltered / itemsPerPage.value) || 1;
      });
  
      const searchModels = () => { currentPage.value = 1; };
      watch([filterCategory, filterPricing, searchTerm], () => { currentPage.value = 1; });
      // watch(currentPage, fetchMarketplaceModels); // If backend handles pagination
  
      const subscribeOrPurchase = (modelId) => {
          console.log(`Action triggered for model: ${modelId}`);
          // Redirect to billing/checkout or specific model page
          alert(`Initiating purchase/subscription for model ${modelId} (simulation).`);
      };
  
      onMounted(fetchMarketplaceModels);
  
      return {
        isLoading,
        filteredMarketplaceModels,
        searchTerm,
        filterCategory,
        filterPricing,
        currentPage,
        totalPages,
        searchModels,
        subscribeOrPurchase
      };
    }
  };
  </script>
  
  <style scoped>
  /* Reusing styles from ExploreModelsPage */
  /* @import './ExploreModelsPage.css'; */
    /* Reusing styles from DocsPage for search bar */
    .search-bar-container {
      margin-top: 2rem; display: flex; max-width: 600px;
      margin-left: auto; margin-right: auto;
  }
  .docs-search-input {
      flex-grow: 1; padding: 0.9rem 1.5rem; border-radius: 50px 0 0 50px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05); color: var(--color-text);
      font-size: 1rem; outline: none;
  }
  .docs-search-input:focus { border-color: var(--color-primary); }
  .search-button {
      padding: 0.9rem 1.8rem; border-radius: 0 50px 50px 0;
      background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
      color: var(--color-text); font-weight: 500; border: none; cursor: pointer;
      transition: opacity 0.2s ease;
  }
  .search-button:hover { opacity: 0.9; }
  
  .models-gallery-section {
    background-color: rgba(31, 41, 63, 0.1);
    padding-bottom: 4rem;
  }
  
  .gallery-controls {
      display: flex;
      justify-content: flex-end; /* Align filters to the right */
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
  }
  .filters {
      display: flex;
      gap: 0.8rem;
      align-items: center;
  }
  .filters label {
      font-size: 0.9rem;
      opacity: 0.8;
  }
  .filters select {
      padding: 0.5rem 1rem; border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text); font-size: 0.9rem;
  }
  
  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .model-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .model-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
  }
  .model-type-badge { /* Reusing from CreateCustomModelPage */
      padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold;
      color: var(--color-background); text-transform: uppercase;
  }
  .type-nlp { background-color: var(--color-accent-2); }
  .type-computer-vision { background-color: var(--color-secondary); }
  .type-tabular { background-color: #4CAF50; } /* Green */
  .type-generative { background-color: var(--color-primary); }
  .type-community { background-color: #909fea; } /* From style.css */
  
  .model-source {
      font-size: 0.8rem;
      opacity: 0.6;
  }
  
  .model-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--color-text);
  }
  
  .model-description {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    flex-grow: 1; /* Push tags/actions down */
     /* Clamp text */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .model-tags {
      margin-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
  }
  .tag {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-text);
      opacity: 0.8;
      padding: 0.3rem 0.7rem;
      border-radius: 15px;
      font-size: 0.8rem;
  }
  
  .model-actions {
    margin-top: auto; /* Stick to bottom */
    display: flex;
    gap: 1rem;
  }
  .model-actions .btn {
      flex: 1; /* Make buttons equal width */
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      text-align: center;
  }
  .model-actions .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .model-actions .btn-secondary:hover { background: rgba(255, 255, 255, 0.15); }
  
  .loading-indicator, .no-data-message { /* Reusing from CommunityQuestionsPage */
      text-align: center; padding: 3rem; opacity: 0.7;
  }
  .pagination-controls { /* Reusing from CommunityQuestionsPage */
      display: flex; justify-content: center; align-items: center;
      gap: 1rem; margin-top: 2.5rem;
  }
  .pagination-controls button {
      padding: 0.5rem 1rem; background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2); color: var(--color-text);
      border-radius: 5px;
  }
  .pagination-controls button:disabled { opacity: 0.5; cursor: not-allowed; }
  .pagination-controls span { opacity: 0.8; }
  /* above is explore model page */
  .marketplace-card { /* Specific styles for marketplace */
      border-left: 4px solid var(--color-accent-3); /* Add an accent */
  }
  .model-provider {
      font-size: 0.85rem;
      opacity: 0.7;
      font-style: italic;
  }
  .model-pricing {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
  }
  .price {
      font-size: 1.4rem;
      font-weight: bold;
      color: var(--color-primary);
  }
  .pricing-type {
      font-size: 0.9rem;
      opacity: 0.8;
  }
  </style>