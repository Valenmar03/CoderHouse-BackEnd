export const privacy = (type) => {
  return (req, res, next) => {
    const { user } = req.session;
    switch (type) {
      case "ADMIN":
        if (user && user.role === "admin") next();
        else res.redirect("/login");
        break;

      case "USER":
        if (user) next();
        else res.redirect("/login");
        break;

      case "NO_AUTH":
        if (!user) next();
        else res.redirect("/");
    }
  };
};
