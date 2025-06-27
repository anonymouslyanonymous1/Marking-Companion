export async function generateMetadata({ params }) {
  const year = (await params).year
  
  return {
    title: "Results",
    description: "A pleasant display (hopefully) of the evaluations made by Gemini"
  }
}
export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}