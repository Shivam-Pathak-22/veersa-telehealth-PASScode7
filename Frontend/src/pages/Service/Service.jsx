import React from 'react';
import { motion } from 'framer-motion';

function Service() {
  return (
    <motion.div
      className="bg-gray-50 min-h-screen p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/7252084/pexels-photo-7252084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          opacity: 40,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto mt-6 text-center">
        {/* Title Section with animation */}
        <motion.h1
          className="text-4xl font-bold text-white mb-8 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-lg text-white mb-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          At MyClinic, we offer a wide range of services designed to meet the healthcare needs of our community. Our expert team is dedicated to providing high-quality, personalized care to ensure your well-being.
        </motion.p>

        {/* Services Grid with animated cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Primary Care</h2>
            <p className="text-gray-600">
              Our primary care services are designed to provide comprehensive and continuous care for individuals and families. We focus on preventive care, routine check-ups, and managing chronic conditions.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Specialist Care</h2>
            <p className="text-gray-600">
              We offer access to a network of specialists who provide expert consultations and advanced treatments for complex health issues. Our goal is to ensure you receive the best care tailored to your needs.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Pediatric Care</h2>
            <p className="text-gray-600">
              Our pediatric care services are focused on the health and development of children from infancy through adolescence. We provide routine exams, immunizations, and treatment for common childhood illnesses.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Women's Health</h2>
            <p className="text-gray-600">
              Our women's health services address a range of needs from routine gynecological exams to specialized care. We aim to support women's health through every stage of life with empathy and expertise.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Mental Health Services</h2>
            <p className="text-gray-600">
              We provide mental health services to support emotional well-being and address various mental health concerns. Our team is dedicated to offering counseling and therapy in a supportive environment.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Diagnostic Services</h2>
            <p className="text-gray-600">
              Our diagnostic services include a range of tests and screenings to accurately diagnose and monitor various health conditions. We use advanced technology to ensure precise results.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Service;
