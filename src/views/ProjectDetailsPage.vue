<!-- src/views/ProjectDetailsPage.vue -->
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
                <RouterLink to="/projects/some-project-id" active-class="active-link"> <!-- Make this dynamic or a link to projects list -->
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
          <div v-if="isLoading" class="loading-indicator">Loading project details...</div>
          <div v-else-if="project">
            <div class="content-header project-header">
              <div>
                  <h1>Project: {{ project.name }}</h1>
                  <p>{{ project.description }}</p>
                  <span class="project-meta">Created: {{ formatDate(project.createdAt) }} | Last Updated: {{ formatDate(project.updatedAt) }}</span>
              </div>
              <div class="header-actions">
                   <RouterLink :to="`/user-dashboard/create/custom/model/new?project=${projectId}`" class="btn btn-primary">
                      Add Model
                   </RouterLink>
                   <button @click="editProject" class="btn btn-secondary">Edit Project</button>
              </div>
            </div>
  
            <!-- Project Tabs (Example) -->
            <div class="project-tabs">
                <button :class="{ active: activeTab === 'models' }" @click="activeTab = 'models'">Models ({{ project.models.length }})</button>
                <button :class="{ active: activeTab === 'datasets' }" @click="activeTab = 'datasets'">Datasets ({{ project.datasets.length }})</button>
                <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">Settings</button>
            </div>
  
            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Models Tab -->
              <div v-if="activeTab === 'models'" class="dashboard-card list-card">
                <h3>Models in this Project</h3>
                <div v-if="project.models.length > 0">
                  <table>
                    <thead>
                      <tr>
                        <th>Model Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Last Trained</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="model in project.models" :key="model.id">
                        <td>{{ model.name }}</td>
                        <td>{{ model.type.toUpperCase() }}</td>
                        <td><span :class="['status-badge', `status-${model.status.toLowerCase()}`]">{{ model.status }}</span></td>
                        <td>{{ formatDate(model.lastTrained) }}</td>
                        <td>
                          <RouterLink :to="`/user/user-dashboard/use/${model.type}/model/${model.id}`" class="action-btn" title="Use Model">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          </RouterLink>
                          <RouterLink :to="`/user-dashboard/${model.id}/training-jobs`" class="action-btn" title="View Training Jobs">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                          </RouterLink>
                          <!-- Add delete/edit actions -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="no-data-message">No models added to this project yet.</div>
              </div>
  
              <!-- Datasets Tab -->
              <div v-if="activeTab === 'datasets'" class="dashboard-card list-card">
                <h3>Datasets in this Project</h3>
                 <div v-if="project.datasets.length > 0">
                  <table>
                    <thead>
                      <tr>
                        <th>Dataset Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Uploaded At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="dataset in project.datasets" :key="dataset.id">
                        <td>{{ dataset.name }}</td>
                        <td>{{ dataset.type }}</td>
                        <td>{{ dataset.size }}</td>
                        <td>{{ formatDate(dataset.uploadedAt) }}</td>
                        <td>
                           <button class="action-btn" title="Download">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                           </button>
                           <!-- Add delete/view actions -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="no-data-message">No datasets added to this project yet.</div>
              </div>
  
              <!-- Settings Tab -->
              <div v-if="activeTab === 'settings'" class="dashboard-card settings-card">
                <h3>Project Settings</h3>
                <form @submit.prevent="saveSettings">
                    <div class="form-group">
                        <label for="project-name">Project Name:</label>
                        <input type="text" id="project-name" v-model="editableProject.name">
                    </div>
                     <div class="form-group">
                        <label for="project-desc">Description:</label>
                        <textarea id="project-desc" v-model="editableProject.description" rows="4"></textarea>
                    </div>
                    <!-- Add more settings like collaborators, access control -->
                     <button type="submit" class="btn btn-primary">Save Settings</button>
                     <button type="button" @click="deleteProject" class="btn btn-danger">Delete Project</button>
                </form>
              </div>
            </div>
  
          </div>
           <div v-else class="no-data-message">
              Project not found or you do not have access.
          </div>
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, reactive, onMounted } from 'vue';
  
  export default {
    name: 'ProjectDetailsPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      projectId: { type: String, required: true }
    },
    setup(props) {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isLoading = ref(false);
      const project = ref(null); // Holds fetched project data
      const editableProject = reactive({ name: '', description: '' }); // For settings form
      const activeTab = ref('models'); // Default tab
  
      const fetchProjectDetails = () => {
        isLoading.value = true;
        console.log(`Fetching details for project: ${props.projectId}`);
        // Simulate API call
        setTimeout(() => {
          // Replace with actual API response structure
          project.value = {
            id: props.projectId,
            name: `Project ${props.projectId.substring(0, 5)}`,
            description: 'This project focuses on analyzing customer churn using various ML models.',
            createdAt: '2024-02-15T08:30:00Z',
            updatedAt: '2024-03-09T11:45:00Z',
            models: [
              { id: 'model-xyz', name: 'Churn Predictor v1', type: 'ml', status: 'Completed', lastTrained: '2024-03-08T11:15:00Z' },
              { id: 'model-abc', name: 'Sentiment Analyzer', type: 'nlp', status: 'Running', lastTrained: '2024-03-10T09:00:00Z' },
            ],
            datasets: [
              { id: 'data-123', name: 'customer_data_q1.csv', type: 'CSV', size: '15.2 MB', uploadedAt: '2024-02-15T09:00:00Z' },
              { id: 'data-456', name: 'support_tickets.json', type: 'JSON', size: '5.8 MB', uploadedAt: '2024-02-20T14:00:00Z' },
            ]
          };
          // Initialize editable fields for settings tab
          editableProject.name = project.value.name;
          editableProject.description = project.value.description;
          isLoading.value = false;
        }, 1200);
        // In real app: Call backend API to get project details for props.projectId
      };
  
       const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
      };
  
      const editProject = () => {
          activeTab.value = 'settings'; // Switch to settings tab for editing
      };
  
      const saveSettings = () => {
          console.log("Saving project settings:", editableProject);
          // Simulate API call to update project
          setTimeout(() => {
              // Update local project data on success
              project.value.name = editableProject.name;
              project.value.description = editableProject.description;
              project.value.updatedAt = new Date().toISOString();
              alert("Project settings saved!");
          }, 1000);
      };
  
       const deleteProject = () => {
          if (confirm(`Are you sure you want to delete project "${project.value?.name}"? This action cannot be undone.`)) {
              console.log("Deleting project:", props.projectId);
              // Simulate API call
              setTimeout(() => {
                  alert("Project deleted!");
                  router.push('/projects'); // Redirect to projects list page
              }, 1000);
          }
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchProjectDetails);
  
      return {
        logout,
        userId,
        isLoading,
        project,
        editableProject,
        activeTab,
        formatDate,
        editProject,
        saveSettings,
        deleteProject,
        // Expose props
        projectId: props.projectId
      };
    }
  };
  </script>
  
  <style scoped>
  /* Import or reuse dashboard layout styles */
  /* @import './UserDashboardPage.css'; Or copy relevant styles */
  /* Import or reuse table styles from ModelTrainingJobsPage */
  /* @import './ModelTrainingJobsPage.css'; For table and status badge styles */
  
  /* Import or reuse dashboard layout styles */
  /* @import './UserDashboardPage.css'; Or copy relevant styles */
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
  .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
  }
  .header-action {
      margin-left: auto; /* Push button to right */
      padding: 0.6rem 1.2rem; /* Smaller button */
      font-size: 0.9rem;
  }
  
  .jobs-table-card {
      padding: 0; /* Remove card padding for table */
      margin-top: 2rem;
  }
  
  .jobs-table-card table {
      width: 100%;
      border-collapse: collapse;
  }
  .jobs-table-card th, .jobs-table-card td {
      padding: 1rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      vertical-align: middle;
  }
  .jobs-table-card th {
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.02);
  }
  .jobs-table-card tbody tr:last-child td {
      border-bottom: none;
  }
  .jobs-table-card tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.03);
  }
  .jobs-table-card td {
      font-size: 0.95rem;
  }
  
  .status-badge {
      padding: 0.3rem 0.7rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: capitalize;
      display: inline-block;
  }
  .status-completed { background-color: rgba(52, 168, 83, 0.2); color: #34a853; }
  .status-running { background-color: rgba(66, 133, 244, 0.2); color: #4285f4; animation: pulse-blue 2s infinite; }
  .status-failed { background-color: rgba(234, 67, 53, 0.2); color: #ea4335; }
  .status-stopped { background-color: rgba(251, 188, 5, 0.2); color: #fbbc05; }
  /* Add other statuses as needed */
  
  @keyframes pulse-blue {
    0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
    70% { box-shadow: 0 0 0 5px rgba(66, 133, 244, 0); }
    100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
  }
  
  .action-btn {
      background: none;
      border: none;
      padding: 0.3rem;
      margin-right: 0.5rem;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s ease;
  }
  .action-btn:hover {
      opacity: 1;
  }
  .action-btn svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
  }
  .logs-btn { color: var(--color-secondary); }
  .stop-btn { color: #fbbc05; } /* Yellow/Orange for stop */
  
  .loading-indicator, .no-data-message {
      text-align: center;
      padding: 3rem;
      opacity: 0.7;
  }
  
  .logs-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100; /* Above navbar */
      backdrop-filter: blur(5px);
  }
  .modal-content {
      background-color: var(--color-background);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2rem;
      width: 90%;
      max-width: 800px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      position: relative;
  }
  .modal-content h3 {
      margin-bottom: 1.5rem;
      color: var(--color-primary);
  }
  .modal-content pre {
      flex-grow: 1;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #ccc;
      font-family: monospace;
      font-size: 0.85rem;
      padding: 1rem;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
  }
  .close-modal-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.8rem;
      color: var(--color-text);
      opacity: 0.7;
      cursor: pointer;
      line-height: 1;
  }
  .close-modal-btn:hover {
      opacity: 1;
  }
  
  @media (max-width: 768px) {
      .header-action {
          margin-left: 0;
          margin-top: 1rem;
          width: 100%;
      }
      .jobs-table-card th, .jobs-table-card td {
          padding: 0.8rem;
          font-size: 0.9rem;
      }
      /* Consider making table responsive (e.g., stack columns) */
  }

  /* avove code is from model train page */
  .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start; /* Align items top */
      flex-wrap: wrap;
      gap: 1rem;
  }
  .project-header h1 {
      margin-bottom: 0.2rem;
  }
  .project-header p {
      margin-bottom: 0.5rem;
      opacity: 0.8;
      max-width: 60ch; /* Limit description width */
  }
  .project-meta {
      font-size: 0.85rem;
      opacity: 0.6;
  }
  .header-actions {
      display: flex;
      gap: 1rem;
      margin-left: auto; /* Push actions right */
      flex-shrink: 0; /* Prevent shrinking */
  }
  .header-actions .btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
  }
  .header-actions .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  .header-actions .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  
  .project-tabs {
      display: flex;
      gap: 0.5rem;
      margin-top: 2rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .project-tabs button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      color: var(--color-text);
      opacity: 0.7;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
  }
  .project-tabs button:hover {
      opacity: 1;
  }
  .project-tabs button.active {
      opacity: 1;
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
  }
  
  .tab-content {
      /* Styles for the content area of the tabs */
  }
  
  .list-card {
      padding: 0; /* Remove card padding for table */
  }
  .list-card h3 {
      padding: 1.5rem;
      margin: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 1.2rem;
      font-weight: 600;
  }
  .list-card table { /* Reuse table styles */
      width: 100%;
      border-collapse: collapse;
  }
  .list-card th, .list-card td {
      padding: 1rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      vertical-align: middle;
  }
  .list-card th {
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.02);
  }
  .list-card tbody tr:last-child td {
      border-bottom: none;
  }
  .list-card tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.03);
  }
  .list-card td {
      font-size: 0.95rem;
  }
  .list-card .action-btn { /* Reuse action button styles */
      background: none; border: none; padding: 0.3rem; margin-right: 0.5rem; cursor: pointer; opacity: 0.6; transition: opacity 0.2s ease; color: var(--color-secondary);
  }
  .list-card .action-btn:hover { opacity: 1; }
  .list-card .action-btn svg { width: 18px; height: 18px; stroke: currentColor; }
  
  .settings-card {
      max-width: 600px; /* Limit width of settings form */
  }
  .settings-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
  }
  .settings-card .form-group {
    margin-bottom: 1.5rem;
  }
  .settings-card label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
  .settings-card input[type="text"], .settings-card textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    font-size: 1rem;
  }
  .settings-card textarea {
      resize: vertical;
      min-height: 80px;
  }
  .settings-card .btn {
      margin-right: 1rem;
  }
  .btn-danger {
      background-color: rgba(220, 38, 38, 0.8);
      color: var(--color-text);
      border: 1px solid rgba(220, 38, 38, 1);
  }
  .btn-danger:hover {
      background-color: rgba(220, 38, 38, 1);
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  }
  
  .no-data-message {
      text-align: center;
      padding: 3rem;
      opacity: 0.7;
  }
  
  @media (max-width: 768px) {
      .project-header {
          flex-direction: column;
          align-items: flex-start;
      }
      .header-actions {
          margin-left: 0;
          width: 100%;
          margin-top: 1rem;
      }
      .list-card th, .list-card td {
          padding: 0.8rem;
          font-size: 0.9rem;
      }
  }
  </style>