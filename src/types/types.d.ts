type UserInfo = {
  _id: string;
  display_name: string;
  account_name: string;
  email: string;
  email_verified: boolean;
  category: string;
  short_links_limit: number;
};

type TShortLink = {
  _id: string;
  user_id: string;
  short_link_id: string;
  original_link: string;
  clicks_history: Array<{ time_stamp: string }>;
  createdAt: string;
  updatedAt: string;
};
