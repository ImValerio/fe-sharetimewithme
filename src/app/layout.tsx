"use client"
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import 'animate.css';




// export const metadata: Metadata = {
//   title: "ShareTimeWithMe",
//   description: "The easiest way to share your schedule with your friends!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <head>
        <title>ShareTimeWithMe</title>
        <meta name="description" content="The easiest way to share your schedule with your friends" />
        <meta name="keywords" content="schedule,schedule time with friends, time management" />
        <meta name="author" content="Valerio Valletta" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className=" flex flex-col justify-between">
        <Analytics />
        {children}
        <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='https://www.valeriovalletta.it'>Valerio Valletta</a></footer>
      </body>
    </html >
  );
}
