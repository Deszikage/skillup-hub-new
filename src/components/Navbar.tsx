import { Link, useLocation, useNavigate } from "react-router-dom";
import { Code2, Menu, X, LogOut, User, ChevronDown, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null }>({
    display_name: null,
    avatar_url: null,
  });
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setEditName(data.display_name || "");
          setEditAvatar(data.avatar_url || "");
        }
      });
  }, [user]);

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#pricing");
    }
    setOpen(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: editName, avatar_url: editAvatar || null })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      setProfile({ display_name: editName, avatar_url: editAvatar || null });
      setProfileOpen(false);
      toast.success("Profile updated!");
    }
  };

  const initials = (profile.display_name || user?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Code2 className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight">
              Code<span className="text-primary">Forge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/practice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </Link>
            <a href="/#pricing" onClick={handlePricingClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-display text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium max-w-[120px] truncate hidden lg:block">
                      {profile.display_name || "Student"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{profile.display_name || "Student"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                    <Edit3 className="h-3.5 w-3.5 mr-2" /> Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-3.5 w-3.5 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/courses" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Courses</Link>
            <Link to="/practice" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Practice</Link>
            <a href="/#pricing" onClick={handlePricingClick} className="block text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            {user ? (
              <>
                <button
                  onClick={() => { setProfileOpen(true); setOpen(false); }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary font-display text-[10px]">{initials}</AvatarFallback>
                  </Avatar>
                  Edit Profile
                </button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setOpen(false); }}>
                  <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button variant="hero" size="sm" className="w-full">Get Started Free</Button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Profile Edit Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={editAvatar || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Display Name</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Avatar URL</label>
              <Input value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setProfileOpen(false)}>Cancel</Button>
              <Button variant="hero" size="sm" onClick={handleSaveProfile} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
