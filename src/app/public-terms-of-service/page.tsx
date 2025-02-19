export default function TermsOfService() {
  return (
    <div className="min-h-screen mx-auto py-8 px-4 grid gap-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>
        Welcome to Attendance-Tracker. By accessing or using our application,
        you agree to comply with and be bound by the following Terms of Service.
        If you do not agree, you may not use the application.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Use of the Application
      </h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>Google Calendar API Integration:</strong> Our application
          integrates with Google Calendar API to provide functionality such as
          event management and synchronization.
        </li>
        <li>
          <strong>User Responsibility:</strong> You agree to use the application
          responsibly and in compliance with all applicable laws and
          regulations.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Prohibited Activities
      </h2>
      <ul className="list-disc list-inside">
        <li>Misuse of the Google Calendar API for unauthorized purposes.</li>
        <li>
          Attempting to reverse-engineer, copy, or modify the application.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Disclaimer of Warranties
      </h2>
      <p>
        The application is provided &quot;as is&quot; without any warranties of any kind.
        While we strive to ensure the app operates smoothly, we cannot guarantee
        it will always be error-free or uninterrupted.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p>
        We are not liable for any direct, indirect, incidental, or consequential
        damages arising out of your use of the application.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes to These Terms
      </h2>
      <p>
        We reserve the right to update these Terms of Service at any time.
        Continued use of the application constitutes acceptance of any changes.
      </p>

      <p>
        For questions or concerns, please contact us at{" "}
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
