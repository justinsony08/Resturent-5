import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem('rgb_chat_history');
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to load chat history");
        }
    }
    return [{ role: 'model', text: 'Bonjour! I am the Royal Concierge. How may I assist you with your dining plans today?' }];
  });
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    localStorage.setItem('rgb_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);
      const botMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting to the concierge service right now.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    const initialMsg: ChatMessage = { role: 'model', text: 'Bonjour! I am the Royal Concierge. How may I assist you with your dining plans today?' };
    setMessages([initialMsg]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-dark-900 border border-gold-500 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold-600 to-gold-400 p-4 flex justify-between items-center text-dark-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-bold text-sm">Royal Concierge</h3>
                <p className="text-xs opacity-80">AI Assistant</p>
              </div>
            </div>
            <div className="flex gap-1">
                <button onClick={handleClear} className="hover:bg-black/10 p-1 rounded transition-colors" title="Clear History">
                    <Trash2 className="h-4 w-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-800">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold-500 text-dark-900 rounded-tr-none' 
                      : 'bg-dark-700 text-gray-200 border border-gray-600 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-dark-700 border border-gray-600 p-3 rounded-lg rounded-tl-none">
                  <Loader2 className="h-4 w-4 animate-spin text-gold-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-dark-900 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about prices, menu..."
              className="flex-1 bg-dark-800 border border-gray-600 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-gold-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-gold-500 hover:bg-gold-400 text-dark-900 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-700' : 'bg-gold-500 hover:bg-gold-400'} text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 border-transparent hover:border-white`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatAssistant;