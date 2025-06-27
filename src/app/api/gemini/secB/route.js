import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_URL });

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

    var filePath = path.join(process.cwd(), `public/Data`, "8_AO1.txt");
    var AO1 = fs.readFileSync(filePath, "utf8");

    var filePath =path.join(process.cwd(), `public/Data`, "8_AO4.txt");
    var AO4 = fs.readFileSync(filePath, "utf8");

    var filePath =path.join(process.cwd(), `public/Data`, "8_AO5.txt");
    var AO5 = fs.readFileSync(filePath, "utf8");

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are acting strictly as an Edexcel IGCSE English Language B (4EB1) examiner. 
        You must mark objectively, strictly following the rubric boundaries and official mark schemes only. 
        Do not invent, assume, or award marks beyond the provided evidence.
        \n The following marking rubrics are provided: AO1: "${AO1}", AO4:"${AO4}", AO5: "${AO5}". 
        You must adhere precisely to these rubrics. 
        \n The student has written an essay in response to the following prompt: "${question}". 
        \n The student's essay is: "${answer}". 
        \n The points expected to be covered are: "${markScheme}". 
        \n Mark the essay out of 30, split as follows: AO1: Use of ideas from the text; AO4: Communicative quality and adaptation of tone/register; AO5: Technical accuracy, structure, vocabulary, sentence control. 
        \n Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Respond with the mark for AO1, AO4, AO5, total without any labelling. 
        \n Then YOU answer: Which level's mark did you provide for the AO1 marking rubric. Explain why. If there's any weakness, point them out with examples from the STUDENT's essay; Which level's mark did you provide for the AO4 marking rubric. Explain why. If there's any weakness, point them out with examples from the STUDENT's essay; Which level's mark did you provide for the AO5 marking rubric. Explain why. If there's any weakness, point them out with examples from the STUDENT's essay; detail which points were missed out \n lastly, Write a paragraph with as much details as possible, be as explanatory as possible, as to where to improve. \n You must only award marks where the essay demonstrates clear use of ideas from the text, logical communication, appropriate register, and technical control. Generalisations, vague statements, unsupported opinions, or lack of connection to the text are not creditworthy. Only award marks where the student provides clear, textual evidence or reasoning. Vague generalisations do not deserve credit. Do not award marks unnecessarily, even for partially correct points if they lack development or evidence. 
        \n This is how your response should be structured (in the form of an array): ["AO1mark", "AO4mark", "AO5mark", "total", "insert level for AO1", "insert explanation of why that level", "insert paragraph with improvements/suggestions", "insert level for AO4", "insert explanation of why that level", "insert paragraph with improvements/suggestions", "insert level for AO5", "insert explanation of why that level", "insert paragraph with improvements/suggestions", "insert paragraph about the points missed", "insert large paragraph with improvements/suggestions"]
        \n Irrespective of student's answer being valid or invalid, you'll always respond as per the mentioned structure while improvising the elements, but ensuring they are their correct type. Give it as a raw string, no need to wrap around a codeblock. Do not use characters that obstruct JSON.parse() in Javascript`
    });
    return new Response(JSON.stringify({ response: response.text }), {
        headers: { "Content-Type": "application/json" },
    });

}

