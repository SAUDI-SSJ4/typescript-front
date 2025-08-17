import type { AcademyMembership, User } from "@/types/user";

export const getAcademyDetails = (user: User): AcademyMembership | null => {
  const academy = user.academy_memberships?.find(
    (academy) => academy.academy_details.email === user.email
  ) || null;

  return academy;
};
