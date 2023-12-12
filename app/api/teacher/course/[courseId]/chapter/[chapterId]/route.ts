import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";

import { NextRequest, NextResponse } from "next/server";
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 401 });

    //

    const values = await request.json();

    console.log({ values });

    const chapter = await prisma.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: {
        ...values,
      },
    });

    if (!chapter)
      throw new NextResponse("Chapter doesn't exist", { status: 401 });

    if (values.videoUrl) {
      // Mux Video
      const muxVideo = await prisma.muxVideo.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (muxVideo) {
        await Video.Assets.del(muxVideo.assedId);

        await prisma.muxVideo.delete({
          where: {
            assedId: muxVideo.assedId,
            chapterId: params.chapterId,
          },
        });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
      });

      await prisma.muxVideo.create({
        data: {
          chapterId: params.chapterId,
          name: chapter?.title,
          assedId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id as string,
        },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[CREATE_CHAPTER]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
