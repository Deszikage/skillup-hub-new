import { Link } from "react-router-dom";
import { ArrowRight, Code, Globe, Layout, Wifi } from "lucide-react";

const courses = [
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Build beautiful, responsive web pages from scratch. Master semantic HTML, Flexbox, Grid & modern CSS.",
    icon: Layout,
    lessons: 18,
    level: "Beginner",
    color: "text-primary",
    borderColor: "border-primary/20 hover:border-primary/40",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "From variables to async/await. Learn modern ES6+ JavaScript with hands-on projects and exercises.",
    icon: Code,
    lessons: 24,
    level: "Intermediate",
    color: "text-warning",
    borderColor: "border-warning/20 hover:border-warning/40",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Understand TCP/IP, DNS, HTTP, firewalls and network architecture. Essential for any developer.",
    icon: Wifi,
    lessons: 14,
    level: "Beginner",
    color: "text-success",
    borderColor: "border-success/20 hover:border-success/40",
  },
  {
    id: "web-development",
    title: "Full-Stack Web Dev",
    description: "Combine everything: build and deploy real web applications with frontend and backend skills.",
    icon: Globe,
    lessons: 20,
    level: "Advanced",
    color: "text-accent",
    borderColor: "border-accent/20 hover:border-accent/40",
  },
];

const CoursesSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Structured courses designed by industry professionals. Start from zero or level up your existing skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className={`group relative rounded-xl border ${course.borderColor} bg-card p-6 transition-all duration-300 card-hover`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-lg bg-secondary p-3 ${course.color}`}>
                  <course.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-display bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                  {course.level}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{course.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-display">{course.lessons} lessons</span>
                <span className={`flex items-center gap-1 text-sm font-semibold ${course.color} group-hover:gap-2 transition-all`}>
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
