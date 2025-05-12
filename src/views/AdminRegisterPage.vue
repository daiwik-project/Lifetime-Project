<!-- src/views/AdminRegisterPage.vue -->
<template>
    <MainLayout>
      <div class="auth-page admin-auth-page">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h1 class="auth-title">Admin Registration</h1>
              <p class="auth-subtitle">Create a new administrator account for GenAI Labs</p>
            </div>
  
            <form @submit.prevent="register" class="auth-form">
              <div v-if="error" class="error-message">{{ error }}</div>
  
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" v-model="name" required placeholder="Enter full name" :disabled="submitted">
              </div>
  
              <div class="form-group">
                <label for="email">Admin Email</label>
                <input type="email" id="email" v-model="email" required placeholder="Enter admin email address" :disabled="submitted">
              </div>
  
              <div class="form-group password-field">
                <label for="password">Password</label>
                <div class="password-input-container">
                  <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required placeholder="Choose a strong password" :disabled="submitted">
                  <button type="button" class="toggle-password" @click="togglePasswordVisibility" :disabled="submitted">
                    <!-- SVG icons -->
                     <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  </button>
                </div>
              </div>
  
              <div class="form-group password-field">
                <label for="confirm-password">Confirm Password</label>
                <div class="password-input-container">
                  <input :type="showPassword ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword" required placeholder="Confirm your password" :class="{ 'input-error': !passwordsMatch && confirmPassword }" :disabled="submitted">
                </div>
                <div v-if="!passwordsMatch && confirmPassword" class="password-mismatch">Passwords do not match</div>
              </div>
  
              <!-- Optional: Admin Registration Code -->
              <!-- <div class="form-group">
                <label for="reg-code">Registration Code</label>
                <input type="text" id="reg-code" v-model="registrationCode" required placeholder="Enter registration code" :disabled="submitted">
              </div> -->
  
              <button type="submit" class="btn btn-primary register-btn" :disabled="submitted || !passwordsMatch">
                <div v-if="submitted" class="spinner" />
                <span v-else>Create Admin Account</span>
              </button>
            </form>
  
            <div class="auth-footer">
              <p>Already an admin? <RouterLink to="/admin/login" class="auth-link">Sign in</RouterLink></p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import MainLayout from '../layouts/MainLayout.vue';
  
  export default {
    name: 'AdminRegisterPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      // const registrationCode = ref(''); // Uncomment if using a registration code
      const showPassword = ref(false);
      const submitted = ref(false);
      const error = ref('');
  
      const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
      };
  
      const passwordsMatch = computed(() => {
        return !confirmPassword.value || password.value === confirmPassword.value;
      });
  
      const register = () => {
        if (!passwordsMatch.value) {
          error.value = 'Passwords do not match';
          return;
        }
        // Add other validations (e.g., registrationCode if used)
  
        submitted.value = true;
        error.value = '';
        console.log("Admin registration attempt:", email.value);
  
        // Simulate admin registration API call
        setTimeout(() => {
          // Simulate success
          submitted.value = false;
          alert('Admin account created successfully! Redirecting to admin login...');
          router.push('/admin/login');
  
          // Simulate failure
          // error.value = 'Admin registration failed. Please check details or contact support.';
          // submitted.value = false;
        }, 2000);
      };
  
      return {
        name,
        email,
        password,
        confirmPassword,
        // registrationCode,
        showPassword,
        submitted,
        error,
        togglePasswordVisibility,
        passwordsMatch,
        register
      };
    }
  };
  </script>
  
  <style scoped>
  /* Import or reuse auth page styles */
  /* @import './RegisterPage.css'; Base registration styles */
  /* @import './AdminLoginPage.css'; For admin-specific card border/title gradient */
  
/* REGISTER PAGE CSS */
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 0 1rem;
}

.auth-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  padding: 0.8rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
  width: 100%;
  /* box-sizing: border-box; */
}

input:focus {
  border-color: var(--color-primary);
  outline: none;
}

.input-error {
  border-color: #ef4444 !important;
}

.input-error {
  border-color: #ef4444 !important; /* Keep for red border on mismatch */
}

/* Style for Mismatch (Red) */
.password-mismatch {
  color: #ef4444; /* Red */
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Style for Match (Green) */
.password-match {
  color: #22c55e; /* Green */
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Style for Incomplete (Yellow/Amber) - Renamed from password-not-found */
.password-incomplete {
  color: #f59e0b; /* Amber/Yellow - Adjust if needed */
  font-size: 0.8rem;
  margin-top: 0.25rem;
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
  transition: opacity 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
}

.terms-checkbox {
  margin-top: 0.5rem;
}

.remember-me {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.remember-me label {
  font-size: 0.85rem;
  line-height: 1.5;
}

.terms-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.terms-link:hover {
  opacity: 0.8;
}

.register-btn {
  margin-top: 1rem;
  padding: 0.9rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--color-text);
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
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 0.9rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  opacity: 0.6;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.social-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.github-btn svg {
  fill: var(--color-text);
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
}

.auth-link {
  color: var(--color-primary);
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.auth-link:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
}









/* ADMIN LOGIN PAGE CSS */

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













  /* Additional specific styles if needed */
  .admin-auth-page .auth-title {
       background: linear-gradient(135deg, var(--color-text) 0%, var(--color-secondary) 100%);
       -webkit-background-clip: text;
       background-clip: text;
  }
  </style>