import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomsQuestionsResponseType } from "./types/createRoomsQuestionsReponseType";
import type { CreateRoomsQuestionsRequestType } from "./types/createRoomsQuestionsRequestType";

export function useCreateRoomsQuestions(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomsQuestionsRequestType) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateRoomsQuestionsResponseType = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
    },
  });
}
