export default () => ({
  app: {
    title: 'Rest API (nestjs)',
    subfolder: '',
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  // database: {
  //   mongodb: {
  //     host: process.env.MONGODB_HOST || '0.0.0.0',
  //     port: process.env.MONGODB_PORT || '27017',
  //     user: process.env.MONGODB_USER || 'test',
  //     pwd: process.env.MONGODB_PWD || 'test',
  //     database: process.env.MONGODB_DB || 'test',
  //   },
  // },
});
