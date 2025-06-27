import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { ResultCard } from "@/components/ui/resultCard"

export function SectionCards() {
  return (
        <div className="flex flex-1 flex-col bg-lightred sm:bg-gradient-to-l from-lred via-lightred to-red-900">
          <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="font-[Coolvetica] *:data-[slot=card]:bg-transparent *:data-[slot=card]:text-white grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                    <ResultCard/>
                    <ResultCard/>
                    <ResultCard/>
                    <ResultCard/>
                  </div>
              </div>
        </div>
    </div>
    
  );
}
