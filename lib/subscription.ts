import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  const userSub = await prismadb.userSubscription.findUnique({
    where: { userId: userId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
      stripeCustomerId: true,
    },
  });

  if (!userSub) {
    return false;
  }

  const isValid =
    userSub.stripePriceId &&
    userSub.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
