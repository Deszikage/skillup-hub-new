import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen, Trophy, Target, TrendingUp,
  Edit3, Save, X, Camera, Award,
  Code, Globe, Layout, Wifi
} from "lucide-react";
import { toast } from "sonner";

const courseCards = [
  { id: "html-css", title: "HTML & CSS", icon: Layout, color: "text-primary", lessons: 8 },
  { id: "javascript", title: "JavaScript", icon: Code, color: "text-warning", lessons: 8 },
  { id: "networking", title: "Networking", icon: Wifi, color: "text-success", lessons: 7 },
  { id: "web-development", title: "Full-Stack Web Dev", icon: Globe, color: "text-accent", lessons: 7 },
];

const recommendations = [
  { title: "Complete your CSS lessons", desc: "You're 60% through — finish strong!", link: "/course/html-css" },
  { title: "Try JavaScript practice", desc: "Test what you've learned with quizzes", link: "/practice" },
  { title: "Explore Networking", desc: "Understand how the internet works", link: "/course/networking" },
];

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { progress, isCompleted } = useProgress();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null }>({ display_name: null, avatar_url: null });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

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
      setEditing(false);
      toast.success("Profile updated!");
    }
  };

  if (authLoading || !user) return null;

  const quizResults = progress.filter((p) => p.item_type === "quiz");
  const totalQuizzes = quizResults.length;
  const correctQuizzes = quizResults.filter((p) => p.score === 1).length;
  const lessonsCompleted = progress.filter((p) => p.item_type === "lesson" && p.completed).length;
  const accuracy = totalQuizzes > 0 ? Math.round((correctQuizzes / totalQuizzes) * 100) : 0;

  const initials = (profile.display_name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-5xl">
          {/* Profile Header */}
          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary font-display text-xl">{initials}</AvatarFallback>
              </Avatar>

              {editing ? (
                <div className="flex-1 space-y-3 w-full">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Display Name</label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Avatar URL</label>
                      <div className="flex gap-2">
                        <Input value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} placeholder="https://..." className="flex-1" />
                        <Camera className="h-4 w-4 mt-2.5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="hero" size="sm" onClick={handleSaveProfile} disabled={saving}>
                      <Save className="h-3.5 w-3.5 mr-1" /> {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                      <X className="h-3.5 w-3.5 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold">{profile.display_name || "Student"}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              )}

              {!editing && (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Lessons Done", value: lessonsCompleted, icon: BookOpen, color: "text-primary" },
              { label: "Quizzes Taken", value: totalQuizzes, icon: Target, color: "text-accent" },
              { label: "Correct Answers", value: correctQuizzes, icon: Trophy, color: "text-success" },
              { label: "Accuracy", value: `${accuracy}%`, icon: TrendingUp, color: "text-warning" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Enrolled Courses */}
          <h3 className="font-display text-lg font-bold mb-4">Your Courses</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {courseCards.map((course) => {
              const completedLessons = progress.filter(
                (p) => p.item_type === "lesson" && p.item_id.startsWith(course.id) && p.completed
              ).length;
              const pct = Math.round((completedLessons / course.lessons) * 100);

              return (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="rounded-xl border border-border bg-card p-5 card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`rounded-lg bg-secondary p-2 ${course.color}`}>
                      <course.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">{course.title}</h4>
                      <p className="text-xs text-muted-foreground">{completedLessons}/{course.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Recommendations */}
          <h3 className="font-display text-lg font-bold mb-4">
            <Award className="h-5 w-5 inline mr-1 text-accent" />
            Recommendations
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Link
                key={rec.title}
                to={rec.link}
                className="rounded-xl border border-border bg-card p-4 card-hover"
              >
                <h4 className="font-display font-bold text-sm mb-1">{rec.title}</h4>
                <p className="text-xs text-muted-foreground">{rec.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
