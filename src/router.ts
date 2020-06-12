import { Router } from "express";
import { verify } from "jsonwebtoken";
import { AccessToken, TokenPayload } from "./types";
import { User } from "./entities/User";
import {
  refreshAccessTokenEndpoint,
  noCookieToken,
  userNotFound,
  wrongTokenVersion
} from "./constants";
import { sendRefreshToken, createAccessToken } from "./utils/tokens";

const router = Router();

router.post(refreshAccessTokenEndpoint, async (req, res) => {
  let accessToken: AccessToken = null;

  try {
    const token: string | undefined = req.cookies[process.env.COOKIE_NAME];
    if (!token) throw new Error(noCookieToken);

    const { id, tokenVersion } = verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    ) as TokenPayload;

    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error(userNotFound);
    if (tokenVersion !== user.tokenVersion) {
      throw new Error(wrongTokenVersion);
    }

    sendRefreshToken(res, user);
    accessToken = createAccessToken(user);
  } catch (err) {
    console.log(err);
    res.status(401);
  } finally {
    res.json({ accessToken });
  }
});

export { router };
