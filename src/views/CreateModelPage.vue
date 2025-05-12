<!-- src/views/CreateModelPage.vue -->
<template>
    <MainLayout>
      <div class="dashboard-layout">
        <!-- Sidebar (Remains the same) -->
        <aside class="dashboard-sidebar">
           <div class="sidebar-header">
            <RouterLink to="/" class="sidebar-logo">
              GenAI<span class="gradient-text">Labs</span>
            </RouterLink>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <RouterLink :to="`/s/user-dashboard/${userId}`" exact-active-class="active-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span>Overview</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/projects/some-project-id" active-class="active-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6 L2 22 L14 22 L14 10 L22 10 L22 2 L10 2 L10 6 Z"></path></svg>
                  <span>Projects</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/metrics" active-class="active-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <span>Metrics</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/marketplace/models" active-class="active-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.7A2 2 0 0 0 15 11H9a2 2 0 0 0-2.3 2H4"></path></svg>
                  <span>Model Hub</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/api-keys" active-class="active-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  <span>API Keys</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/user/usage" active-class="active-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 12h8"></path><path d="M12 12v8"></path></svg>
                  <span>Usage</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/payments" active-class="active-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  <span>Billing</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/docs" active-class="active-link">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <span>Documentation</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="sidebar-footer">
             <RouterLink to="/user/profile" active-class="active-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               <span>Profile</span>
             </RouterLink>
             <RouterLink to="/user/security" active-class="active-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               <span>Security</span>
             </RouterLink>
             <button @click="logout" class="logout-button">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
               <span>Logout</span>
             </button>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="dashboard-content model-creation-content">
          <div class="content-header">
            <h1>Create {{ modelType.toUpperCase() }} Model</h1>
            <p>Define and train your new {{ modelType }} model: <strong>{{ modelId }}</strong></p>
          </div>

          <div class="model-editor-layout">
            <!-- Left Pane: Editor/Config -->
            <div class="editor-pane">
              <!-- Model Definition (Optional for Auto ML?) -->
              <div class="pane-section" v-if="configMode === 'manual'">
                  <h3>Model Definition (Code/Config)</h3>
                  <textarea
                      class="code-editor-placeholder"
                      placeholder="// Enter your Python code, config YAML, or model definition here...
