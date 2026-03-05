import React from 'react'

const Loader = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-6'>
        <div className='loader-clock text-primary'></div>
        <p className='text-xs uppercase tracking-[0.5em] font-medium text-foreground/40 animate-pulse'>Synchronizing</p>
      </div>
    </div>
  )
}

export default Loader
