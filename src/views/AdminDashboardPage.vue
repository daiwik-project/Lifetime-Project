<!-- src/views/AdminDashboardPage.vue -->
<template>
    <MainLayout>
      <div class="dashboard-layout admin-dashboard-layout">
        <!-- Admin Sidebar -->
        <aside class="dashboard-sidebar admin-sidebar">
          <div class="sidebar-header">
            <RouterLink to="/admin/dashboard" class="sidebar-logo">
              Admin<span class="gradient-text">Panel</span>
            </RouterLink>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <RouterLink to="/admin/dashboard" exact-active-class="active-link">
                  <svg><!-- Overview icon --><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span>Overview</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/users" active-class="active-link"> <!-- Placeholder link -->
                  <svg><!-- Users icon --><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <span>User Management</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/models" active-class="active-link"> <!-- Placeholder link -->
                  <svg><!-- Models icon --><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.7A2 2 0 0 0 15 11H9a2 2 0 0 0-2.3 2H4"></path></svg>
                  <span>Model Management</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/system-health" active-class="active-link"> <!-- Placeholder link -->
                  <svg><!-- System Health icon --><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <span>System Health</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/settings" active-class="active-link"> <!-- Placeholder link -->
                  <svg><!-- Settings icon --><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  <span>Site Settings</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="sidebar-footer">
             <RouterLink to="/admin/profile" active-class="active-link"> <!-- Link to AdminProfilePage -->
               <svg><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               <span>Admin Profile</span>
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
            <h1>Admin Dashboard</h1>
            <p>Welcome, {{ adminName }}! Manage and monitor the GenAI Labs platform.</p>
          </div>
  
          <div class="admin-stats-grid">
            <div class="dashboard-card stat-card">
              <h3>Total Users</h3>
              <p class="stat-value">{{ stats.totalUsers }}</p>
            </div>
            <div class="dashboard-card stat-card">
              <h3>Active Models</h3>
              <p class="stat-value">{{ stats.activeModels }}</p>
            </div>
            <div class="dashboard-card stat-card">
              <h3>API Calls (24h)</h3>
              <p class="stat-value">{{ stats.apiCallsToday }}</p>
            </div>
            <div class="dashboard-card stat-card">
              <h3>System Status</h3>
              <p class="stat-value status-ok">{{ stats.systemStatus }}</p>
            </div>
          </div>
  
          <div class="admin-actions-grid">
              <div class="dashboard-card action-card">
                  <h3>User Management</h3>
                  <p>View, edit, or manage user accounts and permissions.</p>
                  <RouterLink to="/admin/users" class="btn btn-secondary">Manage Users</RouterLink>
              </div>
               <div class="dashboard-card action-card">
                  <h3>Content Moderation</h3>
                  <p>Review and moderate user-generated content or models.</p>
                  <RouterLink to="/admin/moderation" class="btn btn-secondary">Moderate Content</RouterLink>
              </div>
               <div class="dashboard-card action-card">
                  <h3>Platform Analytics</h3>
                  <p>Access detailed analytics about platform usage and performance.</p>
                  <RouterLink to="/admin/analytics" class="btn btn-secondary">View Analytics</RouterLink>
              </div>
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
    name: 'AdminDashboardPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const adminName = ref('Admin User'); // Replace with actual admin name from auth/store
      const stats = reactive({
          totalUsers: 0,
          activeModels: 0,
          apiCallsToday: 0,
          systemStatus: 'Operational'
      });
  
      const fetchAdminStats = () => {
          // Simulate API call
          console.log("Fetching admin dashboard stats...");
          setTimeout(() => {
              stats.totalUsers = Math.floor(Math.random() * 1000) + 500;
              stats.activeModels = Math.floor(Math.random() * 200) + 50;
              stats.apiCallsToday = Math.floor(Math.random() * 50000) + 10000;
              stats.systemStatus = Math.random() > 0.1 ? 'Operational' : 'Degraded Performance';
          }, 1000);
      };
  
      const logout = () => {
        console.log("Admin Logout action triggered");
        // Add actual admin logout logic here
        router.push('/admin/login');
      };
  
      onMounted(fetchAdminStats);
  
      return {
        logout,
        adminName,
        stats
      };
    }
  };
  </script>
  
  <style scoped>
  /* Import or reuse dashboard layout styles */
  /* @import './UserDashboardPage.css'; Base dashboard styles */
  
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
  /* above is user dashboard page css */
  .admin-dashboard-layout .admin-sidebar {
    background: rgba(20, 30, 52, 0.9); /* Darker, more distinct admin sidebar */
    border-right: 1px solid rgba(89, 171, 230, 0.2); /* Admin theme color border */
  }
  
  .admin-sidebar .sidebar-logo {
      color: var(--color-text); /* Keep text color */
  }
  .admin-sidebar .sidebar-logo .gradient-text {
      background: linear-gradient(135deg, var(--color-secondary), var(--color-accent-1)); /* Admin gradient */
      -webkit-background-clip: text;
      background-clip: text;
  }
  
  .admin-sidebar .sidebar-nav li a.active-link {
    color: var(--color-secondary); /* Admin theme active color */
    border-left-color: var(--color-secondary);
    background-color: rgba(89, 171, 230, 0.1);
  }
  
  .admin-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .stat-card {
    /* Inherits from .dashboard-card */
    padding: 1.5rem;
    text-align: center;
  }
  .stat-card h3 {
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.8;
    margin-bottom: 0.8rem;
  }
  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--color-secondary); /* Admin theme color for stats */
    line-height: 1.2;
  }
  .status-ok {
      color: #34a853; /* Green for operational */
  }
  /* Add .status-degraded, .status-error etc. */
  
  .admin-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
  }
  .action-card {
      /* Inherits from .dashboard-card */
  }
  .action-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: var(--color-primary);
  }
  .action-card p {
      opacity: 0.8;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      line-height: 1.6;
  }
  .action-card .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
      display: inline-block;
      width: auto;
      padding: 0.6rem 1.5rem;
  }
  .action-card .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  </style>