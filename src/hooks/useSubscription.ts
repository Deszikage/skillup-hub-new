import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  const { user } = useAuth();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription-status", user?.id],
    queryFn: async () => {
      if (!user) return { isPro: false, planType: null };

      // Check the subscriptions table to see exactly WHICH plan they have
      const { data, error } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error checking subscription:", error);
        return { isPro: false, planType: null };
      }

      return { 
        isPro: !!data, 
        planType: data?.plan || null 
      };
    },
    enabled: !!user,
  });

  return { 
    isPro: subscription?.isPro || false, 
    planType: subscription?.planType || null,
    isLoading 
  };
};