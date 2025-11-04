import { z } from "zod";

// 🧩 Step A — Player Info
export const PlayerInfoSchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  age: z.number().min(0, "Age is required"),
  gender: z.enum(["Male", "Female"]),
  nationality: z.string().min(2, "Nationality required"),
  residential_address: z.string().min(3, "Address required"),
  languages_spoken: z.string().min(1, "Languages spoken is required"),
  preferred_position: z.string().min(1, "Preferred position is required"),
  state_of_origin: z.number().refine((val) => val > 0, {
    message: "State of origin is required",
  }),
  lga: z.number().refine((val) => val > 0, {
    message: "LGA is required",
  }),
});

// 🧩 Step B — Education
export const EducationSchema = z.object({
  current_school: z.string().optional(),
  current_class: z.string().optional(),
  highest_qualification: z.string().optional(),
});

// 🧩 Step C — Health
export const HealthSchema = z.object({
  has_medical_condition: z.boolean(),
  medical_condition_details: z.string().optional(),
  blood_group: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  genotype: z.enum(["AA", "AS", "SS", "AC"]).optional(),
  has_physical_disability: z.boolean(),
  physical_disability_details: z.string().optional(),
});

// 🧩 Step D — Parent / Guardian
export const ParentSchema = z.object({
  parent_full_name: z.string().min(3, "Parent name required"),
  parent_relationship: z.string().min(1, "Parent relationship is required"),
  parent_phone: z
    .string()
    .min(10, "Phone number required")
    .regex(/^[0-9+\- ]+$/, "Invalid phone number"),
  parent_alternative_phone: z.string().optional(),
  parent_email: z.email("Invalid email"),
  parent_home_address: z.string().optional(),
});

// 🧩 Step E — Emergency Contact
export const EmergencySchema = z.object({
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
});

// 🧩 Step F — Consent
export const ConsentSchema = z.object({
  consent_participate: z.boolean().refine((val) => val === true, {
    message: "You must agree to participate",
  }),
  consent_information_accurate: z.boolean().refine((val) => val === true, {
    message: "You must confirm information is accurate",
  }),
  consent_liability_release: z.boolean().refine((val) => val === true, {
    message: "You must accept liability release",
  }),
  consent_abide_rules: z.boolean().refine((val) => val === true, {
    message: "You must agree to abide by rules",
  }),
  parent_signature: z.string().min(1, "Parent signature is required"),
  player_signature: z.string().optional(),
});

// ✅ Combine all schemas for full form
export const FullFormSchema = PlayerInfoSchema.extend({
  ...EducationSchema.shape,
  ...HealthSchema.shape,
  ...ParentSchema.shape,
  ...EmergencySchema.shape,
  ...ConsentSchema.shape,
});

// ✅ Inferred type
export type PlayerFormData = z.infer<typeof FullFormSchema>;

// ✅ Step schemas array — matches your step order
export const stepSchemas = [
  PlayerInfoSchema,
  EducationSchema,
  HealthSchema,
  ParentSchema,
  EmergencySchema,
  ConsentSchema,
];
