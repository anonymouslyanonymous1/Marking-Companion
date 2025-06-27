import { GoogleGenAI } from "@google/genai";

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

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Forget that you are an AI. 
        Think of yourself as an Edexcel IGCSE English Language B (4EB1) examiner. 
        An answer by a student to the question "${question}" was given as "${answer}". 
        \n Use the following marking rubric "${markScheme}" to mark the student. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Only respond with the TOTAL mark in a single line. 
        \n This is how your response should be structured, for example (an array): ["mark"]
        \n Irrespective of student's answer being valid or invalid, you'll always respond as per the mentioned structure while improvising the elements, but ensuring they are their correct type. Give it as a raw string, no need to wrap around a codeblock. Do not use characters that obstruct JSON.parse() in Javascript`
    });
    return new Response(JSON.stringify({ response: response.text }), {
        headers: { "Content-Type": "application/json" },
    });

}

