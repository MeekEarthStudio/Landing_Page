/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
  serverExternalPackages: ["firebase-admin", "@google-cloud/bigquery", "@google-cloud/storage"],
  async redirects() {
    return [{ source: "/library", destination: "/blog", permanent: true }];
  },
};

export default nextConfig;