// (Optional if using UI configuration below)"
                      rows="15"
                      v-model="manualCodeDefinition"
                  ></textarea>
              </div>

               <div class="pane-section">
                  <h3>Training Data</h3>
                   <div class="data-upload">
                      <label for="data-upload-input">Upload Dataset (CSV, Parquet, JSON):</label>
                      <input type="file" id="data-upload-input" accept=".csv,.parquet,.json,.zip" @change="handleFileUpload">
                      <p>Or connect to data source (S3, GCS, etc.) - <em>Feature coming soon</em></p>
                   </div>
                   <!-- Target Variable Selection -->
                   <div class="form-group" v-if="availableColumns.length > 0">
                       <label for="target-variable">Target Variable:</label>
                       <select id="target-variable" v-model="targetVariable">
                           <option disabled value="">-- Select Target Column --</option>
                           <option v-for="col in availableColumns" :key="col" :value="col">{{ col }}</option>
                       </select>
                   </div>
              </div>

              <!-- Auto ML Results -->
              <div class="pane-section" v-if="configMode === 'auto' && autoMlResults.length > 0">
                  <h3>AutoML Simulation Results</h3>
                  <div v-if="isSimulating" class="loading-indicator">Simulating model performance...</div>
                  <ul class="automl-results-list">
                      <li v-for="result in autoMlResults" :key="result.model" :class="{ 'best-model': result.model === bestAutoModel }">
                          <strong>{{ result.model }}:</strong> Score = {{ result.score.toFixed(4) }}
                          <span v-if="result.model === bestAutoModel" class="best-badge">(Best)</span>
                      </li>
                  </ul>
                  <p v-if="bestAutoModel">Recommended Model: <strong>{{ bestAutoModel }}</strong></p>
              </div>

            </div>

            <!-- Right Pane: Parameters/Actions -->
            <div class="config-pane">
                <!-- Config Mode Toggle -->
                <div class="pane-section config-mode-section">
                    <h3>Configuration Mode</h3>
                    <div class="form-group radio-group">
                        <label>
                            <input type="radio" value="manual" v-model="configMode"> Manual Configuration
                        </label>
                        <label>
                            <input type="radio" value="auto" v-model="configMode"> Auto Config (Experimental)
                        </label>
                    </div>
                </div>

                <!-- Preprocessing (Common or Manual) -->
                <div class="pane-section" v-if="configMode === 'manual' || configMode === 'auto'"> <!-- Show always or adjust -->
                    <h3>Preprocessing</h3>
                    <form class="preprocessing-form">
                        <div class="form-group">
                            <label for="encoder">Categorical Encoder:</label>
                            <select id="encoder" v-model="selectedEncoder" :disabled="configMode === 'auto'">
                                <option value="">None</option>
                                <option value="one-hot">One-Hot Encoder</option>
                                <option value="label">Label Encoder</option>
                                <!-- Add more encoders as needed -->
                            </select>
                        </div>
                        <div class="form-group" v-if="modelType === 'nlp'"> <!-- Example: Show TF-IDF only for NLP -->
                             <label class="checkbox-label">
                                <input type="checkbox" v-model="useTfidf" :disabled="configMode === 'auto'"> Use TF-IDF Vectorizer
                            </label>
                        </div>
                    </form>
                </div>

               <!-- Training Parameters (Mainly for Manual) -->
               <div class="pane-section" v-if="configMode === 'manual'">
                  <h3>Training Parameters</h3>
                  <form class="training-form">
                      <!-- Model Selection -->
                      <div class="form-group">
                          <label for="model-algorithm">Model Algorithm:</label>
                          <select id="model-algorithm" v-model="selectedModelAlgorithm" @change="updateModelParams">
                              <option disabled value="">-- Select Algorithm --</option>
                              <optgroup v-if="availableModels.regression.length > 0" label="Regression">
                                  <option v-for="model in availableModels.regression" :key="model.id" :value="model.id">{{ model.name }}</option>
                              </optgroup>
                              <optgroup v-if="availableModels.classification.length > 0" label="Classification">
                                  <option v-for="model in availableModels.classification" :key="model.id" :value="model.id">{{ model.name }}</option>
                              </optgroup>
                          </select>
                      </div>

                      <!-- Dynamic Model Parameters -->
                      <div v-if="currentModelParamsConfig.length > 0">
                          <h4>Algorithm Parameters:</h4>
                          <div class="form-group" v-for="param in currentModelParamsConfig" :key="param.name">
                              <label :for="`param-${param.name}`">{{ param.label }}:</label>
                              <input
                                  v-if="param.type === 'number'"
                                  :type="param.type"
                                  :id="`param-${param.name}`"
                                  :step="param.step || 'any'"
                                  :min="param.min"
                                  :max="param.max"
                                  v-model.number="modelParams[param.name]"
                                  :placeholder="param.default"
                              >
                              <select
                                  v-else-if="param.type === 'select'"
                                  :id="`param-${param.name}`"
                                  v-model="modelParams[param.name]"
                              >
                                  <option v-for="option in param.options" :key="option.value" :value="option.value">{{ option.text }}</option>
                              </select>
                              <!-- Add other input types (text, checkbox) as needed -->
                              <p v-if="param.description" class="param-description">{{ param.description }}</p>
                          </div>
                      </div>

                      <!-- Other Training Params -->
                      <div class="form-group">
                          <label for="cv-folds">Cross-Validation Folds:</label>
                          <input type="number" id="cv-folds" v-model.number="cvFolds" min="2" value="5">
                      </div>
                       <div class="form-group">
                          <label for="instance-type">Compute Instance:</label>
                          <select id="instance-type" v-model="computeInstance">
                              <option>CPU (Standard)</option>
                              <option>GPU (T4)</option>
                              <option>GPU (V100)</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label class="checkbox-label">
                              <input type="checkbox" v-model="useHyperparameterTuning"> Enable Hyperparameter Tuning
                          </label>
                          <!-- Add inputs for tuning strategy, search space if needed -->
                      </div>
                  </form>
              </div>

               <div class="pane-section actions-section">
                  <h3>Actions</h3>
                  <button
                      class="btn btn-primary btn-block"
                      @click="handleStartTraining"
                      :disabled="isTraining || isSimulating || !canStartTraining"
                    >
                      <span v-if="isTraining">Training...</span>
                      <span v-else-if="isSimulating">Simulating...</span>
                      <span v-else-if="configMode === 'auto'">Run AutoML & Train Best</span>
                      <span v-else>Start Training Job</span>
                  </button>
                   <button class="btn btn-secondary btn-block" @click="saveDraft" :disabled="isTraining || isSimulating">Save Draft</button>
              </div>
            </div>
          </div>

          <!-- Bottom Area: Logs/Output -->
          <div class="output-area pane-section">
            <h3>Training Logs & Output</h3>
            <pre class="logs-placeholder">{{ trainingLogs || 'Training logs will appear here...' }}</pre>
          </div>
        </main>
      </div>
    </MainLayout>
  </template>

  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, computed, watch } from 'vue';

  // --- Placeholder Data (Simulates data from Flask Backend) ---
  const MOCK_COLUMNS = ['feature1', 'feature2', 'categorical_feature', 'text_feature', 'target_value'];

  const MOCK_MODELS = {
      regression: [
          { id: 'linear_regression', name: 'Linear Regression', params: [] },
          { id: 'xgboost_regressor', name: 'XGBoost Regressor', params: [
              { name: 'n_estimators', label: 'N Estimators', type: 'number', default: 100, min: 10 },
              { name: 'learning_rate', label: 'Learning Rate', type: 'number', default: 0.1, step: 0.01, min: 0.001 },
              { name: 'max_depth', label: 'Max Depth', type: 'number', default: 3, min: 1 },
          ]},
          { id: 'ridge', name: 'Ridge Regression', params: [
              { name: 'alpha', label: 'Alpha (Regularization)', type: 'number', default: 1.0, min: 0 },
          ]},
      ],
      classification: [
          { id: 'logistic_regression', name: 'Logistic Regression', params: [
              { name: 'C', label: 'C (Inverse Regularization)', type: 'number', default: 1.0, min: 0.01 },
              { name: 'solver', label: 'Solver', type: 'select', default: 'liblinear', options: [ {value: 'liblinear', text: 'Liblinear'}, {value: 'saga', text: 'Saga'}] },
          ]},
          { id: 'decision_tree_classifier', name: 'Decision Tree Classifier', params: [
              { name: 'criterion', label: 'Criterion', type: 'select', default: 'gini', options: [{value: 'gini', text: 'Gini'}, {value: 'entropy', text: 'Entropy'}] },
              { name: 'max_depth', label: 'Max Depth', type: 'number', default: 5, min: 1, description: 'Leave blank for unlimited' },
          ]},
          { id: 'random_forest_classifier', name: 'Random Forest Classifier', params: [
              { name: 'n_estimators', label: 'N Estimators', type: 'number', default: 100, min: 10 },
              { name: 'max_depth', label: 'Max Depth', type: 'number', default: 10, min: 1 },
          ]},
      ]
  };
  // --- End Placeholder Data ---

  export default {
    name: 'CreateModelPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      modelId: { type: String, required: true },
      // Refine modelType prop if needed (e.g., 'regression', 'classification', 'nlp')
      modelType: { type: String, required: true }
    },
    setup(props) {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID

      // Core State
      const isTraining = ref(false);
      const isSimulating = ref(false); // For AutoML simulation
      const trainingLogs = ref('');
      const configMode = ref('manual'); // 'manual' or 'auto'

      // Data & Target
      const uploadedFile = ref(null); // Store file object if needed
      const availableColumns = ref([]); // Populated on file upload (simulation)
      const targetVariable = ref('');

      // Preprocessing
      const selectedEncoder = ref(''); // 'one-hot', 'label', etc.
      const useTfidf = ref(false);

      // Manual Config State
      const manualCodeDefinition = ref(''); // For the textarea
      const selectedModelAlgorithm = ref('');
      const modelParams = ref({}); // Holds params for the selected algorithm
      const cvFolds = ref(5);
      const computeInstance = ref('CPU (Standard)');
      const useHyperparameterTuning = ref(false);

      // Auto ML State
      const autoMlResults = ref([]); // Stores { model: '...', score: 0.95 }
      const bestAutoModel = ref(''); // ID of the best model found

      // --- Computed Properties ---
      const availableModels = computed(() => {
          // In real app, fetch this based on props.modelType from backend
          // For now, just return the mock data structure
          return MOCK_MODELS;
      });

      const currentModelParamsConfig = computed(() => {
          if (!selectedModelAlgorithm.value) return [];
          const allModels = [...availableModels.value.regression, ...availableModels.value.classification];
          const model = allModels.find(m => m.id === selectedModelAlgorithm.value);
          return model ? model.params : [];
      });

      const canStartTraining = computed(() => {
          if (!targetVariable.value) return false; // Need a target
          if (configMode.value === 'manual' && !selectedModelAlgorithm.value) return false; // Need a model in manual
          // Add other checks: file uploaded?
          return true;
      });

      // --- Methods ---
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };

      const handleFileUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
              uploadedFile.value = file;
              console.log("File uploaded:", file.name);
              // Simulate extracting column names (replace with actual parsing/backend call)
              availableColumns.value = MOCK_COLUMNS;
              targetVariable.value = ''; // Reset target when new file uploaded
          } else {
              uploadedFile.value = null;
              availableColumns.value = [];
          }
      };

      const updateModelParams = () => {
          // Reset params when algorithm changes
          modelParams.value = {};
          // Optional: Pre-fill with default values
          currentModelParamsConfig.value.forEach(param => {
              if (param.default !== undefined) {
                  modelParams.value[param.name] = param.default;
              }
          });
      };

      const runAutoMlSimulation = async () => {
          if (!targetVariable.value) {
              alert("Please select a target variable first.");
              return;
          }
          console.log("Starting AutoML Simulation...");
          isSimulating.value = true;
          autoMlResults.value = [];
          bestAutoModel.value = '';
          trainingLogs.value = "Running AutoML Simulation...\n";

          // Simulate trying a few models based on modelType
          const modelsToTry = props.modelType === 'regression'
              ? MOCK_MODELS.regression.slice(0, 3) // Try first 3 regression models
              : MOCK_MODELS.classification.slice(0, 3); // Try first 3 classification models

          let bestScore = -Infinity;

          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          for (const model of modelsToTry) {
              trainingLogs.value += `Simulating ${model.name}...\n`;
              // Simulate training and evaluation (replace with actual backend call)
              await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate time per model
              const simulatedScore = Math.random() * 0.3 + 0.65; // Random score between 0.65 and 0.95
              trainingLogs.value += `  - ${model.name} simulated score: ${simulatedScore.toFixed(4)}\n`;
              autoMlResults.value.push({ model: model.name, score: simulatedScore, id: model.id });

              if (simulatedScore > bestScore) {
                  bestScore = simulatedScore;
                  bestAutoModel.value = model.id; // Store the ID
              }
          }

          trainingLogs.value += `\nAutoML Simulation Complete. Recommended model: ${MOCK_MODELS.regression.concat(MOCK_MODELS.classification).find(m=>m.id === bestAutoModel.value)?.name || 'None'}\n`;
          isSimulating.value = false;
          console.log("AutoML Simulation finished. Best model:", bestAutoModel.value);
      };

      const startTraining = (modelToTrain, paramsToUse) => {
          isTraining.value = true;
          trainingLogs.value += `\nStarting final training for ${modelToTrain}...\n`;
          console.log("Starting final training with:", { model: modelToTrain, params: paramsToUse, target: targetVariable.value /*, other config... */ });

          // Simulate actual training job submission
          let i = 0;
          const interval = setInterval(() => {
              trainingLogs.value += `Epoch ${i+1}/10 - loss: ${Math.random().toFixed(4)} - accuracy: ${Math.random().toFixed(4)}\n`;
              i++;
              if (i >= 10) {
                  clearInterval(interval);
                  trainingLogs.value += `Training finished for ${props.modelId} using ${modelToTrain}.`;
                  isTraining.value = false;
                  console.log("Training finished.");
                  // Maybe navigate to a results page or update status
              }
          }, 1000);
          // In real app: Make API call to backend to start the *actual* training job
          // Send: props.modelId, targetVariable.value, selectedEncoder.value, useTfidf.value,
          //       modelToTrain (ID), paramsToUse, cvFolds.value, computeInstance.value, useHyperparameterTuning.value etc.
      };

      const handleStartTraining = async () => {
          if (configMode.value === 'auto') {
              await runAutoMlSimulation(); // Run simulation first
              if (bestAutoModel.value) {
                  // Find the params for the best model (could be default or tuned in real scenario)
                  const bestModelConfig = MOCK_MODELS.regression.concat(MOCK_MODELS.classification).find(m => m.id === bestAutoModel.value);
                  const bestModelDefaultParams = {};
                   if (bestModelConfig && bestModelConfig.params) {
                       bestModelConfig.params.forEach(p => {
                           if (p.default !== undefined) bestModelDefaultParams[p.name] = p.default;
                       });
                   }
                  startTraining(bestAutoModel.value, bestModelDefaultParams); // Train the best one found
              } else {
                  trainingLogs.value += "\nAutoML did not find a suitable model to train.";
                  console.error("AutoML finished but no best model selected.");
              }
          } else {
              // Manual mode: train the selected model
              startTraining(selectedModelAlgorithm.value, modelParams.value);
          }
      };

       const saveDraft = () => {
          console.log("Saving draft for model:", props.modelId);
          const draftData = {
              modelId: props.modelId,
              modelType: props.modelType,
              configMode: configMode.value,
              targetVariable: targetVariable.value,
              selectedEncoder: selectedEncoder.value,
              useTfidf: useTfidf.value,
              manualCodeDefinition: manualCodeDefinition.value,
              selectedModelAlgorithm: selectedModelAlgorithm.value,
              modelParams: modelParams.value,
              cvFolds: cvFolds.value,
              computeInstance: computeInstance.value,
              useHyperparameterTuning: useHyperparameterTuning.value,
              // Add other relevant state
          };
          console.log("Draft data:", draftData);
          // In real app: Make API call to save draftData
          alert("Draft saved (simulation)!");
      };

      // --- Watchers ---
      watch(configMode, (newMode) => {
          console.log("Config mode changed to:", newMode);
          // Reset things when switching modes if desired
          autoMlResults.value = [];
          bestAutoModel.value = '';
          // trainingLogs.value = ''; // Optional: clear logs on mode switch
          if (newMode === 'manual') {
              // Maybe reset manual selections or keep them?
          } else {
              // Auto mode selected - maybe clear manual selections?
              // selectedModelAlgorithm.value = '';
              // modelParams.value = {};
          }
      });

       // Watch for algorithm changes to update params (already handled by @change)
       // watch(selectedModelAlgorithm, updateModelParams); // Alternative to @change

       // Initialize model params if a model is selected initially (e.g., loading a draft)
       if (selectedModelAlgorithm.value) {
           updateModelParams();
       }


      return {
        // Props
        modelId: props.modelId,
        modelType: props.modelType,
        // State
        userId,
        isTraining,
        isSimulating,
        trainingLogs,
        configMode,
        uploadedFile,
        availableColumns,
        targetVariable,
        selectedEncoder,
        useTfidf,
        manualCodeDefinition,
        selectedModelAlgorithm,
        modelParams,
        cvFolds,
        computeInstance,
        useHyperparameterTuning,
        autoMlResults,
        bestAutoModel,
        // Computed
        availableModels,
        currentModelParamsConfig,
        canStartTraining,
        // Methods
        logout,
        handleFileUpload,
        updateModelParams,
        runAutoMlSimulation,
        startTraining, // Keep internal if only called by handleStartTraining
        handleStartTraining,
        saveDraft,
      };
    }
  };
  </script>

  <style scoped>
  /* --- START: Added Dashboard Layout Styles (Copied from previous response) --- */
  :root {
    --header-height: 60px; /* Adjust if your MainLayout header has a different height */
    --sidebar-width: 260px;
    --color-background: #12121f; /* Dark background for content */
    --color-background-soft: #1a1a2e; /* Slightly lighter dark */
    --color-background-mute: #161625; /* Sidebar background */
    --color-border: rgba(255, 255, 255, 0.1);
    --color-text: #e0e0e0;
    --color-text-muted: #a0a0b0;
    --color-heading: #ffffff;
    --color-primary: #4a4aff; /* Example primary color */
    --color-primary-transparent: rgba(74, 74, 255, 0.15);
    --color-secondary: #ff6b6b; /* Example secondary color */
  }
  .dashboard-layout { color: var(--color-text); display: flex; min-height: calc(100vh - var(--header-height)); background-color: var(--color-background-soft); }
  .dashboard-sidebar { width: var(--sidebar-width); flex-shrink: 0; background-color: var(--color-background-mute); border-right: 1px solid var(--color-border); padding: 1.5rem 1rem; display: flex; flex-direction: column; }
  .sidebar-header { margin-bottom: 2rem; padding: 0 0.5rem; }
  .sidebar-logo { font-size: 1.6rem; font-weight: 700; color: var(--color-heading); text-decoration: none; display: inline-block; }
  .gradient-text { background: linear-gradient(to right, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; }
  .sidebar-nav { flex-grow: 1; }
  .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
  .sidebar-nav li { margin-bottom: 0.4rem; }
  .sidebar-nav a, .sidebar-footer a, .sidebar-footer button { display: flex; align-items: center; padding: 0.75rem 1rem; border-radius: 6px; text-decoration: none; color: var(--color-text-muted); transition: background-color 0.2s ease, color 0.2s ease; font-size: 0.95rem; font-weight: 500; }
  .sidebar-nav a:hover, .sidebar-footer a:hover, .sidebar-footer button:hover { background-color: rgba(255, 255, 255, 0.05); color: var(--color-text); }
  .sidebar-nav a.active-link { background-color: var(--color-primary-transparent); color: var(--color-primary); font-weight: 600; }
  .sidebar-nav svg, .sidebar-footer svg { width: 18px; height: 18px; margin-right: 0.8rem; stroke-width: 2; flex-shrink: 0; stroke: currentColor; fill: none; }
  .sidebar-footer { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-border); }
  .sidebar-footer a, .sidebar-footer button { margin-bottom: 0.3rem; }
  .sidebar-footer button:last-child { margin-bottom: 0; }
  .logout-button { background: none; border: none; color: inherit; cursor: pointer; width: 100%; text-align: left; font-family: inherit; font-size: inherit; padding: 0.75rem 1rem; }
  .logout-button:hover { background-color: rgba(255, 255, 255, 0.05); color: var(--color-text); }
  .dashboard-content { flex-grow: 1; padding: 2rem 2.5rem; overflow-y: auto; background-color: var(--color-background); }
  .content-header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border); }
  .content-header h1 { font-size: 1.8rem; font-weight: 600; color: var(--color-heading); margin: 0 0 0.5rem 0; }
  .content-header p { color: var(--color-text-muted); margin: 0; font-size: 1rem; }
  .content-header strong { color: var(--color-text); font-weight: 500; }
  /* --- END: Added Dashboard Layout Styles --- */

  /* --- START: Existing Model Creation Specific Styles (Slightly Adjusted) --- */
  .model-creation-content .content-header h1 { text-transform: capitalize; }
  .model-editor-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem; }
  .pane-section { background: rgba(255, 255, 255, 0.03); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border); margin-bottom: 1.5rem; }
  .pane-section:last-child { margin-bottom: 0; }
  .pane-section h3 { font-size: 1.2rem; font-weight: 600; margin-top: 0; margin-bottom: 1.5rem; color: var(--color-secondary); border-bottom: 1px solid var(--color-border); padding-bottom: 0.8rem; }
  .pane-section h4 { /* Style for sub-headings like 'Algorithm Parameters' */
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-top: 1.5rem;
      margin-bottom: 1rem;
  }

  .code-editor-placeholder { width: 100%; background-color: rgba(0, 0, 0, 0.3); border: 1px solid var(--color-border); border-radius: 5px; color: var(--color-text); font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 0.9rem; padding: 1rem; resize: vertical; min-height: 150px; /* Adjusted height */ box-sizing: border-box; }
  .code-editor-placeholder:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 2px var(--color-primary-transparent); }

  .data-upload label,
  .form-group label { /* Combined label styles */
      display: block;
      margin-bottom: 0.5rem; /* Consistent spacing */
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-text-muted);
  }
  .data-upload input[type="file"] { display: block; margin-bottom: 0.5rem; color: var(--color-text); background: rgba(255, 255, 255, 0.05); padding: 0.6rem 0.8rem; border-radius: 4px; border: 1px solid var(--color-border); width: 100%; box-sizing: border-box; cursor: pointer; }
  .data-upload input[type="file"]::file-selector-button { background-color: var(--color-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 1rem; transition: background-color 0.2s ease; }
  .data-upload input[type="file"]::file-selector-button:hover { background-color: #3a3ad8; }
  .data-upload p { font-size: 0.85rem; opacity: 0.6; margin-top: 0.8rem; }

  /* General Form Group Styling */
  .form-group {
    margin-bottom: 1.2rem;
  }
  .form-group input[type="number"],
  .form-group input[type="text"], /* Add other types if needed */
  .form-group select {
    padding: 0.7rem 0.9rem;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    font-size: 0.95rem;
    box-sizing: border-box;
    width: 100%;
  }
   .form-group input:focus, .form-group select:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-transparent);
  }
  .form-group select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a0a0b0' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.9rem center;
      background-size: 1em;
      padding-right: 2.5rem;
  }
  .form-group input:disabled, .form-group select:disabled {
      background-color: rgba(50, 50, 70, 0.3); /* Darker disabled background */
      cursor: not-allowed;
      opacity: 0.6;
  }
  .param-description {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      opacity: 0.8;
      margin-top: 0.3rem;
  }
  /* Checkbox styling */
  .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.95rem;
      color: var(--color-text);
  }
  .checkbox-label input[type="checkbox"] {
      margin-right: 0.6rem;
      width: 16px;
      height: 16px;
      accent-color: var(--color-primary); /* Modern way to color checkboxes */
      cursor: pointer;
  }
  .checkbox-label input[type="checkbox"]:disabled {
      cursor: not-allowed;
      opacity: 0.6;
  }

  /* Config Mode Radio Buttons */
  .radio-group label {
      display: block; /* Stack radios */
      margin-bottom: 0.5rem;
      cursor: pointer;
      font-size: 0.95rem;
  }
  .radio-group input[type="radio"] {
      margin-right: 0.5rem;
      accent-color: var(--color-primary);
      vertical-align: middle;
  }

  /* Actions Section */
  .actions-section .btn { margin-bottom: 1rem; padding: 0.8rem 1.5rem; font-size: 1rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: background-color 0.2s ease, opacity 0.2s ease; border: none; }
  .actions-section .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-block { display: block; width: 100%; text-align: center; }
  .btn-primary { background-color: var(--color-primary); color: white; }
  .btn-primary:hover:not(:disabled) { background-color: #3a3ad8; }
  .btn-secondary { background-color: rgba(255, 255, 255, 0.1); color: var(--color-text); border: 1px solid var(--color-border); }
  .btn-secondary:hover:not(:disabled) { background-color: rgba(255, 255, 255, 0.15); }

  /* Output Area */
  .output-area { margin-top: 2rem; }
  .logs-placeholder { background-color: rgba(0, 0, 0, 0.4); border: 1px solid var(--color-border); border-radius: 5px; color: #c0c0c0; font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 0.85rem; padding: 1rem 1.5rem; min-height: 150px; max-height: 400px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; }

  /* Auto ML Results Styling */
  .loading-indicator {
      color: var(--color-text-muted);
      padding: 1rem 0;
  }
  .automl-results-list {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 200px; /* Limit height if many models */
      overflow-y: auto;
  }
  .automl-results-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.9rem;
  }
   .automl-results-list li:last-child {
       border-bottom: none;
   }
  .automl-results-list li.best-model {
      background-color: var(--color-primary-transparent);
      padding-left: 0.5rem; /* Indent best slightly */
      border-left: 3px solid var(--color-primary);
      margin-left: -0.5rem; /* Adjust for padding */
  }
  .best-badge {
      display: inline-block;
      background-color: var(--color-primary);
      color: white;
      font-size: 0.7rem;
      padding: 0.1rem 0.4rem;
      border-radius: 3px;
      margin-left: 0.5rem;
      vertical-align: middle;
  }


  @media (max-width: 992px) {
      .model-editor-layout { grid-template-columns: 1fr; }
      .dashboard-content { padding: 1.5rem; }
  }
  /* --- END: Existing Model Creation Specific Styles --- */

  </style>