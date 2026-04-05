import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(req) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const answer = decodeURIComponent(searchParams.get("ANS"));
    const questionIndex = searchParams.get("QN");
    const msResponse = await fetch(`${baseUrl}/api/data?year=${year}&desire=ms`);
    const msData = await msResponse.json();
    const ms = msData.content;
    const qpResponse = await fetch(`${baseUrl}/api/data?year=${year}&desire=qp`);
    const qpData = await qpResponse.json();
    const qp = qpData.content;
    let questions = [];
    let q = qp.split("\n\n");
    for (let i = 0; i < q.length; i++){
        if (q[i] !== ""){
            questions.push(q[i]);
        }
    };
    let markschemes = [];
    let m = ms.split("\n\n");
    for (let i = 0; i < m.length; i++){
        if (m[i] !== ""){
            markschemes.push(m[i]);
        }
    };
    const question = questions[questionIndex]
    const markScheme = markschemes[questionIndex]
    
    const ecResponse = await fetch(`${baseUrl}/api/data?year=${year}&desire=ec`);
    const ecData = await ecResponse.json();
    const ec = ecData.content;

    const filePath =path.join(process.cwd(), `public/Data`, "7_AO3.txt");
    const AO3 = fs.readFileSync(filePath, "utf8");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Forget that you are an AI. 
        Think of yourself as an Edexcel IGCSE English Language B (4EB1) examiner. 
        An answer has been written by a student after reading the following two extracts "${ec}" 
        \n Then using BOTH texts, the student answered the question "${question}". 
        The student's answer being: "${answer}". 
        \n The following are the marking rubric: "${AO3}" \n and also "${markScheme}". 
        Provide a definitive mark using the marking rubrics provided. Avoid using decimal marks, the marks can only be discrete. Respond with the total mark, without any labelling. \n Also YOU answer: Explain what were the points missed from BOTH texts; Which level's mark did you provide for the AO3 marking rubric. Explain why. If there's any weakness, point them out with examples from the answer provided. Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve, what could have been included and so on. Only award marks where the student provides clear, textual evidence or reasoning. Vague generalisations do not deserve credit. Don't award marks unnecessarily, especially if answer isn't provided. 
        \n This is how your response should be structured (in the form of an array): ["mark", "insert explanation of points missed", "insert level", "insert explanation of why that level", "insert weakness with examples", "insert large paragraph with improvements/suggestions"]
        \n Irrespective of student's answer being valid or invalid, you'll always respond as per the mentioned structure while improvising the elements, but ensuring they are their correct type. Give it as a raw string, no need to wrap around a codeblock. Do not use characters that obstruct JSON.parse() in Javascript`
    });
    return new Response(JSON.stringify({ response: response.text }), {
        headers: { "Content-Type": "application/json" },
    });

}

