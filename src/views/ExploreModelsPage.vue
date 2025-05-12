<!-- src/views/ExploreModelsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Explore AI Models"
        subtitle="Discover pre-trained models, community contributions, and cutting-edge architectures available on GenAI Labs."
        bgShape="circle"
      >
          <template #extraContent>
              <div class="search-bar-container"> <!-- Reusing style from DocsPage -->
                  <input type="search" v-model="searchTerm" placeholder="Search models (e.g., 'image classification', 'GPT')..." class="docs-search-input">
                  <button class="search-button" @click="searchModels">Search</button>
              </div>
          </template>
      </HeroSection>
  
      <section class="section models-gallery-section">
        <div class="container">
          <div class="gallery-controls">
              <!-- Filters -->
              <div class="filters">
                  <label>Category:</label>
                  <select v-model="filterCategory">
                      <option value="">All</option>
                      <option value="nlp">NLP</option>
                      <option value="computer-vision">Computer Vision</option>
                      <option value="tabular">Tabular Data</option>
                      <option value="generative">Generative</option>
                      <option value="community">Community</option>
                  </select>
                   <label>Sort By:</label>
                  <select v-model="sortBy">
                      <option value="popularity">Popularity</option>
                      <option value="recent">Most Recent</option>
                      <option value="name">Name (A-Z)</option>
                  </select>
              </div>
          </div>
  
          <div v-if="isLoading" class="loading-indicator">Loading models...</div>
          <div v-else-if="filteredModels.length > 0" class="models-grid">
            <div class="model-card" v-for="model in filteredModels" :key="model.id">
              <div class="card-header">
                  <span :class="['model-type-badge', `type-${model.type.toLowerCase()}`]">{{ model.type.toUpperCase() }}</span>
                  <span class="model-source" v-if="model.source">{{ model.source }}</span>
              </div>
              <h3 class="model-name">{{ model.name }}</h3>
              <p class="model-description">{{ model.description }}</p>
              <div class="model-tags">
                  <span v-for="tag in model.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="model-actions">
                  <RouterLink :to="`/models/${model.id}`" class="btn btn-secondary">View Details</RouterLink> <!-- Placeholder link -->
                  <RouterLink :to="`/user/user-dashboard/use/${model.type}/model/${model.id}`" class="btn btn-primary">Use Model</RouterLink>
              </div>
            </div>
          </div>
          <div v-else class="no-data-message">
            No models found matching your criteria.
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
    name: 'ExploreModelsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      const isLoading = ref(false);
      const allModels = ref([]); // Holds all fetched models
      const searchTerm = ref('');
      const filterCategory = ref('');
      const sortBy = ref('popularity');
      const currentPage = ref(1);
      const itemsPerPage = ref(12); // Models per page
  
      const fetchModels = () => {
          isLoading.value = true;
          console.log("Fetching models...");
          // Simulate API call
          setTimeout(() => {
              allModels.value = [
                  { id: 'gpt-neo-1b', name: 'GPT-Neo 1.3B', type: 'NLP', source: 'EleutherAI', description: 'Large language model for text generation and understanding.', tags: ['LLM', 'Generative', 'Transformer'], popularity: 95 },
                  { id: 'resnet50', name: 'ResNet-50', type: 'Computer Vision', source: 'Official', description: 'Deep convolutional network for image classification tasks.', tags: ['Image Classification', 'CNN'], popularity: 92 },
                  { id: 'bert-base', name: 'BERT Base (uncased)', type: 'NLP', source: 'Google', description: 'Transformer model for various NLP tasks like sentiment analysis, Q&A.', tags: ['Transformer', 'Embeddings'], popularity: 90 },
                  { id: 'stable-diffusion-v1', name: 'Stable Diffusion v1.5', type: 'Generative', source: 'Stability AI', description: 'Generate high-quality images from text prompts.', tags: ['Text-to-Image', 'Diffusion'], popularity: 98 },
                  { id: 'xgboost-classifier', name: 'XGBoost Classifier', type: 'Tabular', source: 'Community', description: 'Gradient boosting model for classification on structured data.', tags: ['Classification', 'Boosting'], popularity: 85 },
                  { id: 'yolov5', name: 'YOLOv5', type: 'Computer Vision', source: 'Ultralytics', description: 'Real-time object detection model.', tags: ['Object Detection'], popularity: 88 },
                  // Add more models
              ];
               isLoading.value = false;
          }, 1200);
      };
  
      const filteredModels = computed(() => {
          let models = allModels.value;
  
          // Filter by search term
          if (searchTerm.value) {
              const lowerSearch = searchTerm.value.toLowerCase();
              models = models.filter(m =>
                  m.name.toLowerCase().includes(lowerSearch) ||
                  m.description.toLowerCase().includes(lowerSearch) ||
                  m.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
              );
          }
  
          // Filter by category
          if (filterCategory.value) {
              models = models.filter(m => m.type.toLowerCase() === filterCategory.value.toLowerCase() || (filterCategory.value === 'community' && m.source === 'Community'));
          }
  
          // Sort
          if (sortBy.value === 'recent') {
              // Need a date field for this, assuming popularity for now
              models.sort((a, b) => b.popularity - a.popularity); // Placeholder sort
          } else if (sortBy.value === 'name') {
              models.sort((a, b) => a.name.localeCompare(b.name));
          } else { // Default popularity
               models.sort((a, b) => b.popularity - a.popularity);
          }
  
          // Paginate (simple frontend pagination, backend preferred for large datasets)
          const start = (currentPage.value - 1) * itemsPerPage.value;
          const end = start + itemsPerPage.value;
          return models.slice(start, end);
      });
  
       const totalPages = computed(() => {
          // Calculate total pages based on filtered results BEFORE pagination
          // This requires filtering logic to run without slicing first
          // For simplicity here, we base it on the currently displayed slice length
          // Replace with proper calculation based on total filtered items count from backend/full list
          const totalFiltered = allModels.value.filter(m =>
              (searchTerm.value === '' || m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.value.toLowerCase()) || m.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))) &&
              (filterCategory.value === '' || m.type.toLowerCase() === filterCategory.value.toLowerCase() || (filterCategory.value === 'community' && m.source === 'Community'))
          ).length;
          return Math.ceil(totalFiltered / itemsPerPage.value) || 1;
      });
  
      const searchModels = () => {
          currentPage.value = 1; // Reset to first page on new search
          // Fetching would normally happen here if backend handles search/filter
      };
  
      // Watch filters to reset page and potentially refetch
      watch([filterCategory, sortBy, searchTerm], () => {
          currentPage.value = 1;
          // fetchModels(); // Uncomment if backend handles filtering/sorting
      });
       watch(currentPage, () => {
          // fetchModels(); // Uncomment if backend handles pagination
      });
  
  
      onMounted(fetchModels);
  
      return {
        isLoading,
        filteredModels,
        searchTerm,
        filterCategory,
        sortBy,
        currentPage,
        totalPages,
        searchModels
      };
    }
  };
  </script>
  
  <style scoped>
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
  
  </style>