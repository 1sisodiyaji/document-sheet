import React from 'react'
import { motion } from "framer-motion";
import Accordion from '../../../common/Accordion';


const FAQ = () => {
  return (
    <>
    <h1 className='text-center text-3xl font-semibold'>FAQ</h1>
    <div className="my-12 md:py-0 py-12 p-1 md:max-w-7xl mx-auto">
      
        <motion.section
          className="md:space-y-12 space-y-6"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {/* First row of accordions */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-between items-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Accordion heading="How does Document Sheet ensure the security of my documents?" content="As per our security you will get an QR code to get your receipt and access the document." />
            <Accordion heading="Can I access my documents from any other device?" content="Yes, you can access the data from any device via our website and the QR code feature." />
          </motion.div>

          {/* Second row of accordions */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-between items-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Accordion heading="What types of documents can I create with Document Sheet?" content="You can create your Document Sheet and validate the document via the website." />
            <Accordion heading="How do I retrieve my document information using the QR code?" content="Yes, you can retrieve the QR code data by simply scanning the QR code and visiting the website to get the data." />
          </motion.div>
        </motion.section>
      </div>
    </>
  )
}

export default FAQ