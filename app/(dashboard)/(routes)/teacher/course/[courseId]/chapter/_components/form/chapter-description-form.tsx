import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Quill } from "@/components/react-quill";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  description: z.string().min(4),
});

// Type
type FormSchema = z.infer<typeof formSchema>;

type ChapterDescriptionForm = {
  chapter: Chapter;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function ChapterDescriptionForm({
  chapter,
  setIsEditing,
}: ChapterDescriptionForm) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // React hook form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: chapter.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // handler
  async function onSubmit(values: FormSchema) {
    try {
      setIsUpdating(true);
      // api
      await axios.patch(
        `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}`,
        values
      );
      toast.success("Chapter description updated...");

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Quill {...field} />
              </FormControl>
              <FormDescription>
                Change your chapter description.
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
