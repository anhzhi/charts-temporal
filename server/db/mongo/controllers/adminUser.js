import AdminUser from '../models/adminUser';
import passport from 'passport';

/**
 * POST /login
 */
export const login = (req, res, next) => {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export const logout = (req, res) => {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export const signUp = (req, res, next) => {
  console.log('req.body', req.body)
  const user = new AdminUser({
    "services.password.bcrypt": req.body.password
  });

  AdminUser.findOne({
    emails: {
      $elemMatch: {
        address: req.body.email
      }
    }
  }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }
    user.username = "testtest"
    user.roles = ['clientAdmin']
    user._id = "ab45hgfjkld87dfsdfsdfds"
    user.emails = [{
      address: req.body.email,
      verified: false
    }]
    user.profile.admin = {
      createdAt: Date.now(),
      umbracoSource: false,
      dashboardId: 12,
      isGrouped: true
    }
    user.profile.loginTokens = []
    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  });
}

export default {
  login,
  logout,
  signUp
};
