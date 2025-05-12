<!-- src/views/UseCustomModelPage.vue -->
<template>
    <MainLayout>
      <div class="dashboard-layout">
        <!-- Sidebar (Copy from UserDashboardPage.vue or use a shared component) -->
        <aside class="dashboard-sidebar">
          <!-- ... Sidebar HTML ... -->
           <div class="sidebar-header">
            <RouterLink to="/" class="sidebar-logo">
              GenAI<span class="gradient-text">Labs</span>
            </RouterLink>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <RouterLink :to="`/s/user-dashboard/${userId}`" exact-active-class="active-link">
                  <svg><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span>Overview</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/projects/some-project-id" active-class="active-link">
                   <svg><path d="M2 6 L2 22 L14 22 L14 10 L22 10 L22 2 L10 2 L10 6 Z"></path></svg>
                  <span>Projects</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/metrics" active-class="active-link">
                  <svg><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <span>Metrics</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/marketplace/models" active-class="active-link">
                   <svg><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.7A2 2 0 0 0 15 11H9a2 2 0 0 0-2.3 2H4"></path></svg>
                  <span>Model Hub</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/api-keys" active-class="active-link">
                  <svg><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  <span>API Keys</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/user/usage" active-class="active-link">
                   <svg><path d="M12 8V4H8"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 12h8"></path><path d="M12 12v8"></path></svg>
                  <span>Usage</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/payments" active-class="active-link">
                   <svg><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  <span>Billing</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/docs" active-class="active-link">
                   <svg><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <span>Documentation</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="sidebar-footer">
             <RouterLink to="/user/profile" active-class="active-link">
               <svg><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               <span>Profile</span>
             </RouterLink>
             <RouterLink to="/user/security" active-class="active-link">
               <svg><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               <span>Security</span>
             </RouterLink>
             <button @click="logout" class="logout-button">
               <svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
               <span>Logout</span>
             </button>
          </div>
        </aside>
  
        <!-- Main Content Area -->
        <main class="dashboard-content">
          <div class="content-header">
            <h1>Use Custom Model: {{ modelDetails.name || modelId }}</h1>
            <p>{{ modelDetails.description || 'Interact with your custom-built fusion model.' }}</p>
          </div>
  
          <div class="model-interaction-layout"> <!-- Reusing layout from UseModelPage -->
            <!-- Input Section -->
            <div class="dashboard-card input-section">
              <h3>Input Data</h3>
              <form @submit.prevent="runCustomPrediction">
                <!-- Dynamic input fields based on modelDetails.inputSchema (if available) -->
                <div v-if="modelDetails.inputSchema && modelDetails.inputSchema.type === 'text_prompt'">
                  <div class="form-group">
                      <label for="custom-text-input">Enter Text Prompt:</label>
                      <textarea id="custom-text-input" v-model="customInput.text" rows="8" :placeholder="modelDetails.inputSchema.placeholder || 'Type your input...'"></textarea>
                  </div>
                </div>
                <div v-else-if="modelDetails.inputSchema && modelDetails.inputSchema.type === 'file_upload'">
                   <div class="form-group">
                      <label for="custom-file-input">Upload Data File ({{ modelDetails.inputSchema.accepts || 'Any' }}):</label>
                      <input type="file" id="custom-file-input" @change="handleFileUpload" :accept="modelDetails.inputSchema.accepts || '*/*'">
                      <div v-if="uploadedFileName" class="file-info">Selected file: {{ uploadedFileName }}</div>
                   </div>
                </div>
                <div v-else> <!-- Generic JSON input as fallback -->
                  <div class="form-group">
                      <label for="custom-json-input">Enter JSON Input:</label>
                      <textarea id="custom-json-input" v-model="customInput.json" rows="8" placeholder='e.g., {"query": "Hello world", "context_docs": [...] }'></textarea>
                  </div>
                </div>
  
                <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
                  <span v-if="isLoading">Processing...</span>
                  <span v-else>Run Custom Model</span>
                </button>
              </form>
            </div>
  
            <!-- Output Section -->
            <div class="dashboard-card output-section">
              <h3>Output / Prediction</h3>
               <div v-if="isLoading" class="loading-indicator">
                   <div class="spinner"></div>
                   <p>Generating output...</p>
               </div>
               <div v-else-if="outputData" class="output-content">
                   <pre>{{ formattedOutputData }}</pre>
                   <div class="output-actions">
                       <button @click="copyOutput" class="btn btn-secondary">Copy Output</button>
                   </div>
               </div>
               <div v-else class="output-placeholder">
                   Custom model output will appear here.
               </div>
               <div v-if="error" class="error-message output-error">
                   {{ error }}
               </div>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, reactive, computed, onMounted } from 'vue';
  
  export default {
    name: 'UseCustomModelPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      modelId: { type: String, required: true }
      // modelType is implicitly 'custom' here
    },
    setup(props) {
      const router = useRouter();
      const userId = ref('mockUserId');
      const isLoading = ref(false);
      const error = ref('');
  
      const modelDetails = reactive({ // Fetch this based on modelId
          name: '',
          description: '',
          inputSchema: null // Example: { type: 'text_prompt', placeholder: 'Enter your query...' } or { type: 'file_upload', accepts: '.csv,.json' }
      });
  
      const customInput = reactive({ text: '', json: '', file: null });
      const uploadedFileName = ref('');
      const outputData = ref(null);
  
      const fetchModelDetails = () => {
          console.log(`Fetching details for custom model: ${props.modelId}`);
          // Simulate API call
          setTimeout(() => {
              modelDetails.name = `Custom Fusion Model ${props.modelId.substring(0,4)}`;
              modelDetails.description = 'A powerful model combining GPT insights with ML classification.';
              // Example: Determine input type based on fetched model config
              if (Math.random() > 0.5) {
                  modelDetails.inputSchema = { type: 'text_prompt', placeholder: 'Enter your complex query here...' };
              } else {
                  modelDetails.inputSchema = { type: 'file_upload', accepts: '.csv,.txt,.json' };
              }
          }, 500);
      };
  
      const handleFileUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
              customInput.file = file;
              uploadedFileName.value = file.name;
          } else {
              customInput.file = null;
              uploadedFileName.value = '';
          }
      };
  
      const runCustomPrediction = () => {
          isLoading.value = true;
          error.value = '';
          outputData.value = null;
  
          let payload;
          if (modelDetails.inputSchema?.type === 'text_prompt') {
              payload = { prompt: customInput.text };
          } else if (modelDetails.inputSchema?.type === 'file_upload' && customInput.file) {
              payload = new FormData();
              payload.append('inputFile', customInput.file);
              // Potentially add other params from customInput.json if needed
          } else {
              try {
                  payload = JSON.parse(customInput.json || '{}');
              } catch (e) {
                  error.value = "Invalid JSON input.";
                  isLoading.value = false;
                  return;
              }
          }
          console.log("Running custom model prediction with payload:", payload);
  
          setTimeout(() => {
              outputData.value = {
                  fused_output: `Generated result from custom model ${props.modelId}.`,
                  confidence_scores: { gpt_component: 0.85, ml_component: 0.92 },
                  processing_time_ms: Math.floor(Math.random() * 500) + 100
              };
              isLoading.value = false;
          }, 2000);
      };
  
      const formattedOutputData = computed(() => {
          return outputData.value ? JSON.stringify(outputData.value, null, 2) : '';
      });
  
      const copyOutput = () => {
          navigator.clipboard.writeText(formattedOutputData.value).then(() => alert('Output copied!'));
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchModelDetails);
  
      return {
        logout,
        userId,
        isLoading,
        error,
        modelDetails,
        customInput,
        uploadedFileName,
        outputData,
        handleFileUpload,
        runCustomPrediction,
        formattedOutputData,
        copyOutput,
        modelId: props.modelId
      };
    }
  };
  </script>
  
  <style scoped>
  /* Import or reuse dashboard layout styles */
  /* @import './UserDashboardPage.css'; */
  .dashboard-layout {
    display: flex;
    min-height: calc(100vh - 80px); /* Full height minus navbar */
    background-color: var(--color-background); /* Ensure background consistency */
  }
  
  /* Sidebar Styles */
  .dashboard-sidebar {
    width: 260px;
    background: rgba(15, 23, 42, 0.8); /* Slightly darker/different background */
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease; /* For potential collapse */
  }
  
  .sidebar-header {
      padding: 0 1.5rem 1.5rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1rem;
  }
  .sidebar-logo {
      font-size: 1.5rem;
      font-weight: 700;
  }
  
  .sidebar-nav {
      flex-grow: 1;
      overflow-y: auto; /* Scroll if content overflows */
  }
  .sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-nav li a, .sidebar-footer a, .logout-button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    border-left: 3px solid transparent; /* Indicator for active link */
    text-decoration: none;
    font-size: 0.95rem;
  }
  .sidebar-nav li a:hover, .sidebar-footer a:hover, .logout-button:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .sidebar-nav li a.active-link, .sidebar-footer a.active-link {
    opacity: 1;
    color: var(--color-primary);
    border-left-color: var(--color-primary);
    background-color: rgba(229, 170, 132, 0.1); /* Primary color tint */
  }
  
  .sidebar-nav svg, .sidebar-footer svg {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.8;
  }
  .sidebar-nav li a.active-link svg, .sidebar-footer a.active-link svg {
      opacity: 1;
  }
  
  .sidebar-footer {
      margin-top: auto; /* Pushes footer to bottom */
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .logout-button {
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text); /* Or a red color */
  }
  .logout-button:hover {
      color: #ef4444; /* Red hover */
  }
  .logout-button svg {
      stroke: #ef4444; /* Red icon */
  }
  
  
  /* Main Content Styles */
  .dashboard-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto; /* Allow content scrolling */
  }
  
  .content-header {
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .content-header h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .content-header p {
      opacity: 0.8;
  }
  
  .dashboard-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .dashboard-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dashboard-card h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
  }
  .dashboard-card p.stat {
      font-size: 2rem;
      font-weight: bold;
      color: var(--color-secondary);
      margin-bottom: 1rem;
  }
  .dashboard-card ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
  }
  .dashboard-card li {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  }
  .dashboard-card li:last-child {
      border-bottom: none;
      margin-bottom: 0;
  }
  .dashboard-card a {
      color: var(--color-primary);
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
  }
  .dashboard-card a:hover {
      text-decoration: underline;
  }
  .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  .quick-actions .btn {
      width: 100%;
      text-align: center;
  }
  
  /* Responsive adjustments if needed */
  @media (max-width: 768px) {
    .dashboard-layout {
      flex-direction: column;
    }
    .dashboard-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      /* Consider making sidebar collapsible on mobile */
    }
    .dashboard-content {
      padding: 1.5rem;
    }
  }

  /* above is user dashboard css */
  /* Import or reuse interaction layout styles from UseModelPage */
  /* @import './UseModelPage.css'; For .model-interaction-layout, .input-section, .output-section etc. */
  
 /* --- START: Copied Base Dashboard & Sidebar Styles --- */
 .dashboard-layout {
    display: flex;
    min-height: calc(100vh - 80px); /* Full height minus navbar */
    background-color: var(--color-background); /* Ensure background consistency */
  }
  
  /* Sidebar Styles */
  .dashboard-sidebar {
    width: 260px;
    background: rgba(15, 23, 42, 0.8); /* Slightly darker/different background */
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease; /* For potential collapse */
  }
  
  .sidebar-header {
      padding: 0 1.5rem 1.5rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1rem;
  }
  .sidebar-logo {
      font-size: 1.5rem;
      font-weight: 700;
  }
  
  .sidebar-nav {
      flex-grow: 1;
      overflow-y: auto; /* Scroll if content overflows */
  }
  .sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-nav li a, .sidebar-footer a, .logout-button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    border-left: 3px solid transparent; /* Indicator for active link */
    text-decoration: none;
    font-size: 0.95rem;
  }
  .sidebar-nav li a:hover, .sidebar-footer a:hover, .logout-button:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .sidebar-nav li a.active-link, .sidebar-footer a.active-link {
    opacity: 1;
    color: var(--color-primary);
    border-left-color: var(--color-primary);
    background-color: rgba(229, 170, 132, 0.1); /* Primary color tint */
  }
  
  .sidebar-nav svg, .sidebar-footer svg {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.8;
  }
  .sidebar-nav li a.active-link svg, .sidebar-footer a.active-link svg {
      opacity: 1;
  }
  
  .sidebar-footer {
      margin-top: auto; /* Pushes footer to bottom */
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .logout-button {
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text); /* Or a red color */
  }
  .logout-button:hover {
      color: #ef4444; /* Red hover */
  }
  .logout-button svg {
      stroke: #ef4444; /* Red icon */
  }
  
  
  /* Main Content Styles */
  .dashboard-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto; /* Allow content scrolling */
  }
  
  .content-header {
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .content-header h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .content-header p {
      opacity: 0.8;
  }
  
  .dashboard-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .dashboard-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dashboard-card h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
  }
  .dashboard-card p.stat {
      font-size: 2rem;
      font-weight: bold;
      color: var(--color-secondary);
      margin-bottom: 1rem;
  }
  .dashboard-card ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
  }
  .dashboard-card li {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  }
  .dashboard-card li:last-child {
      border-bottom: none;
      margin-bottom: 0;
  }
  .dashboard-card a {
      color: var(--color-primary);
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
  }
  .dashboard-card a:hover {
      text-decoration: underline;
  }
  .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  .quick-actions .btn {
      width: 100%;
      text-align: center;
  }
  
  /* Responsive adjustments if needed */
  @media (max-width: 768px) {
    .dashboard-layout {
      flex-direction: column;
    }
    .dashboard-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      /* Consider making sidebar collapsible on mobile */
    }
    .dashboard-content {
      padding: 1.5rem;
    }
  }

  /* Main Content Styles for UseModelPage */
  .dashboard-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto;
  }

  .content-header {
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
  }
  .content-header h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-heading);
    text-transform: capitalize;
  }
  .content-header p {
      color: var(--color-text-muted);
      opacity: 0.8;
  }

  .dashboard-card { /* General card style for input/output sections */
    background: var(--color-background-mute); /* Slightly different from main content bg */
    padding: 1.5rem 2rem; /* More padding */
    border-radius: 8px;
    border: 1px solid var(--color-border);
  }

  .model-interaction-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr; /* Input slightly smaller than output */
    gap: 2rem;
  }

  .input-section h3, .output-section h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--color-secondary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.8rem;
}

  .input-section .form-group {
    margin-bottom: 1.5rem;
  }
  .input-section label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;

    /* color: var(--color-text-muted); */
  }
  .input-section textarea, .input-section input[type="file"] {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    font-size: 0.95rem; /* Slightly smaller font */
    font-family: inherit;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
  }
  .input-section textarea:focus, .input-section input[type="file"]:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-transparent);
  }
  .input-section textarea {
      resize: vertical;
      min-height: 100px;
  }
  .input-section input[type="file"] {
    background: rgba(255, 255, 255, 0.1);
      padding: 0.6rem 0.8rem; /* Adjust padding for file input */
  }
  .file-info {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-top: 0.5rem;
        opacity: 0.8;
  }
  .input-hint {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      opacity: 0.7;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
  }

  .btn { /* General button styling */
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    border: none;
    text-align: center;
  }
  .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
  .btn-primary {
      background-color: var(--color-primary);
      color: white;
  }
  .btn-primary:hover:not(:disabled) {
      background-color: #3a3ad8; /* Darker primary */
  }
  .btn-secondary {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-text);
      border: 1px solid var(--color-border);
  }
   .btn-secondary:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.15);
   }
  .btn-block {
      display: block;
      width: 100%;
      margin-top: 1rem;
  }


  .output-section {
      display: flex;
      flex-direction: column;
  }
  .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      text-align: center;
      color: var(--color-text-muted);
      min-height: 200px; /* Ensure it takes some space */
  }
  .loading-indicator .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid var(--color-primary-transparent);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .output-placeholder {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--color-text-muted);
      border: 2px dashed var(--color-border);
      border-radius: 5px;
      padding: 2rem;
      min-height: 200px;
  }

  .output-content-wrapper { /* New wrapper for display + actions */
      flex-grow: 1;
      display: flex;
      flex-direction: column;
  }
  .output-display { /* Actual content display area */
      flex-grow: 1;
      background-color: rgba(0, 0, 0, 0.25); /* Slightly darker for contrast */
      border-radius: 5px;
      padding: 1.5rem;
      font-family: 'Fira Code', Consolas, Monaco, monospace; /* Monospace for pre */
      font-size: 0.9rem;
      white-space: pre-wrap;
      word-break: break-word; /* break-all can be too aggressive */
      overflow-y: auto;
      max-height: 450px; /* Limit height, adjust as needed */
      border: 1px solid var(--color-border);
      margin-bottom: 1.5rem; /* Space before actions */
  }
  .output-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      display: block; /* Prevent extra space below */
      margin: 0 auto; /* Center if smaller than container */
  }

  .output-actions {
      display: flex;
      gap: 1rem; /* Space between buttons */
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
      margin-top: auto; /* Push actions to bottom if content is short */
  }
  .output-actions .btn { /* Buttons in actions smaller */
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
  }
  .btn-pdf { /* Specific styling for PDF button if needed */
      /* background-color: var(--color-secondary);
      color: white; */
  }
  /* .btn-pdf:hover:not(:disabled) {
      background-color: #e05252;
  } */


  .error-message {
      color: var(--color-secondary); /* Use secondary/error color */
      background-color: rgba(255, 107, 107, 0.1); /* Light red background */
      border: 1px solid var(--color-secondary);
      padding: 0.8rem 1rem;
      border-radius: 5px;
      font-size: 0.9rem;
  }
  .output-error { /* Specific to output section errors */
      margin-top: 1rem;
  }

  @media (max-width: 992px) {
      .model-interaction-layout {
          grid-template-columns: 1fr;
      }
      .dashboard-content {
        padding: 1.5rem;
      }
  }
  @media (max-width: 768px) {
    .dashboard-layout {
      flex-direction: column;
    }
    .dashboard-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }
    .output-actions {
        flex-direction: column; /* Stack action buttons on small screens */
    }
    .output-actions .btn {
        width: 100%;
    }
    }


  /* Specific styles for custom model page if needed */
  .input-section .form-group textarea {
      min-height: 100px; /* Ensure decent height for JSON or text input */
  }
  </style>