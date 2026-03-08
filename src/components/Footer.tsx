import { Code2, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">Code<span className="text-primary">Forge</span></span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Learn to code with interactive lessons, practice challenges, and video tutorials.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4">Courses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/course/html-css" className="hover:text-foreground transition-colors">HTML & CSS</Link></li>
              <li><Link to="/course/javascript" className="hover:text-foreground transition-colors">JavaScript</Link></li>
              <li><Link to="/course/networking" className="hover:text-foreground transition-colors">Networking</Link></li>
              <li><Link to="/course/web-development" className="hover:text-foreground transition-colors">Full-Stack</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/practice" className="hover:text-foreground transition-colors">Practice</Link></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CodeForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
