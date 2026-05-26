import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseField = defineStyle({
    borderRadius: "xl",
    bg: "surface",
    color: "text",
    borderColor: "border",
    _placeholder: {
        color: "brand.300",
        opacity: 0.75,
    },
    _hover: {
        borderColor: "brand.400",
    },
    _focusVisible: {
        borderColor: "brand.500",
        boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.12)",
    },
});

const outline = defineStyle({
    ...baseField,
    borderWidth: "1px",
});

const Input = defineStyleConfig({
    variants: {
        outline,
    },
    defaultProps: {
        variant: "outline",
        size: "md",
    },
});

export default Input;
