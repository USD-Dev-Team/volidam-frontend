import { useEffect, useState } from "react";
import {
    Button,
    Textarea,
    Text,
    VStack,
} from "@chakra-ui/react";
import VolidamModalShell from "../../../components/ui/VolidamModalShell";
import { volidamDangerButton, volidamGhostButton } from "../../../components/ui/volidamUi";

export default function CancelTaskDropModal({
    isOpen,
    onClose,
    taskTitle = "",
    existingNote = "",
    onConfirm,
    isSubmitting = false,
}) {
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (isOpen) setReason("");
    }, [isOpen]);

    const submit = async () => {
        const t = String(reason ?? "").trim();
        if (!t) return;
        await onConfirm?.(t);
    };

    return (
        <VolidamModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            tone="danger"
            title="Bekor qilish"
            subtitle={taskTitle ? `"${taskTitle}"` : "Statusni bekor qilish"}
            footer={
                <>
                    <Button
                        {...volidamGhostButton}
                        onClick={onClose}
                        isDisabled={isSubmitting}
                    >
                        Orqaga
                    </Button>
                    <Button
                        {...volidamDangerButton}
                        onClick={submit}
                        isLoading={isSubmitting}
                        loadingText="Saqlanmoqda..."
                        isDisabled={!String(reason ?? "").trim()}
                    >
                        Statusni yangilash
                    </Button>
                </>
            }
        >
            <VStack align="stretch" spacing={4}>
                <Text fontSize="xs" color="textSecondary">
                    Izoh avval chatga yoziladi, so‘ng status yangilanadi.
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color="text">
                    Bekor qilish sababi (chat)
                </Text>
                <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Chat uchun izoh..."
                    rows={4}
                    borderRadius="xl"
                    isDisabled={isSubmitting}
                />
                {existingNote ? (
                    <>
                        <Text fontSize="sm" fontWeight="semibold" color="text">
                            Joriy izoh
                        </Text>
                        <Text fontSize="sm" color="textSecondary" whiteSpace="pre-wrap">
                            {existingNote}
                        </Text>
                    </>
                ) : (
                    <Text fontSize="xs" color="textSecondary">
                        Joriy izoh yo‘q — faqat bekor qilish sababi qo‘shiladi.
                    </Text>
                )}
            </VStack>
        </VolidamModalShell>
    );
}
