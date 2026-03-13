import { cn } from "@/lib/utils"

export function CrossBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <svg
        className="absolute top-[-6.5px] left-[-6.5px] z-1"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
      </svg>
      <svg
        className="absolute bottom-[-6.5px] left-[-6.5px] z-1"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
      </svg>
      <svg
        className="absolute top-[-6.5px] right-[-6.5px] z-1"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
      </svg>
      <svg
        className="absolute right-[-6.5px] bottom-[-6.5px] z-1"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
      </svg>
    </div>
  )
}
