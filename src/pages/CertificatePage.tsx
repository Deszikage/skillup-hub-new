import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useProgress } from "@/hooks/useProgress";
import { Award, Download, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const CertificatePage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const { progress } = useProgress();
  const certRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<{ display_name: string | null }>({ display_name: null });

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
      });
  }, [user]);

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 container text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const completedLessons = progress.filter(
    (p) => p.item_type === "lesson" && p.item_id.startsWith(`${courseId}-lesson-`) && p.completed
  ).length;
  const isCompleted = completedLessons >= course.lesson_count;

  const studentName = profile.display_name || user?.email || "Student";
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-12 container max-w-2xl text-center space-y-4">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto" />
          <h1 className="font-display text-2xl font-bold">Sign in Required</h1>
          <p className="text-muted-foreground">Please sign in to access certificates.</p>
          <Link to="/auth">
            <Button variant="hero">Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 print:pt-0 print:pb-0">
        <div className="container max-w-4xl print:max-w-none">
          <div className="print:hidden mb-8">
            <Link
              to={`/course/${courseId}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Course
            </Link>

            <h1 className="font-display text-3xl font-bold mb-2">
              Certificate of <span className="text-primary">Completion</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              Complete all lessons in {course.title} as a Pro subscriber to earn your certificate.
            </p>

            {!isCompleted && (
              <div className="p-4 rounded-xl border border-border bg-card mb-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-display font-bold text-sm">Course Not Yet Completed</p>
                    <p className="text-xs text-muted-foreground">
                      You've completed {completedLessons} of {course.lesson_count} lessons.
                      Finish all lessons to unlock your certificate.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isCompleted && !isPro && (
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-6">
                <div className="flex items-center gap-3">
                  <Lock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-display font-bold text-sm">Pro Subscription Required</p>
                    <p className="text-xs text-muted-foreground">
                      Certificates are available exclusively for Pro subscribers.
                    </p>
                    <Link to="/#pricing">
                      <Button variant="hero" size="sm" className="mt-2">
                        Upgrade to Pro
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {isCompleted && isPro && (
              <Button variant="hero" onClick={handlePrint} className="mb-6">
                <Download className="h-4 w-4 mr-2" /> Download Certificate
              </Button>
            )}
          </div>

          {/* Certificate Preview */}
          <div
            ref={certRef}
            className={`relative mx-auto bg-background border-[3px] border-primary/30 rounded-2xl print:rounded-none p-8 md:p-12 print:p-16 ${
              !isCompleted || !isPro ? "opacity-40 pointer-events-none select-none print:opacity-100" : ""
            }`}
            style={{ aspectRatio: "1.414 / 1", maxWidth: "800px" }}
          >
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 md:space-y-6">
              <Award className="h-14 w-14 text-primary" />
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-display">
                Certificate of Completion
              </p>
              <h2 className="font-display text-lg md:text-2xl font-bold text-foreground">
                This certifies that
              </h2>
              <p className="font-display text-2xl md:text-4xl font-bold text-primary border-b-2 border-primary/20 pb-2 px-8">
                {studentName}
              </p>
              <p className="text-sm md:text-base text-muted-foreground max-w-md">
                has successfully completed all lessons in the
              </p>
              <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                {course.title}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                course on CodeForge
              </p>
              <div className="pt-4 md:pt-8 flex items-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="w-32 border-t border-muted-foreground/30 mb-1" />
                  <p className="text-xs text-muted-foreground">Date: {today}</p>
                </div>
                <div className="text-center">
                  <div className="w-32 border-t border-muted-foreground/30 mb-1" />
                  <p className="text-xs text-muted-foreground">CodeForge Academy</p>
                </div>
              </div>
            </div>
          </div>

          {(!isCompleted || !isPro) && (
            <div className="print:hidden text-center mt-4">
              <p className="text-xs text-muted-foreground italic">
                This is a preview. Complete the course and subscribe to Pro to download.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CertificatePage;
