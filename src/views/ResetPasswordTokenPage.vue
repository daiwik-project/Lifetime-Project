<!-- src/views/ResetPasswordTokenPage.vue -->
<script>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'ResetPasswordTokenPage',
  components: {
    MainLayout,
    RouterLink
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const token = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const submitted = ref(false);
    const passwordReset = ref(false);
    const error = ref('');
    const tokenValid = ref(true); // Assume valid initially, check on mount/submit

    onMounted(() => {
      token.value = route.params.token;
      if (!token.value) {
          error.value = 'Invalid or missing reset token.';
          tokenValid.value = false;
      }
      // Optional: Make an API call here to validate the token immediately
      // If invalid, set tokenValid = false and show an error message
      // Example:
      // validateToken(token.value).then(isValid => {
      //   if (!isValid) {
      //     tokenValid.value = false;
      //     error.value = 'Invalid or expired password reset link.';
      //   }
      // }).catch(() => {
      //   tokenValid.value = false;
      //   error.value = 'Could not validate reset link. Please try again later.';
      // });
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const passwordsMatch = computed(() => {
      // Only check if confirmPassword has been touched
      return !confirmPassword.value || newPassword.value === confirmPassword.value;
    });

    const resetPassword = () => {
      if (!passwordsMatch.value) {
        error.value = 'Passwords do not match';
        return;
      }
      if (newPassword.value.length < 8) { // Example validation
          error.value = 'Password must be at least 8 characters long';
          return;
      }

      submitted.value = true;
      error.value = '';

      console.log("Attempting password reset with token:", token.value);
      // In a real app, send token.value, newPassword.value to your backend API
      // The backend should validate the token and update the password

      // Simulate API call
      setTimeout(() => {
        // Simulate success
        submitted.value = false;
        passwordReset.value = true;

        // Simulate failure (e.g., token expired or invalid)
        // error.value = 'Password reset failed. The link may have expired.';
        // submitted.value = false;
        // tokenValid.value = false; // Mark token as invalid on failure

      }, 2000);
    };

    return {
      token,
      newPassword,
      confirmPassword,
      showPassword,
      submitted,
      passwordReset,
      error,
      tokenValid,
      togglePasswordVisibility,
      passwordsMatch,
      resetPassword
    };
  }
}
</script>

<template>
  <MainLayout>
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">Set New Password</h1>
            <!-- Show appropriate subtitle based on state -->
            <p v-if="!passwordReset && tokenValid" class="auth-subtitle">Choose a new password for your account.</p>
            <p v-if="!tokenValid && !passwordReset" class="auth-subtitle error-message">Invalid or expired password reset link.</p>
            <!-- Subtitle for success state is handled within .success-message -->
          </div>

          <!-- Success Message Block -->
          <div v-if="passwordReset" class="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>Password Reset Successful!</h3>
            <p>Your password has been updated. You can now log in with your new password.</p>
            <div class="success-actions">
              <RouterLink to="/login" class="btn btn-primary">Go to Login</RouterLink>
            </div>
          </div>

          <!-- Reset Form Block -->
          <form v-else-if="tokenValid" @submit.prevent="resetPassword" class="auth-form">
            <div v-if="error" class="error-message">{{ error }}</div>

            <div class="form-group password-field">
              <label for="new-password">New Password</label>
              <div class="password-input-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="new-password"
                  v-model="newPassword"
                  required
                  placeholder="Enter your new password (min 8 chars)"
                  :disabled="submitted"
                  aria-describedby="password-match-error"
                >
                <button
                  type="button"
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                  :disabled="submitted"
                  aria-label="Toggle password visibility"
                >
                   <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>
              </div>
            </div>

            <div class="form-group password-field">
              <label for="confirm-password">Confirm New Password</label>
              <div class="password-input-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="confirmPassword"
                  required
                  placeholder="Confirm your new password"
                  :class="{ 'input-error': !passwordsMatch && confirmPassword }"
                  :disabled="submitted"
                  aria-describedby="password-match-error"
                >
                <!-- No toggle needed here usually, visibility syncs with the first field -->
              </div>
              <div v-if="!passwordsMatch && confirmPassword" class="password-mismatch" id="password-match-error">
                Passwords do not match
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary reset-btn"
              :disabled="submitted || !newPassword || !confirmPassword || !passwordsMatch"
            >
              <div v-if="submitted" class="spinner" />
              <span v-else>Set New Password</span>
            </button>
          </form>

          <!-- Footer for Invalid Token State -->
           <div v-else class="auth-footer">
             <p>If you believe this is an error, please request a new link or contact support.</p>
             <p>
                <RouterLink to="/forgot-password" class="auth-link">Request New Link</RouterLink> |
                <RouterLink to="/contact" class="auth-link">Contact Support</RouterLink>
             </p>
           </div>

        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* --- Base Auth Styles (Copied from LoginPage/AdminLoginPage for consistency) --- */
.auth-page {
  min-height: calc(100vh - 80px); /* Adjust if header/footer height differs */
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

/* Style for subtitle when it acts as an error message */
.auth-subtitle.error-message {
    color: #f87171; /* Lighter red for subtitle context */
    opacity: 1;
    font-weight: 500;
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

input[type="email"], /* Keep for potential future use */
input[type="password"],
input[type="text"] {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.3); /* Define --color-primary-rgb */
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
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
}

.btn.reset-btn, /* Target the button specifically or just use .btn */
.btn.btn-primary { /* Ensure base button styles apply */
  margin-top: 1rem;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  /* Base styles like background, color, border-radius should come from .btn, .btn-primary */
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
  text-align: center;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6; /* Improve readability */
}

.auth-link {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s ease, text-decoration 0.3s ease;
  margin: 0 0.5rem; /* Add spacing around links in footer */
}

.auth-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 2.5rem 1.5rem;
  }
  .auth-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 400px) {
  .auth-card {
    padding: 2rem 1rem;
  }
}

/* --- Page-Specific Styles for ResetPasswordTokenPage --- */

/* Input error state (visual cue) */
.input-error {
  border-color: #ef4444 !important; /* Use important to override base border */
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3); /* Red glow on error */
}

/* Password mismatch text */
.password-mismatch {
  color: #ef4444; /* Match error message color */
  font-size: 0.8rem;
  margin-top: 0.35rem; /* Slightly more space */
  padding-left: 0.2rem; /* Align slightly with input text */
}

/* Success message block styling */
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0; /* Add some vertical padding */
  gap: 0.75rem; /* Space between elements */
}

.success-icon {
  color: #22c55e; /* Green color for success icon (Tailwind green-500) */
  margin-bottom: 0.5rem; /* Space below icon */
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text); /* Use standard text color */
  margin: 0;
}

.success-message p {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 90%; /* Prevent text from getting too wide */
  line-height: 1.6;
}

.success-actions {
  width: 100%;
  margin-top: 1.5rem; /* More space above the button */
  display: flex; /* Center the button */
  justify-content: center;
}

.success-actions .btn {
    width: auto; /* Allow button to size naturally */
    min-width: 150px; /* Give it a decent minimum width */
    padding: 0.8rem 2rem; /* Adjust padding as needed */
    margin-top: 0; /* Remove margin-top inherited from general .btn */
}

</style>