import { useQuery } from "@tanstack/react-query";
import type { GetRoomsQuestionsResponseType } from "./types/getRoomsQuestionsResponseType";

export function useGetRoomsQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`);
      const result: GetRoomsQuestionsResponseType = await response.json();

      return result;
    },
  });
}
