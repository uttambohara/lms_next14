import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

type PangeaDropProps = {
  chapters: Chapter[];
  updatedChapters: (value: { id: string; position: number }[]) => void;
};

export default function PangeaDrop({
  chapters,
  updatedChapters,
}: PangeaDropProps) {
  const router = useRouter();
  const [items, setItems] = useState(chapters);

  useEffect(() => setItems(chapters), [chapters]);

  function onDragEnd(e: DropResult) {
    if (!e.destination) return;

    // Reorder array
    const chapters = items.slice();
    const [sourceItem] = chapters.splice(e.source.index, 1);
    chapters.splice(e.destination.index, 0, sourceItem);

    // Range
    const min = Math.min(e.source.index, e.destination.index);
    const max = Math.max(e.source.index, e.destination.index);
    const changedRange = chapters.slice(min, max + 1);

    // Declare changed position
    const updatedPosition = changedRange.map((item) => ({
      id: item.id,
      position: changedRange.findIndex((i) => i.id === item.id),
    }));

    setItems(chapters);
    updatedChapters(updatedPosition);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"chapters"}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {items.map((chapter, index) => (
              <Draggable
                draggableId={`${chapter.id}`}
                index={index}
                key={chapter.id}
              >
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "bg-slate-200 p-2 rounded-md flex items-center gap-2 justify-between text-slate-500 text-[0.8rem]",
                      snapshot.isDragging && "bg-purple-50 border"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span {...provided.dragHandleProps}>
                        <Grip size={16} color="gray" />
                      </span>
                      <span>{chapter.title}</span>
                    </span>

                    <span className="flex items-center gap-2">
                      {chapter.isPublished ? (
                        <Badge>Published</Badge>
                      ) : (
                        <Badge variant={"outline"}>Draft</Badge>
                      )}

                      {chapter.isFree && <Badge>Free</Badge>}

                      <Pencil
                        size={14}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/teacher/course/${chapter.courseId}/chapter/${chapter.id}`
                          )
                        }
                      />
                    </span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
