"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ResultCard } from "@/components/ui/resultCard"
import React, { useState, useEffect, use, useRef } from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import "./styles.css"

export default function Page({params}) {
  const [add, setAdd] = useState([])
  useEffect(() =>{
    const items = [];
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      if (key === "1" || key === "2" || key === "4" || key === "5"){
          total = total + parseInt(value[0])
          const item = <ResultCard hidden selector="short" key={key} title={`Question ${key}`} mark={`${value[0]}`}/>
          items.push(item)
      }
      else if (key === "3" || key === "6"){
        total = total + parseInt(value[0])
        const item = (<>
          <ResultCard hidden selector="analysis" key={key} title={`Question ${key}`} mark={`${value[0]}/10`} additional={`Level: ${value[2]}`} more={`${value[3]}`}/>
          <ResultCard hidden selector="analysis" key={`a${key}`} title={`Question ${key}`} mark="Points Missed" additional={`${value[1]}`}/>
          <ResultCard hidden selector="analysis" key={`b${key}`} title={`Question ${key}`} mark="Weaknesses" additional={`${value[4]}`} />
          <ResultCard hidden selector="analysis" key={`c${key}`} title={`Question ${key}`} mark="Final Verdict" additional={`${value[5]}`}/>
        </>)
        items.push(item)
      }
      else if (key === "7"){
        total = total + parseInt(value[0])
        const item = (<>
          <ResultCard hidden selector="comparison" key={key} title={`Question ${key}`} mark={`${value[0]}/15`} additional={`Level: ${value[2]}`} more={`${value[3]}`}/>
          <ResultCard hidden selector="comparison" key={`a${key}`} title={`Question ${key}`} mark="Points Missed" additional={`${value[1]}`}/>
          <ResultCard hidden selector="comparison" key={`b${key}`} title={`Question ${key}`} mark="Weaknesses" additional={`${value[4]}`} />
          <ResultCard hidden selector="comparison" key={`c${key}`} title={`Question ${key}`} mark="Final Verdict" additional={`${value[5]}`}/>
        </>)
        items.push(item)
      }
      else if (key === "8"){
        total = total + parseInt(value[3])
        const item = (<>
          <ResultCard hidden selector="secB" key={key} title={`Question ${key}`} mark={`${value[3]}/30`} additional={`Points Missed: ${value[13]}`} more={`${value[14]}`}/>
          <ResultCard hidden selector="secB" key={`a${key}`} title={`AO1`} mark={`${value[0]}/10`} additional={`Level: ${value[4]}`} more={`${value[5]}`} anotherOne={`Improvements to make: ${value[6]}`}/>
          <ResultCard hidden selector="secB" key={`b${key}`} title={`AO4`} mark={`${value[1]}/12`} additional={`Level: ${value[7]}`} more={`${value[8]}`} anotherOne={`Improvements to make: ${value[9]}`}/>
          <ResultCard hidden selector="secB" key={`c${key}`} title={`AO5`} mark={`${value[2]}/8`} additional={`Level: ${value[10]}`} more={`${value[11]}`} anotherOne={`Improvements to make: ${value[12]}`}/>
        </>)
        items.push(item)
      }
      else if (key === "9"){
        total = total + parseInt(value[2])
        const item = (<>
          <ResultCard hidden selector="secC" key={key} title={`Question ${key}`} mark={`${value[2]}/30`} additional={`${value[9]}`}/>
          <ResultCard hidden selector="secC" key={`a${key}`} title={`AO4`} mark={`${value[0]}/20`} additional={`Level: ${value[3]}`} more={`${value[4]}`} anotherOne={`Improvements to make: ${value[5]}`}/>
          <ResultCard hidden selector="secC" key={`b${key}`} title={`AO5`} mark={`${value[1]}/10`} additional={`Level: ${value[6]}`} more={`${value[7]}`} anotherOne={`Improvements to make: ${value[8]}`}/>
        </>)
        items.push(item)
      }
    }

    const item = (<>
      <ResultCard hidden selector="overview" key="final" title={`Overall Performance`} mark={`${total}/100`}/>
      </>)
    items.push(item)
    const extra = (<>
      <ResultCard hidden selector="download" key="download" additional={`Your answers are being downloaded in the form of a JSON file`}/>
      </>)
    items.push(extra)
    setAdd(items);
  }, [])
  const {choice} = use(params)
  let downloaded = useRef(false);
  useEffect(()=>{
    if (choice === "download" && !downloaded.current){
        downloaded.current = true;
        let answers = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          const value = sessionStorage.getItem(key);
          answers.push({  Question: key, Answer: value });
        }
        const blob = new Blob([JSON.stringify(answers, null, 2)], { type: "application/json" }); //Essentially a file
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "answers.json";
        link.click();
      
        URL.revokeObjectURL(url);
        document.querySelectorAll(`[data-topic="${choice}"]`).forEach(card => {
          card.classList.remove("hidden");
          card.classList.add("flex");
      })
    }
    else{
      document.querySelectorAll(`[data-topic="${choice}"]`).forEach(card => {
          card.classList.remove("hidden");
          card.classList.add("flex");
      })
    }
  });
  return (
    <>
      <SidebarProvider 
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}>
        <AppSidebar variant="inset"  />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-lightred sm:bg-gradient-to-l from-red-500 via-lightred to-red-900">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="font-[Coolvetica] *:data-[slot=card]:bg-transparent *:data-[slot=card]:text-white grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                      {add}
                    </div>
                </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}