<!-- src/views/CreateCustomModelPage.vue -->
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
        <main class="dashboard-content custom-model-creator">
          <div class="content-header">
            <h1>Create Custom Fusion Model</h1>
            <p>Combine existing models or write custom code to build your unique AI solution.</p>
            <!-- Breadcrumbs: Projects > Project X > Models > Create Custom -->
          </div>
  
          <div class="creation-interface">
              <!-- Left Panel: Model Selection / Code Editor Tabs -->
              <div class="left-panel">
                  <div class="panel-tabs">
                      <button :class="{ active: activeCreationMode === 'visual' }" @click="activeCreationMode = 'visual'">Visual Builder</button>
                      <button :class="{ active: activeCreationMode === 'code' }" @click="activeCreationMode = 'code'">Code Editor</button>
                  </div>
  
                  <!-- Visual Builder Content -->
                  <div v-if="activeCreationMode === 'visual'" class="visual-builder-content">
                      <h4>Select Models to Merge:</h4>
                      <div class="model-selection-area">
                          <div class="available-models">
                              <h5>Available Models (GPT, ML, DL)</h5>
                              <ul>
                                  <li v-for="model in availableModels" :key="model.id" @dragstart="handleDragStart(model, $event)" draggable="true">
                                      <span class="model-type-badge type-gpt">{{ model.type.toUpperCase() }}</span> {{ model.name }}
                                  </li>
                              </ul>
                          </div>
                          <div class="drop-zone" @dragover.prevent @drop="handleDrop($event)">
                              <p v-if="mergedModels.length === 0">Drag & Drop models here to combine</p>
                              <div v-for="model in mergedModels" :key="model.id" class="merged-model-item">
                                  <span :class="['model-type-badge', `type-${model.type.toLowerCase()}`]">{{ model.type.toUpperCase() }}</span> {{ model.name }}
                                  <button @click="removeMergedModel(model.id)" class="remove-merged-btn">×</button>
                              </div>
                          </div>
                      </div>
                      <div class="merge-config">
                          <h5>Merge Configuration (Placeholder)</h5>
                          <p>Define how these models interact (e.g., sequential pipeline, weighted average, custom logic).</p>
                          <textarea placeholder="Describe merge logic or select pre-defined strategies..." rows="3"></textarea>
                      </div>
                  </div>
  
                  <!-- Code Editor Content -->
                  <div v-if="activeCreationMode === 'code'" class="code-editor-content">
                      <h4>Custom Model Code (Python - Colab Style)</h4>
                      <div class="code-editor-toolbar">
                          <button title="Run Cell (Ctrl+Enter)">▶️ Run</button>
                          <button title="Add Code Cell">+ Code</button>
                          <button title="Add Text Cell">+ Text</button>
                          <!-- More Colab-like buttons -->
                      </div>
                      <div class="code-cell-placeholder">
                          <textarea
                              class="code-editor-instance"
                              placeholder="# Your Python code here to define, train, or merge models
  # Example:
  from tensorflow.keras.models import Model
  from tensorflow.keras.layers import Input, Dense, concatenate
  
  # model1 = load_gpt_model('gpt-base')
  # model2 = load_ml_model('classifier-v1')
  
  # input_layer = Input(shape=(...))
  # output1 = model1(input_layer)
  # output2 = model2(input_layer)
  # merged_output = concatenate([output1, output2])
  # final_model = Model(inputs=input_layer, outputs=merged_output)"
                              rows="20"
                              v-model="customCode"
                          ></textarea>
                      </div>
                      <div class="code-output-placeholder">
                          <pre>{{ codeOutput || 'Code execution output will appear here...' }}</pre>
                      </div>
                  </div>
              </div>
  
              <!-- Right Panel: Configuration & Actions -->
              <div class="right-panel">
                  <div class="dashboard-card config-card">
                      <h3>Model Details</h3>
                      <div class="form-group">
                          <label for="custom-model-name">Custom Model Name:</label>
                          <input type="text" id="custom-model-name" v-model="customModelName" placeholder="e.g., My GPT-ML Fusion">
                      </div>
                      <div class="form-group">
                          <label for="custom-model-desc">Description:</label>
                          <textarea id="custom-model-desc" v-model="customModelDescription" rows="3" placeholder="Describe your custom model"></textarea>
                      </div>
                  </div>
                   <div class="dashboard-card training-config-card">
                      <h3>Training Configuration (Optional)</h3>
                      <p class="config-hint">If your custom model requires further training.</p>
                      <div class="form-group">
                          <label for="epochs">Epochs:</label>
                          <input type="number" id="epochs" value="5" min="1">
                      </div>
                      <!-- More training params -->
                  </div>
                  <div class="dashboard-card actions-card">
                      <h3>Actions</h3>
                      <button class="btn btn-primary btn-block" @click="createAndTrainModel" :disabled="isProcessing">
                          <span v-if="isProcessing">Processing...</span>
                          <span v-else>Create & Train Model</span>
                      </button>
                      <button class="btn btn-secondary btn-block" @click="saveModelDefinition">Save Definition</button>
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
  import { ref, reactive } from 'vue';
  
  export default {
    name: 'CreateCustomModelPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const activeCreationMode = ref('visual'); // 'visual' or 'code'
      const isProcessing = ref(false);
  
      // For Visual Builder
      const availableModels = ref([
          { id: 'gpt1', name: 'GPT-3 Base', type: 'GPT' },
          { id: 'ml1', name: 'Image Classifier v2', type: 'ML' },
          { id: 'dl1', name: 'Object Detector YOLO', type: 'DL' },
          { id: 'nlp1', name: 'Sentiment Analyzer Pro', type: 'NLP' },
      ]);
      const mergedModels = ref([]);
  
      // For Code Editor
      const customCode = ref('');
      const codeOutput = ref('');
  
      // Model Details
      const customModelName = ref('');
      const customModelDescription = ref('');
  
      const handleDragStart = (model, event) => {
          event.dataTransfer.setData('application/json', JSON.stringify(model));
      };
      const handleDrop = (event) => {
          event.preventDefault();
          const modelData = JSON.parse(event.dataTransfer.getData('application/json'));
          if (modelData && !mergedModels.value.find(m => m.id === modelData.id)) {
              mergedModels.value.push(modelData);
          }
      };
      const removeMergedModel = (modelId) => {
          mergedModels.value = mergedModels.value.filter(m => m.id !== modelId);
      };
  
      const createAndTrainModel = () => {
          isProcessing.value = true;
          console.log("Creating and training custom model:", {
              name: customModelName.value,
              mode: activeCreationMode.value,
              merged: mergedModels.value,
              code: customCode.value
          });
          // Simulate API call
          setTimeout(() => {
              isProcessing.value = false;
              alert("Custom model creation process started (simulation)!");
              // Redirect to model details or training jobs page
          }, 2500);
      };
      const saveModelDefinition = () => {
          console.log("Saving custom model definition...");
          alert("Model definition saved (simulation)!");
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      return {
        logout,
        userId,
        activeCreationMode,
        isProcessing,
        availableModels,
        mergedModels,
        customCode,
        codeOutput,
        customModelName,
        customModelDescription,
        handleDragStart,
        handleDrop,
        removeMergedModel,
        createAndTrainModel,
        saveModelDefinition
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



  /* above code is from user dashboard css */
  .custom-model-creator .content-header {
      margin-bottom: 1.5rem; /* Less margin for tighter layout */
  }
  
  .creation-interface {
    display: grid;
    grid-template-columns: 2.5fr 1fr; /* Adjust ratio for panels */
    gap: 1.5rem;
    min-height: 70vh; /* Ensure enough height */
  }
  
  .left-panel, .right-panel {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
  }
  .left-panel {
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 1.5rem;
  }
  
  .panel-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .panel-tabs button {
      padding: 0.8rem 1.5rem;
      background: none; border: none;
      border-bottom: 3px solid transparent;
      color: var(--color-text); opacity: 0.7;
      font-weight: 500; cursor: pointer; transition: all 0.2s ease;
  }
  .panel-tabs button:hover { opacity: 1; }
  .panel-tabs button.active {
      opacity: 1; color: var(--color-primary);
      border-bottom-color: var(--color-primary);
  }
  
  .visual-builder-content h4, .code-editor-content h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--color-secondary);
  }
  
  .model-selection-area {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      min-height: 200px;
  }
  .available-models, .drop-zone {
      flex: 1;
      padding: 1rem;
      border: 1px dashed rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      background-color: rgba(0,0,0,0.1);
  }
  .available-models h5, .drop-zone h5 { margin-bottom: 0.8rem; opacity: 0.8; }
  .available-models ul { list-style: none; padding: 0; }
  .available-models li {
      padding: 0.6rem; margin-bottom: 0.5rem;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 4px; cursor: grab;
      display: flex; align-items: center; gap: 0.5rem;
  }
  .model-type-badge {
      padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold;
      color: var(--color-background);
  }
  .type-gpt { background-color: var(--color-primary); }
  .type-ml { background-color: var(--color-secondary); }
  .type-dl { background-color: var(--color-accent-1); }
  .type-nlp { background-color: var(--color-accent-2); }
  
  .drop-zone p { text-align: center; opacity: 0.6; margin-top: 2rem; }
  .merged-model-item {
      padding: 0.6rem; margin-bottom: 0.5rem;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px; display: flex; justify-content: space-between; align-items: center;
  }
  .remove-merged-btn { background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; }
  
  .merge-config textarea {
      width: 100%; padding: 0.8rem; border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text); font-size: 0.9rem; resize: vertical;
  }
  
  .code-editor-toolbar {
      display: flex; gap: 0.5rem; margin-bottom: 0.8rem;
  }
  .code-editor-toolbar button {
      padding: 0.4rem 0.8rem; font-size: 0.85rem;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text); border-radius: 4px;
  }
  .code-editor-instance {
    width: 100%; background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 5px;
    color: #c5e1a5; /* Light green for code */ font-family: monospace;
    font-size: 0.9rem; padding: 1rem; resize: vertical; min-height: 300px;
  }
  .code-output-placeholder {
      margin-top: 1rem; padding: 1rem;
      background-color: rgba(0,0,0,0.2); border-radius: 5px;
      min-height: 80px; font-family: monospace; font-size: 0.85rem;
      color: #aaa; white-space: pre-wrap;
  }
  
  .right-panel .dashboard-card { /* Reusing dashboard-card style */
      padding: 1.5rem;
  }
  .config-card h3, .training-config-card h3, .actions-card h3 {
      font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem;
      color: var(--color-secondary);
  }
  .config-hint { font-size: 0.85rem; opacity: 0.7; margin-bottom: 1rem; }
  .form-group { margin-bottom: 1rem; }
  .form-group label { display: block; font-size: 0.9rem; margin-bottom: 0.3rem; opacity: 0.8; }
  .form-group input[type="text"], .form-group input[type="number"], .form-group textarea {
    width: 100%; padding: 0.7rem 1rem; border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text); font-size: 0.95rem;
  }
  .form-group textarea { resize: vertical; }
  .actions-card .btn { margin-bottom: 0.8rem; }
  .btn-block { display: block; width: 100%; text-align: center; }
  .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .btn-secondary:hover { background: rgba(255, 255, 255, 0.15); }
  
  @media (max-width: 1200px) {
      .creation-interface {
          grid-template-columns: 1.8fr 1fr; /* Adjust for slightly smaller screens */
      }
  }
  @media (max-width: 992px) {
      .creation-interface {
          grid-template-columns: 1fr; /* Stack panels */
      }
      .left-panel {
          min-height: auto; /* Adjust height when stacked */
      }
  }
  </style>