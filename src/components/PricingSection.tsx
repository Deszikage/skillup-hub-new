import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "3 free lessons per course",
      "Basic practice questions",
      "Community forum access",
      "Progress tracking",
    ],
    cta: "Start Free",
    variant: "hero-outline" as const,
    popular: false,
    paystack: false,
  },
  {
    name: "Pro",
    price: "₦9,500",
    period: "/month",
    description: "Unlock everything & accelerate your learning",
    features: [
      "All courses & lessons",
      "200+ practice challenges",
      "Video tutorials included",
      "Certificate of completion",
      "Priority support",
      "Downloadable resources",
    ],
    cta: "Go Pro",
    variant: "hero" as const,
    popular: true,
    paystack: true,
    amountInKobo: 950000,
  },
];

const PricingSection = () => {
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePaystack = (amountInKobo: number) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account to subscribe.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (isPro) {
      toast({ title: "Already Pro! 🎉", description: "You already have an active Pro subscription." });
      return;
    }

    const handler = (window as any).PaystackPop?.setup({
      key: "pk_test_f99d515276353575b07b31e4a9b4318067851d6e",
      email: user.email,
      amount: amountInKobo,
      currency: "NGN",
      ref: `cf_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      callback: async (response: any) => {
        // Save subscription to database
        const { error } = await supabase.from("subscriptions").insert({
          user_id: user.id,
          status: "active",
          plan: "pro",
          paystack_reference: response.reference,
          amount: amountInKobo,
          currency: "NGN",
        });

        if (error) {
          console.error("Failed to save subscription:", error);
          toast({
            title: "Payment received",
            description: "Payment was successful but there was an issue activating your subscription. Please contact support.",
            variant: "destructive",
          });
        } else {
          // Invalidate subscription cache so Pro status updates everywhere
          queryClient.invalidateQueries({ queryKey: ["subscription-status"] });
          toast({
            title: "Welcome to Pro! 🎉",
            description: "All courses and features are now unlocked.",
          });
        }
      },
      onClose: () => {
        toast({
          title: "Payment cancelled",
          description: "You can subscribe anytime.",
        });
      },
    });

    if (handler) {
      handler.openIframe();
    } else {
      toast({
        title: "Payment unavailable",
        description: "Paystack is loading, please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start for free. Upgrade when you're ready to unlock the full experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border bg-card p-8 transition-all duration-300 card-hover ${
                plan.popular ? "border-primary/40 box-glow scale-[1.02]" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-display font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Zap className="h-3 w-3" /> {isPro ? "Active" : "Most Popular"}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.paystack ? (
                <Button
                  variant={plan.variant}
                  className="w-full"
                  onClick={() => handlePaystack((plan as any).amountInKobo)}
                  disabled={isPro}
                >
                  {isPro ? "✓ Subscribed" : plan.cta}
                </Button>
              ) : (
                <Button
                  variant={plan.variant}
                  className="w-full"
                  onClick={() => navigate(user ? "/courses" : "/auth")}
                >
                  {plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
