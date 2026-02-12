import type { NextConfig } from "next";
import { execSync } from "child_process";

// Get git commit hash at build time
const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: process.env.NEXT_PUBLIC_GIT_HASH || getGitHash(),
  },
};

export default nextConfig;
