import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { volidamModalCloseButton } from "./volidamUi";

export function useVolidamModalChrome(tone = "default") {
    const borderCol = useColorModeValue("rgba(244, 143, 177, 0.35)", "whiteAlpha.200");
    const headerBorder = useColorModeValue("rgba(244, 143, 177, 0.25)", "whiteAlpha.200");
    const footerBg = "modalFooterBg";
    const heroBg = useColorModeValue(
        "linear-gradient(135deg, #fff5f5 0%, #fce4ec 45%, #f8bbd0 100%)",
        "linear-gradient(135deg, rgba(233,30,99,0.12) 0%, rgba(194,24,91,0.18) 100%)"
    );
    const heroDangerBg = useColorModeValue(
        "linear-gradient(135deg, #fff5f5 0%, #ffe4e6 50%, #ffcdd2 100%)",
        "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(233,30,99,0.12) 100%)"
    );
    return {
        borderCol,
        headerBorder,
        footerBg,
        heroBg: tone === "danger" ? heroDangerBg : heroBg,
    };
}

/** Login / Volidam uslubidagi modal */
export default function VolidamModalShell({
    isOpen,
    onClose,
    size = "md",
    title,
    subtitle,
    children,
    footer = null,
    isCentered = true,
    closeOnOverlayClick = true,
    tone = "default",
    scrollBody = false,
    bodyMaxH = "min(70vh, 640px)",
}) {
    const { borderCol, headerBorder, footerBg, heroBg } = useVolidamModalChrome(tone);
    const titleColor = useColorModeValue("#880e4f", "white");
    const subtitleColor = useColorModeValue("#ad1457", "gray.400");

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={isCentered}
            size={size}
            motionPreset="slideInBottom"
            closeOnOverlayClick={closeOnOverlayClick}
        >
            <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(8px)" />
            <ModalContent
                bg="surface"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
                borderWidth="1px"
                borderColor={borderCol}
                mx={3}
            >
                <Box
                    px={6}
                    py={5}
                    borderBottomWidth="1px"
                    borderColor={headerBorder}
                    bgImage={heroBg}
                >
                    <Text fontWeight="700" fontSize="lg" pr={10} color={titleColor}>
                        {title}
                    </Text>
                    {subtitle ? (
                        <Text fontSize="sm" color={subtitleColor} mt={1} fontWeight="500">
                            {subtitle}
                        </Text>
                    ) : null}
                    <ModalCloseButton top={3} right={3} {...volidamModalCloseButton} />
                </Box>

                <ModalBody
                    px={6}
                    py={5}
                    overflowY={scrollBody ? "auto" : undefined}
                    maxH={scrollBody ? bodyMaxH : undefined}
                    sx={
                        scrollBody
                            ? {
                                  "&::-webkit-scrollbar": { width: "6px" },
                                  "&::-webkit-scrollbar-thumb": {
                                      bg: "rgba(233, 30, 99, 0.25)",
                                      borderRadius: "full",
                                  },
                              }
                            : undefined
                    }
                >
                    {children}
                </ModalBody>

                {footer ? (
                    <ModalFooter
                        px={6}
                        py={4}
                        gap={3}
                        borderTopWidth="1px"
                        borderColor={headerBorder}
                        bg={footerBg}
                        flexWrap="wrap"
                    >
                        {footer}
                    </ModalFooter>
                ) : null}
            </ModalContent>
        </Modal>
    );
}
