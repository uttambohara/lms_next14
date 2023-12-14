"use client";

import { useConfettiStore } from "@/hooks/confetti-store";
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, ChapterProgress, MuxVideo } from "@prisma/client";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type VideoPlayerProps = {
  chapter: Chapter & {
    videoUrl: MuxVideo | null;
    chapterProgress: ChapterProgress[];
  };
  isLocked: Boolean;
  nextChapter: { id: string; title: string } | undefined;
  courseId: string;
  allCompleted: boolean;
};

export default function VideoPlayer({
  chapter,
  isLocked,
  courseId,
  nextChapter,
  allCompleted,
}: VideoPlayerProps) {
  const store = useConfettiStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (allCompleted) store.onOpen();
  }, [allCompleted]);

  if (!chapter.videoUrl) return <div>No video found...</div>;

  async function handleVideoEnded() {
    if (!chapter.chapterProgress?.[0].isCompleted) {
      try {
        await axios.patch(
          `/api/courses/${chapter.courseId}/chapter/${chapter.id}/complete`,
          { id: chapter.chapterProgress?.[0].id }
        );

        toast.success("Updating progress...");

        if (Boolean(nextChapter?.id)) {
          router.push(`/course/${courseId}/chapter/${nextChapter?.id}`);
        }

        router.refresh();
      } catch (err) {
        let error;

        if (err instanceof Error) {
          error = err.message;
        } else {
          error = "Something went wrong";
        }

        toast.error(error);
      }
    }
  }

  return (
    <div className="max-h-[33rem] aspect-video m-auto relative">
      {isLocked && (
        <div className="max-h-[33rem] aspect-video mx-auto relative">
          <div className="absolute inset-0 bg-slate-500 grid place-content-center">
            <Lock color="white" size={40} />
          </div>
        </div>
      )}

      {!isLocked && (
        <>
          {!isReady && (
            <div className="absolute inset-0 bg-slate-500 grid place-content-center">
              <Loader2 className="animate-spin" color="white" size={40} />
            </div>
          )}

          <MuxPlayer
            autoPlay
            title={chapter.title}
            streamType="on-demand"
            playbackId={chapter.videoUrl.playbackId}
            onCanPlay={() => setIsReady(true)}
            className="h-full"
            onEnded={handleVideoEnded}
            accentColor="purple"
          />
        </>
      )}
    </div>
  );
}
