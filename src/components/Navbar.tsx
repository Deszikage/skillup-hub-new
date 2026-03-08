import { Link } from "react-router-dom";
import { Code2, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight">
            Code<span className="text-primary">Forge</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Courses
          </Link>
          <Link to="/practice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Practice
          </Link>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-3.5 w-3.5 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="hero" size="sm">Get Started Free</Button>
            </Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3">
          <Link to="/courses" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/practice" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Practice</Link>
          <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Pricing</a>
          {user ? (
            <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setOpen(false); }}>
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Sign Out
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">Get Started Free</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
