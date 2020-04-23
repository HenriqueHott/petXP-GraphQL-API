import { Router } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "./types";
import { User } from "./entities/User";
import { wrongTokenVersion } from "./constants";
import { sendRefreshToken, createAccessToken } from "./utils/tokens";

const router = Router();

router.post("/refresh-access-token", async (req, res) => {
  let accessToken: string | null = null;
  try {
    const token: string = req.cookies[process.env.COOKIE_NAME!];
    if (!token) throw new Error("No refresh token");

    const { id, tokenVersion } = verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    ) as Payload;

    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Could not find user");

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
