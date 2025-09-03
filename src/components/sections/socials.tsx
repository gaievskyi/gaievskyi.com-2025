import abstract1 from "@/../public/images/abstract-1.avif"
import abstract2 from "@/../public/images/abstract-2.avif"
import abstract3 from "@/../public/images/abstract-3.avif"
import { ExternalLink } from "@/components/ui/external-link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Text } from "@/components/ui/typography/text"
import Image from "next/image"

export function Socials() {
  return (
    <Text color="muted">
      You can find me on{" "}
      <Tooltip>
        <TooltipTrigger
          render={
            <ExternalLink
              href="https://x.com/dgaievskyi"
              className="dark:text-foreground dark:hover:text-white"
            >
              X
            </ExternalLink>
          }
        />
        <TooltipContent className="text-sm">
          <Image
            loading="lazy"
            src={abstract1}
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video h-[130px] w-full rounded object-cover"
          />
          <p className="my-2">I tweet tweets.</p>
          <a
            href="https://x.com/dgaievskyi"
            className="underline underline-offset-2"
            target="_blank"
          >
            @dgaievskyi
          </a>
        </TooltipContent>
      </Tooltip>
      ,{" "}
      <Tooltip>
        <TooltipTrigger
          render={
            <ExternalLink
              href="https://t.me/designbeng"
              className="dark:text-foreground dark:hover:text-white"
            >
              Telegram
            </ExternalLink>
          }
        />
        <TooltipContent className="text-sm">
          <Image
            loading="lazy"
            src={abstract2}
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video h-[130px] w-full rounded object-cover"
          />
          <p className="my-2">I post posts.</p>
          <a
            href="https://t.me/designbeng"
            className="underline underline-offset-2"
            target="_blank"
          >
            @designbeng
          </a>
        </TooltipContent>
      </Tooltip>
      , and{" "}
      <Tooltip>
        <TooltipTrigger
          render={
            <ExternalLink
              href="https://github.com/gaievskyi"
              className="dark:text-foreground dark:hover:text-white"
            >
              GitHub
            </ExternalLink>
          }
        />
        <TooltipContent className="text-sm">
          <Image
            loading="lazy"
            src={abstract3}
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video h-[130px] w-full rounded object-cover"
          />
          <p className="my-2">I code codes.</p>
          <a
            href="https://github.com/gaievskyi"
            className="underline underline-offset-2"
            target="_blank"
          >
            @gaievskyi
          </a>
        </TooltipContent>
      </Tooltip>
      .
    </Text>
  )
}
