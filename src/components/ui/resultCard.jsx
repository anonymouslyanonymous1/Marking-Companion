import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ResultCard(props) {
  let hidden = false
  if(props.hidden){
      hidden = true
  }
  return (
    <Card data-topic={props.selector} className={hidden ? "hidden @container/card flex-col gap-0":"@container/card flex flex-col gap-0"}>
        <CardHeader>
          <CardDescription className="text-white">{props.title}</CardDescription>
          <CardTitle className="text-2xl font-[Lemon_Milk] tabular-nums @[250px]/card:text-4xl">
            {props.mark}
          </CardTitle>
      
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 ">
          <div className="line-clamp-1 flex gap-2 font-medium text-base">
            {props.additional}
          </div>
          <div className="text-white text-base">
            {props.more}
          </div>
          <div className="text-white text-base">
            {props.anotherOne}
          </div>
        </CardFooter>
    </Card>
  );
}
