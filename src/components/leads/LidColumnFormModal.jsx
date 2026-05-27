import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VolidamModalShell from "../ui/VolidamModalShell";
import {
    filterFieldProps,
    volidamFormLabel,
    volidamGhostButton,
    volidamPrimaryButton,
} from "./leadStyles";

const empty = { label: "", is_required: false, order: 0 };

export default function LidColumnFormModal({
    isOpen,
    onClose,
    mode = "create",
    initialData,
    onSubmit,
    loading,
    nextOrder = 0,
}) {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (!isOpen) return;
        if (mode === "edit" && initialData) {
            setForm({
                label: initialData.label || "",
                is_required: !!initialData.is_required,
                order: initialData.order ?? 0,
            });
        } else {
            setForm({ ...empty, order: nextOrder });
        }
    }, [isOpen, mode, initialData, nextOrder]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.label.trim()) return;
        const order =
            mode === "edit"
                ? Number(initialData?.order) || 0
                : Number(nextOrder) || 0;
        await onSubmit({
            label: form.label.trim(),
            is_required: form.is_required,
            order,
        });
    };

    return (
        <VolidamModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            title={mode === "create" ? "Yangi maydon" : "Maydonni tahrirlash"}
            subtitle="Lid kartochkasidagi qo'shimcha ustun"
            footer={
                <>
                    <Button {...volidamGhostButton} onClick={onClose} isDisabled={loading}>
                        Bekor qilish
                    </Button>
                    <Button
                        {...volidamPrimaryButton}
                        isLoading={loading}
                        loadingText="Saqlanmoqda..."
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Yaratish" : "Saqlash"}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                    <FormControl isRequired>
                        <FormLabel {...volidamFormLabel}>Nomi (label)</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={form.label}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, label: e.target.value }))
                            }
                            placeholder="Masalan: Kurs turi"
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center" gap={3}>
                        <Switch
                            isChecked={form.is_required}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    is_required: e.target.checked,
                                }))
                            }
                            colorScheme="pink"
                        />
                        <FormLabel mb={0} fontSize="sm" color="text" fontWeight="600">
                            Majburiy maydon
                        </FormLabel>
                    </FormControl>
                </VStack>
            </form>
        </VolidamModalShell>
    );
}
