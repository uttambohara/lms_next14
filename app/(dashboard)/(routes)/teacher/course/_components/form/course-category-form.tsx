import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Attachment, Category, Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  categoryId: z.string(),
});

// Type
type FormSchema = z.infer<typeof formSchema>;

type CourseCategoryFormProps = {
  course: Course & {
    chapters: Chapter[];
    attachments: Attachment[];
  };
  category: Category[];
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function CourseCategoryForm({
  course,
  category,
  setIsEditing,
}: CourseCategoryFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // React hook form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: course.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // handler
  async function onSubmit(values: FormSchema) {
    try {
      setIsUpdating(false);
      // api
      const updatedCourse = await axios.patch(
        `/api/teacher/course/${course.id}`,
        values
      );
      toast.success("Course category updated...");

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
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={category.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  {...field}
                />
              </FormControl>
              <FormDescription>Change your course category.</FormDescription>
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
