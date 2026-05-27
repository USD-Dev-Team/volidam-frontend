import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const pinkFocus = {
    boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.22)",
};

const ghost = defineStyle((props) => {
    const scheme = props.colorScheme || "gray";

    if (scheme === "red") {
        return {
            _hover: {
                bg: "red.50",
                color: "red.600",
                _dark: { bg: "whiteAlpha.100", color: "red.300" },
            },
            _focusVisible: pinkFocus,
        };
    }

    if (scheme === "orange") {
        return {
            _hover: {
                bg: "orange.50",
                color: "orange.600",
                _dark: { bg: "whiteAlpha.100", color: "orange.300" },
            },
            _focusVisible: pinkFocus,
        };
    }

    if (scheme === "pink" || scheme === "brand" || scheme === "gray") {
        return {
            _hover: {
                bg: "mutedBg",
                color: "brand.600",
                _dark: { bg: "whiteAlpha.100", color: "brand.300" },
            },
            _focusVisible: pinkFocus,
        };
    }

    return {
        _hover: {
            bg: "mutedBg",
            color: `${scheme}.600`,
            _dark: { bg: "whiteAlpha.100", color: `${scheme}.300` },
        },
        _focusVisible: pinkFocus,
    };
});

const outline = defineStyle({
    borderColor: "border",
    color: "text",
    _hover: {
        borderColor: "brand.400",
        bg: "mutedBg",
        color: "text",
    },
    _focusVisible: pinkFocus,
});

const IconButton = defineStyleConfig({
    baseStyle: {
        borderRadius: "lg",
    },
    variants: {
        ghost,
        outline,
    },
    defaultProps: {
        variant: "ghost",
        colorScheme: "pink",
    },
});

export default IconButton;
