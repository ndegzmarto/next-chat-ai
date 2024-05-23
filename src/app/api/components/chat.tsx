'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef, useEffect } from 'react';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(()=>{
    const domNode = chatParent.current;
    if (domNode){
      domNode.scrollTop =domNode.scrollHeight;
    }
  })

  return (
    <main className='flex flex-col w-full h-screen max-h-dvh bg-background'>

              <header className='p-4 border-b w-full max-w-3xl mx-auto'>
              <h1 className='text-2xl font-bold'>CHATTY BUD</h1>

              </header>
             

              <section className='p-4'>
                  <form onSubmit={handleSubmit} className='flex w-full max-w-3xl mx-auto items-center'>
                              
                              <Input
                                className="flex-1 min-h-[40px]"
                                value={input}
                                placeholder="Say something..."
                                onChange={handleInputChange}
                              />
                                <Button className='ml-2' type='submit'>chat</Button>
                          </form>

              </section>
            
            <section className='container px-0 pb-10 flex flex-col flex-grow gap-4 max-auto max-w-3xl'>
                <ul ref={chatParent} className='p-4 flex-grow overflow-y-auto flex flex-col gap-4 rounded-lg bg-muted/50'>
                  {messages.map((m, index) => (
                    <>
                        {m.role === 'user' ?
                          (<li key={index} className='flex flex-row' >
                            <div className='p-4 bg-slate-200  rounded-xl shadow-md'>
                              <p className='text-primary'>{m.content}</p>
                              </div>
                          </li>)
                        :  
                          (<li key={index} className='flex flex-row-reverse'>
                              <div className='p-4 bg-blue-200 border-solid rounded-xl shadow-md'>
                                <p className='text-primary'><span className='font-bold'>Answer: </span>{m.content}</p>
                                </div>
                          </li>)}
                    </>
                  ))}
                  </ul>

            </section>

            

    </main>


   
  );
}