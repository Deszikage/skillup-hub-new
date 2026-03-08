import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Users, CreditCard, BookOpen, Plus, Trash2, Edit3, Save, X, Shield,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const AdminPage = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading } = useAdmin();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"users" | "subscriptions" | "courses">("users");

  // Fetch profiles
  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Fetch subscriptions
  const { data: subscriptions = [] } = useQuery({
    queryKey: ["admin-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subscriptions").select("*");
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Fetch courses
  const { data: courses = [] } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at");
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Fetch lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ["admin-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lessons").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Course edit dialog
  const [editCourse, setEditCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({ id: "", title: "", description: "", lesson_count: 0, is_published: true });

  // Lesson dialog
  const [lessonDialog, setLessonDialog] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: "", duration: "", is_free: false, video_id: "", sort_order: 0 });

  const openEditCourse = (course: any) => {
    setEditCourse(course);
    setCourseForm({
      id: course.id,
      title: course.title,
      description: course.description,
      lesson_count: course.lesson_count,
      is_published: course.is_published,
    });
  };

  const saveCourse = async () => {
    if (!editCourse) return;
    const { error } = await supabase
      .from("courses")
      .update({
        title: courseForm.title,
        description: courseForm.description,
        lesson_count: courseForm.lesson_count,
        is_published: courseForm.is_published,
      })
      .eq("id", editCourse.id);
    if (error) {
      toast.error("Failed to update course");
    } else {
      toast.success("Course updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setEditCourse(null);
    }
  };

  const addLesson = async (courseId: string) => {
    const courseLessons = lessons.filter((l) => l.course_id === courseId);
    const { error } = await supabase.from("lessons").insert({
      course_id: courseId,
      title: lessonForm.title,
      duration: lessonForm.duration,
      is_free: lessonForm.is_free,
      video_id: lessonForm.video_id || null,
      sort_order: courseLessons.length,
    });
    if (error) {
      toast.error("Failed to add lesson");
    } else {
      toast.success("Lesson added!");
      queryClient.invalidateQueries({ queryKey: ["admin-lessons"] });
      // Update course lesson count
      await supabase.from("courses").update({ lesson_count: courseLessons.length + 1 }).eq("id", courseId);
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setLessonDialog(null);
      setLessonForm({ title: "", duration: "", is_free: false, video_id: "", sort_order: 0 });
    }
  };

  const deleteLesson = async (lessonId: string, courseId: string) => {
    const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
    if (error) {
      toast.error("Failed to delete lesson");
    } else {
      const remaining = lessons.filter((l) => l.course_id === courseId && l.id !== lessonId);
      await supabase.from("courses").update({ lesson_count: remaining.length }).eq("id", courseId);
      queryClient.invalidateQueries({ queryKey: ["admin-lessons", "admin-courses"] });
      toast.success("Lesson deleted");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 container text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 container max-w-2xl text-center space-y-4">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
          <h1 className="font-display text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-5xl">
          <h1 className="font-display text-3xl font-bold mb-2">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mb-8">Manage users, subscriptions, and courses.</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border pb-2">
            {[
              { key: "users" as const, label: "Users", icon: Users },
              { key: "subscriptions" as const, label: "Subscriptions", icon: CreditCard },
              { key: "courses" as const, label: "Courses", icon: BookOpen },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-display transition-all ${
                  activeTab === key
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-4">{profiles.length} registered users</div>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-display">Name</th>
                      <th className="text-left p-3 font-display">User ID</th>
                      <th className="text-left p-3 font-display">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="p-3">{p.display_name || "—"}</td>
                        <td className="p-3 text-xs text-muted-foreground font-mono">{p.user_id.slice(0, 8)}…</td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-4">{subscriptions.length} subscriptions</div>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-display">User ID</th>
                      <th className="text-left p-3 font-display">Plan</th>
                      <th className="text-left p-3 font-display">Status</th>
                      <th className="text-left p-3 font-display">Reference</th>
                      <th className="text-left p-3 font-display">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="p-3 text-xs font-mono text-muted-foreground">{s.user_id.slice(0, 8)}…</td>
                        <td className="p-3 capitalize">{s.plan}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-display ${
                            s.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-3 text-xs font-mono text-muted-foreground">{s.paystack_reference || "—"}</td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {subscriptions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-muted-foreground">No subscriptions yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        course.is_published
                          ? "bg-green-500/10 text-green-500"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {course.is_published ? "Published" : "Draft"}
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => openEditCourse(course)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-1 ml-4">
                    {lessons
                      .filter((l) => l.course_id === course.id)
                      .map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${lesson.is_free ? "bg-green-500" : "bg-primary"}`} />
                            <span className="text-muted-foreground">{lesson.title}</span>
                            <span className="text-xs text-muted-foreground">({lesson.duration})</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteLesson(lesson.id, course.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setLessonDialog(course.id);
                      setLessonForm({ title: "", duration: "", is_free: false, video_id: "", sort_order: 0 });
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Lesson
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Edit Course Dialog */}
      <Dialog open={!!editCourse} onOpenChange={() => setEditCourse(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <Input value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={courseForm.is_published} onCheckedChange={(v) => setCourseForm({ ...courseForm, is_published: v })} />
              <span className="text-sm">Published</span>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setEditCourse(null)}>Cancel</Button>
              <Button variant="hero" size="sm" onClick={saveCourse}>
                <Save className="h-3 w-3 mr-1" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={!!lessonDialog} onOpenChange={() => setLessonDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Duration</label>
              <Input value={lessonForm.duration} onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })} placeholder="e.g. 15 min" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">YouTube Video ID (optional)</label>
              <Input value={lessonForm.video_id} onChange={(e) => setLessonForm({ ...lessonForm, video_id: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={lessonForm.is_free} onCheckedChange={(v) => setLessonForm({ ...lessonForm, is_free: v })} />
              <span className="text-sm">Free lesson</span>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setLessonDialog(null)}>Cancel</Button>
              <Button variant="hero" size="sm" onClick={() => lessonDialog && addLesson(lessonDialog)}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
