import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import UserManagerMongo from "../dao/mongo/manager/userManager.js";
import { createHash, validatePassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const userService = new UserManagerMongo();

const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;

          if (!first_name || !password || !email || !last_name) {
            return res
              .status(400)
              .send({ status: "error", error: "Incomplete values" });
          }

          const exists = await userService.existsUser({ email });
          if (exists)
            return done(null, false, { message: "User already exists" });

          const hashedPassword = await createHash(password);

          const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          };

          const result = await userService.createUser(user);
          done(null, result, { message: "User created successfully" });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        if (email === "adminCoder@coder.com" && password === "123") {
          const user = {
            id: 0,
            name: "adminCoder",
            email: "adminCoder@coder.com",
            password: "123",
            role: "admin",
          };

          return done(null, user, { message: 'You are the admin'});
        }

        let user;
        user = await userService.findUser({ email });
        if (!user)
          return done(null, false, { message: "Incorrect Credentials" });

        const validPassword = await validatePassword(password, user.password);

        if (!validPassword)
          return done(null, false, { message: "Incorrect Password" });

        user = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return done(null, user);
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.0ab1be516d01edbe",
        clientSecret: "eb08c2457934c0bf1b90170a6d5fd172bde825cc",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json;
          let user;
          user = await userService.existsUser({ email });

          if (!user) {
            const newUser = {
              first_name: name,
              email: email,
              password: "",
            };

            const result = await userService.createUser(newUser);
          }

          user = {
            name: user.first_name,
            email: user.email,
            id: user._id,
            role: user.role,
          };

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    if (id === 0) {
      return done(null, {
        name: "adminCoder",
        email: "adminCoder@coder.com",
        password: "adminCod3r123",
        role: "admin",
      });
    }

    const user = await userService.existsUser({ _id: id });
    return done(null, user);
  });
};

export default initializePassportStrategies;
