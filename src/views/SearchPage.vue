<!-- src/views/SearchPage.vue -->
<template>
    <MainLayout>
      <!-- No Hero Section, search bar is primary element -->
      <section class="section search-section">
        <div class="container search-container">
          <h1 class="search-title">Search GenAI Labs</h1>
          <div class="search-bar-wrapper">
              <input
                  type="search"
                  v-model="query"
                  @keyup.enter="performSearch"
                  placeholder="Search documentation, models, blog..."
                  class="search-input-main"
                  ref="searchInput"
              >
              <button @click="performSearch" class="search-button-main">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
          </div>
  
          <div class="search-results-area">
              <div v-if="isLoading" class="loading-indicator">Searching...</div>
              <div v-else-if="!searchedYet" class="search-prompt">Enter a term above to search.</div>
              <div v-else-if="results.length > 0">
                  <p class="results-summary">Found {{ results.length }} results for "<strong>{{ lastQuery }}</strong>"</p>
                  <div class="results-list">
                      <div v-for="result in results" :key="result.id" class="result-item">
                          <span :class="['result-type-badge', `type-${result.type.toLowerCase()}`]">{{ result.type }}</span>
                          <RouterLink :to="result.url" class="result-title">{{ result.title }}</RouterLink>
                          <p class="result-snippet" v-html="result.snippet"></p> <!-- Use v-html for highlighted snippets -->
                          <span class="result-url">{{ result.url }}</span>
                      </div>
                  </div>
              </div>
              <div v-else class="no-results-message">
                  No results found for "<strong>{{ lastQuery }}</strong>". Try refining your search terms.
              </div>
          </div>
        </div>
      </section>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { ref, onMounted, watch } from 'vue';
  
  export default {
    name: 'SearchPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const route = useRoute();
      const query = ref('');
      const lastQuery = ref('');
      const results = ref([]);
      const isLoading = ref(false);
      const searchedYet = ref(false);
      const searchInput = ref(null); // Ref for the input element
  
      const performSearch = () => {
          if (!query.value.trim()) return;
  
          isLoading.value = true;
          searchedYet.value = true;
          lastQuery.value = query.value;
          results.value = []; // Clear previous results
          console.log(`Searching for: ${query.value}`);
  
          // Simulate API call to backend search endpoint
          setTimeout(() => {
              // Mock results based on query
              if (query.value.toLowerCase().includes('api')) {
                   results.value = [
                      { id: 'doc1', type: 'Docs', title: 'API Authentication', url: '/user-dashboard/api#authentication', snippet: 'All API requests must be authenticated using an API key... Include your <strong>API</strong> key in the Authorization header...' },
                      { id: 'doc2', type: 'Docs', title: 'Model Prediction API', url: '/user-dashboard/api#model-predictions', snippet: 'Use these endpoints to get predictions... POST /predict/{model_id}' },
                      { id: 'page1', type: 'Page', title: 'Manage API Keys', url: '/user-dashboard/api-keys', snippet: 'Generate, manage, and revoke your <strong>API</strong> keys for accessing GenAI Labs services.' },
                      { id: 'blog1', type: 'Blog', title: 'Using the GenAI Labs Python SDK', url: '/blog/python-sdk', snippet: 'Learn how to easily interact with our <strong>API</strong> using the official Python library...' },
                   ];
              } else if (query.value.toLowerCase().includes('model')) {
                   results.value = [
                      { id: 'page2', type: 'Page', title: 'Explore AI Models', url: '/explore/models', snippet: 'Discover pre-trained <strong>models</strong>, community contributions, and cutting-edge architectures...' },
                      { id: 'page3', type: 'Page', title: 'Model Marketplace', url: '/marketplace/models', snippet: 'Discover premium and specialized AI <strong>models</strong> ready for integration...' },
                      { id: 'doc3', type: 'Docs', title: 'Model Guides', url: '/docs/models', snippet: 'Learn about specific <strong>model</strong> types (GPT, ML, DL, Custom), their capabilities...' },
                   ];
              } else {
                  results.value = []; // No results for other terms in mock
              }
              isLoading.value = false;
          }, 1200);
      };
  
      // Perform search if query param exists on page load
      onMounted(() => {
          if (route.query.q) {
              query.value = route.query.q;
              performSearch();
          }
          // Focus the input field on mount
          searchInput.value?.focus();
      });
  
      // Optional: Watch route query changes if you want URL updates to trigger search
      // watch(() => route.query.q, (newQuery) => {
      //     if (newQuery && newQuery !== query.value) {
      //         query.value = newQuery;
      //         performSearch();
      //     }
      // });
  
      return {
        query,
        lastQuery,
        results,
        isLoading,
        searchedYet,
        performSearch,
        searchInput
      };
    }
  };
  </script>
  
  <style scoped>
  .search-section {
      padding: 4rem 0 6rem 0; /* More padding top/bottom */
      min-height: 70vh;
  }
  .search-container {
      max-width: 800px;
      margin: 0 auto;
  }
  .search-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2.5rem;
      color: var(--color-primary);
  }
  .search-bar-wrapper {
      display: flex;
      margin-bottom: 3rem;
  }
  .search-input-main {
      flex-grow: 1;
      padding: 1rem 1.8rem;
      border-radius: 50px 0 0 50px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background-color: rgba(255, 255, 255, 0.08);
      color: var(--color-text);
      font-size: 1.1rem;
      outline: none;
      transition: border-color 0.3s ease, background-color 0.3s ease;
  }
  .search-input-main:focus {
      border-color: var(--color-primary);
      background-color: rgba(255, 255, 255, 0.1);
  }
  .search-button-main {
      padding: 1rem 1.8rem;
      border-radius: 0 50px 50px 0;
      background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
      color: var(--color-text);
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .search-button-main:hover { opacity: 0.9; }
  .search-button-main svg { stroke: var(--color-text); }
  
  .search-results-area {
      margin-top: 2rem;
  }
  .loading-indicator, .search-prompt, .no-results-message {
      text-align: center; padding: 3rem; opacity: 0.7; font-size: 1.1rem;
  }
  .results-summary {
      margin-bottom: 1.5rem;
      opacity: 0.8;
      font-size: 0.95rem;
  }
  .results-summary strong { font-weight: 600; color: var(--color-primary); }
  
  .results-list {
      display: grid;
      gap: 1.5rem;
  }
  .result-item {
      padding: 1.5rem;
      background-color: rgba(255, 255, 255, 0.04);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .result-type-badge {
      display: inline-block;
      padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold;
      color: var(--color-background); text-transform: uppercase; margin-right: 0.5rem;
      margin-bottom: 0.5rem;
  }
  .type-docs { background-color: var(--color-secondary); }
  .type-page { background-color: var(--color-accent-1); }
  .type-blog { background-color: var(--color-accent-2); }
  .type-model { background-color: var(--color-primary); }
  
  .result-title {
      display: block;
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: none;
      margin-bottom: 0.5rem;
      transition: color 0.2s ease;
  }
  .result-title:hover { color: var(--color-accent-3); }
  
  .result-snippet {
      font-size: 0.95rem;
      line-height: 1.6;
      opacity: 0.85;
      margin-bottom: 0.8rem;
  }
  .result-snippet strong { /* Style for highlighted terms */
      color: var(--color-accent-1);
      font-weight: 600;
  }
  .result-url {
      display: block;
      font-size: 0.85rem;
      opacity: 0.6;
      color: var(--color-secondary);
      word-break: break-all;
  }
  </style>