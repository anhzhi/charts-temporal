import AdminUser from '../models/adminUser';

export default (id, done) => {
  AdminUser.findById(id, (err, user) => {
    done(err, user);
  });
};
