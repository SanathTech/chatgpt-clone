import openai from "./chatgpt";

const queryTurbo = async (prompt: string, messages: any) => {
  if (messages) {
    const res = await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          ...messages,
          { role: "user", content: prompt },
        ],
        // temperature: 0.9,
        // max_tokens: 1000,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
      })
      .then((res) => res.data.choices[0].message?.content)
      .catch(
        (err) =>
          `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
      );
    return res;
  } else {
    const res = await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          { role: "user", content: prompt },
        ],
        // temperature: 0.9,
        // max_tokens: 1000,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
      })
      .then((res) => res.data.choices[0].message?.content)
      .catch(
        (err) =>
          `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
      );
    return res;
  }
};

export default queryTurbo;
