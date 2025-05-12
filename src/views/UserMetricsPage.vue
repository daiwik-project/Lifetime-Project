<!-- src/views/UserMetricsPage.vue -->
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
            <h1>Usage Metrics</h1>
            <p>Monitor your API calls, model performance, and resource consumption.</p>
            <!-- Add date range selector here -->
            <div class="date-range-selector">
                <label for="date-range">Time Period:</label>
                <select id="date-range" v-model="selectedPeriod">
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                </select>
                <!-- Add custom date inputs if 'custom' is selected -->
            </div>
          </div>
  
          <div class="metrics-grid">
            <!-- API Usage Card -->
            <div class="dashboard-card metric-card">
              <h3>API Calls</h3>
              <div class="metric-value">{{ metrics.apiCalls?.total || 'N/A' }}</div>
              <div class="metric-details">
                  <p>Successful: {{ metrics.apiCalls?.successful || 'N/A' }}</p>
                  <p>Failed: {{ metrics.apiCalls?.failed || 'N/A' }}</p>
              </div>
              <!-- Placeholder for a small chart -->
              <div class="chart-placeholder">API Call Trend Chart</div>
            </div>
  
            <!-- Model Performance Card -->
            <div class="dashboard-card metric-card">
              <h3>Average Model Accuracy</h3>
               <div class="metric-value">{{ metrics.modelAccuracy ? metrics.modelAccuracy + '%' : 'N/A' }}</div>
               <div class="metric-details">
                  <p>Top Performing: {{ metrics.topModel?.name || 'N/A' }} ({{ metrics.topModel?.accuracy || 'N/A' }}%)</p>
                  <p>Models Tracked: {{ metrics.modelsTracked || 'N/A' }}</p>
              </div>
              <div class="chart-placeholder">Accuracy Over Time Chart</div>
            </div>
  
            <!-- Compute Hours Card -->
            <div class="dashboard-card metric-card">
              <h3>Compute Hours Used</h3>
               <div class="metric-value">{{ metrics.computeHours || 'N/A' }} hrs</div>
               <div class="metric-details">
                  <p>GPU Hours: {{ metrics.gpuHours || 'N/A' }}</p>
                  <p>CPU Hours: {{ metrics.cpuHours || 'N/A' }}</p>
              </div>
              <div class="chart-placeholder">Compute Usage Breakdown Chart</div>
            </div>
  
             <!-- Data Storage Card -->
            <div class="dashboard-card metric-card">
              <h3>Data Storage</h3>
               <div class="metric-value">{{ metrics.storageUsed || 'N/A' }} GB</div>
               <div class="metric-details">
                  <p>Datasets: {{ metrics.datasetCount || 'N/A' }}</p>
                  <p>Models: {{ metrics.modelCount || 'N/A' }}</p>
              </div>
              <div class="chart-placeholder">Storage Trend Chart</div>
            </div>
          </div>
  
          <!-- Add more detailed tables or charts below -->
           <div class="dashboard-card detailed-table">
               <h3>Detailed API Usage by Key</h3>
               <table>
                   <thead>
                       <tr>
                           <th>API Key Name</th>
                           <th>Total Calls</th>
                           <th>Successful</th>
                           <th>Failed</th>
                           <th>Avg. Latency (ms)</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr v-for="key in apiUsageDetails" :key="key.id">
                           <td>{{ key.name }}</td>
                           <td>{{ key.total }}</td>
                           <td>{{ key.successful }}</td>
                           <td>{{ key.failed }}</td>
                           <td>{{ key.latency }}</td>
                       </tr>
                       <tr v-if="!apiUsageDetails.length">
                           <td colspan="5">No API usage data available for this period.</td>
                       </tr>
                   </tbody>
               </table>
           </div>
  
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, reactive, watch, onMounted } from 'vue';
  
  export default {
    name: 'UserMetricsPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const selectedPeriod = ref('30d'); // Default period
  
      // Placeholder metrics data - replace with actual API fetching
      const metrics = reactive({
        apiCalls: null,
        modelAccuracy: null,
        computeHours: null,
        storageUsed: null,
        topModel: null,
        modelsTracked: null,
        gpuHours: null,
        cpuHours: null,
        datasetCount: null,
        modelCount: null,
      });
  
      const apiUsageDetails = ref([]); // For the detailed table
  
      const fetchMetrics = (period) => {
          console.log(`Fetching metrics for period: ${period}`);
          // Simulate API call based on selectedPeriod
          // Replace this with your actual API call logic
          metrics.apiCalls = { total: Math.floor(Math.random() * 100000), successful: Math.floor(Math.random() * 99000), failed: Math.floor(Math.random() * 1000) };
          metrics.modelAccuracy = (Math.random() * (99 - 85) + 85).toFixed(1);
          metrics.computeHours = Math.floor(Math.random() * 500);
          metrics.storageUsed = (Math.random() * 100).toFixed(1);
          metrics.topModel = { name: 'Model-' + String.fromCharCode(65 + Math.floor(Math.random() * 5)), accuracy: (Math.random() * (99.5 - 95) + 95).toFixed(1) };
          metrics.modelsTracked = Math.floor(Math.random() * 20) + 5;
          metrics.gpuHours = Math.floor(metrics.computeHours * (Math.random() * 0.8 + 0.1)); // Random GPU portion
          metrics.cpuHours = metrics.computeHours - metrics.gpuHours;
          metrics.datasetCount = Math.floor(Math.random() * 50);
          metrics.modelCount = metrics.modelsTracked;
  
          // Simulate detailed API usage
          apiUsageDetails.value = [
              { id: 'key1', name: 'Production Key', total: Math.floor(metrics.apiCalls.total * 0.7), successful: Math.floor(metrics.apiCalls.successful * 0.7), failed: Math.floor(metrics.apiCalls.failed * 0.7), latency: (Math.random() * 150 + 50).toFixed(0) },
              { id: 'key2', name: 'Dev Key', total: Math.floor(metrics.apiCalls.total * 0.2), successful: Math.floor(metrics.apiCalls.successful * 0.2), failed: Math.floor(metrics.apiCalls.failed * 0.2), latency: (Math.random() * 200 + 80).toFixed(0) },
              { id: 'key3', name: 'Staging Key', total: Math.floor(metrics.apiCalls.total * 0.1), successful: Math.floor(metrics.apiCalls.successful * 0.1), failed: Math.floor(metrics.apiCalls.failed * 0.1), latency: (Math.random() * 180 + 70).toFixed(0) },
          ];
      };
  
      // Fetch metrics when the component mounts and when the period changes
      onMounted(() => fetchMetrics(selectedPeriod.value));
      watch(selectedPeriod, (newPeriod) => fetchMetrics(newPeriod));
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      return {
        logout,
        userId,
        selectedPeriod,
        metrics,
        apiUsageDetails
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
  /* above code is from user dashboard page same copy and paste here */
  .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap; /* Allow wrapping on smaller screens */
  }
  .date-range-selector {
      margin-left: auto; /* Pushes selector to the right */
      display: flex;
      align-items: center;
      gap: 0.5rem;
  }
  .date-range-selector label {
      font-size: 0.9rem;
      opacity: 0.8;
  }
  .date-range-selector select {
      padding: 0.4rem 0.8rem;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text);
      font-size: 0.9rem;
  }
  
  .metrics-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin-bottom: 2.5rem;
  }
  
  .metric-card {
    /* Inherits from .dashboard-card */
    text-align: center;
  }
  .metric-card h3 {
      font-size: 1.1rem;
      font-weight: 500;
      opacity: 0.8;
      margin-bottom: 1rem;
  }
  .metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 0.5rem;
      line-height: 1.2;
  }
  .metric-details {
      font-size: 0.85rem;
      opacity: 0.7;
      margin-bottom: 1.5rem;
      min-height: 3em; /* Reserve space */
  }
  .metric-details p {
      margin-bottom: 0.2rem;
  }
  
  .chart-placeholder {
      height: 100px;
      background-color: rgba(255, 255, 255, 0.03);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.4);
      border: 1px dashed rgba(255, 255, 255, 0.1);
  }
  
  .detailed-table {
      /* Inherits from .dashboard-card */
      padding: 0; /* Remove padding to allow table full width */
  }
  .detailed-table h3 {
      padding: 1.5rem;
      margin: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .detailed-table table {
      width: 100%;
      border-collapse: collapse;
  }
  .detailed-table th, .detailed-table td {
      padding: 1rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .detailed-table th {
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.02);
  }
  .detailed-table tbody tr:last-child td {
      border-bottom: none;
  }
  .detailed-table tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.03);
  }
  .detailed-table td {
      font-size: 0.95rem;
  }
  .detailed-table td:last-child {
      text-align: right;
  }
  .detailed-table td[colspan="5"] {
      text-align: center;
      padding: 2rem;
      opacity: 0.6;
  }
  
  @media (max-width: 768px) {
      .content-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
      }
      .date-range-selector {
          margin-left: 0;
          width: 100%;
      }
      .date-range-selector select {
          flex-grow: 1;
      }
  }
  </style>