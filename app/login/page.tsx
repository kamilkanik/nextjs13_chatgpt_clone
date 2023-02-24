import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

import LoginContainer from './LoginContainer'

import "./LoginPage.css"

async function LoginPage() {
  const session = await getServerSession(authOptions);

  if(!session){
    
  }

  return (
      <div className='w-full min-h-screen flex-1 flex items-center bg-neutral-900'>
          <div className="w-full max-w-md bg-gray-800/90 h-screen flex flex-col items-center justify-center">
              <h1 className="text-4xl text-white font-bold mb-10">ChatGPT</h1>
              <LoginContainer />
          </div>
      </div>
  )
}

export default LoginPage