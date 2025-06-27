"use client"
import Image from 'next/image'
import * as React from "react"
import { Zap, Pin, PencilRuler, Sparkle, ScanSearch, FileStack, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconTextGrammar } from '@tabler/icons-react'
import { animateMini } from 'motion'

export function AppSidebar({
  ...props
}) {
  const[data,setData] = useState([
    {
      title: "Overview",
      icon: Pin,
      id: "overview",
      available: true
    },
    {
      title: "Short Questions",
      icon: Zap,
      id: "short",
      available: false,
    },
    {
      title: "Analysis",
      icon: ScanSearch,
      id: "analysis",
      available: false,
    },
    {
      title: "Comparison",
      icon: FileStack,
      id: "comparison",
      available: false,
    },
    {
      title: "Section B",
      id: "secB",
      icon: Sparkle,
      available: false,
    },
    {
      title: "Section C",
      id: "secC",
      icon: PencilRuler,
      available: false,
    },
    {
      title: "Download your answers",
      id: "download",
      icon: Download,
      available: true,
    }])
    useEffect(() => {
    let duplicateData = [...data];  // copy once

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      if (value !== "" && key !== "9" && ["1", "2", "4", "5"].includes(key)) {
        duplicateData = duplicateData.map(item =>
          item.title === "Short Questions" ? { ...item, available: true } : item
        );
      }
      else if (value !== "" && key !== "9" && ["3", "6"].includes(key)) {
        duplicateData = duplicateData.map(item =>
          item.title === "Analysis" ? { ...item, available: true } : item
        );
      }
      else if (value !== "" && key === "7") {
        duplicateData = duplicateData.map(item =>
          item.title === "Comparison" ? { ...item, available: true } : item
        );
      }
      else if (value !== "" && key === "8") {
        duplicateData = duplicateData.map(item =>
          item.title === "Section B" ? { ...item, available: true } : item
        );
      }
      else if (value !== "" && key === "9") {
        duplicateData = duplicateData.map(item =>
          item.title === "Section C" ? { ...item, available: true } : item
        );
      }
    }

    setData(duplicateData);  // We try to call set outside of loops. The change is async and won't occur within loop
  }, []);
  return (
    <Sidebar className="bg-gradient-to-r from-lightred to-red-900" collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-gradient-to-r from-lightred to-red-900">
        <SidebarMenu className="bg-gradient-to-r from-lightred to-red-900" >
          <SidebarMenuItem >
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5  hover:bg-gradient-to-l hover:from-red-900 hover:to-white/40">
              <a href="/">
                <Image
                  src="/handdiff.svg"
                  width={30}
                  height={30}
                  alt="logo"
                />
                <span className="text-base text-white font-[Lemon_Milk] font-semibold">Marking Companion</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-r from-lightred to-red-900">
        <NavMain items={data}  />
      </SidebarContent>
    </Sidebar>
  );
}
