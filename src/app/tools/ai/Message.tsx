

import React from 'react';
import Markdown from 'react-markdown';
import MarkdownLink from './MarkdownLink';


export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  /**
   * Base64 encoded image
   */
  images: string[];
  date?: Date;
  isFunctioncall?: boolean;
  chunks?: MessageChunk[];
};

export interface MessageChunk {
  message: {
    role: string,
    content: string,
  };
  done: boolean;
  created_at: string,
  model: string,
}

interface MessageProps {
  message: Message;
  index?: React.Key;
  pending?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, index, pending }) => {
  return (
    <div key={index} className="flex gap-4">
      <div className={
        "w-12 h-12 rounded-full flex-shrink-0 flex-grow-0 "
        + (pending === true ? "animate-pulse bg-primary/10" : "bg-gray-200")}>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="text-sm font-bold">{message.role}</div>
          <div className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</div>
        </div>
        <Markdown className="text-sm" components={{ a: MarkdownLink }}>{message.content}</Markdown>
      </div>
    </div>
  );
};

export default Message;