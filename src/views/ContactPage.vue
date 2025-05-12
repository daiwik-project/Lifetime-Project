<script>
import { ref } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';

export default {
  name: 'ContactPage',
  components: {
    MainLayout,
    HeroSection
  },
  setup() {
    const name = ref('');
    const email = ref('');
    const company = ref('');
    const message = ref('');
    const subjectOptions = ['General Inquiry', 'Partnership', 'Support', 'Careers'];
    const subject = ref(subjectOptions[0]);
    const submitted = ref(false);

    const submitForm = () => {
      // This would typically send the form data to a backend
      submitted.value = true;

      // Reset form after 3 seconds for demo purposes
      setTimeout(() => {
        name.value = '';
        email.value = '';
        company.value = '';
        message.value = '';
        subject.value = subjectOptions[0];
        submitted.value = false;
      }, 3000);
    };

    return {
      name,
      email,
      company,
      message,
      subjectOptions,
      subject,
      submitted,
      submitForm
    };
  }
};
</script>

<template>
  <MainLayout>
    <!-- Hero Section -->
    <HeroSection
      title="Contact Us"
      subtitle="Have questions or interested in our AI solutions? Get in touch with our team today."
      bgShape="square"
    >
      <template #image>
        <div class="contact-illustration">
          <div class="contact-sphere" />
        </div>
      </template>
    </HeroSection>

    <!-- Contact Form Section -->
    <section class="section contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <h2 class="section-title">Let's Build the <span class="gradient-text">Future of AI</span> Together</h2>
            <p class="contact-text">
              Whether you need custom AI solutions, scalable models, or expert guidance,
              we're here to help. Get in touch and let's unlock the next stage of AI innovation—together.
            </p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Email Us</h3>
                  <a href="mailto:contact@genailabs.ai" class="method-link">contact@genailabs.ai</a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Visit Us</h3>
                  <p class="method-text">123 AI Avenue, Tech District<br>San Francisco, CA 94103</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Call Us</h3>
                  <p class="method-text">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Github">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div class="contact-form-container">
            <div class="form-card">
              <div v-if="submitted" class="success-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you shortly.</p>
              </div>

              <form v-else @submit.prevent="submitForm" class="contact-form">
                <h3 class="form-title">Send Us a Message</h3>

                <div class="form-group">
                  <label for="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div class="form-group">
                  <label for="company">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    v-model="company"
                    placeholder="Enter your company name"
                  />
                </div>

                <div class="form-group">
                  <label for="subject">Subject</label>
                  <select id="subject" v-model="subject">
                    <option v-for="option in subjectOptions" :key="option">{{ option }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    v-model="message"
                    required
                    rows="4"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="section map-section">
      <div class="map-placeholder">
        <div class="map-overlay">
          <h3>Visit Our Headquarters</h3>
          <p>123 AI Avenue, Tech District<br>San Francisco, CA 94103</p>
          <a href="#" class="btn btn-primary">Get Directions</a>
        </div>
      </div>
    </section>
  </MainLayout>
</template>


<style scoped>
.contact-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.contact-sphere {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at 30% 30%, var(--color-accent-1), var(--color-secondary));
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 50px rgba(236, 223, 88, 0.5);
  animation: float 6s ease-in-out infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.contact-section {
  background-color: rgba(31, 41, 63, 0.3);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-text {
  margin-bottom: 2rem;
  line-height: 1.8;
  opacity: 0.9;
  font-size: 1.1rem;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.method-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: var(--color-primary);
}

.method-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.method-text, .method-link {
  opacity: 0.8;
  line-height: 1.6;
}

.method-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.method-link:hover {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--color-primary);
  transform: translateY(-3px);
}

.form-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.contact-form {
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

input, select, textarea {
  padding: 0.8rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--color-primary);
  outline: none;
}

.btn {
  padding: 1rem;
  font-size: 1rem;
  display: inline-block;
  width: 100%;
  text-align: center;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  height: 100%;
  color: var(--color-primary);
}

.success-message svg {
  margin-bottom: 1rem;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
}

.success-message p {
  opacity: 0.8;
  line-height: 1.6;
}

.map-section {
  padding: 0;
}

.map-placeholder {
  height: 400px;
  width: 100%;
  background-color: rgba(31, 41, 63, 0.5);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-overlay {
  background-color: rgba(8, 12, 12, 0.9);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.map-overlay h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.map-overlay p {
  margin-bottom: 1.5rem;
  opacity: 0.8;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .map-placeholder {
    height: 300px;
  }
}
</style>
