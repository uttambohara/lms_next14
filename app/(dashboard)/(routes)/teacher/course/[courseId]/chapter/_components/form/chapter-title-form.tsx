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
import { Chapter } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  title: z.string().min(4, {
    message: "Course title must be at least 4 characters.",
  }),
});

// Type
type FormSchema = z.infer<typeof formSchema>;

type ChapterTitleFormProps = {
  chapter: Chapter;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function ChapterTitleForm({
  chapter,
  setIsEditing,
}: ChapterTitleFormProps) {
  const router = useRouter();

  // React hook form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: chapter.title || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // handler
  async function onSubmit(values: FormSchema) {
    try {
      // api
      await axios.patch(
        `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}`,
        values,
      );
      toast.success("Chapter title updated...");

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>Change your chapter title.</FormDescription>
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
