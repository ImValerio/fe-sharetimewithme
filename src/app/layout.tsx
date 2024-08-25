"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const PROD_HOST = "https://be-sharetimewithme-7gjrwponva-uc.a.run.app"
export const HOST = process.env.NEXT_PUBLIC_API_HOST ? process.env.NEXT_PUBLIC_API_HOST : PROD_HOST
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
      <body className={inter.className}>

        <nav className='w-full p-2 bg-gray-900 text-white text-center flex justify-start items-center'>


          <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
            <img className="max-w-10" src='logo_lg_blu.png' />
            <h3 className="mx-2 text-xl">
              ShareTimeWithMe
            </h3>
          </div>
        </nav>
        {children}
        <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='https://www.valeriovalletta.it'>Valerio Valletta</a></footer>
      </body>
    </html >
  );
}
