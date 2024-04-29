"use client";

import { useEffect, useState } from "react";

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  /**
   * Base64 encoded image
   */
  images: string[];
};

export function useChat(defaultMessages: Message[]): [
  onNewMessage: (message: Message) => void,
  messages: Message[],
  error: any,
  loading: boolean,
  forceGetNewResponse: (newMessage?: Message) => Promise<void>] {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [error, setError] = useState<any>(undefined); // Todo: define error type
  const [loading, setLoading] = useState(false);

  const onNewMessage = async (message: Message) => {
    if (loading) throw new Error('Cannot send message while loading');

    setMessages(prevMessages => [...prevMessages, message]); // Oh men, I wish to have a callback here or a promise :(

    await forceGetNewResponse(message);
  }


  const getAiResponse: (chatMessages: Message[]) => Promise<Message> = async (chatMessages) => {
    console.log('fetching ai response', chatMessages);

    const res = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dolphin-mixtral:8x7b-v2.7-q4_K_M', //dolphin-mixtral:8x7b
        messages: chatMessages,
        stream: false,
        options: {
          temperature: 0.5,
          seed: Math.floor(Math.random() * 1000),
        }
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data: ' + await res.text())
    }

    const response = await res.json();

    console.log('got response', response);

    return response.message as Message; // Todo: handle error
  }

  /**
   * Force get a new response from the AI.
   *
   * This does NOT add the message to the chat
   * use `onNewMessage` for that, that also calls the AI!
   *
   * Does not work if it's loading.
   */
  const forceGetNewResponse = async (newMessage?: Message) => {
    if (loading) return;

    setLoading(true);
    getAiResponse(newMessage ? [...messages, newMessage] : messages).then((newMesssage) => {
      console.log('got new message', newMesssage);
      setMessages(prevMessages => [...prevMessages, newMesssage]);

      let messageText = newMesssage.content.trim();

      if (messageText.startsWith("<functioncall>") &&
        messageText.endsWith("</functioncall>")) {
        console.log('function call detected');

        const functionName = messageText.match(/"name": "([^"]+)"/)?.[1];
        const args = JSON.parse(
          messageText
            .replaceAll(" }}", "}")
            .replaceAll("{{ ", "{")
            .replace("<functioncall>", "")
            .replace("</functioncall>", "")
        ).arguments;
        console.log('function call', functionName, args);

        if (functionName === 'search_web') {
          console.log('searching web');
          fetch(`http://localhost:5000/search?query=` + args["queryText"]).then(async (res) => {
            const resText = await res.text();
            setMessages(prevMessages => [...prevMessages, {
              role: "system",
              content: resText,
              images: [],
            }]);
          }).catch((error) => {
            console.error('failed to search web', error);
          });
        }
      }

      setLoading(false);
      setError(undefined);
    }).catch((error) => {
      console.error('failed to get new response', error);
      setError(error);
      setLoading(false);
    });
  }

  return [onNewMessage, messages, error, loading, forceGetNewResponse];
}