type UserInfo = {
  _id: string;
  display_name: string;
  email: string;
  email_verified: boolean;
  category: string;
  workspace_limit: number;
  onboarded: boolean;
};

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  access_expiry: number;
  refresh_expiry: number;
}

interface AuthResponse extends RefreshTokenResponse {
  user: UserInfo;
  message: string;
  success: boolean;
}

type TShortLink = {
  _id: string;
  user_id: string;
  short_link_id: string;
  original_link: string;
  clicks_history: Array<{ time_stamp: string }>;
  createdAt: string;
  updatedAt: string;
};
