import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_URL });

export async function GET(req) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const answer = decodeURIComponent(searchParams.get("ANS"));
    const title = decodeURIComponent(searchParams.get("title"));    

    var filePath =path.join(process.cwd(), `public/Data`, "Last_AO4.txt");
    var AO4 = fs.readFileSync(filePath, "utf8");

    var filePath =path.join(process.cwd(), `public/Data`, "Last_AO5.txt");
    var AO5 = fs.readFileSync(filePath, "utf8");

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are acting strictly as an Edexcel IGCSE English Language B (4EB1) examiner. 
        You must mark objectively, following the rubric boundaries precisely. 
        You must not invent, assume, or award marks beyond what the student provides. 
        Do not over-credit vague generalisations, unsupported claims, or off-topic writing. 
        The following official marking rubrics are provided: AO4: "${AO4}" and AO5: "${AO5}". 
        You must adhere strictly to these rubrics. 
        A student has written an essay in response to the following prompt: ${title}. 
        The student's essay is: "${answer}". 
        \n The essay must be relevant to the title "${title}". 
        Irrelevant essays are not creditworthy and should be penalised in AO4.
        Mark the essay out of 30, distributed as follows: AO4: Communicative quality, adaptation of form, tone, register, clarity, relevance AO5: Technical accuracy, structure, sentence control, vocabulary range, punctuation, spelling. You must only award marks where the essay demonstrates: Clear, relevant engagement with the title, Appropriate tone, register, form, Logical organisation of ideas, Technical accuracy in language. Do not reward unsupported opinions, vague statements, irrelevant tangents, or flawed structure. Be strict, fair, and evidence-based. Provide a definitive mark. Avoid using decimal marks, the marks can only be discrete. Respond with the mark for AO4, AO5 and total, without any labelling. 
        \n Also YOU answer: Which level's mark did you provide for the AO4 marking rubric. Explain why. If there's any weakness, point them out with examples FROM THE ESSAY PROVIDED.; Which level's mark did you provide for the AO5 marking rubric. Explain why. If there's any weakness, point them out with examples from the essay provided; Explain with as much details as possible, be as explanatory as possible, as to where to improve. 
        \n This is how your response should be structured (in the form of an array): ["AO4mark", "AO5mark", "total", "insert level for AO4", "insert explanation of why that level", "insert paragraph with improvements/suggestions", "insert level for AO5", "insert explanation of why that level", "insert paragraph with improvements/suggestions", "insert large paragraph with improvements/suggestions"]
        \n Be strict. Don't award marks unnecessarily, especially if essay isn't provided.
        \n Irrespective of student's answer being valid or invalid, you'll always respond as per the mentioned structure while improvising the elements, but ensuring they are their correct type. Give it as a raw string, no need to wrap around a codeblock. Do not use characters that obstruct JSON.parse() in Javascript`
    });
    return new Response(JSON.stringify({ response: response.text }), {
        headers: { "Content-Type": "application/json" },
    });

}

