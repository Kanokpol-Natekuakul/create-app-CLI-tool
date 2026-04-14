export function getConfig({ stackName, hasAddon }) {
  const lines = [];

  // Common
  lines.push('# ─── Application ───────────────────────');
  lines.push('NODE_ENV=development');
  lines.push('PORT=3000');
  lines.push('');

  if (stackName === 'react' || stackName === 'vue') {
    lines.push('# ─── Frontend (Vite) ───────────────────');
    lines.push('# Vite exposes env vars prefixed with VITE_');
    lines.push('VITE_APP_TITLE={{projectName}}');
    lines.push('VITE_API_URL=http://localhost:3000/api');
    lines.push('');
  }

  if (stackName === 'node') {
    lines.push('# ─── Backend ───────────────────────────');
    lines.push('JWT_SECRET=change-me-to-a-random-string');
    lines.push('CORS_ORIGIN=http://localhost:5173');
    lines.push('');

    if (hasAddon.prisma) {
      lines.push('# ─── Database (Prisma) ─────────────────');
      lines.push('DATABASE_URL="file:./dev.db"');
      lines.push('');
    }
  }

  const envContent = lines.join('\n');

  return {
    configFiles: {
      '.env.example': envContent,
    },
  };
}
