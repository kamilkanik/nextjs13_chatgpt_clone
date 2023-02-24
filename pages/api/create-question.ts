// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverTimestamp } from '@firebase/firestore';
import { query } from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDb } from '../../firebase.config';
import { Session } from 'next-auth';

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { message, chatId, model, session }: {message: string, chatId: string, model: string, session: Session} = req.body;

    if(!message) {
      res.status(400).json({ answer: "Please provide a message !"});
    }
    if(!model) {
      res.status(400).json({ answer: "Please provide a model !"});
    }
    if(!chatId) {
      res.status(400).json({ answer: "Please provide a chatId !"});
    }
    if(!session) {
      res.status(400).json({ answer: "Please provide a session !"});
    }

    const response = await query(message, chatId, model);

    console.log(response);

    const messageData: Message = {
      text: response || 'ChatGPT could not find answer for that!',
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        sub: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://cdn.vox-cdn.com/thumbor/VUn58Srehbu5brDicV6QgNp8SM0=/0x0:1820x1213/1400x1400/filters:focal(910x607:911x608)/cdn.vox-cdn.com/uploads/chorus_asset/file/24247717/lp_logo_3.0.jpg"
      }
    }

    await adminDb.collection('users').doc(session.user?.sub!).collection('chats').doc(chatId).collection('messages').add(messageData);
    
    res.status(200).json({answer: messageData.text});
    //res.status(200).json({ answer: messageData.text });
}
