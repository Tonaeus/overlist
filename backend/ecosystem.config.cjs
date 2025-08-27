module.exports = {
  apps: [
    {
      name: "server",
      script: "./dist/server.js",
      cwd: "/home/tony/overlist/backend",
      env: {
        NODE_ENV: "dev",
      },
      env_prod: {
        NODE_ENV: "prod",
      },
    },
  ],
};
