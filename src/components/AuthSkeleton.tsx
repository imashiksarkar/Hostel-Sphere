const AuthSkeleton = () => {
  return (
    <div className='con flex items-center justify-center py-12'>
      <div className='skeleton border border-slate-400 rounded-lg p-4 w-max animate-pulse'>
        <div className='h-5 w-32 bg-slate-400' />
        <div className='h-2 w-96 bg-slate-400 mt-4' />
        <div className='h-2 w-40 bg-slate-400 mt-8' />
        <div className='h-8 w-96 bg-slate-400 mt-4' />
        <div className='h-2 w-40 bg-slate-400 mt-4' />
        <div className='h-8 w-96 bg-slate-400 mt-4' />
        <div className='h-8 w-96 bg-slate-400 mt-4' />
        <div className='h-8 w-96 bg-slate-400 mt-4' />
        <div className='h-2 w-60 mx-auto bg-slate-400 mt-8' />
      </div>
    </div>
  )
}

export default AuthSkeleton
