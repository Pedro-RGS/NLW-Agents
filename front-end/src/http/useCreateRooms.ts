import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomsRequest } from "./types/createRoomsRequestType";
import type { CreateRoomsResponse } from "./types/createRoomsResponseType";

export function useCreateRoomsType() {
  const useClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateRoomsRequest) => {
      const response = await fetch("http://localhost:3333/rooms", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: CreateRoomsResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      useClient.invalidateQueries({ queryKey: ["get-rooms"] });
    },
  });
}
