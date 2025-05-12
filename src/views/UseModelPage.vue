<!-- src/views/UseModelPage.vue -->
<template>
    <MainLayout>
      <div class="dashboard-layout">
        <!-- Sidebar -->
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
        <main class="dashboard-content">
          <div class="content-header">
            <h1>Use {{ modelType.toUpperCase() }} Model: {{ modelId }}</h1>
            <p>Provide input data to get predictions or generate output from your model.</p>
          </div>

          <div class="model-interaction-layout">
            <!-- Input Section -->
            <div class="dashboard-card input-section">
              <h3>Input Data</h3>
              <form @submit.prevent="runPrediction">
                <div v-if="isTextBasedModel" class="form-group">
                  <label for="text-input">Enter Text Prompt:</label>
                  <textarea id="text-input" v-model="inputText" rows="8" placeholder="Type your input text here..."></textarea>
                </div>

                <div v-else class="form-group">
                   <label for="file-input">Upload Data File (CSV, JSON, Parquet, Image, etc.):</label>
                   <input type="file" id="file-input" @change="handleFileUpload" :accept="acceptedFileTypes">
                   <div v-if="uploadedFileName" class="file-info">
                       Selected file: {{ uploadedFileName }}
                   </div>
                   <p class="input-hint">Alternatively, provide structured input below (if applicable).</p>
                   <textarea id="structured-input" v-model="structuredInput" rows="5" placeholder='e.g., {"feature1": 10, "feature2": "value"}'></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading || isGeneratingPdf">
                  <span v-if="isLoading">Processing...</span>
                  <span v-else>Run Prediction</span>
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
               <div v-else-if="outputData" class="output-content-wrapper">
                   <div class="output-display">
                        <!-- Display output based on type -->
                        <div v-if="isTextBasedModel">
                            <pre>{{ outputData }}</pre>
                        </div>
                        <div v-else-if="isImageOutput">
                            <img :src="outputData" alt="Generated Output Image" class="output-image"/>
                        </div>
                        <div v-else>
                            <pre>{{ formattedOutputData }}</pre> <!-- Pretty print JSON/object -->
                        </div>
                   </div>
                   <div class="output-actions">
                       <button @click="copyOutput" class="btn btn-secondary" :disabled="isGeneratingPdf">Copy Output</button>
                       <button @click="generatePdfReport" class="btn btn-secondary btn-pdf" :disabled="isLoading || isGeneratingPdf">
                           <span v-if="isGeneratingPdf">Generating PDF...</span>
                           <span v-else>Generate PDF Report</span>
                       </button>
                   </div>
               </div>
               <div v-else class="output-placeholder">
                   Output will appear here after running the prediction.
               </div>
               <div v-if="error" class="error-message output-error">
                   {{ error }}
               </div>
               <div v-if="pdfError" class="error-message output-error"> <!-- Specific error for PDF -->
                   PDF Generation Error: {{ pdfError }}
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
  import { ref, computed } from 'vue';
  // You might want to use a library like axios for API calls for better error handling and features
  // import axios from 'axios';

  export default {
    name: 'UseModelPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      modelId: { type: String, required: true },
      modelType: { type: String, required: true } // 'ml', 'dl', 'nlp', 'rag', 'gpt', 'custom'
    },
    setup(props) {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isLoading = ref(false); // For prediction
      const isGeneratingPdf = ref(false); // For PDF generation
      const error = ref(''); // For prediction errors
      const pdfError = ref(''); // For PDF generation errors

      // Input states
      const inputText = ref('');
      const structuredInput = ref('');
      const uploadedFile = ref(null);
      const uploadedFileName = ref('');

      // Output state
      const outputData = ref(null);

      const isTextBasedModel = computed(() => ['nlp', 'rag', 'gpt'].includes(props.modelType));
      const isImageOutput = computed(() => false); // Add logic if some models output images directly

      const acceptedFileTypes = computed(() => {
          if (['ml', 'dl', 'custom'].includes(props.modelType)) {
              return '.csv,.json,.parquet,.txt';
          }
          return '*/*';
      });

      const handleFileUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
              uploadedFile.value = file;
              uploadedFileName.value = file.name;
              console.log("File selected:", file.name);
          } else {
              uploadedFile.value = null;
              uploadedFileName.value = '';
          }
      };

      const runPrediction = async () => { // Mark as async if using await for API
          isLoading.value = true;
          error.value = '';
          pdfError.value = ''; // Clear PDF error on new prediction
          outputData.value = null;

          console.log(`Running prediction for model ${props.modelId} (${props.modelType})`);
          let inputPayload;
          let payloadType = 'json'; // default

          if (isTextBasedModel.value) {
              inputPayload = { text: inputText.value };
          } else if (uploadedFile.value) {
              inputPayload = new FormData();
              inputPayload.append('file', uploadedFile.value);
              if (structuredInput.value) {
                try {
                    // If you need to send structured params along with file
                    inputPayload.append('params', structuredInput.value);
                } catch (e) { /* ignore error if params not valid json */ }
              }
              payloadType = 'form-data';
          } else {
              try {
                  inputPayload = JSON.parse(structuredInput.value || '{}');
              } catch (e) {
                  error.value = "Invalid JSON in structured input.";
                  isLoading.value = false;
                  return;
              }
          }

          // --- ACTUAL API CALL (Example using fetch) ---
          // const backendUrl = `/api/models/${props.modelId}/predict`; // Replace with your actual endpoint
          // try {
          //     const response = await fetch(backendUrl, {
          //         method: 'POST',
          //         body: payloadType === 'form-data' ? inputPayload : JSON.stringify(inputPayload),
          //         headers: payloadType === 'json' ? { 'Content-Type': 'application/json' } : {},
          //     });
          //     if (!response.ok) {
          //         const errData = await response.json().catch(() => ({ message: response.statusText }));
          //         throw new Error(errData.message || `HTTP error! status: ${response.status}`);
          //     }
          //     outputData.value = await response.json();
          // } catch (e) {
          //     console.error("Prediction API error:", e);
          //     error.value = `Prediction failed: ${e.message}`;
          // } finally {
          //     isLoading.value = false;
          // }
          // --- END ACTUAL API CALL ---


          // Simulate API call (keep for now, replace with actual above)
          setTimeout(() => {
              if (Math.random() < 0.1) { // Simulate an error occasionally
                  error.value = "Prediction failed: Simulated model endpoint error.";
              } else {
                  if (isTextBasedModel.value) {
                      outputData.value = `This is a generated response based on your input for model ${props.modelId}: "${inputText.value.substring(0, 50)}..."\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
                  } else {
                      outputData.value = {
                          prediction: Math.random() > 0.5 ? 'Class A' : 'Class B',
                          confidence: Math.random().toFixed(3),
                          input_summary: uploadedFileName.value || 'Structured Input',
                          timestamp: new Date().toISOString(),
                          // Example of data that might go into a chart
                          feature_importance: [
                              { feature: 'feature1', importance: Math.random() },
                              { feature: 'feature2', importance: Math.random() },
                          ]
                      };
                  }
              }
              isLoading.value = false;
          }, 2500);
      };

      const formattedOutputData = computed(() => {
          if (typeof outputData.value === 'object' && outputData.value !== null) {
              return JSON.stringify(outputData.value, null, 2);
          }
          return outputData.value;
      });

      const copyOutput = () => {
          if (!outputData.value) return;
          const textToCopy = typeof outputData.value === 'object' ? JSON.stringify(outputData.value) : outputData.value;
          navigator.clipboard.writeText(textToCopy).then(() => {
              alert('Output copied to clipboard!');
          }).catch(err => {
              console.error('Failed to copy output: ', err);
              alert('Failed to copy output.');
          });
      };

      const generatePdfReport = async () => {
          if (!outputData.value) {
              pdfError.value = "No output data available to generate a report.";
              return;
          }
          isGeneratingPdf.value = true;
          pdfError.value = '';

          console.log(`Generating PDF report for model ${props.modelId}`);

          // Prepare data to send to backend for PDF generation.
          // The backend might need the original input and the generated output.
          const reportPayload = {
              modelId: props.modelId,
              modelType: props.modelType,
              // Send relevant input that led to the output
              inputContext: isTextBasedModel.value ? inputText.value : (uploadedFileName.value || structuredInput.value),
              outputData: outputData.value, // The current prediction output
          };

          try {
              // Replace with your actual backend endpoint for PDF generation
              const response = await fetch(`/api/models/${props.modelId}/generate-pdf-report`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(reportPayload),
              });

              if (!response.ok) {
                  const errData = await response.json().catch(() => ({ message: `PDF generation failed with status: ${response.statusText || response.status}` }));
                  throw new Error(errData.message || `HTTP error! status: ${response.status}`);
              }

              const blob = await response.blob();
              if (blob.type !== 'application/pdf') {
                  throw new Error('Backend did not return a PDF file.');
              }

              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              // Set a dynamic filename
              a.download = `report-${props.modelId}-${new Date().toISOString().split('T')[0]}.pdf`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();

          } catch (e) {
              console.error("PDF Generation API error:", e);
              pdfError.value = e.message || "An unknown error occurred while generating the PDF.";
          } finally {
              isGeneratingPdf.value = false;
          }
      };

      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };

      return {
        logout,
        userId,
        isLoading,
        isGeneratingPdf,
        error,
        pdfError,
        inputText,
        structuredInput,
        uploadedFile,
        uploadedFileName,
        outputData,
        isTextBasedModel,
        isImageOutput,
        acceptedFileTypes,
        handleFileUpload,
        runPrediction,
        formattedOutputData,
        copyOutput,
        generatePdfReport,
        modelId: props.modelId,
        modelType: props.modelType
      };
    }
  };
  </script>

  <style scoped>
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
  </style>