import { UserType } from "@/constants/enums";

<<<<<<< HEAD
export type AcademyMembership = {
  membership_id: number;
  academy_id: number;
  academy_name: string;
  academy_slug: string;
  user_role: "owner" | "admin" | "member";
  is_active: boolean;
  joined_at: string;
  academy_details: {
    about: string | null;
    image: string | null;
    email: string;
    phone: string;
    address: string | null;
    status: "active" | "inactive";
    created_at: string;
  };
  settings: {
    logo: string;
  };
};

=======
>>>>>>> sketch
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  user_type: UserType;
<<<<<<< HEAD
  verified: boolean;
  avatar?: string;
  avatar_url?: string;
  banner?: string;
  banner_url?: string;
  phone_number?: string;
  gender?: string;
  academy_memberships?: AcademyMembership[];
=======
  profile_picture?: string;
  createdAt: Date;
  updatedAt: Date;
>>>>>>> sketch
};

export type AuthResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};
<<<<<<< HEAD

export type AuthResponse = UserWithTokens & {
  status_code: number;
  message: string;
  data: {
    user_data: User;
    access_token: string;
    refresh_token: string;
    data?: {
      access_token: string;
      refresh_token: string;
      user_data: User;
    };
  };
};
=======
>>>>>>> sketch

export type TokenRefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequest = {
  email?: string;
  password?: string;
  google_token?: string;
  user_type?: UserType;
};

export type SignupRequest = {
<<<<<<< HEAD
  fname?: string;
  lname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  confirm_password?: string;
=======
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
>>>>>>> sketch
  user_type: UserType;
  profile_picture?: File;
  google_token?: string;
};
