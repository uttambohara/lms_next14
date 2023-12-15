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
import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  price: z.coerce.number(),
});

// Type
type FormSchema = z.infer<typeof formSchema>;

type CoursePriceFormProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function CoursePriceForm({
  course,
  setIsEditing,
}: CoursePriceFormProps) {
  const router = useRouter();

  // React hook form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: course.price || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // handler
  async function onSubmit(values: FormSchema) {
    try {
      // api
      await axios.patch(`/api/teacher/course/${course.id}`, values);
      toast.success("Course description updated...");

      // refresh and redirect
      router.refresh();
      setIsEditing(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Course price..."
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Change your course price.</FormDescription>
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
