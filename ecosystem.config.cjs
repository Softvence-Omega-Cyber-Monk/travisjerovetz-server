module.exports = {
  apps: [
    {
      name: "travis-backend",
      script: "./dist/server.js",
      exec_mode: "fork",
      instances: 1,
      watch: ["src"],
      ignore_watch: ["node_modules", "dist", ".git"],
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
