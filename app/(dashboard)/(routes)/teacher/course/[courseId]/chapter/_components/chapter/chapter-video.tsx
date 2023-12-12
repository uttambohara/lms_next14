"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxVideo } from "@prisma/client";
import { PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import { ChapterVideoForm } from "../form/chapter-video-form";

type ChapterVideoProps = {
  chapter: Chapter & { videoUrl: MuxVideo | null };
};

export default function ChapterVideo({ chapter }: ChapterVideoProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h4 className="">Chapter video</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <PlusCircle size={18} />
              Add Video
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {!isEditing && !chapter.videoUrl && (
          <div
            className="h-60 bg-slate-200 grid place-content-center"
            onClick={() => setIsEditing(true)}
          >
            <VideoIcon size={40} />
          </div>
        )}
        {!isEditing && chapter.videoUrl && (
          <MuxPlayer
            streamType="on-demand"
            playbackId={chapter.videoUrl.playbackId}
            autoPlay
            title={chapter.videoUrl.name}
            accentColor="purple"
            className="h-[18rem]"
          />
        )}
        {isEditing && (
          <ChapterVideoForm chapter={chapter} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
