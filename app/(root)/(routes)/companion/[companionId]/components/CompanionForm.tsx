"use client";
import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  instructions: z.string().min(200, {
    message: "instructions is required (at least 200 characters)",
  }),
  seed: z.string().min(200, {
    message: "seed is required",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "category is required",
  }),
});
interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}
const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "", 
            description: "", 
            instructions: "", 
            seed: "", 
            src: "", 
            categoryId : undefined, 
        }
    }); 

    const idLoading = form.formState.isSubmitting; 

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log(value)
    }
  return <div>CompanionForm</div>;
};

export default CompanionForm;
