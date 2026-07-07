import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

/*
// code for standard .js file, commented out because switched to .mjs file for ESM
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");

initOpenNextCloudflareForDev();

module.exports = {
  typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true }
}; */

/*
/** @type {import('next').NextConfig} * /
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig; */