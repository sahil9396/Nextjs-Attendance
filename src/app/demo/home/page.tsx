import Link from "next/link";

const DemoDescription = () => {
  return (
    <div className="transition-colors duration-300 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Welcome to the Demo!
        </h1>
        <p className="mt-4 text-center ">
          Explore the features, understand the limitations, and discover what
          lies ahead after signing in.
        </p>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500">
            Features of the Demo
          </h2>
          <ul className="list-disc list-inside space-y-4 ">
            <li>Interactive and user-friendly interface.</li>
            <li>Preview the core functionalities of our platform.</li>
            <li>Experience the speed and responsiveness of our system.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500">
            Limitations of the Demo
          </h2>
          <ul className="list-disc list-inside space-y-4 ">
            <li>Limited access to advanced features.</li>
            <li>Data reset after every session.</li>
            <li>Restricted to demo-specific scenarios.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500">
            What You Get After Signing In
          </h2>
          <ul className="list-disc list-inside space-y-4 ">
            <li>
              <strong>Attendance Marked in the sign-in account Calendar</strong>
            </li>
            <li>Full access to all features and tools.</li>
            <li>Ability to save and manage your data.</li>
          </ul>
        </section>

        <div className="mt-16 text-center">
          <p className="text-lg ">
            Ready to explore more? Sign in today and unlock the full potential
            of our platform.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href={"/setting-page"}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md lg:hover:bg-blue-700 transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              href={"/"}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md lg:hover:bg-gray-700 transition duration-300"
            >
              Landing Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDescription;
