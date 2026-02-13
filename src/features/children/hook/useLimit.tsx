import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import childrenApi, {LimitParams} from "@/src/features/children/services/api";
import {queryKey} from "@/src/utils/method";

const useLimit = () => {
    const message = useAlert();
    const queryClient = useQueryClient();

    const handleCloseModal = () =>
        message.setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {
            },
            btnText: "",
        });

    return useMutation<any, Error, LimitParams>({
        mutationFn: (body) => childrenApi.fetchChildLimit(body.childId, body),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [queryKey.children]});

          setTimeout(()=>{
              message?.setAlertMessage({
                  visible: true,
                  message: "Limit updated successfully",
                  title: "Limit",
                  type: "success",
                  onPress: () => handleCloseModal(),
                  btnText: "Génial!!!",
              });
          }, 500)
        },
        onError: (error) => {
            message?.setAlertMessage({
                visible: true,
                message: error?.message || "Une erreur est survenue",
                title: "Limit",
                type: "warning",
                onPress: () => handleCloseModal(),
                btnText: "D'accord",
            });
        },
    });
};
export default useLimit;