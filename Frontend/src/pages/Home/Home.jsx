'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Activity, Users, Building2, Heart, Clock, Leaf } from 'lucide-react'
import hospitalVideo from '../../assets/hospital-background.mp4'; // Ensure this path is correct
import {
  FaUserMd,
  FaHospitalAlt,
  FaHandsHelping,
  FaHeadset,
  FaHeart,
  FaAward,
} from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hospitalVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-nocolor-600 bg-opacity-60 z-0"></div>
        <div className="relative z-10 text-center px-4 flex flex-col justify-center items-center h-full">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            Welcome to Our Health System
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-8 text-white opacity-90 max-w-3xl mx-auto"
          >
            Providing comprehensive healthcare solutions to ensure your well-being.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            href="#features"
            className="bg-white text-blue-900 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition transform duration-300 flex items-center"
          >
            Learn More
            <ChevronDown className="ml-2" />
          </motion.a>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Key Services
          </h2>
          <p className="text-gray-700">
            Providing a wide range of specialized services to ensure your health
            and well-being.
          </p>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUserMd className="text-5xl text-blue-800 mb-4" />,
              title: 'Expert Medical Staff',
              description:
                'Our team of professionals are leaders in their fields, providing top-quality medical care.',
              backgroundImage:
                "url('https://images.pexels.com/photos/5452221/pexels-photo-5452221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
            {
              icon: <FaHospitalAlt className="text-5xl text-blue-800 mb-4" />,
              title: 'Advanced Facilities',
              description:
                'State-of-the-art medical equipment and facilities to ensure the best possible outcomes.',
              backgroundImage:
                "url('https://images.pexels.com/photos/9574539/pexels-photo-9574539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
            {
              icon: <FaHandsHelping className="text-5xl text-blue-800 mb-4" />,
              title: 'Patient-Centered Care',
              description:
                'Focused on personalized care, making sure every patient feels valued and understood.',
              backgroundImage:
                "url('https://images.pexels.com/photos/5214998/pexels-photo-5214998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
            {
              icon: <FaHeart className="text-5xl text-blue-800 mb-4" />,
              title: 'Comprehensive Cardiac Care',
              description:
                'From preventive measures to advanced surgeries, our cardiac care is unmatched.',
              backgroundImage:
                "url('https://images.pexels.com/photos/5934419/pexels-photo-5934419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
            {
              icon: <FaHeadset className="text-5xl text-blue-800 mb-4" />,
              title: '24/7 Emergency Services',
              description:
                'Round-the-clock emergency services with swift response and expert care.',
              backgroundImage:
                "url('https://images.pexels.com/photos/6129194/pexels-photo-6129194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
            {
              icon: <FaAward className="text-5xl text-blue-800 mb-4" />,
              title: 'Accreditations & Awards',
              description:
                'Recognized globally for our commitment to healthcare excellence and patient satisfaction.',
              backgroundImage:
                "url('https://images.pexels.com/photos/6565250/pexels-photo-6565250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white bg-cover bg-center p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center relative"
              style={{ backgroundImage: service.backgroundImage }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-45 rounded-lg"></div>
              <div className="relative z-10">
                {service.icon}
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="bg-cover bg-center text-white py-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6787056/pexels-photo-6787056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">What Our Patients Say</h2>
          <p className="text-black text-lg">
            Trusted by thousands of patients, hear their stories of care and
            healing at Medique Hospital.
          </p>
        </div>
        <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'John Doe',
              feedback:
                'The doctors were incredibly attentive and skilled. I felt cared for every step of the way.',
            },
            {
              name: 'Sarah Lee',
              feedback:
                'The facilities are top-notch, and the staff made sure I was comfortable at all times.',
            },
            {
              name: 'Michael Smith',
              feedback:
                'A wonderful experience with dedicated professionals who truly understand patient care.',
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-gray-900"
            >
              <p className="text-lg italic mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-semibold text-blue-800">
                {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-cover bg-center text-center relative">
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Experience Top-Notch Healthcare?
          </h2>
          <p className="text-lg text-black mb-8">
            Get in touch with us today or book an appointment online.
          </p>
          <a
            href="contact"
            className="bg-blue-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-500 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 Medique Hospital. All Rights Reserved.</p>
          <p className="mt-2">
            1234 Healthcare Blvd, City, Country | Phone: +123 456 7890 | Email:
            contact@mediquehospital.com
          </p>
        </div>
      </footer>
    </div>
  )
}
