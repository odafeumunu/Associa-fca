"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header/Header";
import Image from "next/image";
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
} from "lucide-react";
import { motion } from "framer-motion";
import TeamsGrid from "@/components/TeamGrid/TeamGrid";
import ResponsiveSwiper from "@/components/ui/ResponsiveSwiper";

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

const directors = [
  { name: "John Doe", position: "Chairman", img: "/p-10.jpg" },
  { name: "Samuel King", position: "Vice Chairman", img: "/p-10.jpg" },
  { name: "Alex Brown", position: "Secretary", img: "/p-10.jpg" },
  { name: "John Doe", position: "Chairman", img: "/p-10.jpg" },
];

const executives = [
  { name: "John Doe", position: "Chief Executive Officer (CEO)", img: "/p-10.jpg" },
  { name: "Samuel King", position: "Club Manager", img: "/p-10.jpg" },
  { name: "Alex Brown", position: "Director of Football Operations", img: "/p-10.jpg" },
  { name: "Johnson Mann", position: "Finance & Administration Officer", img: "/p-10.jpg" },
];

const technicals = [
  { name: "John Doe", position: "Head Coach (Male)", img: "/p-10.jpg" },
  { name: "Samuel King", position: "Head Coach (Female)", img: "/p-10.jpg" },
  { name: "Alex Brown", position: "Assistant Coaches (per age grade)", img: "/p-10.jpg" },
  { name: "Johnson Mann", position: "Fitness Trainer", img: "/p-10.jpg" },
  { name: "Bill Gate", position: "Goalkeeper Trainer", img: "/p-10.jpg" },
  { name: "Lawson Hull", position: "Medical Officer / Physiotherapist", img: "/p-10.jpg" },
];

const supports = [
  { name: "John Doe", position: "Scouting & Talent Development Officer", img: "/p-10.jpg" },
  { name: "Samuel King", position: "Media & Communications Officer", img: "/p-10.jpg" },
  { name: "Alex Brown", position: "Logistics & Welfare Officer", img: "/p-10.jpg" },
];



export default function HomePage() {
  return (
    <>
      <Header />
      <div
        id="home"
        className="relative h-[calc(100vh-80px)] text-center flex items-center md:items-end justify-center md:pb-15 sm:pb-0">
        <div className="px-0 md:px-5 absolute top-0 left-0 w-full h-full -z-1 pt-0 md:pt-5">
          <div className="relative w-full h-full">
            <Image
              src="/hero.jpg"
              alt="Clube Image"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)]" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Associa Football Club & Academy
          </h1>
          <p className="max-w-2xl mx-auto my-5 text-white">
            Nurturing young football talents across Nigeria and Africa with
            discipline and excellence.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Join Now
            </Button>
          </Link>
        </motion.div>
      </div>

      <div id="about" className="px-5 py-25 text-center">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
          About Us
        </h1>
        <motion.p
          className="max-w-2xl mx-auto text-gray-600 mb-8"
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

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <div className="w-15 h-15 bg-blue-50 rounded-full flex items-center justify-center">
              <Target size={30} className="text-blue-500" />
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
            <div className="w-15 h-15 bg-blue-50 rounded-full flex items-center justify-center">
              <Eye size={30} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold my-6">Our Vision</h2>
            <p className="text-sm md:text-lg text-gray-600">
              To be a leading football academy in Africa, producing world-class
              players of impeccable skill, discipline, and character.
            </p>
          </motion.div>
        </div>
      </div>

      <div id="categories" className="px-5 py-25 text-center bg-white">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
          Club Categories
        </h1>
        <p className="max-w-2xl mx-auto text-grey-600">
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
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon size={30} className="text-blue-500" />
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

      <div id="gallery" className="px-5 py-25 text-center">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
          Image Gallery
        </h1>
        <TeamsGrid />
      </div>

      <div id="fees" className="px-5 py-25 text-center bg-white">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
          Fees Structure
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
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
                <div className="w-13 h-13 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Icon size={28} className="text-blue-500" />
                </div>
                <h2 className="font-semibold text-lg text-gray-800 text-center">
                  {fee.type}
                </h2>
                <p className="mt-4 text-2xl font-bold text-blue-500">
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
          className="mt-13 bg-blue-500  text-white py-5 px-8 rounded-md inline-block shadow-lg animate-bounce">
          <h2 className="text-xl md:text-1xl font-bold">
            Total Initial Payment:{" "}
            <span className="text-yellow-300">₦125,000</span>
          </h2>
        </motion.div>
      </div>

      <div id="partnership" className="px-5 py-25 text-center">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
          Partnerships
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Here are some photos
        </p>
      </div>

      <div id="structure" className="px-5 py-25 text-center bg-white">
        <h1 className="text-blue-500 text-3xl md:text-4xl font-bold mb-10">
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
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold mb-10 hover:no-underline cursor-pointer">
                Board of Directors
              </AccordionTrigger>

              <AccordionContent className="pt-5">
                <ResponsiveSwiper
                  items={directors}
                  autoplayDelay={3000}
                  renderItem={(item) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="w-full">
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={500}
                          height={500} 
                          className="w-full h-auto object-cover object-top"
                          priority
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h2 className="font-bold text-lg text-blue-600">
                          {item.name}
                        </h2>
                        <p className="text-gray-500">{item.position}</p>
                      </div>
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold mb-10 hover:no-underline cursor-pointer">
                Executive Management
              </AccordionTrigger>

              <AccordionContent className="pt-5">
                <ResponsiveSwiper
                  items={executives}
                  autoplayDelay={3000}
                  renderItem={(item) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="w-full">
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={500}
                          height={500} 
                          className="w-full h-auto object-cover object-top"
                          priority
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h2 className="font-bold text-lg text-blue-600">
                          {item.name}
                        </h2>
                        <p className="text-gray-500">{item.position}</p>
                      </div>
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold mb-10 hover:no-underline cursor-pointer">
                Technical Department
              </AccordionTrigger>

              <AccordionContent className="pt-5">
                <ResponsiveSwiper
                  items={technicals}
                  autoplayDelay={3000}
                  renderItem={(item) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="w-full">
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={500}
                          height={500} 
                          className="w-full h-auto object-cover object-top"
                          priority
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h2 className="font-bold text-lg text-blue-600">
                          {item.name}
                        </h2>
                        <p className="text-gray-500">{item.position}</p>
                      </div>
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-1xl md:text-2xl font-bold mb-10 hover:no-underline cursor-pointer">
                Support Services
              </AccordionTrigger>

              <AccordionContent className="pt-5">
                <ResponsiveSwiper
                  items={supports}
                  autoplayDelay={3000}
                  renderItem={(item) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="w-full">
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={500}
                          height={500} 
                          className="w-full h-auto object-cover object-top"
                          priority
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h2 className="font-bold text-lg text-blue-600">
                          {item.name}
                        </h2>
                        <p className="text-gray-500">{item.position}</p>
                      </div>
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>

      <footer className="bg-black text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Associa Football Club & Academy Limited.
          All rights reserved.
        </p>
      </footer>
    </>
  );
}
