"use client"
import type { Metadata } from "next";
import { Inter, Major_Mono_Display } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] });
const major = Major_Mono_Display({
  subsets: ['latin'],
  weight: "400"
});
// export const metadata: Metadata = {
//   title: "ShareTimeWithMe",
//   description: "The easiest way to share your schedule with your friends!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  return (
    <html lang="en">
      <head>
        <title>ShareTimeWithMe</title>
        <meta name="description" content="The easiest way to share your schedule with your friends" />
        <meta name="keywords" content="schedule,schedule time with friends, time management" />
        <meta name="author" content="Valerio Valletta" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className + " flex flex-col justify-between"}>

        <nav className='w-full p-2 bg-gray-900 text-white text-center flex justify-start items-center'>


          <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
            <img className="max-w-10" src='logo_red.png' />
            <h3 className={major.className + " mx-2 text-xl"}>
              Share Time With Me
            </h3>
          </div>
        </nav>
        <Analytics />
        {children}
        <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='https://www.valeriovalletta.it'>Valerio Valletta</a></footer>
      </body>
    </html >
  );
}
