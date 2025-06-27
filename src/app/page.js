"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { CheckIcon, ChevronsUpDownIcon, AlertCircleIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const years = [{label:"Jan 2019 R",value:"jan 2019 r"},{label:"Jan 2019",value:"jan 2019"},{label:"Jan 2020 R",value:"jan 2020 r"},{label:"Jan 2020",value:"jan 2020"},{label:"Jan 2022 R",value:"jan 2022 r"},{label:"Jan 2022",value:"jan 2022"},{label:"Jan 2023 R",value:"jan 2023 r"},{label:"Jan 2023",value:"jan 2023"},{label:"June 2018 R",value:"june 2018 r"},{label:"June 2018",value:"june 2018"},{label:"June 2019 R",value:"june 2019 r"},{label:"June 2019",value:"june 2019"},{label:"June 2020 R",value:"june 2020 r"},{label:"June 2020",value:"june 2020"},{label:"June 2021",value:"june 2021"},{label:"June 2022 R",value:"june 2022 r"},{label:"June 2022",value:"june 2022"},{label:"June 2023 R",value:"june 2023 r"},{label:"June 2023",value:"june 2023"},{label:"Oct 2021",value:"oct 2021"}]

export default function Combobox() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [alertStatus, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(<Button className="bg-darkred w-full sm:w-fit" type="submit">Fetch</Button>);
  useEffect(()=>{localStorage.clear();}, [])

  function handleSubmit(event){    
    event.preventDefault();
    if (!value) {
      setAlert(true)
    }
    else{
      setLoading(<Button className="bg-darkred w-full sm:w-fit" type="submit"> <LoaderCircle className="animate-spin"/> Loading</Button>)
      const yearObject = years.find(year => year.value === value);
      const year = yearObject.label;
      router.push(`/exam/${encodeURIComponent(year)}`);
    }
  }

  return (
    <>
      <div className={alertStatus ? "opacity-100 transition-all top-5 left-2 absolute" : "opacity-0 transition-all top-5 left-0 absolute"}>
        <Alert variant="destructive" className="flex w-fit border-stone-700 bg-zinc-900">
          <AlertCircleIcon className="stroke-lred"/>
          <AlertTitle className="text-lred">Please select a year!</AlertTitle>
        </Alert>
      </div>
    
      <div className=" flex flex-col m-10 md:m-20 lg:m-40 font-[Coolvetica] relative top-50 lg:top-0">
        <p className="font-[Lemon_Milk] text-4xl md:text-8xl lg:text-9xl text-white">Marking Companion</p>
        <form onSubmit={handleSubmit} className="flex sm:flex-row flex-col justify-start gap-2 sm:p-2 sm:items-center items-start sm:border-l-10">
          <p className="font-[Coolvetica] text-xl text-white">Choose a paper to do:</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full sm:w-[250px] justify-between text-lg"
              >
                {value
                  ? years.find((year) => year.value === value)?.label
                  : "Search for a year"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 font-[Coolvetica]">
              <Command>
                <CommandInput />
                <CommandList>
                  <CommandEmpty>No year found</CommandEmpty>
                  <CommandGroup>
                    {years.map((year) => (
                      <CommandItem
                        key={year.value}
                        value={year.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                          setAlert(false)
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === year.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {year.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {loading}
        </form>
      </div>
    </>
  )
}
