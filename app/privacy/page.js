import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect the following personal information when you create an account:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Password (stored securely using industry-standard encryption)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your personal information for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To create and manage your account</li>
          <li>To schedule and manage your appointments</li>
          <li>To send appointment confirmations and reminders via email and SMS</li>
          <li>To notify you of any changes to your appointments</li>
          <li>To send follow-up messages and service feedback requests</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>All data is encrypted in transit using SSL/TLS</li>
          <li>Passwords are hashed using industry-standard algorithms</li>
          <li>Regular security audits and updates</li>
          <li>Limited access to personal data by authorized personnel only</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
        <p className="mb-4">
          We retain your personal information for as long as your account is active or as needed to provide you services.
          You can request deletion of your account and associated data at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Email delivery services</li>
          <li>SMS messaging services</li>
          <li>Analytics and performance monitoring</li>
        </ul>
        <p className="mb-4">
          These services have their own privacy policies and data handling practices. We ensure that any third-party
          service we use complies with relevant data protection regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to Privacy Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify you of any significant changes
          through your registered email address.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or your personal information, please contact us
          through our website's contact form.
        </p>
      </section>
    </div>
  );
} 