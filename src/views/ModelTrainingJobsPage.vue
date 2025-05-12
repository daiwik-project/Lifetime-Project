<!-- src/views/ModelTrainingJobsPage.vue -->
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
            <h1>Training Jobs for Model: {{ modelId }}</h1>
            <p>View the status and history of training runs for this model.</p>
             <!-- Breadcrumbs: Projects > Project X > Models > Model Y > Training Jobs -->
             <RouterLink :to="`/user-dashboard/create/${modelType || 'custom'}/model/${modelId}`" class="btn btn-primary header-action">
                 Start New Training Job
             </RouterLink>
          </div>
  
          <div class="dashboard-card jobs-table-card">
            <div v-if="isLoading" class="loading-indicator">Loading training jobs...</div>
            <div v-else-if="trainingJobs.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Status</th>
                    <th>Started At</th>
                    <th>Duration</th>
                    <th>Compute</th>
                    <th>Accuracy</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="job in trainingJobs" :key="job.id">
                    <td>{{ job.id }}</td>
                    <td><span :class="['status-badge', `status-${job.status.toLowerCase()}`]">{{ job.status }}</span></td>
                    <td>{{ formatDate(job.startedAt) }}</td>
                    <td>{{ job.duration }}</td>
                    <td>{{ job.compute }}</td>
                    <td>{{ job.accuracy ? job.accuracy + '%' : 'N/A' }}</td>
                    <td>
                      <button @click="viewJobLogs(job.id)" class="action-btn logs-btn" title="View Logs">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </button>
                      <button v-if="job.status === 'Running'" @click="stopJob(job.id)" class="action-btn stop-btn" title="Stop Job">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                      </button>
                       <!-- Add more actions like download model artifact -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="no-data-message">
              No training jobs found for this model yet.
            </div>
          </div>
  
          <!-- Placeholder for Logs Modal/Panel -->
          <div v-if="showLogsModal" class="logs-modal">
              <div class="modal-content">
                  <button @click="showLogsModal = false" class="close-modal-btn">×</button>
                  <h3>Logs for Job: {{ selectedJobId }}</h3>
                  <pre>{{ jobLogs }}</pre>
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
    name: 'ModelTrainingJobsPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
      modelId: { type: String, required: true }
      // modelType might be needed if the 'create' link depends on it
    },
    setup(props) {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isLoading = ref(false);
      const trainingJobs = ref([]);
      const showLogsModal = ref(false);
      const selectedJobId = ref(null);
      const jobLogs = ref('');
      const modelType = ref('custom'); // Default or fetch based on modelId
  
      const fetchTrainingJobs = () => {
        isLoading.value = true;
        console.log(`Fetching training jobs for model: ${props.modelId}`);
        // Simulate API call
        setTimeout(() => {
          trainingJobs.value = [
            { id: 'job-a1b2', status: 'Completed', startedAt: '2024-03-08T10:00:00Z', duration: '1h 15m', compute: 'GPU (T4)', accuracy: 96.5 },
            { id: 'job-c3d4', status: 'Failed', startedAt: '2024-03-07T14:30:00Z', duration: '25m', compute: 'GPU (T4)', accuracy: null },
            { id: 'job-e5f6', status: 'Running', startedAt: '2024-03-10T09:00:00Z', duration: 'Ongoing', compute: 'GPU (V100)', accuracy: null },
            { id: 'job-g7h8', status: 'Completed', startedAt: '2024-03-05T11:00:00Z', duration: '45m', compute: 'CPU (Standard)', accuracy: 92.1 },
          ];
          isLoading.value = false;
        }, 1500);
        // In real app: Call backend API to get jobs for props.modelId
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
      };
  
      const viewJobLogs = (jobId) => {
          selectedJobId.value = jobId;
          jobLogs.value = `Loading logs for job ${jobId}...\n`;
          showLogsModal.value = true;
          // Simulate fetching logs
          setTimeout(() => {
               jobLogs.value += `[${new Date().toISOString()}] Training started on instance type: GPU (T4)\n`;
               jobLogs.value += `[${new Date().toISOString()}] Epoch 1/10 - loss: 0.1234 - accuracy: 0.9500\n`;
               jobLogs.value += `[${new Date().toISOString()}] Epoch 2/10 - loss: 0.0876 - accuracy: 0.9650\n`;
               jobLogs.value += `...\n`;
               if (trainingJobs.value.find(j => j.id === jobId)?.status !== 'Running') {
                   jobLogs.value += `[${new Date().toISOString()}] Training finished.\n`;
               }
          }, 1000);
          // In real app: Fetch logs from backend API
      };
  
      const stopJob = (jobId) => {
          if (confirm(`Are you sure you want to stop training job ${jobId}?`)) {
              console.log(`Stopping job: ${jobId}`);
              // Simulate API call
              const job = trainingJobs.value.find(j => j.id === jobId);
              if (job) {
                  job.status = 'Stopped'; // Update status locally (replace with refetch)
              }
              // In real app: Call backend API to stop the job
          }
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchTrainingJobs);
  
      return {
        logout,
        userId,
        isLoading,
        trainingJobs,
        formatDate,
        viewJobLogs,
        stopJob,
        showLogsModal,
        selectedJobId,
        jobLogs,
        modelType, // Needed for create link
        // Expose props
        modelId: props.modelId
      };
    }
  };
  </script>
  
  <style scoped>
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
  </style>