module.exports = {
  apps: [
    {
      name: "travis-backend",
      script: "./dist/server.js",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
