"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HealthSchema } from "../schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/lib/store";
import { useEffect } from "react";
import debounce from "lodash.debounce";

const BLOOD_GROUP_CHOICES = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const GENOTYPE_CHOICES = [
  { value: "AA", label: "AA" },
  { value: "AS", label: "AS" },
  { value: "AC", label: "AC" },
  { value: "SS", label: "SS" },
  { value: "SC", label: "SC" },
];

type FormData = z.infer<typeof HealthSchema>;

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="mb-2">
    {children} <span className="text-red-500">*</span>
  </Label>
);

export default function StepCHealth() {
  const { updateData, data } = useFormStore();

  const form = useForm<FormData>({
    resolver: zodResolver(HealthSchema),
    defaultValues: {
      has_medical_condition: data.has_medical_condition || false,
      has_physical_disability: data.has_physical_disability || false,
      medical_condition_details: data.medical_condition_details || "",
      physical_disability_details: data.physical_disability_details || "",
      blood_group: data.blood_group || undefined,
      genotype: data.genotype || undefined,
    },
  });

  const has_medical_condition = useWatch({
    control: form.control,
    name: "has_medical_condition",
  });

  const has_physical_disability = useWatch({
    control: form.control,
    name: "has_physical_disability",
  });

  useEffect(() => {
    const subscription = form.watch(
      debounce((values) => {
        updateData(values);
        localStorage.setItem("healthFormData", JSON.stringify(values));
      }, 400)
    );
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  useEffect(() => {
    const savedHealthData = localStorage.getItem("healthFormData");
    if (savedHealthData) {
      const parsedData = JSON.parse(savedHealthData);
      form.reset(parsedData);
    }
  }, [form]);

  return (
    <div className="space-y-6 px-5 border rounded-lg shadow-sm py-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-blue-500">
          Health Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide your health details.
        </p>
      </div>

      <form
        onBlur={form.handleSubmit(updateData)}
        className="space-y-4"
        noValidate>
        {/* Medical Condition */}
        <div className="flex flex-col gap-2">
          <Label>Do you have any medical condition?</Label>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={has_medical_condition}
              onCheckedChange={(checked) =>
                form.setValue("has_medical_condition", !!checked)
              }
            />
            <span>Yes</span>

            <Checkbox
              checked={!has_medical_condition}
              onCheckedChange={(checked) =>
                form.setValue("has_medical_condition", !checked)
              }
            />
            <span>No</span>
          </div>

          {has_medical_condition && (
            <div className="flex flex-col mt-2">
              <Label className="mb-2">Medical Condition Details</Label>
              <Input
                value={form.watch("medical_condition_details") || ""}
                onChange={(e) =>
                  form.setValue("medical_condition_details", e.target.value)
                }
                placeholder="Enter details"
              />
              {form.formState.errors.medical_condition_details && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.medical_condition_details.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Blood Group */}
        <div className="flex flex-col">
          <RequiredLabel>Blood Group</RequiredLabel>
          <Select
            value={form.watch("blood_group") || ""}
            onValueChange={(value) =>
              form.setValue("blood_group", value as FormData["blood_group"])
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUP_CHOICES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.blood_group && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.blood_group.message}
            </p>
          )}
        </div>

        {/* Genotype */}
        <div className="flex flex-col">
          <RequiredLabel>Genotype</RequiredLabel>
          <Select
            value={form.watch("genotype") || ""}
            onValueChange={(value) =>
              form.setValue("genotype", value as FormData["genotype"])
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genotype" />
            </SelectTrigger>
            <SelectContent>
              {GENOTYPE_CHOICES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.genotype && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.genotype.message}
            </p>
          )}
        </div>

        {/* Physical Disability */}
        <div className="flex flex-col gap-2">
          <Label>Do you have any physical disability?</Label>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={has_physical_disability}
              onCheckedChange={(checked) =>
                form.setValue("has_physical_disability", !!checked)
              }
            />
            <span>Yes</span>

            <Checkbox
              checked={!has_physical_disability}
              onCheckedChange={(checked) =>
                form.setValue("has_physical_disability", !checked)
              }
            />
            <span>No</span>
          </div>

          {has_physical_disability && (
            <div className="flex flex-col mt-2">
              <Label className="mb-2">Physical Disability Details</Label>
              <Input
                value={form.watch("physical_disability_details") || ""}
                onChange={(e) =>
                  form.setValue("physical_disability_details", e.target.value)
                }
                placeholder="Enter details"
              />
              {form.formState.errors.physical_disability_details && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.physical_disability_details.message}
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
