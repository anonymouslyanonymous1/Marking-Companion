import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconLink } from '@tabler/icons-react';
export const metadata = {
  title: "Marking Companion",
  description: "Get your WHOLE 4EB1 Paper checked right away. Why wait for validation? Get it done quick.",
};
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/hand.png" />
      <meta name="google-site-verification" content="6rOXsUdrLM9JAXDhJ9gLrWyxuWBGm4euQcqFjlVu7XI" />
      <meta property="theme-color" content="#a43f3f" />
      <meta property="og:image" content="/bg.png" />
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image" content="/bg.png" />
      <body className="bg-gradient-to-l from-darkred to-lightred h-64 w-full">
        <a href="https://github.com/anonymouslyanonymous1/Marking-Companion" className="github-corner">
          <svg width="80" height="80" viewBox="0 0 250 250" className="gitsvg" aria-hidden="true">
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
              <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="octo-arm"></path>
              <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
          </svg>
        </a>
        <a className="absolute right-0 bottom-0 linkD" href="http://eduvance.au/">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" className="cursor-pointer rounded-[100%] w-10 h-10 fixed m-5 right-0 bottom-0 z-2">
                  <IconLink className=" stroke-lred" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>First shared here</p>
            </TooltipContent>
          </Tooltip>
        </a>
        {children}
        <GoogleAnalytics gaId="G-YJSF8P72NM" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
