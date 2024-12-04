import { ModeToggle } from "@/components/ui/theme-toggle";

const LandingPage = () => {
  return (
    <div
      className={`w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all duration-500 flex flex-col min-h-screen`}
    >
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md z-10">
        <h1 className="text-3xl font-bold">Attendance App</h1>
        <div
          className="w-1/12"
        >
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-10 mt-20 flex-grow">
        <section className="relative w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden mb-10">
          <div className="relative h-60 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/50 dark:to-white/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Welcome to Attendance App
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Manage your attendance efficiently with a user-friendly interface
              and powerful tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="/list-course"
                className="block bg-blue-500 text-white py-4 px-6 rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105 text-center"
              >
                Get Started
              </a>
              <a
                href="/demo/list-course?semester=semester-1"
                className="block bg-green-500 text-white py-4 px-6 rounded-lg shadow hover:bg-green-600 transition transform hover:scale-105 text-center"
              >
                Try the Demo
              </a>
            </div>
          </div>
        </section>

        <section className="text-center max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Experience seamless attendance management with a system designed for
            ease and efficiency. Enjoy real-time updates, customizable features,
            and secure data storage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded shadow hover:shadow-lg transition">
              <h4 className="font-bold">Real-Time Updates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Instant syncing across all your devices.
              </p>
            </div>
            <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded shadow hover:shadow-lg transition">
              <h4 className="font-bold">Secure Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Advanced encryption for your safety.
              </p>
            </div>
            <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded shadow hover:shadow-lg transition">
              <h4 className="font-bold">User-Friendly</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Simplified interface for easy navigation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full text-center p-4 bg-gray-200 dark:bg-gray-800 mt-auto">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Attendance App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
