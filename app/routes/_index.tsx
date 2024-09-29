import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Hero */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 text-center py-24 min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-4">
          Discover & Experience the Best Tasting Events
        </h1>
        <p className="text-lg mb-8">
          Join as a vendor, organizer, or attendee.
        </p>
        <div className="space-x-4">
          <a href="#" className="bg-blue-500 text-white py-3 px-6 rounded">
            Browse Events
          </a>
          <a href="#" className="bg-gray-200 text-gray-900 py-3 px-6 rounded">
            Sign Up
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-blue-500 mb-4">🎉</div>
            <h3 className="text-xl font-bold">For Organizers</h3>
            <p className="text-gray-600">Create events and invite vendors.</p>
          </div>
          <div>
            <div className="text-blue-500 mb-4">🍽️</div>
            <h3 className="text-xl font-bold">For Vendors</h3>
            <p className="text-gray-600">
              Showcase your best items to attendees.
            </p>
          </div>
          <div>
            <div className="text-blue-500 mb-4">👥</div>
            <h3 className="text-xl font-bold">For Attendees</h3>
            <p className="text-gray-600">
              Join events and discover new vendors.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 p-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <p>&copy; 2024 Tasting Events</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">
              Home
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
