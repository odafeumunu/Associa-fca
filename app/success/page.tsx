"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if registration flag exists in sessionStorage
    const isRegistered = sessionStorage.getItem("isRegistered");

    // If no registration success flag, redirect to home page
    if (!isRegistered) {
      router.push("/"); // Redirect to home page (or registration page)
    }
  }, [router]);

  return (
    <div className="px-5 md:px-20 h-screen flex items-center justify-center">
      <div className="md:bg-white md:p-8 md:rounded-lg md:shadow-lg max-w-lg w-full text-center">
        {/* Animated checkmark above the header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block">
          <CheckCircle className="text-teal-400 w-12 h-12 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-semibold text-teal-400 mb-4">
          Registration Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You have successfully registered. Welcome to the community!
        </p>
        <Link
          href="/"
          className="bg-teal-400 text-white py-2 px-6 rounded-full text-lg hover:bg-teal-500 transition inline-flex items-center gap-4">
          <Home size={20} /> Go to Home Page
        </Link>
      </div>
    </div>
  );
}
