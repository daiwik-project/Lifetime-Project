<!-- <script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            GenAI<span class="gradient-text">Labs</span>
          </RouterLink>
          <p class="footer-description">
            We develop cutting-edge AI tools to accelerate your innovation. Smarter, faster, and more efficient AI starts here.
          </p>
          <div class="footer-social">
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

        <div class="footer-links">
          <h3 class="footer-title">Site Map</h3>
          <ul class="footer-list">
            <li><RouterLink to="/" class="footer-item">Home</RouterLink></li>
            <li><RouterLink to="/about" class="footer-item">About</RouterLink></li>
            <li><RouterLink to="/contact" class="footer-item">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="footer-links">
          <h3 class="footer-title">Resources</h3>
          <ul class="footer-list">
            <li><RouterLink to="/gen" class="footer-item">Gen AI</RouterLink></li>
            <li><a href="#" class="footer-item">Documentation</a></li>
            <li><a href="#" class="footer-item">API</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h3 class="footer-title">Legal</h3>
          <ul class="footer-list">
            <li><a href="#" class="footer-item">Privacy Policy</a></li>
            <li><a href="#" class="footer-item">Terms of Service</a></li>
            <li><a href="#" class="footer-item">Cookie Policy</a></li>
          </ul>
        </div>

        <div class="footer-newsletter">
          <h3 class="footer-title">Stay Updated</h3>
          <p class="footer-description">Subscribe to our newsletter for the latest AI breakthroughs and updates.</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Your email" class="newsletter-input">
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} GenAI Labs. All rights reserved.
        </div>
        <div class="footer-credits">
          Designed with 💙 for innovation
        </div>
      </div>
    </div>
  </footer>
</template> -->

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            GenAI<span class="gradient-text">Labs</span>
          </RouterLink>
          <p class="footer-description">
            We develop cutting-edge AI tools to accelerate your innovation. Smarter, faster, and more efficient AI starts here.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="LinkedIn">
              <!-- LinkedIn SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <!-- Twitter SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Github">
              <!-- GitHub SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 
                    5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 
                    5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 
                    5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <h3 class="footer-title">Site Map</h3>
          <ul class="footer-list">
            <li><RouterLink to="/" class="footer-item">Home</RouterLink></li>
            <li><RouterLink to="/about" class="footer-item">About</RouterLink></li>
            <li><RouterLink to="/contact" class="footer-item">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="footer-links">
          <h3 class="footer-title">Resources</h3>
          <ul class="footer-list">
            <li><RouterLink to="/gen" class="footer-item">Gen AI</RouterLink></li>
            <li><a href="#" class="footer-item">Documentation</a></li>
            <li><a href="#" class="footer-item">API</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h3 class="footer-title">Legal</h3>
          <ul class="footer-list">
            <li><a href="#" class="footer-item">Privacy Policy</a></li>
            <li><a href="#" class="footer-item">Terms of Service</a></li>
            <li><a href="#" class="footer-item">Cookie Policy</a></li>
          </ul>
        </div>

        <div class="footer-newsletter">
          <h3 class="footer-title">Stay Updated</h3>
          <p class="footer-description">
            Subscribe to our newsletter for the latest AI breakthroughs and updates.
          </p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Your email" class="newsletter-input">
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} GenAI Labs. All rights reserved.
        </div>
        <div class="footer-credits">
          Designed with 💙 for innovation
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Footer',
  components: {
    RouterLink
  }
}
</script>


<style scoped>
.footer {
  background-color: rgba(8, 12, 12, 0.97);
  padding: 5rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block;
}

.footer-description {
  opacity: 0.7;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--color-primary);
  transform: translateY(-3px);
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-item {
  margin-bottom: 0.8rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-item:hover {
  opacity: 1;
  color: var(--color-primary);
  transform: translateX(5px);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.newsletter-input {
  padding: 0.8rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  border-color: var(--color-primary);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright, .footer-credits {
  opacity: 0.6;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
