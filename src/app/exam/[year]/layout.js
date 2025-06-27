export async function generateMetadata({ params }) {
  const year = (await params).year
  
  return {
    title: `Exam Series: ${decodeURIComponent(year)}`,
    description: `List of all questions from ${decodeURIComponent(year)} paper. Extracts/Source Booklet/ Insert and a Timer is also included.`
  }
}

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}