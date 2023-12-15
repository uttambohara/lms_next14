import { CourseCreateForm } from "./_components/course-create-form";

export default function CreateCourse() {
  return (
    <div className="container mx-auto max-w-[40rem] space-y-3 py-16">
      <div>
        <h1 className="mb-1 text-3xl">Name your course</h1>
        <p className=" leading-8">
          Course Title Submission Hub: Enter Your Course Information Here
        </p>
      </div>

      <CourseCreateForm />
    </div>
  );
}
