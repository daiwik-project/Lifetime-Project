<script>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'ForgetPasswordPage',
  components: {
    MainLayout,
    RouterLink
  },
  setup() {
    const email = ref('')
    const submitted = ref(false)
    const emailSent = ref(false)
    const error = ref('')

    const resetPassword = () => {
      // Basic email validation
      if (!email.value.includes('@') || !email.value.includes('.')) {
        error.value = 'Please enter a valid email address'
        return
      }

      // For demo purposes, we'll just show a success message
      // In a real app, you'd send this to your backend
      submitted.value = true
      error.value = ''

      // Simulate success after 2 seconds
      setTimeout(() => {
        submitted.value = false
        emailSent.value = true
      }, 2000)
    }

    return {
      email,
      submitted,
      emailSent,
      error,
      resetPassword
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
            <h1 class="auth-title">Reset Password</h1>
            <p class="auth-subtitle">Enter your email address and we'll send you a link to reset your password</p>
          </div>

          <div v-if="emailSent" class="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>Check Your Email</h3>
            <p>We've sent a password reset link to {{ email }}</p>
            <div class="success-actions">
              <RouterLink to="/login" class="btn btn-primary">Back to Login</RouterLink>
            </div>
          </div>

          <form v-else @submit.prevent="resetPassword" class="auth-form">
            <div v-if="error" class="error-message">{{ error }}</div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                placeholder="Enter your email address"
                :disabled="submitted"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary reset-btn"
              :disabled="submitted"
            >
              <div v-if="submitted" class="spinner" />
              <span v-else>Send Reset Link</span>
            </button>
          </form>

          <div class="auth-footer">
            <p>Remember your password? <RouterLink to="/login" class="auth-link">Sign in</RouterLink></p>
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
  max-width: 350px;
  margin: 0 auto;
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

input[type="email"] {
  padding: 0.8rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: var(--color-primary);
  outline: none;
}

.reset-btn {
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

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  color: var(--color-primary);
}

.success-message svg {
  margin-bottom: 1.5rem;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.success-message p {
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.success-actions {
  width: 100%;
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
