
// Define globals
module.exports = {
  images: {
    domains: ['guesty-listing-images.s3.amazonaws.com', 'res.cloudinary.com', 'img.selfcateringlive.com', 'assets.guesty.com', 'lh3.googleusercontent.com']
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
    ignored: /node_modules/,
    poll: 1000,
    aggregateTimeout: 300,
  };
  return config;
  }
}