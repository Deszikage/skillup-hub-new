import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Play, Lock, CheckCircle2, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const { isPro } = useSubscription();

  // Fetch course from DB
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

  // Fetch lessons from DB
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  const currentLesson = lessons[activeLesson];
  const canAccessLesson = (lesson: typeof lessons[0]) => lesson.is_free || isPro;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-8">{course.description}</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video / Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {currentLesson && currentLesson.video_id && canAccessLesson(currentLesson) ? (
                <div className="rounded-xl overflow-hidden border border-border aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentLesson.video_id}?rel=0&modestbranding=1`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-border aspect-video flex items-center justify-center bg-card">
                  {currentLesson && canAccessLesson(currentLesson) ? (
                    <p className="text-muted-foreground">Lesson content — coming soon</p>
                  ) : (
                    <div className="text-center space-y-3">
                      <Lock className="h-10 w-10 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">This lesson requires a Pro subscription</p>
                      <Link to="/#pricing">
                        <Button variant="hero" size="sm">Upgrade to Pro</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {currentLesson && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="font-display text-xl font-bold mb-2">{currentLesson.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {currentLesson.duration}</span>
                    {canAccessLesson(currentLesson) ? (
                      <span className="text-primary font-display text-xs">{currentLesson.is_free ? "FREE" : "PRO ✓"}</span>
                    ) : (
                      <span className="text-accent font-display text-xs">PRO</span>
                    )}
                  </div>
                </div>
              )}

              {/* Previous / Next Navigation Buttons */}
              {lessons.length > 0 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setActiveLesson((prev) => prev - 1)}
                    disabled={activeLesson === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous Lesson
                  </Button>

                  <Button
                    variant="hero"
                    onClick={() => setActiveLesson((prev) => prev + 1)}
                    disabled={activeLesson === lessons.length - 1}
                    className="gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Lesson List */}
            <div className="space-y-2">
              <h3 className="font-display font-bold mb-4">Course Outline</h3>
              {lessons.map((lesson, i) => {
                const accessible = canAccessLesson(lesson);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => accessible && setActiveLesson(i)}
                    className={`w-full text-left rounded-lg border p-3 transition-all text-sm ${
                      i === activeLesson
                        ? "border-primary/40 bg-primary/5"
                        : accessible
                        ? "border-border hover:border-primary/20 bg-card cursor-pointer"
                        : "border-border bg-card opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {accessible ? (
                          i === activeLesson ? (
                            <Play className="h-4 w-4 text-primary flex-shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={i === activeLesson ? "text-foreground font-medium" : "text-muted-foreground"}>
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{lesson.duration}</span>
                    </div>
                  </button>
                );
              })}

              {!isPro && (
                <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="font-display text-sm font-bold mb-1">Unlock all lessons</p>
                  <p className="text-xs text-muted-foreground mb-3">Get full access with a Pro subscription</p>
                  <Link to="/#pricing">
                    <Button variant="hero" size="sm" className="w-full">Go Pro — ₦9,500/mo</Button>
                  </Link>
                </div>
              )}

              <Link to={`/certificate/${courseId}`} className="block mt-3">
                <div className="p-3 rounded-xl border border-border bg-card hover:border-primary/20 transition-all flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-display font-medium">View Certificate</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
