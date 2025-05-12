<!-- src/views/AdminLoginPage.vue -->
<template>
    <MainLayout>
      <div class="auth-page admin-auth-page"> <!-- Added admin-auth-page for specific admin styles -->
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1 class="auth-title">Admin Access</h1>
              <p class="auth-subtitle">Sign in to the GenAI Labs Admin Panel</p>
            </div>
  
            <form @submit.prevent="login" class="auth-form">
              <div v-if="error" class="error-message">{{ error }}</div>
  
              <div class="form-group">
                <label for="email">Admin Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  required
                  placeholder="Enter admin email"
                  :disabled="submitted"
                >
              </div>
  
              <div class="form-group password-field">
                <label for="password">Password</label>
                <div class="password-input-container">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    required
                    placeholder="Enter admin password"
                    :disabled="submitted"
                  >
                   <button
                    type="button"
                    class="toggle-password"
                    @click="togglePasswordVisibility"
                    :disabled="submitted"
                  >
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  </button>
                </div>
              </div>
  
              <!-- No remember me or forgot password for admin usually -->
  
              <button
                type="submit"
                class="btn btn-primary login-btn"
                :disabled="submitted"
              >
                <div v-if="submitted" class="spinner" />
                <span v-else>Sign In</span>
              </button>
            </form>
             <!-- Optional: Link to Admin Register -->
             <div class="auth-footer">
               <p>Need an admin account? <RouterLink to="/admin/register" class="auth-link">Register</RouterLink></p>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import MainLayout from '../layouts/MainLayout.vue';
  
  export default {
    name: 'AdminLoginPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const email = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const submitted = ref(false);
      const error = ref('');
      const router = useRouter();
  
      const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
      };
  
      const login = () => {
        submitted.value = true;
        error.value = '';
        console.log("Admin Login attempt:", email.value);
  
        // Simulate admin login success/failure
        setTimeout(() => {
          if (email.value === 'admin@genailabs.ai' && password.value === 'password') { // Example credentials
            submitted.value = false;
            alert('Admin Logged in successfully! Redirecting to admin dashboard...');
            router.push('/admin/dashboard'); // Redirect to admin dashboard
          } else {
            error.value = 'Invalid admin credentials';
            submitted.value = false;
          }
        }, 1500);
      };
  
      return {
        email,
        password,
        showPassword,
        submitted,
        error,
        togglePasswordVisibility,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  /* Styles copied from LoginPage.vue for consistency */
  .auth-page {
    min-height: calc(100vh - 80px); /* Assuming 80px is your header/footer height */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    /* background: var(--color-background-soft); Optional: if you have a page background */
  }
  
  .auth-container {
    width: 100%;
    max-width: 480px; /* Consistent max-width */
    padding: 0 1rem; /* Padding for smaller screens */
  }
  
  .auth-card {
    background-color: rgba(255, 255, 255, 0.05); /* Dark theme card background */
    border-radius: 16px; /* Rounded corners */
    padding: 3rem 2rem; /* Spacious padding */
    border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }
  
  .auth-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .auth-title {
    font-size: 2rem; /* Or 2.25rem, adjust as needed */
    font-weight: 700;
    margin-bottom: 0.5rem;
    /* Default gradient from LoginPage, will be overridden by admin-specific style below if needed */
    background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    /* text-fill-color: transparent; /* Standard property */
  }
  
  .auth-subtitle {
    font-size: 1rem;
    /* color: var(--color-text-muted); */
    opacity: 0.8;
  }
  
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Space between form groups */
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Space between label and input */
  }
  
  label {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
    /* color: var(--color-text-secondary); */
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] { /* Added text for completeness, though not used in this specific form */
    padding: 0.8rem 1rem;
    border-radius: 8px; /* Slightly more rounded */
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05); /* Input background */
    color: var(--color-text);
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  input:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.3); /* Assuming --color-primary-rgb is defined e.g., 107, 114, 128 */
  }
  
  .password-input-container {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    opacity: 0.6;
    padding: 0.25rem; /* Added padding for easier clicking */
    display: flex; /* Align icon nicely */
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }
  
  .toggle-password:hover {
    opacity: 1;
  }
  
  .login-btn { /* General button styling, assuming .btn and .btn-primary provide base styles */
    margin-top: 1rem; /* Space above the button */
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600; /* Bolder text */
    letter-spacing: 0.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px; /* Fixed height for spinner alignment */
    /* background-color: var(--color-primary); Provided by .btn-primary */
    /* color: white; Provided by .btn-primary */
    /* border-radius: 8px; Provided by .btn */
    /* transition: background-color 0.3s ease; Provided by .btn */
  }
  
  /* .login-btn:hover {
    background-color: var(--color-primary-dark); Provided by .btn-primary:hover
  } */
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3); /* Light border for spinner track */
    border-radius: 50%;
    border-top-color: var(--color-text); /* Spinner moving part color */
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .error-message {
    background-color: rgba(220, 38, 38, 0.1); /* Soft red background */
    color: #ef4444; /* Tailwind red-500 */
    padding: 0.8rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    border: 1px solid rgba(220, 38, 38, 0.2);
    text-align: center; /* Center error message text */
  }
  
  .auth-footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.8;
    /* color: var(--color-text-muted); */
  }
  
  .auth-link {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none; /* Remove underline by default */
    transition: opacity 0.3s ease, text-decoration 0.3s ease;
  }
  
  .auth-link:hover {
    opacity: 0.8;
    text-decoration: underline; /* Underline on hover */
  }
  
  /* Responsive adjustments from LoginPage.vue */
  @media (max-width: 768px) {
    .auth-card {
      padding: 2.5rem 1.5rem; /* Adjust padding for smaller screens */
    }
    .auth-title {
      font-size: 1.75rem; /* Smaller title on mobile */
    }
  }

  /* --- Specific Admin Styling --- */
  /* These styles will apply on top of or alongside the general auth styles */
  

  
  .admin-auth-page .auth-title {
       /* Overrides the default auth-title gradient with an admin-specific one */
       background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
       -webkit-background-clip: text;
       background-clip: text;
       /* -webkit-text-fill-color: transparent; /* Already inherited or set by general .auth-title */
       /* text-fill-color: transparent; /* Already inherited or set by general .auth-title */
  }
  /* .admin-auth-page .auth-card {
    border-left: 5px solid var(--color-secondary);
} */
.admin-auth-page .auth-title {
     background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
     -webkit-background-clip: text;
     background-clip: text;
}
  /* Ensure form elements are not too wide on very small screens if needed */
  @media (max-width: 400px) {
    .auth-card {
      padding: 2rem 1rem;
    }
  }

  </style>