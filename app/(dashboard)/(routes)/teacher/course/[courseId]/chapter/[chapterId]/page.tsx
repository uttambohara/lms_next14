export default function Chapter({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  console.log(params.courseId);

  console.log(`/teacher/course/${params.courseId}}`);
  return <div>{params.chapterId}</div>;
}
