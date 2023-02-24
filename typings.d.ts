interface Message {
    text: string;
    createdAt: admin.firestore.Timestamp;
    user: {
        sub: string;
        name: string;
        avatar: string;
    }
}