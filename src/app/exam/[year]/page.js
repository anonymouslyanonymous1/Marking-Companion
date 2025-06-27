"use client"
import { useState, use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Answer } from "@/components/ui/answer"
import { Label } from "@/components/ui/label"
import { ChevronsUp, BookMarked, AlarmClock, BellRing, AlertCircleIcon, FileUp } from "lucide-react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import "./styles.css";

export default function exam({params}){
    useEffect(()=>{localStorage.clear();}, [])
    // const searchParams = useSearchParams();
    const[timeCondition, setCondition] = useState("Start");
    const[totalSeconds, settotalSeconds] = useState(3*60*60);
    const[pulse, setPulse] = useState(false);
    const[banner, setBanner] = useState(false);
    const[timeDuration, setTime] = useState("3:00:00"); // hours, minutes, seconds
    let newDuration = useRef(null);
    function handleTimer(){
        if (timeCondition === "Pause"){
            setCondition("Resume");
            clearInterval(newDuration.current);
            newDuration.current = null;
        }
        else {
            if (timeCondition !== "Better luck next time!"){
                setCondition("Pause")
            };
            newDuration.current = setInterval(() => { // This is to prevent totalSeconds being stale
                settotalSeconds(prev => { 
                    if (prev <= 0) {
                        clearInterval(newDuration.current);
                        setTime("Time Over");
                        setPulse(true);
                        setBanner(true);
                        setCondition("Better luck next time!");
                        setTimeout(() => {
                            setBanner(false);
                        }, 5000);
                        return 0;
                    }

                    const updated = prev - 1;

                    const hours = Math.floor(updated / 3600);
                    const minutes = Math.floor((updated % 3600) / 60);
                    const seconds = updated % 60;

                    const display =
                        String(hours).padStart(2, '0') + ':' +
                        String(minutes).padStart(2, '0') + ':' +
                        String(seconds).padStart(2, '0');

                    setTime(display);
                    return updated;
                });
            }, 1000);

        }
    }
    const router = useRouter();
    const {year} = use(params);
    const [content,setContent] = useState("")
    // useEffect ensures data is fetched only once component is ready 
    useEffect(() => {
        fetch(`/api/data?year=${year}&desire=qp`)
        .then(response => response.json())
        .then(data => {setContent(data.content)});
    });
    const[essay,setEssay]=useState({
        question:"",
        title:""
    });
    function handleRadio(event){
        let id = event.target.id
        switch (id){
            case "r1":
                id = "9";
                break;
            case "r2":
                id = "10";
                break;
            case "r3":
                id = "11";
                break;
        }
        setEssay({
            question: id,
            title:event.target.value
        })
    }
    let questions = [];
    let q = content.split("\n\n");
    for (let i = 0; i < q.length; i++){
        if (q[i] !== ""){
            questions.push(q[i]);
        }
    };
    function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
    }


    const [alertStatus, setAlert] = useState(false);    
    // if (sessionStorage.getItem("9") !== "" && essay.title === "") {
    //     setAlert(true)
    // }
    // else{
    //     setAlert(true)
    // }
    const [moveOn, setMoveon] = useState(true);
    useEffect(() =>{
        if (sessionStorage.getItem("9") !== "" && essay.title !== ""){
            setAlert(false)
            setMoveon(true)
        }
    }, [essay.title])
    async function handleAnswers(){
        if (sessionStorage.getItem("9") !== "" && essay.title === "") {
            setAlert(true)
            setMoveon(false)
        }
        else {
        // const allData = {};
            router.push("/wait")
            let fetches = [];
            let responses = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                if (value !== ""  && (key === "1" || key === "2" || key === "4" || key === "5")){
                    await sleep(1500);
                    const fp = fetch(`/api/gemini/small?year=${year}&QN=${key-1}&ANS=${encodeURIComponent(value)}`)
                    .then(response=> response.json())
                    .then(data=>{
                        responses.push([key, data.response])
                    });
                    fetches.push(fp);

                }
                else if (value !== ""  && (key === "3" || key === "6")){
                    await sleep(1500);
                    const fp = fetch(`/api/gemini/analysis?year=${year}&QN=${key-1}&ANS=${encodeURIComponent(value)}`)
                    .then(response=> response.json())
                    .then(data=>{
                        responses.push([key, data.response])
                    });
                    fetches.push(fp);
                }
                else if (value !== "" && key === "7"){
                    await sleep(1500);
                    const fp = fetch(`/api/gemini/comparison?year=${year}&QN=${key-1}&ANS=${encodeURIComponent(value)}`)
                    .then(response=> response.json())
                    .then(data=>{
                        responses.push([key, data.response])
                    });
                    fetches.push(fp);
                }
                else if (value !== "" && key === "8"){
                    await sleep(1500);
                    const fp = fetch(`/api/gemini/secB?year=${year}&QN=${key-1}&ANS=${encodeURIComponent(value)}`)
                    .then(response=> response.json())
                    .then(data=>{
                        responses.push([key, data.response])
                    });
                    fetches.push(fp);
                }
                else if (value !== "" && key === "9"){
                    await sleep(1500);
                    const fp = fetch(`/api/gemini/secC?year=${year}&QN=${essay.question}&title=${encodeURIComponent(essay.title)}&ANS=${encodeURIComponent(value)}`)
                    .then(response=> response.json())
                    .then(data=>{
                        responses.push([key, data.response])
                    });
                    fetches.push(fp);
                }
            }
            Promise.all(fetches).finally(() => {
                responses.sort((a, b) => a[0] - b[0]);                
                responses.forEach(response => {
                    localStorage.setItem(response[0], response[1]);
                });
                router.push("/results/overview");
            });
        }
    }
    return (
        <>
            <div className={alertStatus ? "opacity-100 transition-all top-5 left-2 fixed z-5" : "opacity-0 transition-all top-5 left-0 fixed z-5"}>
                <Alert variant="destructive" className="flex w-fit border-stone-700 bg-zinc-900">
                    <AlertCircleIcon className="stroke-lred"/>
                    <AlertTitle className="text-lred">You haven't selected a title for Section C!</AlertTitle>
                </Alert>
            </div>
            
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="secondary" className="cursor-pointer rounded-[100%] w-10 h-10 fixed m-5 right-0 bottom-12 z-2">
                        <AlarmClock className=" stroke-lred" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                    <DrawerTitle className={pulse ? "animate-bounce text-darkred":""}>{timeDuration}</DrawerTitle>
                    <DrawerDescription>Timing yourself helps adapt to exam conditions!</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                    <Button className={pulse ? "bg-vred hover:bg-lightred/90 text-white":"bg-lightred hover:bg-lightred/90 text-white"} onClick={handleTimer}>{timeCondition}</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="cursor-pointer rounded-[100%] w-10 h-10 fixed m-5 right-0 bottom-0 z-2">
                        <BookMarked className=" stroke-lred" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md flex flex-col items-start">
                    <DialogHeader>
                        <DialogTitle>Source Booklet, Extracts</DialogTitle>
                        <DialogDescription>
                            Use the following to answer the questions
                        </DialogDescription>
                        <Button variant="outline" asChild>
                            <a href={`/Data/ExtractPDFs/${year}.pdf`} target="_blank" rel="noopener noreferrer">
                                Open PDF in new tab
                            </a>
                        </Button>
                    </DialogHeader>
                        <div className="w-fit sm:w-full h-fit">
                            <iframe src={`/Data/ExtractPDFs/${year}.pdf`} className="w-full h-[60vh] border rounded"></iframe>
                        </div>
                </DialogContent>
            </Dialog>
            <div className={banner ? "opacity-100 transition-all top-5 left-2 fixed z-2" : "opacity-0 transition-all top-5 left-2 fixed z-2"}>
                <Alert variant="destructive" className="flex w-fit border-stone-700 bg-zinc-900">
                    <BellRing className="stroke-lred"/>
                    <AlertTitle className="text-lred">Time's up!</AlertTitle>
                </Alert>
            </div>
            <div className="sm:m-20 m-10 font-[Coolvetica] text-white flex flex-col gap-5 justify-start justify-items-start items-start relative">
                <p className="font-[Lemon_Milk] text-4xl lg:text-6xl">Section A</p>
                <p className="font-[Lemon_Milk] text-sm lg:text-xl">Read Text One in the Extracts Booklet, and answer the next 3 questions</p>
                <Answer question={questions[0]} qn="1"/>
                <Answer question={questions[1]} qn="2"/>
                <Answer question={questions[2]} qn="3"/>
                <p className="font-[Lemon_Milk] text-sm lg:text-xl">Read Text Two in the Extracts Booklet, and answer the next 3 questions</p>
                <Answer question={questions[3]} qn="4"/>
                <Answer question={questions[4]} qn="5"/>
                <Answer question={questions[5]} qn="6"/>
                <Answer question={questions[6]} qn="7"/>
                <p className="font-[Lemon_Milk] text-4xl lg:text-6xl">Section B</p>
                <Answer question={questions[7]} qn="8"/>
                <p className="font-[Lemon_Milk] text-4xl lg:text-6xl">Section C</p>
                <div className="border-l-10 p-2">
                    <p className="font-[Lemon_Milk] text-sm lg:text-lg">Write approximately 400 words for the following: </p>
                    <RadioGroup defaultValue="" className="fill-red-50">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem onClick={handleRadio} className="dotty lg:border-2 lg:p-2 has-[svg]:bg-darkred" value={questions[8]} id="r1" />
                        <Label className="text-sm lg:text-lg" htmlFor="r1">{questions[8]}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem onClick={handleRadio} className="dotty lg:border-2 lg:p-2 has-[svg]:bg-darkred" value={questions[9]} id="r2" />
                        <Label className="text-sm lg:text-lg" htmlFor="r2">{questions[9]}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem onClick={handleRadio} className="dotty lg:border-2 lg:p-2 has-[svg]:bg-darkred" value={questions[10]} id="r3" />
                        <Label className="text-sm lg:text-lg" htmlFor="r3">{questions[10]}</Label>
                    </div>
                    </RadioGroup>
                </div>
                <Answer secC qn="9"/>
                <Button className={moveOn ? "bg-darkred text-white mb-5" : "hidden"} onClick={handleAnswers}>
                    <ChevronsUp className=" stroke-red-300" />
                    Submit
                </Button>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="triggerR hidden cursor-pointer rounded-[100%] w-10 h-10 fixed m-5 right-0 bottom-30 z-2">
                        <BookMarked className=" stroke-lred" />
                    </Button>
                </DialogTrigger>
            </Dialog>
        </>
    );
}