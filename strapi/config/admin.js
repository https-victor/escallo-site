module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '30f5e0ea7824777ef5293cf74dfb5166'),
  },
});
