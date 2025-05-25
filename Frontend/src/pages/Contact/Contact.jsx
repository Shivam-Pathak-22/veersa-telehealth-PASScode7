import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="relative bg-blue-50 py-16 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6981177/pexels-photo-6981177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      ></div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Contact Us</h1>
          <p className="text-lg text-blue-700">
            We'd love to hear from you. Get in touch with us through the form
            below.
          </p>
        </motion.div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 backdrop-blur-md">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-indigo-800 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-indigo-800 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-indigo-800 font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message here..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
