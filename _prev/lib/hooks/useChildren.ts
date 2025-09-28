import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Toast } from "toastify-react-native";
import { childrenApi } from "../api/childrenApi";
import { useAlert } from "../context/AlertContext";
import { CreateChildRequest } from "../types";

export const useChildren = () => {
  const queryClient = useQueryClient();
  const [createChildError, setCreateChildError] =
    useState<CreateChildRequest | null>(null);

  const message = useAlert();

  const fetchChildren = useQuery({
    queryKey: ["children"],
    queryFn: async () => await childrenApi.getChildren(),
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Erreur lors de la création",
        position: "top",
        visibilityTime: 4000,
      });
    },
  });

  // Create child mutation
  const createChildMutation = useMutation({
    mutationFn: childrenApi.createChild,
    onSuccess: (response) => {
      if (response.success) {
        message?.setAlertMessage({
          visible: true,
          message: "Portemonnaie créé avec succès",
          title: "Création dépendant",
          type: "success",
          onPress: () => {},
          btnText: "D'accord",
        });

        queryClient.invalidateQueries({ queryKey: ["children"] });
        queryClient.invalidateQueries({ queryKey: ["wallets"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      }
    },
    onError: (error: any) => {
      setCreateChildError(
        error.response?.data.message || "Erreur lors de la création"
      );
    },
  });

  return {
    children: fetchChildren?.data?.children,
    createChildError,
    createChild: createChildMutation.mutate,
  };
};
