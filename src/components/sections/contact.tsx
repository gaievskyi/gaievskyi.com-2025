import { cn } from "@/lib/utils"

export function Contact({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "gap-5 mt-4 flex flex-col text-muted-foreground text-sm",
        className,
      )}
    >
      <p>
        If you share this vision, and are looking for a partner to push your
        product forward, reach out at{" "}
        <a
          href="mailto:daniel@gaievskyi.com"
          className="hover:text-brand font-medium underline decoration-1"
        >
          daniel@gaievskyi.com
        </a>
        .
      </p>
      <h2>Based in Poland, available remotely worldwide.</h2>
    </div>
  )
}
