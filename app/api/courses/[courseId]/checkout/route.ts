import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress)
      return new NextResponse("Unauthorized", { status: 401 });

    const course = await prisma?.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchased = await prisma?.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchased)
      return new NextResponse("Already purchased", { status: 401 });

    if (!course) return new NextResponse("Already purchased", { status: 404 });
    // --------
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    const checkStripeCustomer = await prisma?.stripeCheckout.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (checkStripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      await prisma.stripeCheckout.create({
        data: {
          userId: user.id,
          stripeCheckoutId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: checkStripeCustomer?.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.STRIPE_APP_URL}/course/${course.id}?success=1`,
      cancel_url: `${process.env.STRIPE_APP_URL}/course/${course.id}?canceled=1`,
      metadata: {
        userId: user.id,
        courseId: course.id,
      },
    });

    console.log(user.id, course.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log("COURSE_CHECKOUT", err);

    return new NextResponse(`Internal error ${err}`, { status: 400 });
  }
}
