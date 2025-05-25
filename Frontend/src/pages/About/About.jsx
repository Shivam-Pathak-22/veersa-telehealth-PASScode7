import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Award, Users, ChevronDown } from 'lucide-react';
import docImage from '../../assets/doc.jpg';  // Import images directly
import aboutVideo from '../../assets/about.mp4'; // Import videos directly
import doc1 from '../../assets/doc1.jpg';
import doc2 from '../../assets/doc2.jpg';
import doc3 from '../../assets/doc3.jpg';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <motion.div 
      className="bg-gray-50 text-gray-900 min-h-screen" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={aboutVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-white text-5xl font-bold mb-4"
            {...fadeIn}
          >
            About MediQueue
          </motion.h1>
          <motion.p 
            className="text-white text-xl max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Revolutionizing healthcare with cutting-edge technology and compassionate care.
          </motion.p>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-900 text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our mission is to enhance the quality of life in our community through accessible, high-quality healthcare. We are committed to offering personalized care, staying at the forefront of medical advancements, and fostering a supportive and inclusive environment.
            </p>
          </motion.div>

          <div className="text-center mb-12">
            <h2 className="text-blue-900 text-3xl font-bold mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Compassion", icon: Heart, description: "We prioritize empathy and kindness, ensuring every patient feels valued and understood." },
                { title: "Integrity", icon: Shield, description: "We uphold the highest standards of honesty and transparency in all our interactions." },
                { title: "Excellence", icon: Award, description: "We are dedicated to continuous improvement and delivering the best possible outcomes for our patients." },
                { title: "Inclusivity", icon: Users, description: "We believe in providing equitable healthcare to everyone, regardless of their background or circumstances." }
              ].map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="bg-blue-50 p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2 text-blue-900">{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-900 text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              MediQueue was founded with the vision of transforming healthcare into a more personal and approachable experience. From our humble beginnings, we have grown into a trusted healthcare provider by focusing on quality care, patient satisfaction, and community involvement.
            </p>
            <img
              src={docImage}
              alt="MediQueue History"
              className="rounded-lg shadow-lg mx-auto"
              width={600}
              height={400}
            />
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-900 text-3xl font-bold mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Dr. Sarah Johnson", role: "Chief Medical Officer", description: "Over 15 years of experience. Known for her compassionate approach and dedication to patient education.", image: doc1 },
                { name: "Dr. Mark Lee", role: "Pediatric Specialist", description: "A decade of experience. Passionate about providing excellent care for children and supporting families.", image: doc2 },
                { name: "Nurse Emma Davis", role: "Senior Nurse", description: "Extensive experience in patient care. Committed to ensuring every patient receives high-quality, compassionate support.", image: doc3 }
              ].map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="bg-blue-50 p-6 rounded-lg shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full mx-auto mb-4"
                    width={200}
                    height={200}
                  />
                  <h3 className="text-2xl font-semibold mb-2 text-blue-900">{member.name}</h3>
                  <p className="text-blue-700 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join Us in Our Mission
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the MediQueue difference. Schedule your appointment today and take the first step towards better health.
          </motion.p>
          <motion.a
            href="#book-appointment"
            className="bg-white text-blue-900 py-3 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 inline-flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Book an Appointment
            <ChevronDown className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </section>
    </motion.div>
  )
}

export default About;
