import { useCallback, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const N8N_WEBHOOK_URL = 'https://n8n.srv910860.hstgr.cloud/webhook/input';

/**
 * Hook personalizado para manejar el chat con n8n
 * Reemplaza la integración con OpenAI/Supabase MCP
 */
export function useChatbot() {
  const [sessionId] = useState<string>(() => {
    // Generar un sessionId único para mantener el contexto de la conversación
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = { role: 'user', content: content.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);
      setError(null);

      try {
        console.log('📤 Enviando a n8n:', {
          message: content.trim(),
          sessionId: sessionId,
        });

        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content.trim(),
            sessionId: sessionId,
            // Puedes incluir el historial de mensajes si tu agente n8n lo necesita
            history: newMessages.map(m => ({
              role: m.role,
              content: m.content
            })),
          }),
        });

        console.log('📥 Status de n8n:', response.status, response.statusText);
        console.log('📥 Headers de n8n:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Obtener el texto de la respuesta primero
        const responseText = await response.text();
        console.log('📥 Respuesta RAW de n8n:', responseText);

        let assistantContent: string;

        // Intentar parsear como JSON
        try {
          const data = JSON.parse(responseText);
          console.log('📥 Respuesta JSON parseada:', data);

          // Asumimos que n8n devuelve un objeto con una propiedad 'response' o 'message'
          assistantContent = data.response || data.message || data.output || data.text ||
                           (typeof data === 'string' ? data : JSON.stringify(data));
        } catch (parseError) {
          // Si no es JSON válido, usar el texto directamente
          console.log('⚠️ La respuesta no es JSON, usando texto plano');
          assistantContent = responseText || 'Respuesta recibida sin contenido';
        }

        console.log('✅ Contenido final del asistente:', assistantContent);

        setMessages([
          ...newMessages,
          { role: 'assistant', content: assistantContent },
        ]);
      } catch (err) {
        console.error('❌ Chat error:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');

        const errorMessage = err instanceof Error
          ? `Error: ${err.message}`
          : 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor intenta de nuevo.';

        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: errorMessage,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, sessionId, isLoading]
  );

  const reload = useCallback(() => {
    // Recargar último mensaje
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.role === 'user');
      if (lastUserMessage) {
        // Remover el último mensaje del asistente antes de recargar
        const messagesWithoutLastAssistant = messages.slice(0, -1);
        setMessages(messagesWithoutLastAssistant);
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    reload,
    clearMessages,
  };
}
