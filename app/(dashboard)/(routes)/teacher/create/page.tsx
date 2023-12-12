import { CourseCreateForm } from "./_components/course-create-form";

export default function CreateCourse() {
  return (
    <div className="max-w-[40rem] mx-auto space-y-3 container py-16">
      <div>
        <h1 className="text-3xl mb-1">Name your course</h1>
        <p className=" leading-8">
          Course Title Submission Hub: Enter Your Course Information Here
        </p>
      </div>

      <CourseCreateForm />
    </div>
  );
}
