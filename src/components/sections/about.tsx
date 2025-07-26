import { cn } from "@/lib/utils"
import { ExternalLink } from "../ui/external-link"
import { AnimatedHeart } from "../animated-heart"

export function About({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 text-muted-foreground text-sm",
        className,
      )}
    >
      <h2 className="text-base font-medium text-foreground">
        I develop elegant, user-centered, and visually appealing applications.{" "}
        You can find me on{" "}
        <ExternalLink
          href="https://x.com/dgaievskyi"
          className="dark:text-muted-foreground "
        >
          X
        </ExternalLink>
        ,{" "}
        <ExternalLink
          href="https://t.me/designbeng"
          className="dark:text-muted-foreground "
        >
          Telegram
        </ExternalLink>
        ,{" "}
        <ExternalLink
          href="https://www.linkedin.com/in/gaievskyi/"
          className="dark:text-muted-foreground "
        >
          LinkedIn
        </ExternalLink>
        , and{" "}
        <ExternalLink
          href="https://github.com/gaievskyi"
          className="dark:text-muted-foreground "
        >
          GitHub
        </ExternalLink>
        .
      </h2>
      <p className="text-base font-medium text-foreground">
        With background in front-end development, I consider myself a designer
        at <AnimatedHeart /> and enjoy building highly polished products, where
        every detail matters.
      </p>
      <p>
        I like projects where design and code naturally flow together, so that
        nothing gets{" "}
        <span className="font-heldane text-[15px] italic">
          lost during implementation.
        </span>
      </p>
      <p>
        I’m drawn to experiments. I dive in fast, and explore broadly. Whether
        I’m shaping early ideas, refining products in production, or crafting
        visuals for one-off moments, I make sure everything feels and looks
        excellent.
      </p>
    </div>
  )
}
