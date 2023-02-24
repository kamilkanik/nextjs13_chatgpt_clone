import React from 'react';
import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AppIndex = async ({...props}) => {

    return (
        <div className='bg-slate-800 flex-1'>
            <div className='text-white max-w-3xl mx-auto flex flex-col items-center justify-center min-h-screen p-5'>
                <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

                <div className='flex flex-row justify-around space-x-4'>

                    <div className='flex flex-col gap-3.5 w-full sm:max-w-md mx-auto'>
                        <div className='w-7 mx-auto mb-2'><SunIcon /></div>
                        <h2 className='font-semibold text-lg text-center'>Examples</h2>
                        <div className='infoText'>"Explain quantum computing in simple terms" →</div>
                        <div className='infoText'>"Got any creative ideas for a 10 year old’s birthday?" →</div>
                        <div className='infoText'>"How do I make an HTTP request in Javascript?" →</div>
                    </div>
                    <div className='flex flex-col gap-3.5 w-full sm:max-w-md mx-auto'>
                        <div className='w-7 mx-auto mb-2'><BoltIcon /></div>
                        <h2 className='font-semibold text-lg text-center'>Capabilities</h2>
                        <div className='infoText'>Remembers what user said earlier in the conversation</div>
                        <div className='infoText'>Allows user to provide follow-up corrections</div>
                        <div className='infoText'>Trained to decline inappropriate requests</div>
                    </div>
                    <div className='flex flex-col gap-3.5 w-full sm:max-w-md mx-auto'>
                        <div className='w-7 mx-auto mb-2'><ExclamationTriangleIcon /></div>
                        <h2 className='font-semibold text-lg text-center'>Limitations</h2>
                        <div className='infoText'>May occasionally generate incorrect information</div>
                        <div className='infoText'>May occasionally produce harmful instructions or biased content</div>
                        <div className='infoText'>Limited knowledge of world and events after 2021</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppIndex