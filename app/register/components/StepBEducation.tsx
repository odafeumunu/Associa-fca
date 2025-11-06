"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EducationSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/lib/store";
import debounce from "lodash.debounce";

type FormData = z.infer<typeof EducationSchema>;

export default function StepBEducation() {
  const { updateData, data: formData } = useFormStore();
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  // Initialize the form with default values, or load from localStorage if available
  const form = useForm<FormData>({
    resolver: zodResolver(EducationSchema),
    defaultValues: formData || {
      current_school: "",
      current_class: "",
      highest_qualification: "",
    },
  });

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("educationFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      form.reset(parsedData);
    }
    setLocalDataLoaded(true);
  }, [form]);

  // Debounced auto-save to localStorage and Zustand store
  useEffect(() => {
    if (!localDataLoaded) return; // Prevent auto-save before data is loaded

    const subscription = form.watch(
      debounce((values: FormData) => {
        // Save form data to Zustand
        updateData(values);

        // Save form data to localStorage
        localStorage.setItem("educationFormData", JSON.stringify(values));
      }, 400)
    );

    return () => subscription.unsubscribe();
  }, [form, updateData, localDataLoaded]);

  return (
    <div className="space-y-6 md:bg-white md:px-5 md:border md:rounded-lg md:shadow-sm py-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-teal-500">
          Education Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide your educational background.
        </p>
      </div>

      <form
        onBlur={form.handleSubmit(updateData)}
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate>
        <div className="flex flex-col">
          <Label className="mb-2">Current School</Label>
          <Input
            {...form.register("current_school")}
            placeholder="Enter current school"
          />
        </div>

        <div className="flex flex-col">
          <Label className="mb-2">Current Class/Grade</Label>
          <Input
            {...form.register("current_class")}
            placeholder="Enter class or grade"
          />
        </div>

        <div className="flex flex-col">
          <Label className="mb-2">Highest Qualification</Label>
          <Input
            {...form.register("highest_qualification")}
            placeholder="Enter highest qualification"
          />
        </div>
      </form>
    </div>
  );
}
