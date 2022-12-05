/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: ["cloudflare-ipfs.com", "tbi.mypinata.cloud", "localhost"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
