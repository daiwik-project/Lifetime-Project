<!-- src/views/ErrorPage.vue -->
<template>
    <MainLayout>
      <div class="error-page-container">
        <div class="error-content">
          <h1 class="error-code">{{ errorCode }}</h1>
          <h2 class="error-message">{{ message }}</h2>
          <p class="error-description">
            {{ description }}
          </p>
          <RouterLink to="/" class="btn btn-primary">Go Back Home</RouterLink>
        </div>
         <div class="error-graphic">
             <!-- Corrected SVG: Clearer exclamation mark in a circle -->
             <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="12" y1="7" x2="12" y2="13"></line>
                 <line x1="12" y1="16" x2="12.01" y2="16"></line>
             </svg>
         </div>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink } from 'vue-router';
  import { computed } from 'vue';
  
  export default {
    name: 'ErrorPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      errorCode: {
        type: String,
        default: 'Error'
      },
      message: {
        type: String,
        default: 'An unexpected error occurred.'
      }
    },
    setup(props) {
        const description = computed(() => {
            if (props.errorCode === '404') {
                return "Sorry, the page you are looking for doesn't exist or has been moved.";
            } else if (props.errorCode === '500') {
                return "We're experiencing some technical difficulties. Please try again later.";
            } else {
                return "Something went wrong. Please contact support if the problem persists.";
            }
        });
  
        return { description };
    }
  };
  </script>
  
  <style scoped>
  .error-page-container {
    min-height: calc(100vh - 80px - 100px); /* Adjust footer height guess */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .error-content {
      max-width: 600px;
  }
  
  .error-code {
    font-size: 6rem;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .error-message {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text);
  }
  
  .error-description {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 2.5rem;
      line-height: 1.7;
  }
  
  .error-graphic {
      margin-top: 3rem;
      opacity: 0.2;
      color: var(--color-secondary);
  }
  
  </style>