import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage, isOSINTCommand, getOSINTToolsList } from '../lib/api';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isOSINT?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `╔══════════════════════════════════════════════════════════════╗
║  WORM AI - Cyber Intelligence Interface                      ║
╠══════════════════════════════════════════════════════════════╣
║  Welcome, Operator. I'm ready to assist with:                ║
║                                                              ║
║  • OSINT Investigations    • Cyber Security Queries          ║
║  • Intelligence Analysis   • Technical Support               ║
║                                                              ║
║  Available OSINT Commands:                                   ║
║  /whois /ipgeo /email /username /phone /social               ║
║  /dns /subdomain /tech /breach /portscan                     ║
║                                                              ║
║  Type /help for command details                              ║
╚══════════════════════════════════════════════════════════════╝`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      isOSINT: isOSINTCommand(input.trim())
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(
        messages.concat(userMessage).map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }))
      );

      const aiMessage: Message = {
        id: generateId(),
        role: 'model',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'model',
        content: `⚠️ Error: ${(error as Error).message}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatMessage = (content: string) => {
    // Check if it's an OSINT result (contains box drawing characters)
    if (content.includes('╔') && content.includes('╚')) {
      return (
        <pre className="osint-result">
          <code>{content}</code>
        </pre>
      );
    }
    return content;
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]/80 border border-[#00ff88]/20 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-cyber p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#00ff88]/10 border border-[#00ff88]/30'
                    : 'bg-[#1a1a1a] border border-gray-800'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1 font-mono">
                  {message.role === 'user' ? 'OPERATOR' : 'WORM AI'}
                  <span className="ml-2 text-gray-600">
                    {message.timestamp.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
                <div className={`text-sm ${message.role === 'user' ? 'text-[#00ff88]' : 'text-gray-300'}`}>
                  {formatMessage(message.content)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#1a1a1a] border border-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-xs text-gray-500 ml-2 font-mono">Processing...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#00ff88]/20 bg-[#0a0a0a]/50">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command or message... (Try: /whois google.com)"
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-[#00ff88]/50 font-mono"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg text-[#00ff88] hover:bg-[#00ff88]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick Commands */}
        <div className="mt-3 flex flex-wrap gap-2">
          {['/whois', '/ipgeo', '/email', '/username', '/help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => setInput(cmd + ' ')}
              className="px-2 py-1 text-xs bg-[#1a1a1a] border border-gray-700 rounded text-gray-500 hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-colors font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
