<!-- src/views/UserProfilePage.vue -->
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
            <h1>Your Profile</h1>
            <p>Manage your personal information and account settings.</p>
          </div>
  
          <div class="profile-layout">
              <div class="dashboard-card profile-form-card">
                  <h3>Personal Information</h3>
                  <form @submit.prevent="updateProfile">
                      <div class="form-group avatar-group">
                          <label>Profile Picture</label>
                          <div class="avatar-preview" :style="{ backgroundImage: `url(${profile.avatarUrl || defaultAvatar})` }">
                              <input type="file" id="avatar-upload" @change="handleAvatarUpload" accept="image/*" class="avatar-input">
                              <label for="avatar-upload" class="avatar-edit-btn">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                              </label>
                          </div>
                      </div>
  
                      <div class="form-group">
                          <label for="profile-name">Full Name</label>
                          <input type="text" id="profile-name" v-model="profile.name" required>
                      </div>
                      <div class="form-group">
                          <label for="profile-email">Email Address</label>
                          <input type="email" id="profile-email" v-model="profile.email" required disabled>
                          <small>Email cannot be changed. Contact support for assistance.</small>
                      </div>
                      <div class="form-group">
                          <label for="profile-company">Company (Optional)</label>
                          <input type="text" id="profile-company" v-model="profile.company">
                      </div>
                       <div class="form-group">
                          <label for="profile-bio">Short Bio (Optional)</label>
                          <textarea id="profile-bio" v-model="profile.bio" rows="3" placeholder="Tell us a bit about yourself..."></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary" :disabled="isSaving">
                          <span v-if="isSaving">Saving...</span>
                          <span v-else>Save Changes</span>
                      </button>
                  </form>
              </div>
  
              <div class="dashboard-card profile-actions-card">
                  <h3>Account Actions</h3>
                  <RouterLink to="/user/security" class="action-link">
                      Change Password
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </RouterLink>
                   <RouterLink to="/user/notifications" class="action-link">
                      Notification Preferences
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </RouterLink>
                  <button @click="deleteAccount" class="action-link delete-account-btn">
                      Delete Account
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
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
    name: 'UserProfilePage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isSaving = ref(false);
      const defaultAvatar = 'https://source.unsplash.com/random/100x100/?abstract,user'; // Placeholder
  
      const profile = reactive({
          name: '',
          email: '',
          company: '',
          bio: '',
          avatarUrl: '' // Will hold URL of uploaded avatar or existing one
      });
  
      const fetchUserProfile = () => {
          console.log("Fetching user profile...");
          // Simulate API call
          setTimeout(() => {
              profile.name = 'John Doe';
              profile.email = 'john.doe@example.com';
              profile.company = 'GenAI Labs User';
              profile.bio = 'AI enthusiast and developer.';
              profile.avatarUrl = defaultAvatar; // Or fetched URL
          }, 500);
      };
  
      const handleAvatarUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
              console.log("Avatar selected:", file.name);
              // Simulate upload and get URL
              const reader = new FileReader();
              reader.onload = (e) => {
                  profile.avatarUrl = e.target.result;
              };
              reader.readAsDataURL(file);
              // In real app: upload file to server, get back URL, update profile.avatarUrl
          }
      };
  
      const updateProfile = () => {
          isSaving.value = true;
          console.log("Updating profile:", profile);
          // Simulate API call
          setTimeout(() => {
              isSaving.value = false;
              alert("Profile updated successfully!");
          }, 1500);
      };
  
      const deleteAccount = () => {
          if (confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
              if (confirm("Last chance: Deleting your account will remove all your data permanently. Continue?")) {
                  console.log("Deleting account for user:", userId.value);
                  // Simulate API call
                  setTimeout(() => {
                      alert("Account deleted successfully. You will be logged out.");
                      logout(); // Then redirect
                  }, 1000);
              }
          }
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchUserProfile);
  
      return {
        logout,
        userId,
        profile,
        isSaving,
        defaultAvatar,
        handleAvatarUpload,
        updateProfile,
        deleteAccount
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

  /* above code is from user dashboard  */
  .profile-layout {
      display: grid;
      grid-template-columns: 2fr 1fr; /* Adjust ratio as needed */
      gap: 2rem;
  }
  
  .profile-form-card h3, .profile-actions-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-secondary);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.8rem;
  }
  
  .profile-form-card .form-group {
    margin-bottom: 1.5rem;
  }
  .profile-form-card label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
  .profile-form-card input[type="text"],
  .profile-form-card input[type="email"],
  .profile-form-card textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    font-size: 1rem;
  }
  .profile-form-card input[type="email"]:disabled {
      background-color: rgba(255, 255, 255, 0.02);
      opacity: 0.6;
      cursor: not-allowed;
  }
  .profile-form-card textarea {
      resize: vertical;
      min-height: 80px;
  }
  .profile-form-card small {
      font-size: 0.8rem;
      opacity: 0.6;
      display: block;
      margin-top: 0.3rem;
  }
  
  .avatar-group {
      display: flex;
      align-items: center;
      gap: 1.5rem;
  }
  .avatar-preview {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      border: 2px solid rgba(255, 255, 255, 0.2);
      position: relative;
  }
  .avatar-input {
      display: none; /* Hide actual file input */
  }
  .avatar-edit-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: var(--color-primary);
      color: var(--color-background);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2px solid var(--color-background);
      transition: transform 0.2s ease;
  }
  .avatar-edit-btn:hover {
      transform: scale(1.1);
  }
  
  .profile-actions-card .action-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin-bottom: 0.8rem;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: var(--color-text);
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.2s ease;
  }
  .profile-actions-card .action-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }
  .profile-actions-card .action-link svg {
      opacity: 0.7;
  }
  .delete-account-btn {
      width: 100%; /* Make button full width */
      text-align: left;
      color: #ef4444; /* Red for delete */
  }
  .delete-account-btn:hover {
      background-color: rgba(239, 68, 68, 0.1);
  }
  
  @media (max-width: 992px) {
      .profile-layout {
          grid-template-columns: 1fr; /* Stack on smaller screens */
      }
  }
  </style>