import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  const { user } = useAuth();

  const { data: isPro = false, isLoading } = useQuery({
    queryKey: ["subscription-status", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("is_pro", { _user_id: user.id });
      if (error) {
        console.error("Error checking pro status:", error);
        return false;
      }
      return !!data;
    },
    enabled: !!user,
  });

  return { isPro, isLoading };
};
