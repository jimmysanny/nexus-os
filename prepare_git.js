const fs = require('fs');

console.log("🛡️ Preparing safe Git upload...");

const gitignoreContent = `
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# local env files (IMPORTANT: KEEPS KEYS SAFE)
.env*.local
.env
`;

fs.writeFileSync('.gitignore', gitignoreContent);
console.log("✅ .gitignore created. Your keys are safe.");