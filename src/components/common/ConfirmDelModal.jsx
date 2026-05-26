import { Button, Text } from "@chakra-ui/react";
import VolidamModalShell from "../ui/VolidamModalShell";
import { volidamGhostButton, volidamDangerButton } from "../ui/volidamUi";

export default function ConfirmDelModal({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    loading,
    typeItem = "element",
    title = "O'chirishni tasdiqlang",
    message,
    cancelLabel = "Bekor qilish",
    confirmLabel = "O'chirish",
}) {
    return (
        <VolidamModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            tone="danger"
            title={title}
            subtitle="Bu amalni qaytarib bo'lmaydi"
            footer={
                <>
                    <Button {...volidamGhostButton} onClick={onClose} isDisabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        {...volidamDangerButton}
                        isLoading={loading}
                        loadingText="O'chirilmoqda..."
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <Text color="text" lineHeight="tall">
                {message ?? `Haqiqatdan ham bu ${typeItem}ni o'chirmoqchimisiz?`}
            </Text>
            {itemName ? (
                <Text
                    mt={3}
                    p={3}
                    borderRadius="xl"
                    bg="mutedBg"
                    fontWeight="700"
                    color="red.500"
                    fontSize="sm"
                >
                    {itemName}
                </Text>
            ) : null}
        </VolidamModalShell>
    );
}
