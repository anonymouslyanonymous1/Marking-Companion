export async function generateMetadata({ params }) {
  const year = (await params).year
  
  return {
    title: "Loading",
    description: "Your results are being loaded. I am awaiting Gemini's response and would then be organising it adequately.. Shouldn't take too long!"
  }
}
export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}