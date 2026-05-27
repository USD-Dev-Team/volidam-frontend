/** Chakra v2 — anatomy importisiz Modal tema */
const Modal = {
    parts: [
        "overlay",
        "dialogContainer",
        "dialog",
        "header",
        "closeButton",
        "body",
        "footer",
    ],
    baseStyle: {
        overlay: {
            bg: "blackAlpha.500",
            backdropFilter: "blur(8px)",
        },
        dialog: {
            bg: "surface",
            borderRadius: "2xl",
            overflow: "hidden",
            boxShadow: "2xl",
            borderWidth: "1px",
            borderColor: "border",
            mx: 3,
        },
        header: {
            px: 6,
            py: 5,
            borderBottomWidth: "1px",
            borderColor: "border",
            fontWeight: "700",
            fontSize: "lg",
            color: "text",
        },
        body: {
            px: 6,
            py: 5,
            color: "text",
        },
        footer: {
            px: 6,
            py: 4,
            gap: 3,
            borderTopWidth: "1px",
            borderColor: "border",
            bg: "modalFooterBg",
            flexWrap: "wrap",
        },
        closeButton: {
            borderRadius: "full",
            top: 3,
            right: 3,
            color: "textSecondary",
            _hover: {
                bg: "mutedBg",
                color: "text",
            },
            _focusVisible: {
                boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.22)",
            },
        },
    },
};

export default Modal;
