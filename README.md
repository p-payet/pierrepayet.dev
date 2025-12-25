# pierrepayet.dev

👋 Welcome to the source code of my [personal site](https://pierrepayet.dev).

## Installation

How to get this site running locally:

- `git clone https://github.com/p-payet/pierrepayet.dev`
- `pnpm install`
- To develop the site: `pnpm dev`
- To build the site for production: `pnpm build`
- The site should now be running at http://localhost:3000

## Package manager security

This project uses pnpm with three security controls to protect against supply chain attacks:

| Setting | Value | Purpose |
|---------|-------|---------|
| `strictDepBuilds` | `true` | Blocks lifecycle scripts (e.g., `postinstall`) in dependencies unless explicitly allowed |
| `minimumReleaseAge` | `10080` (7 days) | Prevents installing packages published less than 7 days ago, giving time to detect malicious releases |
| `trustPolicy` | `no-downgrade` | Prevents downgrading to older, potentially vulnerable versions |

These settings are configured in `pnpm-workspace.yaml`.

For more details on this security protocol, see the pnpm blog: https://pnpm.io/blog/2025/12/05/newsroom-npm-supply-chain-security

Thanks to Alex Pate for the original source code: https://github.com/alexpate/www.
