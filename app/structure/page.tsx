"use client";

import Header from "@/components/Header/Header";
import { Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import FloatingSocialMenu from "@/components/FloatingSocialMenu/FloatingSocialMenu";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function AboutPage() {
  return (
    <>
      <FloatingSocialMenu />
      <Header />

      <div className="px-5 md:px-20 py-25">
        <h1 className="max-w-3xl mx-auto text-sky-900 text-3xl md:text-4xl text-center font-bold mb-10">
          Chairman and Founder, Associa Football Club and Academy (ASSOCIA FCA)
        </h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto px-5 md:px-20 py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}>
          {/* Left Image */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/chairman.jpg" // replace with your image path
              alt="Football Academy"
              width={500} // adjust as needed
              height={500} // maintain aspect ratio
              className="rounded-lg object-cover"
            />
          </div>

          {/* Right Text */}
          <div>
            <p className="text-sm md:text-lg text-gray-600 text">
              Dr. Adeyeye Adekunle Eniola is a visionary leader, educator, and
              sports enthusiast who serves as the Chairman and Founder of
              Associa Football Club and Academy (ASSOCIA FCA) — an institution
              committed to nurturing young talents, instilling discipline, and
              building champions both on and off the field.
              <br />
              <br />
              Driven by his lifelong passion for youth development, education,
              and sports, Adeyeye established ASSOCIA FCA to create
              opportunities for young people to discover and refine their
              potential through football. His belief that sports and education
              go hand in hand inspired him to design an academy that not only
              trains professional athletes but also cultivates character,
              leadership, and academic excellence.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 md:px-20 py-25 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <div className="w-15 h-15 bg-sky-100 rounded-full flex items-center justify-center">
              <Eye size={30} className="text-sky-900" />
            </div>
            <h2 className="text-2xl font-bold my-6">Vision</h2>
            <p className="text-sm md:text-lg text-gray-600">
              Under Adeyeye’s leadership, ASSOCIA FCA carries the proud motto
              “Building Champions.” This vision reflects his commitment to
              raising a new generation of players who will excel not just in the
              game but in life — champions of integrity, teamwork, and
              determination.
            </p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <div className="w-15 h-15 bg-sky-100 rounded-full flex items-center justify-center">
              <Target size={30} className="text-sky-900" />
            </div>
            <h2 className="text-2xl font-bold my-6">Mission</h2>
            <p className="text-sm md:text-lg text-gray-600">
              His dream is to build a world-class football academy that competes
              at the national and international levels while remaining rooted in
              community values. Adeyeye envisions ASSOCIA FCA as a platform
              where young boys and girls can access professional training,
              quality mentorship, and academic guidance — preparing them for
              careers in football, sports management, and other related fields.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-5 md:px-20 py-25 text-center">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Leadership and Development Goals
        </h1>
        <motion.p
          className="max-w-2xl mx-auto text-sm md:text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          As Chairman, Adeyeye Dr. Adekunle Eniola is focused on achieving
          several key goals for ASSOCIA FCA, including: Developing
          state-of-the-art training facilities equipped with modern football
          infrastructure. Establishing youth academies and feeder teams across
          Nigeria to identify and nurture raw talent from the grassroots.
          Partnering with educational institutions to ensure players receive a
          balanced blend of sports and academics. Creating international
          exchange programs that expose young players to global football
          standards and opportunities. Building community impact initiatives
          that promote discipline, teamwork, and moral values through sports.{" "}
          <br />
          <br /> Dr. Adeyeye’s leadership style is defined by vision,
          discipline, and mentorship. His background in education and youth
          empowerment provides a strong foundation for the academy’s holistic
          approach — combining athletic development with personal growth and
          academic responsibility. He believes that football can be a powerful
          tool for social transformation, and through ASSOCIA FCA, he hopes to
          inspire countless young people to rise above challenges, embrace their
          potential, and pursue excellence with passion and integrity.
          <br />
          <br />
          Dr. Adeyeye Adekunle Eniola’s ultimate goal is to see ASSOCIA FCA
          evolve into one of Africa’s leading football academies — a symbol of
          hope, excellence, and opportunity for talented youths across the
          continent. With a clear vision, unwavering commitment, and a heart for
          youth development, he continues to drive the academy toward building
          champions for the game and for life.
        </motion.p>
      </div>

      <div id="structure" className="px-5 md:px-20 py-25 bg-white">
        <h1 className="text-sky-900 text-3xl md:text-4xl text-center font-bold mb-10">
          Organisational Structure
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Accordion
            type="single"
            collapsible
            className="w-full border px-5 rounded-2xl shadow-sm"
            defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold hover:no-underline cursor-pointer">
                Board of Directors
              </AccordionTrigger>

              <AccordionContent>
                Oversees the organization’s strategic direction and ensures
                accountability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold hover:no-underline cursor-pointer">
                Executive Management
              </AccordionTrigger>

              <AccordionContent>
                Manages daily operations and implements the Board’s strategies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold hover:no-underline cursor-pointer">
                Technical Department
              </AccordionTrigger>

              <AccordionContent>
                Develops players, coaches teams, and manages training programs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold hover:no-underline cursor-pointer">
                Support Services
              </AccordionTrigger>

              <AccordionContent>
                Provides administrative, medical, and operational support to the
                organization.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
