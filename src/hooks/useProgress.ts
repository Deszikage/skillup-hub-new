import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: progress = [] } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const saveProgress = useMutation({
    mutationFn: async ({
      itemType,
      itemId,
      completed,
      score,
    }: {
      itemType: "lesson" | "quiz";
      itemId: string;
      completed: boolean;
      score?: number;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
          completed,
          score,
        },
        { onConflict: "user_id,item_type,item_id" }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-progress", user?.id] });
    },
  });

  const isCompleted = (itemType: string, itemId: string) =>
    progress.some((p) => p.item_type === itemType && p.item_id === itemId && p.completed);

  const getScore = (itemType: string, itemId: string) =>
    progress.find((p) => p.item_type === itemType && p.item_id === itemId)?.score;

  return { progress, saveProgress, isCompleted, getScore };
};
