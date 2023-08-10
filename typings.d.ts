interface Message {
  text: string | ChatCompletionResponseMessage;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
