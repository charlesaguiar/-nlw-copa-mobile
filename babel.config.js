module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@containers": "./src/containers",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
            "@lib": "./src/lib",
            "@models": "./src/models",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
          },
        },
      ],

      "inline-dotenv",
    ],
  };
};
