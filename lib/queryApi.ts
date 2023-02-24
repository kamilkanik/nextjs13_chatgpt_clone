import openai from './chatgpt';


const query = async (message: string, chatId: string, model: string) => {

    const res = await openai.createCompletion({
        model,
        prompt: message,
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }).then((res) => {
        return res.data.choices[0].text;
    }).catch((err) => {
        return `ChatGPT was unable to find an answer for that! (Error: ${err.message})`;
    });

    return res;
}

export {
    query
}