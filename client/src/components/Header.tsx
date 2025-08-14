import { MessageCircle, Users, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Header() {
  return (
    <Card className="rounded-none border-b border-border bg-gradient-to-r from-card/95 to-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Chai aur Baatcheet🍵</h1>
              <p className="text-xs text-muted-foreground">Connect & Drink Chai</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>2 Active Chats</span>
            </div>
          </nav>

          {/* Actions */}
          {/* <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="secondary" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </div>
    </Card>
  );
}