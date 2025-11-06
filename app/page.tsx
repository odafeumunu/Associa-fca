"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  Trophy,
  Users,
  Shield,
  Goal,
  Rocket,
  Coins,
  Calendar,
  Shirt,
  Heart,
  Target,
  Eye,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import FloatingSocialMenu from "@/components/FloatingSocialMenu/FloatingSocialMenu";
import Gallery from "@/components/Gallery/Gallery";
import Footer from "@/components/Footer/Footer";

const categories = [
  {
    level: "U10",
    description:
      "Focused on fun, coordination, and fundamental ball control for our youngest players.",
    icon: Trophy,
  },
  {
    level: "U13",
    description:
      "Developing teamwork, discipline, and technical awareness through structured training.",
    icon: Users,
  },
  {
    level: "U15",
    description:
      "Building tactical understanding, stamina, and positional play for competitive performance.",
    icon: Shield,
  },
  {
    level: "U17",
    description:
      "Sharpening advanced technical skills and preparing players for elite youth competitions.",
    icon: Goal,
  },
  {
    level: "U20",
    description:
      "Bridging the gap to professional football with high-intensity training and leadership focus.",
    icon: Rocket,
  },
];

const fees = [
  { type: "Registration (per level)", amount: "₦25,000", icon: Coins },
  { type: "Annual Training & Coaching Fee", amount: "₦40,000", icon: Calendar },
  { type: "Kit Fee (Jersey, Shorts, Socks)", amount: "₦35,000", icon: Shirt },
  { type: "Insurance (NHIS Partnership)", amount: "₦10,000", icon: Heart },
  { type: "Tournament & League Levy", amount: "₦15,000", icon: Trophy },
];



export default function HomePage() {
  return (
    <>
      <FloatingSocialMenu />
      <Header />
      <div
        id="home"
        className="px-5 relative h-[calc(100vh-80px)] text-center flex items-center justify-center md:pb-15 sm:pb-0">
        <div className="absolute top-0 left-0 w-full h-full -z-1">
          <div className="relative w-full h-full">
            <Image
              src="/hero.jpg"
              alt="Clube Image"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(12,31,32,0.8)]" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <h1 className="max-w-2xl mx-auto text-4xl md:text-6xl leading-snug uppercase text-white font-bold">
            Associa Football{" "}
            <span className="text-lime-500">Club & Academy</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-5 text-sm md:text-lg text-white">
            Nurturing young football talents across Nigeria and Africa with
            discipline and excellence.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#about">
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-2">
                Explore
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600">
                Join Now
                <UserPlus size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="px-5 md:px-20 py-25 text-center">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          About Us
        </h1>
        <motion.p
          className="max-w-2xl mx-auto text-sm md:text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          Associa Football Club & Academy Limited (Associa FCA) formerly Seaman
          FC is a premier football development institution dedicated to
          nurturing young talents across Nigeria and Africa. <br />
          <br /> We operate both male and female football categories, providing
          a structured pathway from grassroots to professional level. With a
          focus on discipline, technical skills, tactical awareness, and
          physical fitness, Associa FCA aims to produce players who can compete
          at the highest national and international levels.
          <br />
          <br />
          Through our partnership with the National Health Insurance Scheme
          (NHIS), all registered players enjoy basic health insurance coverage,
          ensuring their well-being on and off the field.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <Link href="/about">
            <Button size="lg" className="bg-sky-900 hover:bg-sky-800">
              See More
            </Button>
          </Link>
        </motion.div>

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

      <div id="categories" className="px-5 md:px-20 py-25 text-center bg-white">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Club Categories
        </h1>
        <p className="max-w-2xl mx-auto text-grey-600 text-sm md:text-lg">
          Associa FCA operates in both male and female divisions, with age
          grades for:
        </p>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                className="rounded-md border flex flex-col items-center py-7 px-4 bg-white shadow-lg hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <div className="w-15 h-15 bg-sky-100 rounded-full flex items-center justify-center">
                  <Icon size={28} className="text-sky-900" />
                </div>
                <h2 className="text-2xl font-bold my-6">{cat.level}</h2>
                <p className="text-sm md:text-lg text-gray-600">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div id="gallery" className="px-5 md:px-20 py-25 text-center">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Image Gallery
        </h1>
        <Gallery />
      </div>

      <div id="fees" className="px-5 md:px-20 py-25 text-center bg-white">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Fees Structure
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8 text-sm md:text-lg">
          Fees are applicable to both male and female categories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {fees.map((fee, index) => {
            const Icon = fee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center justify-between hover:shadow-2xl transition">
                <div className="w-13 h-13 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <Icon size={28} className="text-sky-900" />
                </div>
                <h2 className="font-semibold text-lg text-gray-800 text-center">
                  {fee.type}
                </h2>
                <p className="mt-4 text-2xl font-bold text-sky-900">
                  {fee.amount}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-13 bg-sky-900  text-white py-5 px-8 rounded-md inline-block shadow-lg animate-bounce">
          <h2 className="text-xl md:text-1xl font-bold">
            Total Initial Payment:{" "}
            <span className="text-lime-300">₦125,000</span>
          </h2>
        </motion.div>
      </div>

      <div id="partnership" className="px-5 md:px-20 py-25 text-center">
        <h1 className="text-sky-900 text-3xl md:text-4xl font-bold mb-10">
          Partnerships
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8 text-sm md:text-lg">
          Here are some of our partners
        </p>

        <div className="h-24 bg-white flex items-center justify-center">
          <Marquee speed={100}>
            <div className="flex items-center gap-16">
              {/* Replace text with logos using Next.js Image component */}
              {["/nhis.png", "/nhis.png", "/nhis.png"].map((src, index) => (
                <div
                  key={index}
                  className="flex shrink-0 justify-center items-center w-[120px]">
                  <Image
                    src={src}
                    alt={`Logo ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      
      <Footer />
    </>
  );
}
