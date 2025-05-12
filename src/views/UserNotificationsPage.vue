<!-- src/views/UserNotificationsPage.vue -->
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
               <li> <!-- Add Notifications Link -->
                <RouterLink to="/user/notifications" active-class="active-link">
                   <svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> <!-- Bell Icon -->
                  <span>Notifications</span>
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
            <h1>Notifications</h1>
            <p>Stay updated with important alerts and information.</p>
             <div class="header-actions">
                 <button @click="markAllAsRead" class="btn btn-secondary" :disabled="unreadCount === 0">Mark All as Read</button>
                 <button @click="clearAll" class="btn btn-danger" :disabled="notifications.length === 0">Clear All</button>
             </div>
          </div>
  
          <div class="notifications-list-container">
            <div v-if="isLoading" class="loading-indicator">Loading notifications...</div>
            <div v-else-if="notifications.length > 0" class="notifications-list">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-item"
                :class="{ unread: !notification.read }"
                @click="markAsRead(notification.id)"
              >
                <div class="notification-icon" :class="`type-${notification.type}`">
                  <!-- Placeholder Icons based on type -->
                  <span v-if="notification.type === 'billing'">💰</span>
                  <span v-else-if="notification.type === 'training'">✅</span>
                  <span v-else-if="notification.type === 'security'">🛡️</span>
                  <span v-else-if="notification.type === 'announcement'">📢</span>
                  <span v-else>ℹ️</span>
                </div>
                <div class="notification-content">
                  <p class="notification-message">{{ notification.message }}</p>
                  <span class="notification-timestamp">{{ timeAgo(notification.timestamp) }}</span>
                </div>
                <button @click.stop="deleteNotification(notification.id)" class="delete-notification-btn" title="Delete Notification">×</button>
              </div>
            </div>
            <div v-else class="no-data-message">
              You have no notifications.
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'UserNotificationsPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isLoading = ref(false);
      const notifications = ref([]);
  
      const fetchNotifications = () => {
        isLoading.value = true;
        console.log("Fetching notifications...");
        // Simulate API call
        setTimeout(() => {
          notifications.value = [
            { id: 'n1', type: 'billing', message: 'Your invoice #INV-2024-001 for $49.00 has been paid.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: false },
            { id: 'n2', type: 'training', message: 'Training job for model "Churn Predictor v1" completed successfully.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: false },
            { id: 'n3', type: 'security', message: 'A new login was detected from Chrome on Windows in New York, USA.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), read: true },
            { id: 'n4', type: 'announcement', message: 'New Feature Alert: Custom Model Fusion is now available!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), read: true },
            { id: 'n5', type: 'training', message: 'Training job for model "Image Classifier X" failed. View logs for details.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
          ];
          isLoading.value = false;
        }, 800);
      };
  
      const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);
  
      const markAsRead = (notificationId) => {
          const notification = notifications.value.find(n => n.id === notificationId);
          if (notification && !notification.read) {
              console.log("Marking as read:", notificationId);
              notification.read = true;
              // API call to mark as read on backend
          }
      };
  
      const markAllAsRead = () => {
          console.log("Marking all as read");
          notifications.value.forEach(n => n.read = true);
          // API call to mark all as read
      };
  
      const deleteNotification = (notificationId) => {
          console.log("Deleting notification:", notificationId);
          notifications.value = notifications.value.filter(n => n.id !== notificationId);
          // API call to delete notification
      };
  
      const clearAll = () => {
          if (confirm("Are you sure you want to clear all notifications?")) {
              console.log("Clearing all notifications");
              notifications.value = [];
              // API call to clear all
          }
      };
  
      // Simple time ago function (replace with a library like date-fns if needed)
      const timeAgo = (timestamp) => {
          const now = new Date();
          const past = new Date(timestamp);
          const diffInSeconds = Math.floor((now - past) / 1000);
          const diffInMinutes = Math.floor(diffInSeconds / 60);
          const diffInHours = Math.floor(diffInMinutes / 60);
          const diffInDays = Math.floor(diffInHours / 24);
  
          if (diffInDays > 1) return `${diffInDays} days ago`;
          if (diffInDays === 1) return `1 day ago`;
          if (diffInHours > 1) return `${diffInHours} hours ago`;
          if (diffInHours === 1) return `1 hour ago`;
          if (diffInMinutes > 1) return `${diffInMinutes} minutes ago`;
          if (diffInMinutes === 1) return `1 minute ago`;
          return `just now`;
      };
  
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchNotifications);
  
      return {
        logout,
        userId,
        isLoading,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        timeAgo
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

  /* ABOVE USER DASHBOARD CSS */
  .content-header { /* Copied from ModelTrainingJobsPage for consistency */
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;
  }
  .header-actions { display: flex; gap: 1rem; margin-left: auto; }
  .header-actions .btn { padding: 0.6rem 1.2rem; font-size: 0.9rem; }
  .header-actions .btn-secondary {
      background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--color-text);
  }
  .header-actions .btn-danger {
      background-color: rgba(220, 38, 38, 0.8); color: var(--color-text); border: 1px solid rgba(220, 38, 38, 1);
  }
  .header-actions .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  
  .notifications-list-container {
      margin-top: 2rem;
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      max-height: calc(100vh - 250px); /* Adjust based on header/footer */
      overflow-y: auto;
  }
  
  .notifications-list {
      /* No extra styles needed, items handle borders */
  }
  
  .notification-item {
      display: flex;
      align-items: flex-start; /* Align icon top */
      gap: 1rem;
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
      transition: background-color 0.2s ease;
      position: relative;
  }
  .notification-item:last-child {
      border-bottom: none;
  }
  .notification-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
  }
  .notification-item.unread {
      background-color: rgba(89, 171, 230, 0.08); /* Subtle blue for unread */
      border-left: 3px solid var(--color-secondary);
      padding-left: calc(1.5rem - 3px); /* Adjust padding */
  }
  
  .notification-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      background-color: rgba(255, 255, 255, 0.1);
  }
  /* Icon type colors (examples) */
  .type-billing { background-color: rgba(52, 168, 83, 0.2); color: #34a853; }
  .type-training { background-color: rgba(66, 133, 244, 0.2); color: #4285f4; }
  .type-security { background-color: rgba(251, 188, 5, 0.2); color: #fbbc05; }
  .type-announcement { background-color: rgba(229, 170, 132, 0.2); color: var(--color-primary); }
  
  .notification-content {
      flex-grow: 1;
  }
  .notification-message {
      margin: 0 0 0.4rem 0;
      line-height: 1.5;
      opacity: 0.95;
  }
  .notification-timestamp {
      font-size: 0.85rem;
      opacity: 0.6;
  }
  
  .delete-notification-btn {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      background: none; border: none;
      color: var(--color-text); opacity: 0; /* Hidden by default */
      font-size: 1.4rem; cursor: pointer;
      transition: opacity 0.2s ease;
  }
  .notification-item:hover .delete-notification-btn {
      opacity: 0.5;
  }
  .delete-notification-btn:hover {
      opacity: 1;
      color: #ef4444;
  }
  
  .loading-indicator, .no-data-message { /* Reusing from previous */
      text-align: center; padding: 3rem; opacity: 0.7;
  }
  </style>