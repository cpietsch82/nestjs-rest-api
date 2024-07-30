export default () => ({
  app: {
    title: 'Rest API (nestjs)',
    subfolder: '',
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },
});
