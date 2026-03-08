import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Play, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const courseData: Record<string, {
  title: string;
  description: string;
  lessons: { title: string; duration: string; free: boolean; videoId?: string }[];
}> = {
  "html-css": {
    title: "HTML & CSS",
    description: "Build beautiful, responsive web pages from scratch.",
    lessons: [
      { title: "Introduction to HTML", duration: "12 min", free: true, videoId: "qz0aGYrrlhU" },
      { title: "HTML Structure & Semantics", duration: "15 min", free: true, videoId: "kUMe1FH4CHE" },
      { title: "CSS Basics & Selectors", duration: "18 min", free: true, videoId: "1PnVor36_40" },
      { title: "Box Model & Layout", duration: "20 min", free: false },
      { title: "Flexbox Deep Dive", duration: "22 min", free: false },
      { title: "CSS Grid Mastery", duration: "25 min", free: false },
      { title: "Responsive Design", duration: "18 min", free: false },
      { title: "CSS Animations", duration: "15 min", free: false },
    ],
  },
  javascript: {
    title: "JavaScript",
    description: "From variables to async/await — master modern JavaScript.",
    lessons: [
      { title: "Variables & Data Types", duration: "14 min", free: true, videoId: "W6NZfCJ1q7c" },
      { title: "Functions & Scope", duration: "18 min", free: true, videoId: "xUI5Tsl2JpY" },
      { title: "Arrays & Objects", duration: "20 min", free: true, videoId: "oigfaZ5ApsM" },
      { title: "DOM Manipulation", duration: "22 min", free: false },
      { title: "Event Handling", duration: "16 min", free: false },
      { title: "Async JavaScript", duration: "25 min", free: false },
      { title: "ES6+ Features", duration: "20 min", free: false },
      { title: "Error Handling", duration: "14 min", free: false },
    ],
  },
  networking: {
    title: "Networking",
    description: "Understand how the internet works — TCP/IP, DNS, HTTP and more.",
    lessons: [
      { title: "What is a Network?", duration: "10 min", free: true, videoId: "3QhU9jd03a0" },
      { title: "OSI Model Explained", duration: "15 min", free: true, videoId: "vv4y_uOneC0" },
      { title: "TCP vs UDP", duration: "12 min", free: true, videoId: "uwoD5YsGACg" },
      { title: "IP Addressing & Subnetting", duration: "20 min", free: false },
      { title: "DNS Deep Dive", duration: "15 min", free: false },
      { title: "HTTP & HTTPS", duration: "18 min", free: false },
      { title: "Firewalls & Security", duration: "16 min", free: false },
    ],
  },
  "web-development": {
    title: "Full-Stack Web Dev",
    description: "Build and deploy real web applications from frontend to backend.",
    lessons: [
      { title: "Overview of Web Dev", duration: "10 min", free: true, videoId: "ysEN5RaKOlA" },
      { title: "Frontend vs Backend", duration: "12 min", free: true, videoId: "XBu54nfzxAQ" },
      { title: "Setting Up Your Environment", duration: "15 min", free: true, videoId: "gp2yhkEw1xo" },
      { title: "Building a REST API", duration: "25 min", free: false },
      { title: "Database Fundamentals", duration: "20 min", free: false },
      { title: "Authentication", duration: "22 min", free: false },
      { title: "Deployment", duration: "18 min", free: false },
    ],
  },
};

const CoursePage = () => {
  const { courseId } = useParams();
  const course = courseData[courseId || ""];
  const [activeLesson, setActiveLesson] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    );
  }

  const currentLesson = course.lessons[activeLesson];

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
              {currentLesson.videoId && currentLesson.free ? (
                <div className="rounded-xl overflow-hidden border border-border aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-border aspect-video flex items-center justify-center bg-card">
                  {currentLesson.free ? (
                    <p className="text-muted-foreground">Lesson content — coming soon</p>
                  ) : (
                    <div className="text-center space-y-3">
                      <Lock className="h-10 w-10 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">This lesson requires a Pro subscription</p>
                      <Button variant="hero" size="sm">Upgrade to Pro</Button>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl font-bold mb-2">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {currentLesson.duration}</span>
                  {currentLesson.free ? (
                    <span className="text-primary font-display text-xs">FREE</span>
                  ) : (
                    <span className="text-accent font-display text-xs">PRO</span>
                  )}
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-2">
              <h3 className="font-display font-bold mb-4">Course Outline</h3>
              {course.lessons.map((lesson, i) => (
                <button
                  key={i}
                  onClick={() => lesson.free && setActiveLesson(i)}
                  className={`w-full text-left rounded-lg border p-3 transition-all text-sm ${
                    i === activeLesson
                      ? "border-primary/40 bg-primary/5"
                      : lesson.free
                      ? "border-border hover:border-primary/20 bg-card cursor-pointer"
                      : "border-border bg-card opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {lesson.free ? (
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
              ))}

              <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="font-display text-sm font-bold mb-1">Unlock all lessons</p>
                <p className="text-xs text-muted-foreground mb-3">Get full access with a Pro subscription</p>
                <Button variant="hero" size="sm" className="w-full">Go Pro — $19/mo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
