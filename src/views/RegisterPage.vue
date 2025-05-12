<script>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'RegisterPage',
  components: {
    MainLayout
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const agreeToTerms = ref(false)
    // Separate visibility refs
    const showPassword1 = ref(false)
    const showPassword2 = ref(false)
    const submitted = ref(false)
    const error = ref('') // General form submission error

    // Separate toggle methods
    const togglePassword1Visibility = () => {
      showPassword1.value = !showPassword1.value
    }
    const togglePassword2Visibility = () => {
      showPassword2.value = !showPassword2.value
    }

    // Computed property for confirm password status (message and class)
    const confirmPasswordStatus = computed(() => {
      // Don't show any message if confirm password hasn't been touched yet
      if (!confirmPassword.value) {
        return { message: '', class: '' }
      }
      // Check length mismatch first
      if (password.value.length > confirmPassword.value.length) {
        return { message: 'Password is Incomplete', class: 'password-incomplete' } // Yellow warning
      }

      // Check for exact match
      if (password.value === confirmPassword.value) {
        return { message: 'Password matched', class: 'password-match' } // Green success
      }
      // If lengths match but content doesn't
      return { message: 'Password do not match', class: 'password-mismatch' } // Red error
    })

    // Computed property specifically for enabling/disabling submit button
    // Ensures both passwords are non-empty and match
    const passwordsAreValid = computed(() => {
        return password.value.length > 0 && password.value === confirmPassword.value;
    });


    const register = () => {
      // Use the passwordsAreValid computed property for final check before submit
      if (!passwordsAreValid.value) {
        // Although the UI prevents this, add a safeguard
        error.value = 'Passwords do not match or are incomplete.'
        return
      }
      if (!agreeToTerms.value) {
        error.value = 'You must agree to the Terms of Service and Privacy Policy.'
        return
      }


      // Clear previous errors
      error.value = ''
      submitted.value = true

      // For demo purposes, we'll just show a success message
      // In a real app, you'd send this to your backend for registration
      console.log('Registering:', {
        name: name.value,
        email: email.value,
        // Don't log password in real apps
      })


      // Simulate success after 2 seconds
      setTimeout(() => {
        submitted.value = false
        // Simulate redirection to login page
        alert('Account created successfully! Redirecting to login...')
        // Reset form fields (optional)
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        agreeToTerms.value = false
        // router.push('/login'); // If using Vue Router for redirection
      }, 2000)
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      agreeToTerms,
      // Expose separate visibility refs and toggles
      showPassword1,
      showPassword2,
      togglePassword1Visibility,
      togglePassword2Visibility,
      submitted,
      error,
      // Expose the status computed property
      confirmPasswordStatus,
      // Expose the validity check for the button
      passwordsAreValid,
      register
    }
  }
}
</script>

<template>
  <MainLayout>
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">Create Account</h1>
            <p class="auth-subtitle">Join GenAI Labs to explore the future of AI</p>
          </div>

          <form @submit.prevent="register" class="auth-form">
            <!-- General Form Error -->
            <div v-if="error" class="error-message">{{ error }}</div>

            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="name"
                required
                placeholder="Enter your full name"
                :disabled="submitted"
              >
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                placeholder="Enter your email address"
                :disabled="submitted"
              >
            </div>

            <!-- Password Field 1 -->
            <div class="form-group password-field">
              <label for="password">Password</label>
              <div class="password-input-container">
                <input
                  :type="showPassword1 ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  required
                  placeholder="Choose a password"
                  :disabled="submitted"
                >
                <button
                  type="button"
                  class="toggle-password"
                  @click="togglePassword1Visibility"
                  :disabled="submitted"
                  aria-label="Toggle password visibility"
                >
                  <!-- Eye Icon (Visible) -->
                  <svg v-if="showPassword1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <!-- Eye Icon (Hidden) -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Password Field 2 (Confirm) -->
            <div class="form-group password-field">
              <label for="confirm-password">Confirm Password</label>
              <div class="password-input-container">
                <input
                  :type="showPassword2 ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="confirmPassword"
                  required
                  placeholder="Confirm your password"
                  :class="{ 'input-error': confirmPasswordStatus.class === 'password-mismatch' || confirmPasswordStatus.class === 'password-incomplete' }"
                  :disabled="submitted"
                >
                 <!-- Separate Toggle Button for Confirm Password -->
                 <button
                  type="button"
                  class="toggle-password"
                  @click="togglePassword2Visibility"
                  :disabled="submitted"
                  aria-label="Toggle confirm password visibility"
                >
                  <!-- Eye Icon (Visible) -->
                  <svg v-if="showPassword2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <!-- Eye Icon (Hidden) -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
              <!-- Display Status Message -->
              <div v-if="confirmPasswordStatus.message" :class="confirmPasswordStatus.class">
                {{ confirmPasswordStatus.message }}
              </div>
            </div>

            <div class="form-group terms-checkbox">
              <div class="remember-me">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="agreeToTerms"
                  required
                  :disabled="submitted"
                >
                <label for="terms">I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></label>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary register-btn"
              :disabled="submitted || !passwordsAreValid || !agreeToTerms"
            >
              <div v-if="submitted" class="spinner" />
              <span v-else>Create Account</span>
            </button>
          </form>

          <!-- Rest of the template remains the same -->
          <div class="auth-divider">
            <span>OR</span>
          </div>

          <div class="social-login">
             <button class="social-btn google-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Sign up with Google</span>
            </button>
            <button class="social-btn github-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Sign up with GitHub</span>
            </button>
          </div>

          <div class="auth-footer">
            <p>Already have an account? <RouterLink to="/login" class="auth-link">Sign in</RouterLink></p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
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
</style>
