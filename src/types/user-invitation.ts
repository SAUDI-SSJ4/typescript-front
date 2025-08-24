import { UserType } from "@/constants/enums";

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED", 
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export interface UserInvitation {
  id: string;
  email: string;
  name?: string;
  role: UserType;
  status: InvitationStatus;
  invitedBy: string;
  invitedAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  expiresAt: Date;
  profilePicture?: string;
  phone?: string;
}

export interface InviteUserRequest {
  email: string;
  name?: string;
  role: UserType;
}

export interface UserWithInvitation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserType;
  profilePicture?: string;
  status: InvitationStatus;
  joinDate: Date;
  invitedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  isActive: boolean;
}