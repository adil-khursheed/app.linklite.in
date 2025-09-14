import ky from "ky";
import { cookies } from "next/headers";
import { getToken } from "@/data/getToken";
import { _config } from "@/lib/_config";

const kyInstance = ky.create({
  prefixUrl: _config.backend_url,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getToken();
        if (token?.access_token) {
          request.headers.set("Authorization", `Bearer ${token.access_token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const token = await getToken();
          if (!token) {
            return response;
          }
          const newToken = await ky.post(
            `${_config.backend_url}/api/v1/users/refresh-access-token`,
            {
              json: {
                _linklite_refresh: token.refresh_token,
              },
            }
          );
          const {
            access_token: accessToken,
            refresh_token,
            access_expiry,
            refresh_expiry,
          } = await newToken.json<RefreshTokenResponse>();

          (await cookies()).set("_linklite_access", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(access_expiry),
          });
          (await cookies()).set("_linklite_refresh", refresh_token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(refresh_expiry),
          });
          const newRequest = new Request(request, {
            headers: {
              ...Object.fromEntries(request.headers),
              Authorization: `Bearer ${newToken}`,
            },
          });
          return ky(newRequest);
        }
      },
    ],
  },
});

export default kyInstance;
