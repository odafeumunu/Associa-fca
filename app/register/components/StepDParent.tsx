"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParentSchema } from "../schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/lib/store";
import { useEffect } from "react";
import debounce from "lodash.debounce";

type FormData = z.infer<typeof ParentSchema>;

// Helper component to show required asterisk
const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="mb-2">
    {children} <span className="text-red-500">*</span>
  </Label>
);

export default function StepDParent() {
  const { updateData, data } = useFormStore();

  const form = useForm<FormData>({
    resolver: zodResolver(ParentSchema),
    defaultValues: {
      parent_full_name: data.parent_full_name || "",
      parent_relationship: data.parent_relationship || "",
      parent_phone: data.parent_phone || "",
      parent_alternative_phone: data.parent_alternative_phone || "",
      parent_email: data.parent_email || "",
      parent_home_address: data.parent_home_address || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch(
      debounce((values) => {
        updateData(values);
        localStorage.setItem("parentFormData", JSON.stringify(values));
      }, 400)
    );
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  useEffect(() => {
    const savedParentData = localStorage.getItem("parentFormData");
    if (savedParentData) {
      const parsedData = JSON.parse(savedParentData);
      form.reset(parsedData);
    }
  }, [form]);

  return (
    <div className="space-y-6 md:bg-white md:px-5 md:border md:rounded-lg md:shadow-sm py-6">
      {/* Step Title */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-teal-500">
          Parent / Guardian Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide your parent or guardian&apos;s details.
        </p>
      </div>

      <form
        onBlur={form.handleSubmit(updateData)}
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate>
        {/* Parent/Guardian Name */}
        <div className="flex flex-col">
          <RequiredLabel>Parent / Guardian Name</RequiredLabel>
          <Input
            {...form.register("parent_full_name")}
            placeholder="Enter name"
          />
          {form.formState.errors.parent_full_name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.parent_full_name.message}
            </p>
          )}
        </div>

        {/* Relationship */}
        <div className="flex flex-col">
          <RequiredLabel>Relationship</RequiredLabel>
          <Input
            {...form.register("parent_relationship")}
            placeholder="Enter relationship"
          />
          {form.formState.errors.parent_relationship && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.parent_relationship.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <RequiredLabel>Phone Number</RequiredLabel>
          <Input
            {...form.register("parent_phone")}
            placeholder="Enter phone number"
          />
          {form.formState.errors.parent_phone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.parent_phone.message}
            </p>
          )}
        </div>

        {/* Optional Fields */}
        <div className="flex flex-col">
          <Label className="mb-2">Alternative Phone</Label>
          <Input
            {...form.register("parent_alternative_phone")}
            placeholder="Enter alternative phone"
          />
        </div>

        {/* Email (required) */}
        <div className="flex flex-col">
          <RequiredLabel>Email</RequiredLabel>
          <Input {...form.register("parent_email")} placeholder="Enter email" />
          {form.formState.errors.parent_email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.parent_email.message}
            </p>
          )}
        </div>

        {/* Home Address (optional) */}
        <div className="flex flex-col">
          <Label className="mb-2">Home Address</Label>
          <Input
            {...form.register("parent_home_address")}
            placeholder="Enter home address"
          />
        </div>
      </form>
    </div>
  );
}
