<!-- src/views/CommunityQuestionsPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Community Q&A"
        subtitle="Ask questions, share your knowledge, and connect with the GenAI Labs community."
        bgShape="circle"
      >
          <template #extraButton>
              <button @click="showAskQuestionModal = true" class="btn btn-secondary">Ask a Question</button>
          </template>
      </HeroSection>
  
      <section class="section community-content-section">
        <div class="container">
          <div class="forum-controls">
              <input type="text" v-model="searchTerm" placeholder="Search questions..." class="search-input">
              <select v-model="filterCategory" class="filter-select">
                  <option value="">All Categories</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <select v-model="sortBy" class="filter-select">
                  <option value="latest">Latest</option>
                  <option value="most_replies">Most Replies</option>
                  <option value="unanswered">Unanswered</option>
              </select>
          </div>
  
          <div v-if="isLoading" class="loading-indicator">Loading questions...</div>
          <div v-else-if="filteredQuestions.length > 0" class="questions-list">
            <div class="question-card" v-for="question in filteredQuestions" :key="question.id">
              <div class="question-header">
                  <RouterLink :to="`/community/questions/${question.id}`" class="question-title">{{ question.title }}</RouterLink>
                  <span class="question-category">{{ question.category }}</span>
              </div>
              <p class="question-excerpt">{{ question.excerpt }}</p>
              <div class="question-meta">
                  <span class="meta-item">Asked by: {{ question.author }}</span>
                  <span class="meta-item">{{ formatDate(question.askedAt) }}</span>
                  <span class="meta-item">{{ question.replies }} Replies</span>
                  <span class="meta-item">{{ question.views }} Views</span>
              </div>
              <RouterLink :to="`/community/questions/${question.id}`" class="btn btn-tertiary view-question-btn">View Question</RouterLink>
            </div>
          </div>
          <div v-else class="no-data-message">
            No questions found matching your criteria. Be the first to ask!
          </div>
  
          <!-- Pagination (Placeholder) -->
          <div class="pagination-controls" v-if="totalPages > 1">
              <button @click="currentPage--" :disabled="currentPage === 1">« Prev</button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage === totalPages">Next »</button>
          </div>
        </div>
      </section>
  
      <!-- Ask Question Modal -->
      <div v-if="showAskQuestionModal" class="modal-overlay" @click.self="showAskQuestionModal = false">
          <div class="modal-content ask-question-modal">
              <button @click="showAskQuestionModal = false" class="close-modal-btn">×</button>
              <h3>Ask a New Question</h3>
              <form @submittingQuestion.prevent="submitQuestion">
                  <div class="form-group">
                      <label for="question-title">Title:</label>
                      <input type="text" id="question-title" v-model="newQuestion.title" required placeholder="Enter a clear and concise title">
                  </div>
                  <div class="form-group">
                      <label for="question-category">Category:</label>
                      <select id="question-category" v-model="newQuestion.category" required>
                           <option value="" disabled>Select a category</option>
                           <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="question-body">Details:</label>
                      <textarea id="question-body" v-model="newQuestion.body" rows="8" required placeholder="Provide details, code snippets, or context for your question..."></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary" :disabled="submittingQuestion">
                      <span v-if="submittingQuestion">Submitting...</span>
                      <span v-else>Submit Question</span>
                  </button>
              </form>
          </div>
      </div>
  
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  import { RouterLink } from 'vue-router';
  import { ref, reactive, computed, onMounted } from 'vue';
  
  export default {
    name: 'CommunityQuestionsPage',
    components: {
      MainLayout,
      HeroSection,
      RouterLink
    },
    setup() {
      const isLoading = ref(false);
      const questions = ref([]);
      const categories = ref(['General', 'Model Training', 'API Usage', 'Feature Request', 'Bug Report']);
      const searchTerm = ref('');
      const filterCategory = ref('');
      const sortBy = ref('latest');
      const currentPage = ref(1);
      const itemsPerPage = ref(10); // Example
  
      const showAskQuestionModal = ref(false);
      const newQuestion = reactive({ title: '', category: '', body: '' });
      const submittingQuestion = ref(false);
  
      const fetchQuestions = () => {
        isLoading.value = true;
        console.log(`Fetching questions: page ${currentPage.value}, category ${filterCategory.value}, sort ${sortBy.value}, search ${searchTerm.value}`);
        // Simulate API call
        setTimeout(() => {
          const mockQuestions = [
            { id: 'q1', title: 'How to fine-tune NLP model for sentiment analysis?', category: 'Model Training', excerpt: 'I have a dataset of customer reviews and want to fine-tune a pre-trained NLP model...', author: 'UserA', askedAt: '2024-03-09T10:00:00Z', replies: 5, views: 120 },
            { id: 'q2', title: 'API rate limits for batch predictions?', category: 'API Usage', excerpt: 'What are the current rate limits when making batch prediction requests through the API?', author: 'UserB', askedAt: '2024-03-08T14:30:00Z', replies: 2, views: 85 },
            { id: 'q3', title: 'Feature Request: Support for ONNX model export', category: 'Feature Request', excerpt: 'It would be great if we could export trained models to the ONNX format for wider compatibility.', author: 'UserC', askedAt: '2024-03-07T09:15:00Z', replies: 8, views: 210 },
            { id: 'q4', title: 'Error when uploading large Parquet files for training', category: 'Bug Report', excerpt: 'I am encountering a timeout error when trying to upload Parquet files larger than 1GB for model training.', author: 'UserD', askedAt: '2024-03-10T11:00:00Z', replies: 0, views: 30 },
          ];
          // Simple filtering simulation (replace with backend logic)
          questions.value = mockQuestions.filter(q =>
              (q.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || q.excerpt.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
              (filterCategory.value === '' || q.category === filterCategory.value)
          );
          isLoading.value = false;
        }, 1000);
      };
  
      const filteredQuestions = computed(() => {
          // This would typically be handled by the backend API based on query params
          // For frontend simulation, we re-apply filters if needed or just return 'questions.value'
          // if fetchQuestions already handles it.
          return questions.value;
      });
  
      const totalPages = computed(() => {
          // This should come from API response (total items / itemsPerPage)
          return Math.ceil(questions.value.length / itemsPerPage.value) || 1;
      });
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  
      const submitQuestion = () => {
          if (!newQuestion.title.trim() || !newQuestion.category || !newQuestion.body.trim()) {
              alert("Please fill in all fields.");
              return;
          }
          submittingQuestion.value = true;
          console.log("Submitting new question:", newQuestion);
          // Simulate API call
          setTimeout(() => {
              // Add to local list (or refetch)
              questions.value.unshift({
                  id: `new-q-${Date.now()}`,
                  title: newQuestion.title,
                  category: newQuestion.category,
                  excerpt: newQuestion.body.substring(0, 100) + '...',
                  author: 'CurrentUser', // Get from auth
                  askedAt: new Date().toISOString(),
                  replies: 0,
                  views: 0
              });
              submittingQuestion.value = false;
              showAskQuestionModal.value = false;
              newQuestion.title = '';
              newQuestion.category = '';
              newQuestion.body = '';
              alert("Question submitted successfully!");
          }, 1500);
      };
  
      onMounted(fetchQuestions);
      // Watch for changes in filters/pagination to refetch
      // watch([currentPage, filterCategory, sortBy, searchTerm], fetchQuestions);
  
      return {
        isLoading,
        questions,
        categories,
        searchTerm,
        filterCategory,
        sortBy,
        currentPage,
        totalPages,
        filteredQuestions,
        formatDate,
        showAskQuestionModal,
        newQuestion,
        submittingQuestion,
        submitQuestion
      };
    }
  };
  </script>
  
  <style scoped>
  .community-content-section {
    background-color: rgba(31, 41, 63, 0.1);
    padding-bottom: 4rem;
  }
  .hero-section .btn-secondary { /* Style for Ask Question button in Hero */
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .hero-section .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .forum-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
  }
  .search-input, .filter-select {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text);
      font-size: 0.95rem;
  }
  .search-input {
      flex-grow: 1;
      min-width: 250px;
  }
  .filter-select {
      min-width: 150px;
  }
  
  .questions-list {
    display: grid;
    gap: 1.5rem;
  }
  
  .question-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease;
  }
  .question-card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .question-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.8rem;
  }
  .question-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .question-title:hover {
    color: var(--color-accent-3);
  }
  .question-category {
      font-size: 0.8rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-secondary);
      padding: 0.2rem 0.6rem;
      border-radius: 10px;
      text-transform: capitalize;
      white-space: nowrap;
  }
  
  .question-excerpt {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    /* Clamp text to a few lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .question-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem; /* row-gap column-gap */
    font-size: 0.85rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }
  .meta-item {
      /* styles for individual meta items if needed */
  }
  
  .btn-tertiary { /* For View Question button */
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      background-color: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      border-radius: 5px;
      transition: all 0.2s ease;
  }
  .btn-tertiary:hover {
      background-color: rgba(229, 170, 132, 0.1); /* primary color tint */
  }
  
  .loading-indicator, .no-data-message {
      text-align: center;
      padding: 3rem;
      opacity: 0.7;
  }
  
  .pagination-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2.5rem;
  }
  .pagination-controls button {
      padding: 0.5rem 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
      border-radius: 5px;
  }
  .pagination-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
  .pagination-controls span {
      opacity: 0.8;
  }
  
  /* Modal Styles (similar to ModelTrainingJobsPage) */
  .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.7); display: flex;
      align-items: center; justify-content: center; z-index: 1100;
      backdrop-filter: blur(5px);
  }
  .ask-question-modal {
      background-color: var(--color-background);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; padding: 2rem; width: 90%;
      max-width: 600px; max-height: 90vh; display: flex;
      flex-direction: column; position: relative;
      overflow-y: auto;
  }
  .ask-question-modal h3 { margin-bottom: 1.5rem; color: var(--color-primary); }
  .close-modal-btn {
      position: absolute; top: 1rem; right: 1rem; background: none;
      border: none; font-size: 1.8rem; color: var(--color-text);
      opacity: 0.7; cursor: pointer; line-height: 1;
  }
  .close-modal-btn:hover { opacity: 1; }
  
  .ask-question-modal .form-group { margin-bottom: 1.5rem; }
  .ask-question-modal label { display: block; font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8; }
  .ask-question-modal input[type="text"],
  .ask-question-modal select,
  .ask-question-modal textarea {
    width: 100%; padding: 0.8rem 1rem; border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text); font-size: 1rem;
  }
  .ask-question-modal textarea { resize: vertical; min-height: 120px; }
  .ask-question-modal .btn-primary { width: 100%; }
  
  </style>