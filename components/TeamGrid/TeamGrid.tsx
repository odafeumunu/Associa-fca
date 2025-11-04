import Image from "next/image";
import { motion } from "framer-motion";

const teams = [
  { title: "photo 1", image: "/p-1.jpg" },
  { title: "photo 2", image: "/p-2.jpg" },
  { title: "photo 3", image: "/p-3.jpg" },
  { title: "photo 4", image: "/p-4.jpg" },
  { title: "photo 5", image: "/p-5.jpg" },
  { title: "photo 6", image: "/p-6.jpg" },
  { title: "photo 7", image: "/p-7.jpg" },
  { title: "photo 8", image: "/p-8.jpg" },
  { title: "photo 9", image: "/p-9.jpg" },
];

export default function TeamsGrid() {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
      {teams.map((team, index) => (
        <motion.div
          key={index}
          className="rounded-2xl overflow-hidden bg-white h-fit shadow-lg hover:shadow-2xl transition-all"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}>
          <div className="w-full">
            <Image
              src={team.image}
              alt={team.title}
              width={500}
              height={500}
              className="w-full object-cover object-top"
              priority
            />
          </div>
          <div className="py-5 text-center">
            <h2 className="font-bold text-md text-gray-800">{team.title}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
