<!-- src/views/UserApiDocsPage.vue -->
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
                <RouterLink to="/docs" active-class="active-link"> <!-- General Docs -->
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
        <main class="dashboard-content api-docs-content">
          <div class="content-header">
            <h1>API Documentation</h1>
            <p>Integrate GenAI Labs into your applications with our powerful APIs.</p>
            <RouterLink to="/user-dashboard/api-keys" class="btn btn-secondary header-action">Manage API Keys</RouterLink>
          </div>
  
          <div class="api-docs-layout">
              <!-- Left: Navigation for API sections -->
              <nav class="docs-nav">
                  <h4>API Sections</h4>
                  <ul>
                      <li v-for="section in apiSections" :key="section.id">
                          <a :href="`#${section.id}`" @click.prevent="scrollToSection(section.id)" :class="{ active: activeDocSection === section.id }">
                              {{ section.title }}
                          </a>
                      </li>
                  </ul>
              </nav>
  
              <!-- Right: Content for selected API section -->
              <div class="docs-content-area">
                  <section v-for="section in apiSections" :key="section.id" :id="section.id" class="docs-section">
                      <h2>{{ section.title }}</h2>
                      <div v-html="section.contentHtml"></div> <!-- Use v-html for pre-formatted HTML content -->
  
                      <div v-if="section.endpoints && section.endpoints.length > 0">
                          <h3>Endpoints:</h3>
                          <div v-for="endpoint in section.endpoints" :key="endpoint.path" class="endpoint-details">
                              <h4>
                                  <span :class="['http-method', `method-${endpoint.method.toLowerCase()}`]">{{ endpoint.method.toUpperCase() }}</span>
                                  <code>{{ endpoint.path }}</code>
                              </h4>
                              <p>{{ endpoint.description }}</p>
                              <div v-if="endpoint.parameters && endpoint.parameters.length > 0" class="params-table">
                                  <h5>Parameters:</h5>
                                  <table>
                                      <thead><tr><th>Name</th><th>Type</th><th>Description</th><th>Required</th></tr></thead>
                                      <tbody>
                                          <tr v-for="param in endpoint.parameters" :key="param.name">
                                              <td><code>{{ param.name }}</code></td>
                                              <td>{{ param.type }}</td>
                                              <td>{{ param.description }}</td>
                                              <td>{{ param.required ? 'Yes' : 'No' }}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                              <div class="code-example">
                                  <h5>Example Request (cURL):</h5>
                                  <pre><code>{{ endpoint.exampleCurl }}</code></pre>
                              </div>
                               <div class="code-example">
                                  <h5>Example Response (JSON):</h5>
                                  <pre><code>{{ endpoint.exampleResponse }}</code></pre>
                              </div>
                          </div>
                      </div>
                  </section>
              </div>
          </div>
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserApiDocsPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const activeDocSection = ref('introduction'); // Default active section
  
      // Placeholder API documentation structure - In a real app, this would come from a CMS or Markdown files
      const apiSections = ref([
        {
          id: 'introduction',
          title: 'Introduction & Authentication',
          contentHtml: `
            <p>Welcome to the GenAI Labs API! Our API allows you to programmatically access our powerful AI models and services.</p>
            <p>All API requests must be authenticated using an API key. Include your API key in the <code>Authorization</code> header as a Bearer token:</p>
            <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
            <p>You can manage your API keys in the <a href="/user-dashboard/api-keys">API Keys section</a> of your dashboard.</p>
            <p>The base URL for all API endpoints is: <code>https://api.genailabs.ai/v1</code></p>
          `,
          endpoints: []
        },
        {
          id: 'model-predictions',
          title: 'Model Predictions',
          contentHtml: `<p>Use these endpoints to get predictions from your trained models or our pre-trained models.</p>`,
          endpoints: [
            {
              method: 'POST',
              path: '/predict/{model_id}',
              description: 'Get a prediction from a specific model.',
              parameters: [
                { name: 'model_id', type: 'string (path)', description: 'The ID of the model to use.', required: true },
                { name: 'input_data', type: 'object (body)', description: 'Input data for the model, structure depends on the model type.', required: true },
              ],
              exampleCurl: `curl -X POST https://api.genailabs.ai/v1/predict/your_model_id \\ \n` +
                           `  -H "Authorization: Bearer YOUR_API_KEY" \\ \n` +
                           `  -H "Content-Type: application/json" \\ \n` +
                           `  -d '{"prompt": "Translate this to French: Hello World"}'`,
              exampleResponse: `{\n  "prediction_id": "pred_abc123",\n  "model_id": "your_model_id",\n  "output": {\n    "translation": "Bonjour le monde"\n  },\n  "status": "completed"\n}`
            }
          ]
        },
        {
          id: 'training-jobs',
          title: 'Training Jobs',
          contentHtml: `<p>Manage and monitor your model training jobs.</p>`,
          endpoints: [
            {
              method: 'POST',
              path: '/training-jobs',
              description: 'Create a new model training job.',
              parameters: [ /* ... */ ],
              exampleCurl: `curl -X POST https://api.genailabs.ai/v1/training-jobs ...`,
              exampleResponse: `{ ... }`
            },
            {
              method: 'GET',
              path: '/training-jobs/{job_id}',
              description: 'Get the status of a specific training job.',
              parameters: [ /* ... */ ],
              exampleCurl: `curl https://api.genailabs.ai/v1/training-jobs/your_job_id ...`,
              exampleResponse: `{ ... }`
            }
          ]
        },
        // Add more sections: Datasets, Rate Limits, Error Codes, etc.
      ]);
  
      const scrollToSection = (sectionId) => {
          activeDocSection.value = sectionId;
          const element = document.getElementById(sectionId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      return {
        logout,
        userId,
        apiSections,
        activeDocSection,
        scrollToSection
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

  .content-header { /* Copied from ModelTrainingJobsPage for consistency */
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
  }
  .header-action {
      margin-left: auto;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .header-action:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .api-docs-layout {
      display: grid;
      grid-template-columns: 220px 1fr; /* Fixed nav, flexible content */
      gap: 2.5rem;
      margin-top: 2rem;
  }
  
  .docs-nav {
      position: sticky; /* Make nav sticky */
      top: 100px; /* Adjust based on main navbar height + some padding */
      height: calc(100vh - 120px); /* Adjust based on top value */
      overflow-y: auto;
      padding-right: 1rem;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  .docs-nav h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      opacity: 0.9;
  }
  .docs-nav ul { list-style: none; padding: 0; }
  .docs-nav li a {
      display: block;
      padding: 0.6rem 0;
      color: var(--color-text);
      opacity: 0.7;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      padding-left: 0.8rem;
  }
  .docs-nav li a:hover { opacity: 1; color: var(--color-primary); }
  .docs-nav li a.active {
      opacity: 1;
      color: var(--color-primary);
      font-weight: 500;
      border-left-color: var(--color-primary);
  }
  
  .docs-content-area {
      /* Styles for the main content display */
  }
  .docs-section {
      margin-bottom: 4rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .docs-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
  }
  .docs-section h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
  }
  .docs-section h3 { /* For sub-sections like Endpoints */
      font-size: 1.4rem;
      font-weight: 500;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: var(--color-secondary);
  }
  .docs-section p, .docs-section li {
      line-height: 1.7;
      opacity: 0.9;
      margin-bottom: 1rem;
  }
  .docs-section ul { margin-left: 1.5rem; }
  .docs-section code { /* Inline code */
      background-color: rgba(255, 255, 255, 0.1);
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.9em;
  }
  .docs-section pre { /* Code blocks */
      background-color: rgba(0,0,0,0.3);
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin: 1rem 0;
      border: 1px solid rgba(255,255,255,0.1);
  }
  .docs-section pre code {
      background: none; padding: 0;
      font-size: 0.9rem;
      color: #c5e1a5; /* Light green for code */
  }
  
  .endpoint-details {
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background-color: rgba(255,255,255,0.03);
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.08);
  }
  .endpoint-details h4 {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
  }
  .http-method {
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: bold;
      color: var(--color-background);
      text-transform: uppercase;
  }
  .method-post { background-color: #4CAF50; } /* Green */
  .method-get { background-color: #2196F3; }  /* Blue */
  .method-put { background-color: #FFC107; }  /* Amber */
  .method-delete { background-color: #F44336; }/* Red */
  
  .params-table h5, .code-example h5 {
      font-size: 1rem;
      font-weight: 500;
      margin-top: 1.5rem;
      margin-bottom: 0.8rem;
      opacity: 0.9;
  }
  .params-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
  }
  .params-table th, .params-table td {
      padding: 0.6rem 0.8rem;
      text-align: left;
      border: 1px solid rgba(255,255,255,0.1);
  }
  .params-table th { background-color: rgba(255,255,255,0.05); font-weight: 500; }
  
  @media (max-width: 992px) {
      .api-docs-layout {
          grid-template-columns: 1fr; /* Stack nav and content */
      }
      .docs-nav {
          position: static; /* Remove sticky on small screens */
          height: auto;
          border-right: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          padding-right: 0;
      }
      .docs-nav ul {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
      }
      .docs-nav li a {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background-color: rgba(255,255,255,0.05);
          border-left: none;
      }
      .docs-nav li a.active {
          background-color: var(--color-primary);
          color: var(--color-background);
      }
  }
  </style>