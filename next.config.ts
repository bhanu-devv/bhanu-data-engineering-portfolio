import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` otherwise appends an agent-instructions block to CLAUDE.md on every run.
  // CLAUDE.md is a hand-written, protected project file; the framework must not edit it.
  agentRules: false,
};

export default nextConfig;
