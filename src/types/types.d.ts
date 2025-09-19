type UserInfo = {
  _id: string;
  display_name: string;
  email: string;
  email_verified: boolean;
  category: string;
  workspace_limit: number;
  default_workspace: string;
  onboarded: boolean;
  avatar: {
    key: string | null;
    url: string | null;
  };
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
  workspace_id: string;
  clicks_history: Array<{ time_stamp: string }>;
  createdAt: string;
  updatedAt: string;
};

type TWorkspace = {
  _id: string;
  name: string;
  slug: string;
  logo: {
    key: string | null;
    url: string | null;
  };
  plan: "free" | "pro" | "premium";
  members: string[];
  members_limit: number;
  short_links_limit: number;
  links_created: number;
  total_links: number;
  custom_domain_limit: number;
  domains_created: number;
  total_clicks: number;
  clicks_limit: number;
  billing_cycle_start: number;
  created_by: string;
  invite_code: string;
  tags_limit: number;
  folders_limit: number;
  folders_created: number;
  created_at: string;
  updated_at: string;
};

type TUrlMetadata = {
  title: string;
  description: string;
  image: string;
  favicon: string;
  url: string;
  siteName: string;
};
