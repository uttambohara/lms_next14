export default function Course({ params }: { params: { courseId: string } }) {
  return <div>{params.courseId}</div>;
}
