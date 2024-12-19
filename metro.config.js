const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
// Ensure .mp4 is properly included in asset extensions
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "mp4"
); // Avoid duplicates
config.resolver.assetExts.push("mp4");
module.exports = withNativeWind(config, { input: "./global.css" });
