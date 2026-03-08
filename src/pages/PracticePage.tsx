import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { getRandomQuestions, categories, type Question } from "@/data/questionBank";

const PracticePage = () => {
  const [filter, setFilter] = useState("All");
  const [questions, setQuestions] = useState<Question[]>(() => getRandomQuestions("All"));
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const { user } = useAuth();
  const { saveProgress } = useProgress();

  const handleCategoryChange = useCallback((cat: string) => {
    setFilter(cat);
    setQuestions(getRandomQuestions(cat));
    setAnswers({});
    setRevealed({});
  }, []);

  const handleShuffle = useCallback(() => {
    setQuestions(getRandomQuestions(filter));
    setAnswers({});
    setRevealed({});
  }, [filter]);

  const handleAnswer = (qId: number, optIndex: number) => {
    if (revealed[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));

    const q = questions.find((q) => q.id === qId);
    if (q && user) {
      const isCorrect = q.correct === optIndex;
      saveProgress.mutate({
        itemType: "quiz",
        itemId: `question-${qId}`,
        completed: true,
        score: isCorrect ? 1 : 0,
      });
    }
  };

  const score = Object.entries(revealed).filter(([id]) => {
    const q = questions.find((q) => q.id === Number(id));
    return q && answers[q.id] === q.correct;
  }).length;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Practice <span className="gradient-text">Questions</span>
            </h1>
            <Button variant="outline" size="sm" onClick={handleShuffle}>
              <RefreshCw className="h-4 w-4 mr-1" /> New Set
            </Button>
          </div>
          <p className="text-muted-foreground mb-8">Test your knowledge — questions shuffle each time!</p>

          {Object.keys(revealed).length > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
              <span className="font-display text-sm">
                Score: <span className="text-primary font-bold">{score}</span> / {Object.keys(revealed).length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleShuffle}>
                Reset & Shuffle
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-display transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-display bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                    {q.category}
                  </span>
                </div>
                <h3 className="font-display font-bold mb-4">{q.question}</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((opt, i) => {
                    const isRevealed = revealed[q.id];
                    const isSelected = answers[q.id] === i;
                    const isCorrect = q.correct === i;

                    let classes = "text-left w-full rounded-lg border p-3 text-sm transition-all ";
                    if (isRevealed) {
                      if (isCorrect) classes += "border-success/40 bg-success/10 text-foreground";
                      else if (isSelected) classes += "border-destructive/40 bg-destructive/10 text-foreground";
                      else classes += "border-border text-muted-foreground";
                    } else {
                      classes += "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground cursor-pointer";
                    }

                    return (
                      <button key={i} onClick={() => handleAnswer(q.id, i)} className={classes}>
                        <span className="flex items-center gap-2">
                          {isRevealed && isCorrect && <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />}
                          {isRevealed && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PracticePage;
