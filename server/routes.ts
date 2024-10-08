import { Router, getExpressRouter } from "./framework/router";

import { Authing, Sessioning } from "./app";
import { SessionDoc } from "./concepts/sessioning";

/**
 * Web server routes for the app. Implements synchronizations between concepts.
 */
class Routes {
  // Synchronize the concepts from `app.ts`.

  @Router.post("/login")
  async logIn(session: SessionDoc, username: string) {
    // We don't have any authentication yet, we can imagine it would by synchronized here
    Authing.authing(username);
    Sessioning.start(session, username);
    return { msg: "Logged in!", user: username };
  }

  @Router.post("/logout")
  async logOut(session: SessionDoc) {
    Sessioning.end(session);
    return { msg: "Logged out!" };
  }

  @Router.post("/register")
  async register(username: string) {
    Authing.register(username);
    return { msg: "Username registered!", user: username };
  }

  // ... and when we have more concepts, we will add more routes!
}

/** The web app. */
export const app = new Routes();

/** The Express router. */
export const appRouter = getExpressRouter(app);
