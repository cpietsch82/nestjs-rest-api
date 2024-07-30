export default (environment: string | undefined) => {
  if (environment === 'development') {
    return () => ({
      env: 'development',
      backend: {
        url: 'http://localhost:3000',
        // url: 'http://0.0.0.0:3000',
      },
      frontend: {
        corsUrl: ['http://localhost:4000'],
        url: 'http://localhost:4000',
      },
    });
  } else if (environment === 'production') {
    return () => ({
      env: 'production',
      backend: {
        url: 'https://www.mydomain.de',
      },
      frontend: {
        corsUrl: [/\.vercel\.app$/],
        url: 'http://localhost:4000',
      },
    });
  }
  return () => ({});
};
