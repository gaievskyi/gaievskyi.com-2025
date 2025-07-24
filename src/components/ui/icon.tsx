import { cn } from "@/lib/utils"
import { type ComponentProps, useMemo } from "react"
import {
  type SpritePrepareConfig,
  sprites,
  type SpritesMeta,
} from "@/../sprite.gen"

export type IconProps = ComponentProps<"svg"> & {
  /** e.g. "sprite:close" */
  name: IconName
  /**
   * Inverts main scaling axis.
   * By default, it will be scaled by the maximum value of width and height to prevent layout explosion,
   * but you can invert it to scale by the minimum value.
   *
   * @example
   * Let's say we have the following conditions:
   * - our icon is 16x32 (width x height)
   * - our text is 16px
   *
   * Depending on the value of `invert` prop, the icon will be rendered as:
   * - `false`: 8x16 (height is scaled to fit the text size)
   * - `true`: 16x32 (width is scaled to fit the text size)
   *
   * @default false
   */
  invert?: boolean
}

export type IconName = {
  [Key in keyof SpritesMeta]: `${Key}:${SpritesMeta[Key]}`
}[keyof SpritesMeta]

export const Icon = ({
  name,
  className,
  invert = false,
  ...props
}: IconProps) => {
  const {
    symbol: { viewBox, width, height },
    href,
  } = useMemo(() => getIconMeta(name), [name])
  const scaleX = width > height
  const scaleY = width < height

  return (
    <svg
      className={cn(
        {
          /**
           * We want to control the icon's size based on its aspect ratio because we're scaling it
           * by the maximum value of width and height to prevent layout explosion.
           *
           * Also, different classes were chosen to avoid CSS overrides collisions.
           *
           * @see https://github.com/secundant/neodx/issues/92
           */
          "icon-x": invert ? scaleY : scaleX,
          "icon-y": invert ? scaleX : scaleY,
          icon: width === height,
        },
        className,
      )}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={href} />
    </svg>
  )
}

const getIconMeta = (name: IconName) => {
  const [spriteName, iconName] = name.split(":")
  const item = sprites.experimental_get(spriteName!, iconName!, spritesConfig)

  if (!item) {
    console.error(`Icon "${name}" is not found in "${spriteName}" sprite`)
    return sprites.experimental_get("general", "help", spritesConfig)!
  }
  return item
}

const spritesConfig: SpritePrepareConfig = {
  baseUrl: "/sprites/",
}
