

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Generate an HTML file for your application with a <script> injected.
      new HtmlWebpackPlugin({
        template: "./index.html",
        chunks: ["main", "install"],
      }),

      // Generate the manifest for PWA.
      new WebpackPwaManifest({
        filename: "manifest.json", // specify the output directory here
        publicPath: "/",
        name: "My PWA Text Editor",
        short_name: "TextEditorPWA",
        description: "A simple PWA Text Editor",
        background_color: "#ffffff",
        crossorigin: "use-credentials", // can be null, use-credentials or anonymous
        fingerprints: false,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Workbox configuration to generate the service worker.
      new InjectManifest({
        swSrc: "./src-sw.js", // your custom service worker file
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};

