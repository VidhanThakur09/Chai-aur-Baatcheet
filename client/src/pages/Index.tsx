import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Zap, Star, Code, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Trust Badge */}
        <div className="flex justify-center mb-12">
          <Badge variant="secondary" className="px-6 py-2 text-sm bg-secondary/50 border border-border/50">
            <div className="w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse"></div>
            Trusted by 1.5M Chat Enthusiasts
          </Badge>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Chai aur </span>
            <span className="text-foreground relative">
              Baatcheet
              <div className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded"></div>
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-8">
            Jahan har message ek nayi kahani shuru karta hai
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Har jagah baatein hoti hain, lekin hum dete hain ek unmatched chatting experience — AI assistance ke saath real-time messaging, smart conversations, community bonding, instant connections aur bilkul seamless interactions. Yahan har message sirf reply nahi, ek nayi possibility hoti hai.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Badge variant="outline" className="px-4 py-2 border-primary/30">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Real-time chat
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/30">
            <MessageSquare className="w-4 h-4 mr-2 text-primary" />
            AI assistance
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/30">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            Instant messaging
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/30">
            <Star className="w-4 h-4 mr-2 text-primary" />
            Smart replies
          </Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/30">
            <Heart className="w-4 h-4 mr-2 text-primary" />
            Community
          </Badge>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Code className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Start Chatting</h2>
            </div>
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;