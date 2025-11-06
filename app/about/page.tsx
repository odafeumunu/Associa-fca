"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  Target,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import FloatingSocialMenu from "@/components/FloatingSocialMenu/FloatingSocialMenu";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";



export default function AboutPage() {
  return (
    <>
      <FloatingSocialMenu />
      <Header />

      <div id="about" className="px-5 md:px-20 py-25 text-center">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Associa Football Club and Academy
        </h1>
        <motion.p
          className="max-w-2xl mx-auto text-sm md:text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}>
          Associa Football Club & Academy Limited (Associa FCA), formerly Seaman
          FC, is a premier football development institution dedicated to
          nurturing young talents across Nigeria and Africa. Our mission is to
          identify, train, and mentor players who demonstrate passion,
          discipline, and a strong desire to excel in football, while also
          fostering their personal growth and academic development. <br />
          <br />
          We operate both male and female football categories, providing a
          structured pathway from grassroots to professional level. With a focus
          on discipline, technical skills, tactical awareness, and physical
          fitness, Associa FCA aims to produce players who can compete at the
          highest national and international levels. Beyond technical training,
          we instill values such as teamwork, leadership, and resilience to
          prepare our players for life on and off the pitch. <br />
          <br />
          Through our partnership with the National Health Insurance Scheme
          (NHIS), all registered players enjoy basic health insurance coverage,
          ensuring their well-being on and off the field. Additionally, we
          organize regular community outreach programs, football clinics, and
          educational workshops to empower young athletes and engage the wider
          community in the growth of football. At Associa FCA, we believe in
          creating a holistic environment that supports athletic excellence,
          personal development, and lifelong success.
        </motion.p>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <div className="w-15 h-15 bg-sky-1010 rounded-full flex items-center justify-center">
              <Target size={30} className="text-sky-900" />
            </div>
            <h2 className="text-2xl font-bold my-6">Our Mission</h2>
            <p className="text-sm md:text-lg text-gray-600">
              To discover and develop young football talents in both male and
              female categories. To provide professional coaching, mentoring,
              and life skills training. To create opportunities for players to
              participate in local and international competitions.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <div className="w-15 h-15 bg-sky10100 rounded-full flex items-center justify-center">
              <Eye size={30} className="text-sky-900" />
            </div>
            <h2 className="text-2xl font-bold my-6">Our Vision</h2>
            <p className="text-sm md:text-lg text-gray-600">
              To be a leading football academy in Africa, producing world-class
              players of impeccable skill, discipline, and character.
            </p>
          </motion.div>
        </div>
      </div>

      <div id="gallery" className="px-5 md:px-20 py-25 text-center bg-white">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Image Gallery
        </h1>
        <Gallery />
      </div>

      <Footer />
    </>
  );
}
