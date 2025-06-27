import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconBrandGithub } from '@tabler/icons-react';
export function SiteHeader() {
  return (
    <header
      className="bg-lightred sm:bg-gradient-to-l from-lred via-lightred to-red-900 flex h-10 sm:h-15 shrink-0 items-center gap-2 border-b transition-all ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15 ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 bg-lightred sm:bg-gradient-to-l from-lred via-lightred to-red-900 text-white">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Results</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="flex">
            <a
              href="https://github.com/anonymouslyanonymous1/Marking-Companion"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              <IconBrandGithub stroke={2} />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
