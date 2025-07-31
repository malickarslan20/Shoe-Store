import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add actual sending logic here

    toast.success('Message sent successfully!', {
      position: 'top-center',
      autoClose: 3000,
    });

    e.target.reset(); // Clear the form
  };

  return (
    <div className=" py-12 px-4 md:px-20 relative z-10">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl"
        style={{ boxShadow: '0 10px 20px rgba(255, 0, 0, 0.15)' }}
      >
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">Contact Us</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Type your message..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
