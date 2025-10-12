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

type TLinkMetadata = {
  title: string | null;
  description: string | null;
  favicon: string | null;
  og_image: string | null;
};

type TShortLink = {
  _id: string;
  workspace_id: string;
  created_by: {
    _id: string;
    display_name: string;
    email: string;
    avatar: {
      key: string | null;
      url: string | null;
    };
  };
  domain: string;
  short_link_id: string;
  destination_url: string;
  tags: TTag[];
  comment: string | null;
  link_metadata: TLinkMetadata;
  folder: string | null;
  created_at: string;
  updated_at: string;
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
  members: Array<{
    _id: string;
    name: string;
    email: string;
    avatar: {
      key: string | null;
      url: string | null;
    };
  }>;
  members_limit: number;
  short_links_limit: number;
  links_created: number;
  total_links: number;
  custom_domain_limit: number;
  domains_created: number;
  total_clicks: number;
  clicks_limit: number;
  billing_cycle_start: number;
  created_by: {
    _id: string;
    name: string;
    email: string;
    avatar: {
      key: string | null;
      url: string | null;
    };
  };
  invite_code: string;
  tags_limit: number;
  tags_created: number;
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

type TTag = {
  _id: string;
  name: string;
  workspace_id: string;
  created_at: string;
  updated_at: string;
};
