"use client";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";

type Props = {
    chatId: string; 
}

function ChatInput({chatId}: Props) {
    const { data: session } = useSession();


    const setTextareaHeight = (target: HTMLTextAreaElement ) => {
        target.style.overflow = 'hidden';
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
        if(target.scrollHeight > 200){
            target.style.overflow = 'auto';
        }
    }

    // useSWR to get model
    const model = "text-davinci-003";

    const onSubmit = async (values: {message: string}, form: FormApi<any, any>) => {
        
        const message: Message = {
            text: values.message,
            createdAt: serverTimestamp(),
            user: {
                sub: session?.user?.sub!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(
            collection(db, `users/${session?.user?.sub}/chats/${chatId}/messages`),
            message
        );

        form.reset();

        // Create loading toast
        const notification = toast.loading('ChatGPT is thinking...');

        await fetch('/api/create-question', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: values.message,
                chatId: chatId.toString(),
                model,
                session
            }),
            method: "POST"
        }).then(() => {
            toast.success('ChatGPT has responded!', {id: notification});
        });
    }

    const validate = (values: {message?: string}) => {
        const errors: {message?: string} = {};

        if(!values.message?.length){
            errors.message = 'Not provided';
        }

        return errors;
    }

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{ message: '' }}
            render={({ handleSubmit, valid }) => (
                <form onSubmit={handleSubmit} className={'w-full max-w-screen-md mx-auto my-10'}>
                    <div className={'relative w-full flex items-center bg-neutral-900/60 p-5 h-auto rounded-md shadow shadow-slate-600/90'}>
                        <Field 
                            name='message'
                            render={({input, meta}) => (
                                <textarea
                                    {...input}
                                    rows={1}
                                    className={'ChatInput'}
                                    onChange={(e) => {
                                        input.onChange(e);
                                        setTextareaHeight(e.target);
                                    }}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter" && e.shiftKey == false) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }} 

                                />
                            )}
                        />

                        <button 
                            type="submit"
                            disabled={!valid}
                            className={`ChatSubmitButton ${!valid && 'disabled'}`}
                            placeholder={'Type your message here...'}
                        >
                            <PaperAirplaneIcon className='w-5 h-5' />
                        </button>
                    </div>
                </form>
            )}
        />
    )
}

export default ChatInput