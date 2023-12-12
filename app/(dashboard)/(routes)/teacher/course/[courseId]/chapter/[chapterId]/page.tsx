export default function Chapter({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  return <div>{params.chapterId}</div>;
}
