import { $api } from "../parametres/axios";

class apiLidColumns {
    static getAll = async () => {
        const response = await $api.get("/lid-columns");
        return response;
    };

    static create = async (data) => {
        const response = await $api.post("/lid-columns", data, {
            showSuccessToast: "Maydon yaratildi",
        });
        return response;
    };

    static update = async (id, data) => {
        const response = await $api.put(`/lid-columns/${id}`, data, {
            showSuccessToast: "Maydon yangilandi",
        });
        return response;
    };

    static delete = async (id) => {
        const response = await $api.delete(`/lid-columns/${id}`, {
            showSuccessToast: "Maydon o'chirildi",
        });
        return response;
    };
}

export { apiLidColumns };
