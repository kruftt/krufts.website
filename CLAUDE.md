# krufts.website

Next.js (app router) + Tailwind + three.js / `@react-three/fiber`. Package
manager: **bun**.

## Verification

Do not run `bun run build` or `bun run dev`, and do not start a dev server or any
other long-running process. The user runs these manually and will report back.

Verify work with `bunx tsc --noEmit`.

Anything visual or interactive — 3D scenes, drag handles, layout — cannot be
checked here; there is no browser automation in this environment. Say plainly
what needs clicking through and let the user test it.
