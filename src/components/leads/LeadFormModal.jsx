import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdTasksModalShell from "../../pages/ADtasks/_components/AdTasksModalShell";
import { filterFieldProps } from "./leadStyles";

const empty = { fio: "", telefon_raqam: "" };

export default function LeadFormModal({
    isOpen,
    onClose,
    onSubmit,
    loading,
    mode = "create",
    initialData = null,
}) {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;
        if (mode === "edit" && initialData) {
            setForm({
                fio: initialData.fio || "",
                telefon_raqam: initialData.telefon_raqam || "",
            });
        } else {
            setForm(empty);
        }
        setErrors({});
    }, [isOpen, mode, initialData]);

    const validate = () => {
        const next = {};
        if (!form.fio.trim()) next.fio = "FIO kiritilmagan";
        if (!form.telefon_raqam.trim()) next.telefon_raqam = "Telefon kiritilmagan";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await onSubmit({
            fio: form.fio.trim(),
            telefon_raqam: form.telefon_raqam.trim(),
            ...(mode === "edit" && initialData?.values
                ? { values: initialData.values }
                : {}),
        });
    };

    const isEdit = mode === "edit";

    return (
        <AdTasksModalShell
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Lidni tahrirlash" : "Yangi lid"}
            subtitle={isEdit ? "FIO va telefonni yangilang" : "FIO va telefon raqamini kiriting"}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} isDisabled={loading}>
                        Bekor qilish
                    </Button>
                    <Button
                        colorScheme="blue"
                        borderRadius="xl"
                        isLoading={loading}
                        loadingText="Saqlanmoqda..."
                        onClick={handleSubmit}
                    >
                        {isEdit ? "Saqlash" : "Yaratish"}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={!!errors.fio}>
                        <FormLabel fontSize="sm">FIO</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={form.fio}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, fio: e.target.value }))
                            }
                            placeholder="Aliyev Ali Valiyevich"
                        />
                        <FormErrorMessage>{errors.fio}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.telefon_raqam}>
                        <FormLabel fontSize="sm">Telefon raqam</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={form.telefon_raqam}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    telefon_raqam: e.target.value,
                                }))
                            }
                            placeholder="+998901234567"
                        />
                        <FormErrorMessage>{errors.telefon_raqam}</FormErrorMessage>
                    </FormControl>
                </VStack>
            </form>
        </AdTasksModalShell>
    );
}
