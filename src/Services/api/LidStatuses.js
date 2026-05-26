import { $api } from "../parametres/axios";

class apiLidStatuses {
    static getAll = async () => {
        const response = await $api.get("/lid-statuses");
        return response;
    };

    static create = async (data) => {
        const response = await $api.post("/lid-statuses", data);
        return response;
    };

    static update = async (id, data) => {
        const response = await $api.put(`/lid-statuses/${id}`, data, {
            showSuccessToast: "Status yangilandi",
        });
        return response;
    };

    static delete = async (id) => {
        const response = await $api.delete(`/lid-statuses/${id}`, {
            showSuccessToast: "Status o'chirildi",
        });
        return response;
    };

    static reorder = async (ids) => {
        const response = await $api.post(
            "/lid-statuses/reorder",
            { ids },
            { showSuccessToast: "Tartib yangilandi" }
        );
        return response;
    };
}

export { apiLidStatuses };
