import FuzzyText from "@/components/fuzzy-text"
import * as m from "motion/react-m"

export function NotFound() {
  return (
    <m.div
      initial={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex size-full flex-col gap-4"
    >
      <FuzzyText fontSize={200}>404</FuzzyText>
      <FuzzyText fontSize={85} fontFamily="Heldane" className="ml-2">
        not found
      </FuzzyText>
    </m.div>
  )
}
