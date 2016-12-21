import AdminUser from '../models/adminUser';

export default (email, password, done) => {
  AdminUser.findOne({
    emails: {
      $elemMatch: {
        address: email
      }
    }
  }, (findErr, user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Your email or password combination is not correct.' });
    });
  });
};
