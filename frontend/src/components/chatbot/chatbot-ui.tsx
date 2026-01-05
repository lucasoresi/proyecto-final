import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { useState, FormEvent, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
  reload: () => void;
  clearMessages: () => void;
}

interface ChatbotUIProps {
  chatState: ChatState;
}

export function ChatbotUI({ chatState }: ChatbotUIProps) {
  const { messages, isLoading, sendMessage, clearMessages } = chatState;
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
        <div>
          <h3 className="font-semibold">Asistente Virtual - Bahía Zen Therapy</h3>
          <p className="text-xs text-muted-foreground">
            Estoy aquí para ayudarte con tus consultas
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground max-w-md">
              <p className="text-lg font-medium mb-2">
                👋 Bienvenido/a
              </p>
              <p className="text-sm">
                Soy tu asistente virtual. Puedo ayudarte con información sobre consultas, turnos y servicios.
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg text-xs text-left">
                <p className="font-medium mb-2">Ejemplos de preguntas:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>¿Cómo puedo agendar una consulta?</li>
                  <li>¿Qué servicios ofrecen?</li>
                  <li>¿Cuál es el horario de atención?</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Estilos para tablas
                      table: ({ children }) => (
                        <table className="min-w-full divide-y divide-gray-300 my-2 text-sm border">
                          {children}
                        </table>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-gray-100/50">{children}</thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-3 py-2 text-left font-semibold border">{children}</th>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-gray-200">{children}</tbody>
                      ),
                      td: ({ children }) => (
                        <td className="px-3 py-2 border">{children}</td>
                      ),
                      // Código inline y bloques
                      code: ({ inline, children, ...props }: any) =>
                        inline ? (
                          <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                            {children}
                          </code>
                        ) : (
                          <code className="block bg-gray-900 text-white p-2 rounded my-2 font-mono text-xs overflow-x-auto">
                            {children}
                          </code>
                        ),
                      // Párrafos
                      p: ({ children }) => (
                        <p className="my-2 leading-relaxed">{children}</p>
                      ),
                      // Listas
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Procesando tu consulta...
              </span>
            </div>
          </div>
        )}

        {/* Elemento invisible para auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4 flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
