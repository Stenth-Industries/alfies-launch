/** @type {import('next').NextConfig} */
const nextConfig = {
  // The age-gate middleware (src/middleware.ts) blocks any request that
  // doesn't carry the verification cookie, including /_next/image's own
  // internal re-fetch of the source file. That re-fetch never carries the
  // browser's cookies, so every optimized image 404s regardless of gate
  // status. Serving the raw files directly sidesteps that internal
  // round-trip entirely.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
