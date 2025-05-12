<!-- src/views/CookiesPolicyPage.vue -->
<template>
    <MainLayout>
      <HeroSection
        title="Cookie Policy"
        subtitle="Learn how we use cookies to enhance your experience on our website."
        bgShape="none"
      />
      <section class="section text-content-section">
        <div class="container">
          <h2 class="section-title">Our Use of <span class="gradient-text">Cookies</span></h2>
          <div class="content-prose">
            <h3>1. What Are Cookies?</h3>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
  
            <h3>2. How We Use Cookies</h3>
            <p>We use cookies for several purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
              <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
              <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
            </ul>
  
            <h3>3. Your Choices Regarding Cookies</h3>
            <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
            <p>You can manage your cookie preferences for our site through the cookie consent banner or settings link (if available).</p>
  
            <h3>4. Changes to This Policy</h3>
            <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
  
            <h3>5. Contact Us</h3>
            <p>If you have any questions about our use of cookies, please contact us at privacy@genailabs.ai.</p>
  
            <p><em>Last Updated: {{ new Date().toLocaleDateString() }}</em></p>
          </div>
        </div>
      </section>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeroSection from '../components/HeroSection.vue';
  
  export default {
    name: 'CookiesPolicyPage',
    components: {
      MainLayout,
      HeroSection
    }
  };
  </script>
  
  <style scoped>
  /* Reusing styles from PrivacyPolicyPage example */
  .text-content-section {
    background-color: rgba(31, 41, 63, 0.1);
    padding-bottom: 6rem;
  }
  
  .content-prose {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    opacity: 0.9;
    color: var(--color-text);
  }
  
  .content-prose h3 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-primary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  .content-prose h3:first-child {
      margin-top: 0;
  }
  
  .content-prose p {
    margin-bottom: 1.5rem;
  }
  
  .content-prose ul {
    list-style: disc;
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .content-prose li {
    margin-bottom: 0.5rem;
  }
  .content-prose strong {
      font-weight: 600;
      color: var(--color-secondary);
  }
  
  .content-prose em {
      display: block;
      margin-top: 3rem;
      font-style: italic;
      opacity: 0.7;
      text-align: center;
  }
  </style>