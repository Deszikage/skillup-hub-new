import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="container relative z-10 text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-display text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          New: Networking Fundamentals Course
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight">
          Master the Art of
          <br />
          <span className="gradient-text">Modern Development</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Interactive lessons in HTML, CSS, JavaScript & Networking.
          Practice with real coding challenges. Learn at your pace, level up your career.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/courses">
            <Button variant="hero" size="lg" className="text-base px-8">
              Start Learning Free <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/course/html-css">
            <Button variant="hero-outline" size="lg" className="text-base px-8">
              <Play className="mr-1 h-4 w-4" /> Watch Demo
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div><span className="font-display font-bold text-foreground text-2xl">50+</span><br />Lessons</div>
          <div className="h-8 w-px bg-border" />
          <div><span className="font-display font-bold text-foreground text-2xl">200+</span><br />Challenges</div>
          <div className="h-8 w-px bg-border" />
          <div><span className="font-display font-bold text-foreground text-2xl">10k+</span><br />Students</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
