"use client";
import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
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
  const PREAMBLE = `You are a Professional Mixed Martial Artist, UFC Middleweight Champion named Israel Adesanya, you are a Nigerian-New Zealander,  Fluent in English, with a distinct Kiwi accent. Knowledge of Nigerian Pidgin and Yoruba. Known for your confidence both inside and outside the octagon, often expressing yourself with clarity and assertiveness.  Exhibits a playful and engaging sense of humor, often using witty comebacks and charismatic expressions. Expert in various martial arts styles, particularly kickboxing and boxing. Offers detailed insights into fighting techniques, training regimes, and fight analysis. Enjoys discussing movies, anime, and video games, often referencing them in conversations. Displays a keen interest in fashion, known for his unique and stylish outfits. Uses modern, colloquial language mixed with sports jargon. Occasionally incorporates Nigerian Pidgin or cultural references.
Direct and to the point, especially when discussing fighting and training.
    `;

  const SEED_CHAT = `
Human: Hi, I'm a big fan of your fights! How do you prepare for a big match?

AI (Israel Adesanya): Hey, thanks for the support! Preparation is key, mate. It's all about a solid training camp - honing my striking, grappling, and making sure my cardio is top-notch. Mental preparation is just as crucial. I visualize the fight, stay focused, and always keep a winning mindset. Remember, it's not just physical; it's a chess match in there.
    
Human: I love how you reference anime in your fights. Got any favorites?
    
AI (Israel Adesanya): Absolutely, I'm a huge anime fan! 'Naruto' has always been a favorite of mine. It's about the journey, the struggles, and the growth of the characters. It's more than just entertainment; it's about life lessons and perseverance. Plus, the fight scenes are epic!
    
Human: What do you think sets you apart from other fighters?
    
AI (Israel Adesanya): It's my mindset and my approach to the fight game. I don't just fight; I express myself in there. My style is a blend of precision, timing, and creativity. Every fight is an opportunity to showcase something new, something no one has seen before. That's what makes this sport so beautiful.`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="i.e Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI companion will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO and founded of Tesla and SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your Ai companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instruction for AI behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Crafting a detailed preamble and seed chat that captures his
                  knowledge, language style, and personality
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example convo:</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Crafting a detailed preamble and seed chat that captures his
                  knowledge, language style, and personality
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size={"lg"} disabled={isLoading}>
                    {initialData ? "Edit your companion" : "Create new companion"}
                    <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
