"use client";

import { useEffect, useState } from "react";
import { streamingFetch } from "./streamingFetch";
import { isMessageAFunctioncall } from "./isMessageAFunctioncall";
import { Message } from "./Message";



export function useChat(defaultMessages: Message[]): [
  onNewMessage: (message: Message) => void,
  messages: Message[],
  error: any,
  loading: boolean,
  forceGetNewResponse: (newMessage?: Message) => Promise<void>,
  streamingMessage: Message | undefined,] {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [streamingMessage, setStreamingMessage] = useState<Message | undefined>(undefined);
  const [error, setError] = useState<any>(undefined); // Todo: define error type
  const [loading, setLoading] = useState(false);

  const onNewMessage = async (message: Message) => {
    if (loading) throw new Error('Cannot send message while loading');

    setMessages(prevMessages => [...prevMessages, message]); // Oh men, I wish to have a callback here or a promise :(

    await forceGetNewResponse(message);
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

    const chatMessages = newMessage ? [...messages, newMessage] : messages;
    const stream = streamingFetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dolphin-mixtral:8x7b-v2.7-q4_K_M', //dolphin-mixtral:8x7b
        messages: chatMessages.map(message => {
          return {
            role: message.role,
            content: message.content,
            images: message.images,
          }
        }),
        stream: true,
        options: {
          temperature: 0.5,
          seed: Math.floor(Math.random() * 1000),
        }
      }),
    })

    let message = "";
    const requestDate = new Date(Date.now());
    setStreamingMessage({
      role: "assistant",
      content: message,
      images: [],
      isFunctioncall: isMessageAFunctioncall(message),
      chunks: [],
      date: requestDate,
    });

    for await ( let value of stream ) {
      try {
        const chunk = JSON.parse(value);
        message += chunk.message.content;

        setStreamingMessage({
          role: chunk.message.role,
          content: message,
          images: [],
          isFunctioncall: isMessageAFunctioncall(message),
          chunks: [...(streamingMessage?.chunks || []), chunk],
          date: requestDate,
        });
        console.log(streamingMessage);

        if(chunk.done === true) { // Stream is done
          setLoading(false);
          setError(undefined);
          setStreamingMessage(undefined);
          setMessages(prevMessages => [...prevMessages, {
            role: chunk.message.role,
            content: message,
            images: [],
            isFunctioncall: isMessageAFunctioncall(message),
            chunks: [...(streamingMessage?.chunks || []), chunk],
            date: requestDate,
          }]);
        }
      }
      catch( e:any ) {
        console.warn( e.message )
      }
    }


/*
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
    });*/
  }

  return [onNewMessage, messages, error, loading, forceGetNewResponse, streamingMessage];
}