"use client"
import Alert from '@/components/alert'
import CreateInstance from '@/components/createInstance'
import Loader from '@/components/loader'
import { ALERT, isServerOff } from '@/components/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showServerAlert, setShowServerAlert] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      const res = await isServerOff();
      setShowServerAlert(res)
    };
    init()
  }, [])

  if (isLoading)
    return <Loader />

  return (
    <div className='w-full max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center'>
      {/* Hero Section */}
      <header className='mb-32 flex flex-col items-center'>
        <div className='mb-16 cursor-pointer group relative' onClick={() => router.push("/")}>
          {/* Subtle Pro Glow */}
          <div className='absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-apple duration-1000'></div>
          
          <img 
            className="w-48 h-48 md:w-64 md:h-64 invert opacity-90 transition-apple group-hover:scale-105 group-hover:opacity-100 group-active:scale-95 relative z-10" 
            src='logo_black.png' 
            alt="Logo" 
          />
        </div>
        
        <h1 className='hero-title'>
          Share <span className='text-primary'>Time</span> With Me
        </h1>
        
        <p className='hero-subtitle'>
          The simplest way to coordinate meetings with your circle. 
          No accounts, no friction, just results.
        </p>
      </header>

      <section className='w-full max-w-3xl glass rounded-apple p-8 md:p-16 mb-32'>
        {error && <Alert text={error} type={ALERT.ERROR} />}
        {showServerAlert && <Alert text="Service is currently unavailable. Please try again later." type={ALERT.ERROR} />}
        
        <div className='relative'>
          <CreateInstance setError={setError} setIsLoading={setIsLoading} />
        </div>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full'>
        <div className='flex flex-col items-center gap-4'>
            <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h4 className='text-sm font-bold uppercase tracking-widest text-foreground/60'>Precise</h4>
            <p className='text-sm text-foreground/30 leading-relaxed max-w-[200px]'>Map your availability with minute precision across weeks.</p>
        </div>
        <div className='flex flex-col items-center gap-4'>
            <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h4 className='text-sm font-bold uppercase tracking-widest text-foreground/60'>Fluid</h4>
            <p className='text-sm text-foreground/30 leading-relaxed max-w-[200px]'>Seamlessly transition between individual and collective views.</p>
        </div>
        <div className='flex flex-col items-center gap-4'>
            <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <h4 className='text-sm font-bold uppercase tracking-widest text-foreground/60'>Simple</h4>
            <p className='text-sm text-foreground/30 leading-relaxed max-w-[200px]'>One shared link is all you need to start coordinating today.</p>
        </div>
      </section>
    </div>
  )
}
export default Page
