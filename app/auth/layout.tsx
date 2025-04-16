import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      {children}
    </div>
  )
}

export default layout
