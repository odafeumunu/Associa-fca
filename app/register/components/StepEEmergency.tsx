"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmergencySchema } from "../schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/lib/store";
import { useEffect } from "react";
import debounce from "lodash.debounce";

type FormData = z.infer<typeof EmergencySchema>;

export default function StepEEmergency() {
  const { updateData, data } = useFormStore();

  const form = useForm<FormData>({
    resolver: zodResolver(EmergencySchema),
    defaultValues: {
      emergency_contact_name: data.emergency_contact_name || "",
      emergency_contact_phone: data.emergency_contact_phone || "",
      emergency_contact_relationship: data.emergency_contact_relationship || "",
    },
  });

  // Auto-save to Zustand store and localStorage (debounced)
  useEffect(() => {
    const subscription = form.watch(
      debounce((values) => {
        updateData(values);
        localStorage.setItem("emergencyFormData", JSON.stringify(values));
      }, 400)
    );
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedEmergencyData = localStorage.getItem("emergencyFormData");
    if (savedEmergencyData) {
      const parsedData = JSON.parse(savedEmergencyData);
      form.reset(parsedData);
    }
  }, [form]);

  return (
    <div className="space-y-6 md:bg-white md:px-5 md:border md:rounded-lg md:shadow-sm py-6">
      {/* Step Title */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-teal-500">
          Emergency Contact Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide an emergency contact who can be reached if necessary.
        </p>
      </div>

      <form
        onBlur={form.handleSubmit(updateData)}
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate>
        {/* Name */}
        <div className="flex flex-col">
          <Label className="mb-2">Name</Label>
          <Input
            value={form.watch("emergency_contact_name") || ""}
            onChange={(e) =>
              form.setValue("emergency_contact_name", e.target.value)
            }
            placeholder="Enter full name"
          />
          {form.formState.errors.emergency_contact_name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.emergency_contact_name.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <Label className="mb-2">Phone Number</Label>
          <Input
            value={form.watch("emergency_contact_phone") || ""}
            onChange={(e) =>
              form.setValue("emergency_contact_phone", e.target.value)
            }
            placeholder="Enter phone number"
          />
          {form.formState.errors.emergency_contact_phone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.emergency_contact_phone.message}
            </p>
          )}
        </div>

        {/* Relationship */}
        <div className="flex flex-col">
          <Label className="mb-2">Relationship</Label>
          <Input
            value={form.watch("emergency_contact_relationship") || ""}
            onChange={(e) =>
              form.setValue("emergency_contact_relationship", e.target.value)
            }
            placeholder="Enter relationship"
          />
          {form.formState.errors.emergency_contact_relationship && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.emergency_contact_relationship.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
