import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Text,
} from "@chakra-ui/react";

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
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(6px)" />

            <ModalContent>
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>
                    <Text>
                        {message ?? `Haqiqatdan ham bu ${typeItem}ni o'chirmoqchimisiz?`}
                    </Text>
                    {itemName ? (
                        <Text mt={2} fontWeight="700" color="red.400">
                            {itemName}
                        </Text>
                    ) : null}
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose} isDisabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        isLoading={loading}
                        loadingText="O'chirilmoqda..."
                        colorScheme="red"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
