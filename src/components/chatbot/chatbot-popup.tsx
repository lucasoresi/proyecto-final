import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ChatbotUI } from './chatbot-ui';

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

interface ChatbotPopupProps {
  isOpen: boolean;
  onClose: () => void;
  chatState: ChatState;
}

export function ChatbotPopup({ isOpen, onClose, chatState }: ChatbotPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[45rem] h-[700px] p-0 gap-0" aria-describedby="chatbot-description">
        <DialogTitle className="sr-only">Asistente Virtual</DialogTitle>
        <DialogDescription id="chatbot-description" className="sr-only">
          Chat con el asistente virtual de Bahía Zen Therapy
        </DialogDescription>
        <ChatbotUI chatState={chatState} />
      </DialogContent>
    </Dialog>
  );
}
