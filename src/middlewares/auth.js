export const privacy = (types) => {
  return (req, res, next) => {
    const { user } = req.session;
    switch (types) {
      case "LOGUED":
        if (user && (user.role === "admin" || user.role === 'user' || user.role === 'premium')) next();
        else res.redirect("/login");
        break;

      case "USER-PREMIUM":
        if (user && (user.role === 'user' || user.role === 'premium')) next();
        else res.redirect("/login");
        break;

      case "PREMIUM-ADMIN":
        if(user && (user.role === 'premium' || user.role === "admin")) next()
        else res.redirect("/login");
        break

      case 'USER':
        if(user && user.role === 'user') next()
        else res.redirect('/login')
      break  

      case "NO_AUTH":
        if (!user) next();
        else res.redirect("/");
        break
      case "ADMIN":
        if(user.role === 'admin') next()
        else res.redirect("/")
        break;
    }
  };
};
