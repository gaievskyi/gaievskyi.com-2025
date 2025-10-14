import { createSvgSpriteBuilder } from "@neodx/svg"

const builder = createSvgSpriteBuilder({
  inputRoot: "src/assets",
  output: "public/sprites",
  fileName: "{name}.{hash:8}.svg",
  metadata: "sprite.gen.ts",
  group: true,
})

await builder.load("**/*.svg")
await builder.build()
