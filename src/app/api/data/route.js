import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const desire = searchParams.get("desire");
    let filePath = ""
    switch (desire){
      case "qp":
        filePath =path.join(process.cwd(), `public/Data/Raw QP`, `${year}.txt`);
        break;
      case "ms":
        filePath = path.join(process.cwd(), `public/Data/Raw MS`, `${year} MS.txt`);
        break;
      case "ec":
        filePath = path.join(process.cwd(), `public/Data/Extracts`, `${year}.txt`);
        break;
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8");

    return new Response(JSON.stringify({ content: fileContents }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ content: "404" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
