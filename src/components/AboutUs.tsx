import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#001529]">About ProductHub</h1>
        <p className="text-lg mb-10 text-gray-600">
          At <strong>ProductHub</strong>, we are committed to delivering the best product discovery and management experience for businesses and consumers alike. Whether you’re looking for the latest tech gadgets, lifestyle essentials, or managing your inventory, we’ve got you covered.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-100 p-6 rounded shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-[#001529]">Our Mission</h3>
            <p className="text-sm text-gray-700">
              To simplify and enrich the way people discover and manage products online through innovation and user-focused design.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-[#001529]">Our Vision</h3>
            <p className="text-sm text-gray-700">
              Building the most reliable, feature-rich product management ecosystem that scales with your needs and supports your goals.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-[#001529]">Why Choose Us?</h3>
            <p className="text-sm text-gray-700">
              Our platform is designed with performance, user experience, and flexibility in mind. Trusted by users across industries.
            </p>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Got questions? <a href="/contact" className="text-[#001529] font-medium hover:underline">Contact us</a> anytime.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
