import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { ChatbotPopup } from './chatbot-popup';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChatbot } from './chatbot-runtime';

export function ChatbotTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const chatState = useChatbot();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
              size="icon"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isOpen ? 'Cerrar asistente' : 'Abrir asistente AI'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ChatbotPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chatState={chatState}
      />
    </>
  );
}
