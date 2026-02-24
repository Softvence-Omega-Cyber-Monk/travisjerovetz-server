module.exports = {
  apps: [
    {
      name: "travis-backend",
      script: "./dist/server.js",
      exec_mode: "fork",
      instances: 1,
      watch: ["dist"],
      ignore_watch: ["node_modules", ".git", "src"],
      watch_delay: 500,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
