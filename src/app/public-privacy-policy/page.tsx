export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Welcome to Attendance-Tracker. Your privacy is critically important to us.
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our application that integrates with Google
        Calendar API.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>Google Account Information:</strong> This includes your email
          address, calendar events, and other information accessible through the
          Google Calendar API.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect data about how you
          interact with the application, such as the features you use and the
          frequency of use.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p>
        We use the collected information solely for providing and improving the
        application&apos;s services. Specifically, we use your data to:
      </p>
      <ul className="list-disc list-inside">
        <li>
          Sync with your Google Calendar to display and manage your events.
        </li>
        <li>Offer personalized features and notifications.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Sharing</h2>
      <p>
        We do not share, sell, or rent your personal data to third parties. Your
        information is only used as required for the functionality of the app.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Security</h2>
      <p>
        We employ industry-standard security measures to protect your data. This
        includes encryption of sensitive information and restricted access to
        data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Consent</h2>
      <p>
        By using the application, you consent to the collection and use of your
        data as described in this Privacy Policy. If you withdraw your consent,
        some features of the application may no longer function.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </p>

      <p>
        For any questions or concerns, please contact us at{" "}
        <a
          href="mailto:your-contact-email@example.com"
          className="text-blue-500"
        >
          sahilarchan@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
