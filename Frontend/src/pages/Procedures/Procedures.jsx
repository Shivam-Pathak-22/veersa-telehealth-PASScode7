'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, MessageCircle, FileText } from 'lucide-react'

const features = [
  {
    name: 'Video Consultations',
    description: 'Connect with doctors via secure, high-definition video calls from the comfort of your home.',
    icon: Video,
    color: 'text-blue-500 bg-blue-100',
  },
  {
    name: 'Instant Chat',
    description: 'Get real-time support and answers through instant messaging with our medical team.',
    icon: MessageCircle,
    color: 'text-green-500 bg-green-100',
  },
  {
    name: 'AI Transcriptions',
    description: 'All your consultations are transcribed automatically so you never miss important advice.',
    icon: FileText,
    color: 'text-purple-500 bg-purple-100',
  },
]

export default function TelehealthSolutions() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionizing Healthcare with Telehealth</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Seamlessly consult with doctors via video, chat, and smart transcriptions — all from your device.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Telehealth Solutions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`p-4 rounded-full mb-4 ${feature.color}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.name}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Talk to a Doctor?
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule your first telehealth consultation and experience healthcare that comes to you.
          </motion.p>
          <Link to="/contact">
            <motion.button
              className="bg-white text-blue-900 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Consultation
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
