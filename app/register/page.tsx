"use client";

import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // ✅ Sonner uses this simple import
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/lib/store";
import api from "@/lib/axios";
import { endpoints } from "@/config/endpoints";
import { useRouter } from "next/navigation";  // Import useRouter

import { stepSchemas } from "./schema";

import StepAPlayerInfo from "./components/StepAPlayerInfo";
import StepBEducation from "./components/StepBEducation";
import StepCHealth from "./components/StepCHealth";
import StepDParent from "./components/StepDParent";
import StepEEmergency from "./components/StepEEmergency";
import StepFConsent from "./components/StepFConsent";

import type { PlayerFormData } from "./schema"; // ✅ import your schema type
import Header from "@/components/Header/Header";

// ✅ Define steps
const steps = [
  StepAPlayerInfo,
  StepBEducation,
  StepCHealth,
  StepDParent,
  StepEEmergency,
  StepFConsent,
];

export default function RegisterPage() {
  const { step, nextStep, prevStep, data, reset } = useFormStore();
  const CurrentStep = steps[step];
  const router = useRouter(); // Initialize router for navigation

  // ✅ Type-safe mutation function
  const mutation = useMutation({
    mutationFn: async (
      formData: PlayerFormData
    ): Promise<{ success: boolean }> => {
      console.log("Sending to API:", formData);

      try {
        // Send request to the `register_player` endpoint using Axios
        const res = await api.post(
          endpoints.Register.register_player, // Use the endpoint URL from your constants
          formData,
          { headers: { "Content-Type": "application/json" } } // Ensure content-type is set
        );

        // Check for a successful response
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Failed to submit");
        }

        return res.data; // Return the data from the response
      } catch (error) {
        // Handle error
        console.error("Error while submitting form:", error);
        throw new Error(
          error instanceof Error ? error.message : "Something went wrong."
        );
      }
    },

    onSuccess: () => {
      toast.success("Registration Successful 🎉", {
        description: "Your registration has been received!",
      });
      reset();
      router.push("/"); // Navigate to the homepage after success
    },

    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error("Error", {
        description: message,
      });
    },
  });

  // ✅ Progress percentage
  const percent = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    const schema = stepSchemas[step];
    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        console.log(`Field: ${issue.path.join(".")}, Error: ${issue.message}`);
      });

      toast.error("Please fix errors before continuing");
      return;
    }

    nextStep();
  };

  return (
    <div className="px-5 mx-auto max-w-2xl py-10">
      <Header />
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={percent} className="h-2" />
        <p className="text-sm text-gray-500 text-right mt-2">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        <CurrentStep />
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={step === 0}>
          Back
        </Button>
        {step === steps.length - 1 ? (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => mutation.mutate(data as PlayerFormData)}
            disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
