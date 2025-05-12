<!-- src/views/UserRecentActivityPage.vue -->
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
               <li> <!-- Add Recent Activity Link -->
                <RouterLink :to="`/user-dashboard/${userId}/recent-activity`" active-class="active-link">
                   <svg><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg> <!-- Activity Icon -->
                  <span>Recent Activity</span>
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
            <h1>Recent Account Activity</h1>
            <p>A log of recent actions performed on your account (user: {{ userId }}).</p>
            <!-- Add filters for date range or activity type if needed -->
          </div>
  
          <div class="dashboard-card activity-log-card">
            <div v-if="isLoading" class="loading-indicator">Loading activity log...</div>
            <div v-else-if="activityLog.length > 0" class="activity-log-list">
              <ul>
                <li v-for="activity in activityLog" :key="activity.id">
                  <div class="activity-icon" :class="`type-${activity.type}`">
                      <!-- Placeholder Icons -->
                      <span v-if="activity.type === 'login'">🔑</span>
                      <span v-else-if="activity.type === 'api_key'">🗝️</span>
                      <span v-else-if="activity.type === 'model_train'">✅</span>
                      <span v-else-if="activity.type === 'model_create'">➕</span>
                      <span v-else-if="activity.type === 'billing'">💰</span>
                      <span v-else>⚙️</span>
                  </div>
                  <div class="activity-details">
                      <p class="activity-description">{{ activity.description }}</p>
                      <span class="activity-timestamp">{{ formatDateTime(activity.timestamp) }}</span>
                      <span v-if="activity.ipAddress" class="activity-ip">IP: {{ activity.ipAddress }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="no-data-message">
              No recent activity found for this account.
            </div>
          </div>
           <!-- Add Pagination if log is long -->
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserRecentActivityPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
        userId: { type: String, required: true }
    },
    setup(props) {
      const router = useRouter();
      const isLoading = ref(false);
      const activityLog = ref([]);
  
      const fetchActivityLog = () => {
        isLoading.value = true;
        console.log(`Fetching activity log for user: ${props.userId}`);
        // Simulate API call
        setTimeout(() => {
          activityLog.value = [
            { id: 'act1', type: 'login', description: 'Successful login from Chrome on Windows.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), ipAddress: '192.168.1.100' },
            { id: 'act2', type: 'api_key', description: 'API Key "Production App" created.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), ipAddress: '192.168.1.100' },
            { id: 'act3', type: 'model_train', description: 'Training started for model "Churn Predictor v1".', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), ipAddress: null },
            { id: 'act4', type: 'billing', description: 'Subscription plan changed to "Pro Plan".', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), ipAddress: '192.168.1.105' },
            { id: 'act5', type: 'model_create', description: 'Model "Sentiment Analyzer" created.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), ipAddress: null },
          ];
          isLoading.value = false;
        }, 900);
      };
  
      const formatDateTime = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchActivityLog);
  
      return {
        logout,
        isLoading,
        activityLog,
        formatDateTime,
        userId: props.userId // Expose to template
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

/* USER DASHBOARD PAGE CSS */


  .activity-log-card {
      padding: 0; /* Remove card padding for list */
      margin-top: 2rem;
  }
  
  .activity-log-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  .activity-log-list li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .activity-log-list li:last-child {
      border-bottom: none;
  }
  
  .activity-icon { /* Similar to notification icon */
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      background-color: rgba(255, 255, 255, 0.08);
  }
  /* Icon type colors (examples) */
  .type-login { color: var(--color-primary); }
  .type-api_key { color: var(--color-secondary); }
  .type-model_train { color: #34a853; }
  .type-model_create { color: var(--color-accent-1); }
  .type-billing { color: var(--color-accent-2); }
  
  .activity-details {
      flex-grow: 1;
  }
  .activity-description {
      margin: 0 0 0.3rem 0;
      line-height: 1.5;
      opacity: 0.95;
      font-weight: 500;
  }
  .activity-timestamp, .activity-ip {
      font-size: 0.85rem;
      opacity: 0.6;
      margin-right: 1rem;
  }
  
  .loading-indicator, .no-data-message { /* Reusing from previous */
      text-align: center; padding: 3rem; opacity: 0.7;
  }
  </style>