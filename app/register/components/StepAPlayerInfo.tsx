import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import api from "@/lib/axios";
import { endpoints } from "@/config/endpoints";
import { PlayerInfoSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/lib/store";
import z from "zod";

type State = {
  id: number;
  name: string;
  capital: string;
};

type LGA = {
  id: number;
  name: string;
};

type FormData = z.infer<typeof PlayerInfoSchema>;

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="mb-2">
    {children} <span className="text-red-500">*</span>
  </Label>
);

export default function StepAPlayerInfo() {
  const { updateData, data: formData } = useFormStore();

  /** -------------------- Form Setup -------------------- **/
  const [date, setDate] = useState<Date | undefined>(
    formData?.date_of_birth ? new Date(formData.date_of_birth) : undefined
  );
  const [selectedState, setSelectedState] = useState<number | undefined>(
    formData?.state_of_origin
  );
  const [selectedLga, setSelectedLga] = useState<number | undefined>(
    formData?.lga
  );

  const form = useForm<FormData>({
    resolver: zodResolver(PlayerInfoSchema),
    mode: "onSubmit", // ✅ only validate when submitting
    reValidateMode: "onChange", // ✅ validate changed field only
    defaultValues: {
      full_name: formData?.full_name || "",
      date_of_birth: formData?.date_of_birth || "",
      age: formData?.age || 0,
      gender: formData?.gender,
      nationality: formData?.nationality || "",
      residential_address: formData?.residential_address || "",
      languages_spoken: formData?.languages_spoken || "",
      preferred_position: formData?.preferred_position || "",
      state_of_origin: formData?.state_of_origin,
      lga: formData?.lga,
    },
  });

  /** -------------------- Fetch States -------------------- **/
  const { data: states } = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: async () => {
      let allStates: State[] = [];
      let page = 1;
      const perPage = 20;
      while (true) {
        const res = await api.get(
          `${endpoints.State.get_all_states}?page=${page}&limit=${perPage}`
        );
        allStates = allStates.concat(res.data.results);
        if (!res.data.next || res.data.results.length === 0) break;
        page++;
      }
      return allStates;
    },
  });

  /** -------------------- Fetch LGAs -------------------- **/
  const { data: lgas } = useQuery<LGA[]>({
    queryKey: ["lgas", selectedState],
    queryFn: async () => {
      if (!selectedState) return [];
      const res = await api.get(
        `${endpoints.LGA.get_lgas}?state=${selectedState}`
      );
      return res.data.results;
    },
    enabled: !!selectedState && selectedState > 0,
  });

  /** -------------------- Validate LGA after load -------------------- **/
  useEffect(() => {
    if (lgas && selectedLga) {
      const valid = lgas.find((lga) => lga.id === selectedLga);
      if (!valid) {
        setSelectedLga(0);
        form.setValue("lga", 0);
      }
    }
  }, [lgas]);

  /** -------------------- Load from LocalStorage -------------------- **/
  useEffect(() => {
    const saved = localStorage.getItem("playerInfoFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      form.reset(parsed);
      if (parsed.state_of_origin) setSelectedState(parsed.state_of_origin);
      if (parsed.lga) setSelectedLga(parsed.lga);
      if (parsed.date_of_birth) setDate(new Date(parsed.date_of_birth));
    }
  }, [form]);

  /** -------------------- Sync Zustand store -------------------- **/
  useEffect(() => {
    if (formData) {
      form.reset(formData);
      if (formData.state_of_origin) setSelectedState(formData.state_of_origin);
      if (formData.lga) setSelectedLga(formData.lga);
      if (formData.date_of_birth) setDate(new Date(formData.date_of_birth));
    }
  }, []);

  /** -------------------- Debounced Auto-Save -------------------- **/
  const debouncedSave = useMemo(
    () =>
      debounce((values: Partial<FormData>) => {
        if (!values.full_name) return;

        const toSave = {
          ...values,
          state_of_origin: selectedState || 0,
          lga: form.getValues("lga") || 0,
        };

        updateData(toSave as FormData);
        localStorage.setItem("playerInfoFormData", JSON.stringify(toSave));
      }, 500),
    [selectedState, updateData, form]
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      debouncedSave(values);
    });

    return () => {
      (subscription as { unsubscribe: () => void })?.unsubscribe?.();
      debouncedSave.cancel();
    };
  }, [form, debouncedSave]);

  /** -------------------- Render -------------------- **/
  return (
    <div className="space-y-6 md:bg-white md:px-5 md:border md:rounded-lg md:shadow-sm py-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-sky-900">
          Player Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Please provide your personal information accurately.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(updateData)} // ✅ no more onBlur
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate>
        {/* Full Name */}
        <div className="flex flex-col">
          <RequiredLabel>Full Name</RequiredLabel>
          <Input
            id="full_name"
            {...form.register("full_name")}
            placeholder="Enter your full name"
          />
          {form.formState.errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.full_name.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <RequiredLabel>Date of Birth</RequiredLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                type="button">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"       
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split("T")[0];
                    form.setValue("date_of_birth", formatted, {
                      shouldValidate: true, // ✅ local field validation only
                    });

                    const today = new Date();
                    let age = today.getFullYear() - selectedDate.getFullYear();
                    const monthDiff =
                      today.getMonth() - selectedDate.getMonth();
                    const dayDiff = today.getDate() - selectedDate.getDate();
                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))
                      age--;
                    form.setValue("age", age);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.date_of_birth && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.date_of_birth.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <RequiredLabel>Age</RequiredLabel>
          <Input
            value={form.watch("age") || ""}
            disabled
            placeholder="Age will be calculated"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <RequiredLabel>Gender</RequiredLabel>
          <Select
            onValueChange={(val) =>
              form.setValue("gender", val as "Male" | "Female", {
                shouldValidate: true,
              })
            }
            value={form.watch("gender") || ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.gender && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.gender.message}
            </p>
          )}
        </div>

        {/* Nationality */}
        <div className="flex flex-col">
          <RequiredLabel>Nationality</RequiredLabel>
          <Input
            id="nationality"
            {...form.register("nationality")}
            placeholder="Enter your nationality"
          />
          {form.formState.errors.nationality && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.nationality.message}
            </p>
          )}
        </div>

        {/* Residential Address */}
        <div className="flex flex-col">
          <RequiredLabel>Residential Address</RequiredLabel>
          <Input
            id="residential_address"
            {...form.register("residential_address")}
            placeholder="Enter your address"
          />
          {form.formState.errors.residential_address && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.residential_address.message}
            </p>
          )}
        </div>

        {/* Languages Spoken */}
        <div className="flex flex-col">
          <RequiredLabel>Languages Spoken</RequiredLabel>
          <Input
            id="languages_spoken"
            {...form.register("languages_spoken")}
            placeholder="e.g. English, Yoruba, Hausa"
          />
          {form.formState.errors.languages_spoken && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.languages_spoken.message}
            </p>
          )}
        </div>

        {/* Preferred Position */}
        <div className="flex flex-col">
          <RequiredLabel>Preferred Position</RequiredLabel>
          <Select
            onValueChange={(val) =>
              form.setValue("preferred_position", val, {
                shouldValidate: true,
              })
            }
            value={form.watch("preferred_position") || ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
              <SelectItem value="Defender">Defender</SelectItem>
              <SelectItem value="Midfielder">Midfielder</SelectItem>
              <SelectItem value="Forward">Forward</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.preferred_position && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.preferred_position.message}
            </p>
          )}
        </div>

        {/* State of Origin */}
        <div className="flex flex-col">
          <RequiredLabel>State of Origin</RequiredLabel>
          <Select
            onValueChange={(stateId) => {
              const stateNumber = Number(stateId);
              setSelectedState(stateNumber);
              form.setValue("state_of_origin", stateNumber, {
                shouldValidate: true,
              });
              setSelectedLga(0);
              form.setValue("lga", 0);
            }}
            value={
              selectedState && selectedState > 0 ? selectedState.toString() : ""
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states?.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.state_of_origin && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.state_of_origin.message}
            </p>
          )}
        </div>

        {/* LGA */}
        <div className="flex flex-col">
          <RequiredLabel>Local Government Area</RequiredLabel>
          <Select
            disabled={!selectedState || selectedState === 0}
            value={selectedLga && selectedLga > 0 ? selectedLga.toString() : ""}
            onValueChange={(lgaId) => {
              const lgaNumber = Number(lgaId);
              setSelectedLga(lgaNumber);
              form.setValue("lga", lgaNumber, { shouldValidate: true });
            }}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  !selectedState ? "Select a state first" : "Select LGA"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {lgas?.map((lga) => (
                <SelectItem key={lga.id} value={lga.id.toString()}>
                  {lga.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.lga && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.lga.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
