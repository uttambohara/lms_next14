import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";

import { NextRequest, NextResponse } from "next/server";
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 401 });

    //

    const values = await request.json();

    // Which chapter to update
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter)
      throw new NextResponse("Chapter doesn't exist", { status: 401 });

    // Does the PATCH data contain video url

    if (!values.videoUrl) {
      await prisma.chapter.update({
        where: { id: params.chapterId, courseId: params.courseId },
        data: {
          ...values,
        },
      });
    }

    if (values.videoUrl) {
      // Mux Video
      const muxVideo = await prisma.muxVideo.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (muxVideo !== null && Boolean(muxVideo?.id)) {
        if (muxVideo.assedId) {
          await Video.Assets.del(muxVideo.assedId);
        }

        await prisma.muxVideo.delete({
          where: {
            assedId: muxVideo.assedId,
            chapterId: params.chapterId,
          },
        });

        console.log("Working 3/////");
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

      ///
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[CREATE_CHAPTER]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 401 });

    //

    await prisma.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

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

    // Changing course isPublished based on chapter
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (publishedChapters.length === 0) {
      await prisma.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[DELETE_CHAPTER]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
