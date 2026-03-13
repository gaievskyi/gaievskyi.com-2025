# Portfolio

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Website of [Daniel](https://gaievskyi.com/) (2025).

![Vercel](https://readmebadge.vercel.app/badges/vercel.svg)
![Next.js](https://readmebadge.vercel.app/badges/nextjs.svg)
![React](https://readmebadge.vercel.app/badges/react.svg)
![Typescript](https://readmebadge.vercel.app/badges/typescript.svg)
![Tailwind CSS](https://readmebadge.vercel.app/badges/tailwind.svg)

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/) and [Bun](https://bun.sh/)
- Create a `.env.local` file with your environment variables using template:

  ```bash
  grep -v '^#' .env.example | grep -v '^$' > .env.local
  ```

  or pull from Vercel using CLI:

  ```bash
  vercel env pull
  ```

### Available Scripts

```bash
bun run dev # Start development server
bun run start # Start production server
bun run build # Build for production
bun run preview # Build and start production server
bun run lint # Run eslint
bun run format # Format with oxcfmt
bun run format:check # Check formatting with oxcfmt
bun run typecheck # Run tsc
bun run clean # Clean project
bun run sprite # Build SVG sprite
bun run analyze # Analyze bundle
bun run inspect # Debug with node inspector
```

## Learn More

To learn more about the project, take a look at the following resources:

- [React](https://react.dev/) — library for web and native user interfaces
- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial
- [Learn PayloadCMS](https://payloadcms.com/docs/getting-started/what-is-payload) — headless CMS for Next.js

## License

See [LICENSE.md](./LICENSE.md) for details.

---

Built with ❤️
