import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdTasksModalShell from "../../pages/ADtasks/_components/AdTasksModalShell";
import { filterFieldProps } from "./leadStyles";

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
        <AdTasksModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            isCentered
            closeOnOverlayClick
            title={mode === "create" ? "Yangi maydon" : "Maydonni tahrirlash"}
            subtitle="Lid kartochkasidagi qo'shimcha ustun"
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
                        {mode === "create" ? "Yaratish" : "Saqlash"}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel fontSize="sm">Nomi (label)</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={form.label}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, label: e.target.value }))
                            }
                            placeholder="Masalan: Darsga kelish vaqti"
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
                            colorScheme="blue"
                        />
                        <FormLabel mb={0} fontSize="sm">
                            Majburiy maydon
                        </FormLabel>
                    </FormControl>
                </VStack>
            </form>
        </AdTasksModalShell>
    );
}
