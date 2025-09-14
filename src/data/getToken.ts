import { cookies } from "next/headers";
import "server-only";

export const getToken = async () => {
  try {
    const refresh_token = (await cookies()).get("_linklite_refresh")?.value;
    const access_token = (await cookies()).get("_linklite_access")?.value;
    return { refresh_token, access_token };
  } catch {
    return null;
  }
};
