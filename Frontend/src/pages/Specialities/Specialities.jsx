'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, Stethoscope, Bone, Activity, UserPlus, Smile, Eye, Baby, Thermometer, Microscope, Droplets, Dna, Syringe, Droplet, Pill, Scissors, Ear } from 'lucide-react'

const specialities = [
  { name: 'Cardiology', icon: Heart, color: 'text-red-500' },
  { name: 'Neurology', icon: Brain, color: 'text-purple-500' },
  { name: 'Gastroenterology', icon: Stethoscope, color: 'text-yellow-500' },
  { name: 'Orthopedic', icon: Bone, color: 'text-gray-500' },
  { name: 'Oncology', icon: Activity, color: 'text-pink-500' },
  { name: 'Gynecology', icon: UserPlus, color: 'text-indigo-500' },
  { name: 'Dermatology', icon: Smile, color: 'text-orange-500' },
  { name: 'Ophthalmology', icon: Eye, color: 'text-blue-500' },
  { name: 'Pediatrics', icon: Baby, color: 'text-green-500' },
  { name: 'Endocrinology', icon: Thermometer, color: 'text-teal-500' },
  { name: 'Urology', icon: Microscope, color: 'text-cyan-500' },
  { name: 'Nephrology', icon: Droplets, color: 'text-red-400' },
  { name: 'Pulmonology', icon: Stethoscope, color: 'text-blue-400' },
  { name: 'Rheumatology', icon: Bone, color: 'text-green-400' },
  { name: 'Neurosurgery', icon: Brain, color: 'text-purple-400' },
  { name: 'Radiology', icon: Dna, color: 'text-yellow-400' },
  { name: 'Plastic Surgery', icon: Syringe, color: 'text-pink-400' },
  { name: 'Neonatology', icon: Baby, color: 'text-blue-300' },
  { name: 'Vascular Surgery', icon: Droplet, color: 'text-red-300' },
  { name: 'Psychiatry', icon: Brain, color: 'text-indigo-400' },
  { name: 'Dentistry', icon: Smile, color: 'text-cyan-500' },
  { name: 'ENT (Ear, Nose, Throat)', icon: Ear, color: 'text-orange-400' }
]

export default function Specialities() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Centres of Clinical Excellence</h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Discover our world-class specialities, where cutting-edge technology meets compassionate care.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {specialities.slice(0, 5).map((speciality, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                  <speciality.icon className={`w-10 h-10 ${speciality.color}`} />
                </div>
                <p className="text-sm font-medium">{speciality.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Explore our Specialities
          </motion.h2>
          <motion.p 
            className="text-lg text-center mb-16 max-w-3xl mx-auto text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            MediQueue has dedicated Centres of Excellence for several key specialities and super specialities. Each centre stands out as a citadel of world-class clinical outcomes, equipped with state-of-the-art facilities and staffed by expert professionals.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {specialities.map((speciality, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05, backgroundColor: '#EBF4FF' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={`p-4 rounded-full mb-4 ${speciality.color.replace('text-', 'bg-').replace('500', '100').replace('400', '100').replace('300', '100')}`}>
                  <speciality.icon className={`w-10 h-10 ${speciality.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-800">{speciality.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Experience World-Class Healthcare
          </motion.h2>
          <motion.p 
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our team of expert specialists is ready to provide you with personalized care. Schedule your consultation today and take the first step towards better health.
          </motion.p>
          <motion.button
            className="bg-white text-blue-900 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.95 }}
          >
            Book an Appointment
          </motion.button>
        </div>
      </section>
    </div> 
  )
}
