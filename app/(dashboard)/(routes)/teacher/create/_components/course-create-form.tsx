"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  title: z.string().min(4, {
    message: "Course title must be at least 4 characters.",
  }),
});

// Type
type FormSchema = z.infer<typeof formSchema>;

// Create form
export function CourseCreateForm() {
  const router = useRouter();
  // React hook form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // handler
  async function onSubmit(values: FormSchema) {
    try {
      // api
      const course = await axios.post("/api/teacher/course/create", values);
      toast.success("Course created...");

      // refresh and redirect
      router.refresh();
      router.push(`/teacher/course/${course.data.data.id}`);
    } catch (err) {
      let error;
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong.";
      }
      toast.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="E.g. Advanced Web Development"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                What will you teach in this course?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
