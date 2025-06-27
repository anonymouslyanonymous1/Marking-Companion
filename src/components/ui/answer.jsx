"use client"
import * as React from "react"            
import { Textarea } from "@/components/ui/textarea"  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScanText, LoaderCircle } from "lucide-react";
import Tesseract from 'tesseract.js';

function Answer(props){
    // const[response, setResponse] = React.useState("");
    const[icon, setIcon] = React.useState(<ScanText/>);
    const[input, setInput] = React.useState(false);
    const [sessionData, setSessionData] = React.useState('');
    React.useEffect(() => {
        saveData("")
    }, []); //run only once after component mounts
    function updateResponse(event){
        sessionStorage.setItem(props.qn, event.target.value);
        setSessionData(event.target.value);
    }
    function saveData(data){
        sessionStorage.setItem(props.qn, data);
        setSessionData(data);
    }
    function handleFileInput(event){
        let works = [];
        for (let i = 0; i < event.target.files.length; i++){
            let file = event.target.files[i]
            setIcon(<LoaderCircle className="animate-spin"/>);
            setInput(true);            
            const work = Tesseract.recognize(file, 'eng')
            .then(result => {
                if(sessionData ==""){
                    saveData(result.data.text)
                }
                else{
                    saveData(prev => prev + result.data.text)
                }
            })
            works.push(work)
        }
        Promise.all(works).finally(()=>{
            setIcon(<ScanText/>);
            setInput(false);
        })
    }
    if (props.secC){
        return(
            <div className="flex flex-col gap-2 w-full">
                <Input disabled={input} id={props.qn} type="file" accept=".png, .jpg, .jpeg" multiple className="hidden" onChange={handleFileInput}/>
                <div className="flex items-start gap-1">
                    <Textarea className="bg-white resize-none text-black w-full h-[200px]" placeholder="Type your answer here. To skip, leave empty." value={sessionData} onChange={updateResponse}/>
                    <Label htmlFor={props.qn} className="cursor-pointer">{icon}</Label>
                </div>
            </div>
        )
    }
    else{
        return(
            <>
                <div className="border-l-10 p-2">
                    <p className="font-[Lemon_Milk] text-xs lg:text-lg">{props.question}</p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Input disabled={input} id={props.qn} type="file" accept=".png, .jpg, .jpeg" multiple className="hidden" onChange={handleFileInput}/>
                    <div className="flex items-start gap-1">
                        <Textarea className="bg-white resize-none text-black w-full h-[200px]" placeholder="Type your answer here. To skip, leave empty." value={sessionData} onChange={updateResponse}/>
                        <Label htmlFor={props.qn} className="cursor-pointer">{icon}</Label>
                    </div>
                </div>
            </>
        )        
    }
}            
export {Answer};
