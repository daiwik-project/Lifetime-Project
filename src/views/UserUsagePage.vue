<!-- src/views/UserUsagePage.vue -->
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
            <h1>Resource Usage</h1>
            <p>Track your consumption of API calls, compute resources, and storage against your plan limits.</p>
             <div class="date-range-selector"> <!-- Reusing from UserMetricsPage -->
                <label for="usage-date-range">Period:</label>
                <select id="usage-date-range" v-model="selectedPeriod">
                    <option value="current_month">Current Billing Cycle</option>
                    <option value="last_month">Last Billing Cycle</option>
                    <option value="last_7d">Last 7 Days</option>
                </select>
            </div>
          </div>
  
          <div class="usage-summary-grid">
              <div class="dashboard-card usage-card" v-for="item in usageSummary" :key="item.metric">
                  <h3>{{ item.label }}</h3>
                  <div class="usage-bar-container">
                      <div class="usage-bar" :style="{ width: calculatePercentage(item.used, item.limit) + '%' }"></div>
                  </div>
                  <div class="usage-text">
                      <span>{{ item.usedFormatted || item.used }} / {{ item.limitFormatted || item.limit }} {{ item.unit }}</span>
                      <span>({{ calculatePercentage(item.used, item.limit) }}%)</span>
                  </div>
                  <p v-if="item.resetsOn" class="reset-info">Resets on: {{ formatDate(item.resetsOn) }}</p>
              </div>
          </div>
  
          <div class="dashboard-card detailed-usage-table">
              <h3>Detailed Usage Breakdown</h3>
              <p class="table-description">Breakdown of usage by model or service for the selected period.</p>
              <table>
                  <thead>
                      <tr>
                          <th>Service / Model</th>
                          <th>API Calls</th>
                          <th>Compute Units</th>
                          <th>Data Processed</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="detail in detailedUsage" :key="detail.id">
                          <td>{{ detail.name }}</td>
                          <td>{{ detail.apiCalls.toLocaleString() }}</td>
                          <td>{{ detail.computeUnits.toLocaleString() }}</td>
                          <td>{{ detail.dataProcessed }}</td>
                      </tr>
                      <tr v-if="!detailedUsage.length">
                          <td colspan="4" class="no-data-message">No detailed usage data for this period.</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="usage-footer">
              <p>Need more resources? <RouterLink to="/pricing">Upgrade your plan</RouterLink> or <RouterLink to="/contact">contact support</RouterLink> for custom quotas.</p>
          </div>
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  
  export default {
    name: 'UserUsagePage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const selectedPeriod = ref('current_month');
      const usageSummary = ref([]);
      const detailedUsage = ref([]);
  
      const fetchUsageData = (period) => {
          console.log(`Fetching usage data for period: ${period}`);
          // Simulate API call
          setTimeout(() => {
              usageSummary.value = [
                  { metric: 'api_calls', label: 'API Calls', used: Math.floor(Math.random() * 800000), limit: 1000000, unit: 'calls', resetsOn: '2024-04-01T00:00:00Z' },
                  { metric: 'compute_hours', label: 'Compute Hours', used: Math.floor(Math.random() * 80), limit: 100, unit: 'hours', resetsOn: '2024-04-01T00:00:00Z' },
                  { metric: 'storage', label: 'Data Storage', used: (Math.random() * 40 + 10).toFixed(1), limit: 50, unit: 'GB', usedFormatted: null, limitFormatted: null }, // No reset date for storage typically
                  { metric: 'models_trained', label: 'Models Trained This Cycle', used: Math.floor(Math.random() * 8), limit: 10, unit: 'models', resetsOn: '2024-04-01T00:00:00Z' },
              ];
              // Format large numbers
              usageSummary.value.forEach(item => {
                  if (item.used > 1000) item.usedFormatted = item.used.toLocaleString();
                  if (item.limit > 1000) item.limitFormatted = item.limit.toLocaleString();
              });
  
              detailedUsage.value = [
                  { id: 'model_a', name: 'Sentiment Analysis Model', apiCalls: Math.floor(Math.random() * 200000), computeUnits: Math.floor(Math.random() * 20), dataProcessed: `${(Math.random()*5).toFixed(1)} GB` },
                  { id: 'model_b', name: 'Image Classifier X', apiCalls: Math.floor(Math.random() * 150000), computeUnits: Math.floor(Math.random() * 30), dataProcessed: `${(Math.random()*10).toFixed(1)} GB` },
                  { id: 'service_c', name: 'Data Preprocessing Service', apiCalls: Math.floor(Math.random() * 50000), computeUnits: Math.floor(Math.random() * 5), dataProcessed: `${(Math.random()*2).toFixed(1)} GB` },
              ];
          }, 800);
      };
  
      const calculatePercentage = (used, limit) => {
          if (limit === 0) return 0;
          const percentage = (used / limit) * 100;
          return Math.min(Math.max(percentage, 0), 100).toFixed(1); // Cap at 0-100
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(() => fetchUsageData(selectedPeriod.value));
      watch(selectedPeriod, (newPeriod) => fetchUsageData(newPeriod));
  
      return {
        logout,
        userId,
        selectedPeriod,
        usageSummary,
        detailedUsage,
        calculatePercentage,
        formatDate
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
  
  
  /* Main Content Styles (from UserDashboardPage.css) */
  .dashboard-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto; /* Allow content scrolling */
  }
  
  /* This .content-header is the base style from UserDashboardPage.css */
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
  
  .dashboard-grid { /* From UserDashboardPage.css, may not be directly used by UserUsagePage */
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .dashboard-card { /* General card style from UserDashboardPage.css */
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dashboard-card h3 { /* General h3 style within a dashboard card */
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
  }
  .dashboard-card p.stat { /* For stat display, not directly used in UserUsagePage HTML */
      font-size: 2rem;
      font-weight: bold;
      color: var(--color-secondary);
      margin-bottom: 1rem;
  }
  .dashboard-card ul { /* Not directly used in UserUsagePage HTML */
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
  }
  .dashboard-card li { /* Not directly used in UserUsagePage HTML */
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  }
  .dashboard-card li:last-child {
      border-bottom: none;
      margin-bottom: 0;
  }
  .dashboard-card a { /* General link style within a card */
      color: var(--color-primary);
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
  }
  .dashboard-card a:hover {
      text-decoration: underline;
  }
  .quick-actions { /* Not directly used in UserUsagePage HTML */
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  .quick-actions .btn {
      width: 100%;
      text-align: center;
  }
  
  /* Responsive adjustments if needed (from UserDashboardPage.css) */
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
  /* The duplicated block of dashboard CSS that was here has been removed. */


  /* Import or reuse table styles from ModelTrainingJobsPage */
  /* @import './ModelTrainingJobsPage.css'; For table styles */
  
  /* This .content-header is from ModelTrainingJobsPage.css and adds flex properties.
     It will combine with or override parts of the .content-header defined above. */
  .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
  }
  .header-action { /* From ModelTrainingJobsPage, not used in UserUsagePage HTML */
      margin-left: auto; /* Push button to right */
      padding: 0.6rem 1.2rem; /* Smaller button */
      font-size: 0.9rem;
  }
  
  /* Styles for table cards, adapted from .jobs-table-card in ModelTrainingJobsPage.css
     UserUsagePage.vue uses <div class="dashboard-card detailed-usage-table"> */
  .detailed-usage-table { /* This class is on a .dashboard-card div */
      /* .dashboard-card provides base background, border, radius */
      /* Overriding padding from .dashboard-card for table layout */
      padding: 0; 
      margin-top: 2rem; /* Original .jobs-table-card had margin-top: 2rem */
  }
  
  .detailed-usage-table table { /* Styling the table within .detailed-usage-table */
      width: 100%;
      border-collapse: collapse;
  }
  /* Applying th, td styles from ModelTrainingJobsPage.css to the detailed usage table */
  .detailed-usage-table th, 
  .detailed-usage-table td {
      padding: 1rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      vertical-align: middle;
  }
  .detailed-usage-table th {
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.02);
  }
  .detailed-usage-table tbody tr:last-child td {
      border-bottom: none;
  }
  .detailed-usage-table tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.03);
  }
  .detailed-usage-table td {
      font-size: 0.95rem;
  }
  
  .status-badge { /* From ModelTrainingJobsPage, not directly used in UserUsagePage HTML */
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
  
  @keyframes pulse-blue { /* From ModelTrainingJobsPage */
    0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
    70% { box-shadow: 0 0 0 5px rgba(66, 133, 244, 0); }
    100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
  }
  
  .action-btn { /* From ModelTrainingJobsPage, not directly used in UserUsagePage HTML */
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
  
  .loading-indicator { /* From ModelTrainingJobsPage, UserUsagePage also has .no-data-message */
      text-align: center;
      padding: 3rem;
      opacity: 0.7;
  }
  /* .no-data-message is defined later specifically for UserUsagePage */
  
  .logs-modal { /* From ModelTrainingJobsPage, not used in UserUsagePage HTML */
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
  .modal-content { /* From ModelTrainingJobsPage, not used in UserUsagePage HTML */
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
  
  @media (max-width: 768px) { /* From ModelTrainingJobsPage */
      .header-action { /* Not used in UserUsagePage HTML */
          margin-left: 0;
          margin-top: 1rem;
          width: 100%;
      }
      .detailed-usage-table th, .detailed-usage-table td { /* Applying to current page's table */
          padding: 0.8rem;
          font-size: 0.9rem;
      }
      /* Consider making table responsive (e.g., stack columns) */
  }
  /* above is model trainjobs page */

  
  /* Styles specific to UserUsagePage or copied from UserMetricsPage */
  .content-header { /* Copied from UserMetricsPage for consistency - this adds flex properties for date selector */
      display: flex; /* This is already set by ModelTrainingJobsPage's .content-header */
      justify-content: space-between; /* This is already set */
      align-items: center; /* This is already set */
      flex-wrap: wrap; /* This is already set */
  }
  .date-range-selector { /* Specific to UserUsagePage (reused from UserMetricsPage) */
      margin-left: auto; display: flex; align-items: center; gap: 0.5rem;
  }
  .date-range-selector label { font-size: 0.9rem; opacity: 0.8; }
  .date-range-selector select {
      padding: 0.4rem 0.8rem; border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-text); font-size: 0.9rem;
  }
  
  .usage-summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
  }
  .usage-card { /* Inherits from .dashboard-card, specific styles below */
    /* Base styles from .dashboard-card are applied */
  }
  .usage-card h3 { /* Overrides general .dashboard-card h3 if more specific or later in cascade */
      font-size: 1.1rem; font-weight: 500; opacity: 0.9; margin-bottom: 1.5rem;
  }
  .usage-bar-container {
      width: 100%;
      height: 12px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 0.8rem;
  }
  
  .usage-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
      border-radius: 6px;
      transition: width 0.5s ease-out;
  }
  .usage-text {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
  }
  .reset-info {
      font-size: 0.8rem;
      opacity: 0.6;
      text-align: right;
  }
  
  .detailed-usage-table { /* This class is on a .dashboard-card div */
    /* padding: 0; is already set above from ModelTrainingJobsPage adaptation */
    margin-bottom: 2rem; 
  }
  .detailed-usage-table h3 { /* Styles for the h3 inside the detailed usage table card */
      padding: 1.5rem; margin: 0; /* Add padding back as .detailed-usage-table had padding:0 */
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 1.2rem; font-weight: 600; /* More specific than general .dashboard-card h3 */
  }
  .table-description {
      padding: 0 1.5rem 1rem 1.5rem;
      font-size: 0.9rem;
      opacity: 0.7;
  }
  /* Table styles (th, td) are applied from the ModelTrainingJobsPage block above */
  
  .usage-footer {
      text-align: center;
      padding: 1.5rem;
      background-color: rgba(255,255,255,0.03);
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.08);
  }
  .usage-footer p { opacity: 0.8; }
  .usage-footer a { color: var(--color-primary); font-weight: 500; }
  .usage-footer a:hover { text-decoration: underline; }
  
  .no-data-message { /* Specific to UserUsagePage, used in table's td */
      text-align: center; padding: 3rem; opacity: 0.7;
      /* This will apply to the td.no-data-message */
  }

  /* Responsive adjustments for UserUsagePage specific elements */
  @media (max-width: 768px) {
    .date-range-selector {
        margin-left: 0; /* Stack under title on small screens */
        width: 100%;
        margin-top: 1rem;
        justify-content: flex-start;
    }
    .usage-summary-grid {
        grid-template-columns: 1fr; /* Stack usage cards */
    }
  }
  </style>