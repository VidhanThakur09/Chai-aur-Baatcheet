import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";


interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface MessageHistory {
  role: "user" | "assistant";
  content: string;
}

interface ChatPartner {
  id: string;
  name: string;
  avatar: string;
  isBot: boolean;
}

const chatPartners: ChatPartner[] = [
  { id: "hitish", name: "Hitish Choudhary", avatar: "https://github.com/hiteshchoudhary.png", isBot: false },
  { id: "piyush", name: "Piyush Garg", avatar: "https://github.com/piyushgarg-dev.png", isBot: false },
];

export function ChatInterface() {
  const [historyMessages, setHistoryMessages] = useState<MessageHistory[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentPartner, setCurrentPartner] = useState<ChatPartner>(chatPartners[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message based on the default partner
  const initialGreeting =
    chatPartners[0].name === "Hitish Choudhary"
      ? "Kya haal hai bhai? Chai pee li ya code karte karte bhool gaya? 😎☕ Batao kya help chahiye, humesha ready hain! 😄"
      : "Kya haal hai bhai! 🔥 Piyush Garg here, at your service. Batao kya help kar sakta hu? 😎";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: initialGreeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const port = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // Adjust this to your backend URL

  const responseFromPerson = async (userResponse: string) => {
    let extension =
      currentPartner.name === "Hitish Choudhary" ? "hiteshsir" : "piyushsir";
    try {
      let response = await axios.post(`${port}/${extension}`, {
        question: userResponse,
        history: historyMessages,
      });
      return response.data.content;
    } catch (error) {
      console.error("API call failed:", error);
      return "Sorry, I couldn't get a response right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessageText = newMessage.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    // Add the user message to the display
    setMessages(prev => [...prev, userMessage]);
    
    // Add the user message to the historyMessages state in the specified format
    setHistoryMessages(prev => [
      ...prev,
      {
        role: "user",
        content: userMessageText,
      },
    ]);

    setNewMessage("");

    if (!currentPartner.isBot) {
      setIsTyping(true);
      const botReply = await responseFromPerson(userMessageText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      // Add the bot's message to the display
      setMessages(prev => [...prev, botMessage]);

      // Add the bot's response to the historyMessages state in the specified format
      setHistoryMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: botReply,
        },
      ]);

      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePartnerChange = (partnerId: string) => {
    const partner = chatPartners.find(p => p.id === partnerId);
    if (partner) {
      // First, update the current partner state
      setCurrentPartner(partner);

      // Now, use the 'partner' variable (which is the new partner) to set the messages
      const greetingMessage =
        partner.name === "Hitish Choudhary"
          ? "Kya haal hai bhai? Chai pee li ya code karte karte bhool gaya? 😎☕ Batao kya help chahiye, humesha ready hain! 😄"
          : "Kya haal hai bhai! 🔥 Piyush Garg here, at your service. Batao kya help kar sakta hu? 😎";

      // Set the greeting message for the display
      setMessages([
        {
          id: "1",
          text: greetingMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      
      // Reset and set the initial greeting for the history
      setHistoryMessages([
        {
          role: "assistant",
          content: greetingMessage,
        },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Card className="rounded-none border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl"><img src={currentPartner.avatar} className="w-8 h-8 rounded-full" /></div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Chat with {currentPartner.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentPartner.isBot ? "AI Assistant" : "Online"}
              </p>
            </div>
          </div>
          
          <Select value={currentPartner.id} onValueChange={handlePartnerChange}>
            <SelectTrigger className="w-48 bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {chatPartners.map((partner) => (
                <SelectItem key={partner.id} value={partner.id} className="text-popover-foreground">
                  <div className="flex items-center gap-2">
                    <img src={partner.avatar} className="w-8 h-8 rounded-full" />
                    <span>{partner.name}</span>
                    {partner.isBot && (
                      <Bot className="h-3 w-3 text-primary" />
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              )}>
                {message.sender === "user" ? <User className="h-4 w-4" /> : <img src={currentPartner.avatar} className="w-8 h-8 rounded-full" />}
              </div>
              
              <Card className={cn(
                "p-3 max-w-full",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-2"
                  : "bg-secondary text-secondary-foreground mr-2"
              )}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={cn(
                  "text-xs mt-1 opacity-70",
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm shrink-0">
                <img src={currentPartner.avatar} className="w-8 h-8 rounded-full" />
              </div>
              <Card className="bg-secondary text-secondary-foreground p-3 mr-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <Card className="rounded-none border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${currentPartner.name}...`}
              className="flex-1 bg-secondary/50 border-border focus:ring-primary"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}