import { ModeToggle } from "@/components/ui/theme-toggle";
import "./globals.css";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full h-full relative bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <main className="relative">
        <Hero />
        <Features />
        <div className="flex flex-col lg:flex-row">
          <div className=" w-full lg:w-1/2 ">
            <CTA />
          </div>
          <div className=" w-full lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <header className="fixed top-0 w-full h-[100px] bg-gradient-to-b to-transparent dark:from-black/80 z-50 flex justify-between items-center px-6 py-4 shadow-lg text-black dark:text-white">
      <h1 className="text-xl lg:text-3xl font-bold">Attendance Manager Pro</h1>
      <div className="flex items-center gap-4 w-2/12 max-w-[100px] text-black dark:text-white">
        <ModeToggle />
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="text-center text-black dark:text-white h-screen flex flex-col gap-4 justify-center items-center px-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="showup text-2xl md:text-5xl lg:text-7xl flex flex-wrap justify-center items-center gap-2">
        Manage Attendance
        <strong className="text-blue-500"> Effortlessly</strong>
      </h1>
      <div className="text-[0.5rem] md:text-[1.2rem] lg:text-xl flex justify-center items-center text-gray-600 dark:text-gray-300 md:w-[556px] w-[250px]"></div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-white">
        <Link
          href="/list-course"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Get Started
        </Link>
        <Link
          href="/demo/home?semester=semester-1"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition"
        >
          Try the Demo
        </Link>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Real-Time Updates",
      description: "Instant syncing across all your devices.",
    },
    {
      title: "Secure Data",
      description: "Advanced encryption for your safety.",
    },
    {
      title: "User-Friendly",
      description: "Simplified interface for easy navigation.",
    },
    {
      title: "Customizable Reports",
      description: "Generate reports tailored to your needs.",
    },
    {
      title: "24/7 Support",
      description: "We're here to help whenever you need us.",
    },
  ];
  return (
    <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-16 px-8 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl text-center font-bold mb-8">Why Choose Us?</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="max-w-xs p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition hover:scale-105"
          >
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section className=" w-full bg-slate-300 dark:bg-gradient-to-b dark:from-black dark:to-gray-800 text-black dark:text-white py-16 px-8 min-h-screen flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col justify-center items-center mb-8">
        <h2 className="text-4xl text-center font-bold">Contact Me</h2>
        <h4 className="text-gray-500 text-sm">For further queries</h4>
      </div>
      <form
        // onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-400 dark:bg-gray-900 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="message"
            name="message"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="bg-blue-600 text-white py-16 px-8 text-center min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="mb-8">
        Join thousands of users who manage their attendance effortlessly.
      </p>
      <a
        href="/list-course"
        className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-200 transition"
      >
        Manage My Attendance
      </a>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8 text-center">
      <p>&copy; 2023 Attendance Manager Pro. All rights reserved.</p>
      <p>
        Designed by{" "}
        <Link
          href="
          https://www.linkedin.com/in/sahil-shinde-4ab14724b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Sahil
        </Link>
      </p>
    </footer>
  );
};
