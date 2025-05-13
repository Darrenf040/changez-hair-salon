import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using our website and services, you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
        <p className="mb-4">
          To use our services, you must create an account by providing your name, email address, phone number, and password.
          You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Appointment Management</h2>
        <p className="mb-4">
          We use your provided contact information (email and phone number) to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Schedule and manage your appointments</li>
          <li>Send appointment confirmations and reminders</li>
          <li>Notify you of any changes to your appointments</li>
          <li>Send follow-up messages regarding your service experience</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Service Feedback</h2>
        <p className="mb-4">
          After your appointment, we may send you a link to rate our services. Your feedback helps us improve our services
          and maintain high-quality standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
        <p className="mb-4">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Use our services for any illegal purposes</li>
          <li>Attempt to access other users' accounts</li>
          <li>Share your account credentials with others</li>
          <li>Interfere with the proper functioning of our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will notify you of any significant changes
          through your registered email address.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us through our website's contact form.
        </p>
      </section>
    </div>
  );
} 