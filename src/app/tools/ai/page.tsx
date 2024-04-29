"use client";

import { useState } from "react";
import { useChat } from "./getChat";
import { Input } from "@/components/ui/input";
import useEffectOnce from "@/lib/use-effect-once";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Markdown from 'react-markdown'
import MarkdownLink from "./MarkdownLink";


export default function Home() {
  const functions = [
    /*{
      "type": "function",
      "function": {
        "name": "get_temperature",
        "description": "get temperature of a city",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string",
              "description": "name"
            }
          },
          "required": [
            "city"
          ]
        }
      }
    },*/
    {
      "type": "function",
      "function": {
        "name": "search_web",
        "description": "search the web for all kind of information. Use this if you are not sure what to do",
        "parameters": {
          "queryText": "string",
        },
        "required": [
          "queryText"
        ]
      }
    }
  ]

  const [onNewMessage, messages, error, loading, forceGetNewResponse] = useChat([
    {
      role: 'system',
      content: `You are a helpful assistant with access to the following functions: \n ${(JSON.stringify(functions))}\n\nTo use these functions respond with:\n<functioncall> {{ "name": "function_name", "arguments": {{ "arg_1": "value_1", "arg_1": "value_1", ... }} }} </functioncall>\n\nEdge cases you must handle:\n - If there are no functions that match the user request, you will respond politely that you cannot help. Now introduce yourself to the user.`,
      images: []
    }
  ]);

  useEffectOnce(() => {
    forceGetNewResponse();
  });

  const [promptInput, setPromptInput] = useState('');
  const [replayAs, setReplyAs] = useState<"system" | "user">('user');

  return (
    <section className="flex flex-col gap-4">
      {
        messages.map((message, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="text-sm font-bold">{message.role}</div>
                <div className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</div>
              </div>
              <Markdown className="text-sm" components={{ a: MarkdownLink }}>{message.content}</Markdown>
            </div>
          </div>
        ))
      }
      {
        loading &&
        <div className="flex gap-4 w-full">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <Skeleton className="text-sm font-bold w-20 h-4" />
            </div>
            <Skeleton className="text-sm w-full h-4" />
          </div>
        </div>
      }
      <form action="none" onSubmit={(e) => {
        e.preventDefault();
        if (loading) return;
        onNewMessage({
          role: replayAs,
          content: promptInput,
          images: []
        });
        setPromptInput('');
      }}>
        <Input
          type="text"
          id="prompt"
          value={promptInput}
          onChange={(event) => setPromptInput(event.target.value)}
        />
        <Select
          onValueChange={(value) => setReplyAs(value)}
          value={replayAs}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </form>

    </section>
  );
}
