"use client"
import { redirect } from 'next/navigation'
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items
}) {
  function handleClick(event){
    redirect(`/results/${event.currentTarget.id}`)
  }
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className={ item.available ? "block z-5":"hidden"} id={item.id} onClick={handleClick}>
                <SidebarMenuButton tooltip={item.title} className="text-white font-[Coolvetica] text-lg hover:bg-gradient-to-l hover:from-red-900 hover:to-white/40 hover:text-white">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
