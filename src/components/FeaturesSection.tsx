import { Video, BookOpen, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Lessons",
    description: "Step-by-step curriculum from basics to advanced topics, designed by industry experts.",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Embedded video content for visual learners. Watch, pause, practice, repeat.",
  },
  {
    icon: Trophy,
    title: "Practice Challenges",
    description: "Test your knowledge with coding questions and quizzes after every lesson.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join thousands of learners. Share solutions, ask questions, grow together.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete learning platform with tools that make mastering tech skills enjoyable and effective.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="text-center p-6">
              <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
