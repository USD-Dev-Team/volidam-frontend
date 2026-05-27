import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
    borderRadius: "full",
    fontWeight: "600",
    letterSpacing: "0.02em",
});

const solid = defineStyle((props) => {
    const scheme = props.colorScheme || "pink";
    const isDanger = scheme === "red";
    return {
        boxShadow: isDanger
            ? "0 4px 14px rgba(239, 68, 68, 0.22)"
            : "0 4px 14px rgba(233, 30, 99, 0.22)",
        _hover: {
            transform: "translateY(-1px)",
            boxShadow: isDanger
                ? "0 6px 20px rgba(239, 68, 68, 0.28)"
                : "0 6px 20px rgba(233, 30, 99, 0.3)",
        },
        _active: {
            transform: "translateY(0)",
        },
        _focusVisible: {
            boxShadow: isDanger
                ? "0 0 0 3px rgba(239, 68, 68, 0.25)"
                : "0 0 0 3px rgba(233, 30, 99, 0.22)",
        },
    };
});

const outline = defineStyle({
    borderWidth: "1.5px",
    borderColor: "border",
    color: "text",
    bg: "surface",
    _hover: {
        borderColor: "brand.400",
        bg: "mutedBg",
    },
});

const ghost = defineStyle({
    color: "textSecondary",
    _hover: {
        bg: "mutedBg",
        color: "text",
    },
    _focusVisible: {
        boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.22)",
    },
});

const link = defineStyle({
    color: "brand.600",
    _hover: {
        textDecoration: "none",
        color: "brand.500",
    },
});

const Button = defineStyleConfig({
    baseStyle,
    variants: {
        solid,
        outline,
        ghost,
        link,
        solidPrimary: solid,
        outlinePrimary: outline,
    },
    defaultProps: {
        colorScheme: "pink",
    },
});

export default Button;
