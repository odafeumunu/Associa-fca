"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsentSchema } from "../schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormStore } from "@/lib/store";
import { useEffect } from "react";
import debounce from "lodash.debounce";

type FormData = z.infer<typeof ConsentSchema>;


function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label className="mb-2">
      {children} <span className="text-red-500">*</span>
    </Label>
  );
}

export default function StepFConsent() {
  const { updateData, data } = useFormStore();
  const form = useForm<FormData>({
    resolver: zodResolver(ConsentSchema),
    defaultValues: {
      consent_participate: data.consent_participate || false,
      consent_information_accurate: data.consent_information_accurate || false,
      consent_liability_release: data.consent_liability_release || false,
      consent_abide_rules: data.consent_abide_rules || false,
      parent_signature: data.parent_signature || "",
      player_signature: data.player_signature || "",
    },
  });

  const watchAllFields = form.watch(); // Watch all form fields

  // Debounced auto-save to Zustand store and localStorage
  useEffect(() => {
    const subscription = form.watch(
      debounce((values) => {
        updateData(values);
        localStorage.setItem("consentFormData", JSON.stringify(values));
      }, 400)
    );
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedConsentData = localStorage.getItem("consentFormData");
    if (savedConsentData) {
      const parsedData = JSON.parse(savedConsentData);
      form.reset(parsedData);
    }
  }, [form]);

  return (
    <div className="space-y-6 px-5 border rounded-lg shadow-sm py-6">
      {/* Step Title */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-blue-500">
          Consent
        </h2>
        <p className="text-sm text-muted-foreground">
          Please read and agree to the academy’s terms and conditions.
        </p>
      </div>

      <form
        onBlur={form.handleSubmit(updateData)}
        className="space-y-4"
        noValidate>
        {/* Consent Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={watchAllFields.consent_participate || false}
              onCheckedChange={(checked) =>
                form.setValue("consent_participate", !!checked)
              }
            />
            <RequiredLabel>I consent to participate</RequiredLabel>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={watchAllFields.consent_information_accurate || false}
              onCheckedChange={(checked) =>
                form.setValue("consent_information_accurate", !!checked)
              }
            />
            <RequiredLabel>I confirm information is accurate</RequiredLabel>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={watchAllFields.consent_liability_release || false}
              onCheckedChange={(checked) =>
                form.setValue("consent_liability_release", !!checked)
              }
            />
            <RequiredLabel>I release liability</RequiredLabel>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={watchAllFields.consent_abide_rules || false}
              onCheckedChange={(checked) =>
                form.setValue("consent_abide_rules", !!checked)
              }
            />
            <RequiredLabel>I agree to abide by the rules</RequiredLabel>
          </div>
        </div>

        {/* Validation Errors */}
        {[
          "consent_participate",
          "consent_information_accurate",
          "consent_liability_release",
          "consent_abide_rules",
        ].map((field) =>
          form.formState.errors[field as keyof FormData] ? (
            <p key={field} className="text-red-500 text-sm">
              {form.formState.errors[field as keyof FormData]?.message}
            </p>
          ) : null
        )}

        {/* Signatures */}
        <div className="flex flex-col">
          <RequiredLabel>Parent Signature</RequiredLabel>
          <Input
            value={form.watch("parent_signature") || ""}
            onChange={(e) => form.setValue("parent_signature", e.target.value)}
            placeholder="Parent signature"
          />
          {form.formState.errors.parent_signature && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.parent_signature.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <Label className="mb-2">Player Signature</Label>
          <Input
            value={form.watch("player_signature") || ""}
            onChange={(e) => form.setValue("player_signature", e.target.value)}
            placeholder="Player signature"
          />
          {form.formState.errors.player_signature && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.player_signature.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
