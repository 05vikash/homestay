const User=require("../models/user");

module.exports.createUser=async (req, res) => {
    let { username, email, password } = req.body;
    let user = new User({ username, email });
    let newUser = await User.register(user, password);
    req.login(newUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "successfully registered");
      res.redirect("/listing");
    });
    
  };

  module.exports.getSignUpForm=(req, res) => {
  res.render("users/signup.ejs");
}

module.exports.getLoginForm=(req, res) => {
  res.render("users/login.ejs");
}

module.exports.userLogin= async (req, res) => {
    req.flash("success", "successfully logged in");
    res.redirect(res.locals.savedUrl || "/listing");
  }

  module.exports.userLogout=(req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out successfully");
    res.redirect("/listing");
  });
};