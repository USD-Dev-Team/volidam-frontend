/** Volidam / Login uslubidagi umumiy UI tokenlari */

export const filterFieldProps = {
    size: "md",
    borderRadius: "xl",
    variant: "outline",
    bg: "surface",
    color: "text",
    borderColor: "border",
    _hover: { borderColor: "brand.400" },
    _focusVisible: {
        borderColor: "brand.500",
        boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.12)",
    },
};

export const searchFieldProps = {
    ...filterFieldProps,
    size: "sm",
    h: "36px",
    fontSize: "sm",
};

export const volidamFormLabel = {
    fontSize: "xs",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "textSecondary",
    mb: 2,
};

export const volidamPrimaryButton = {
    colorScheme: "pink",
    size: "md",
    borderRadius: "full",
    fontWeight: "600",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 14px rgba(233, 30, 99, 0.22)",
    _hover: {
        transform: "translateY(-1px)",
        boxShadow: "0 6px 20px rgba(233, 30, 99, 0.3)",
    },
    _active: {
        transform: "translateY(0)",
    },
};

export const volidamPrimaryButtonSm = {
    ...volidamPrimaryButton,
    size: "sm",
    px: 5,
    fontSize: "sm",
};

export const volidamGhostButton = {
    variant: "ghost",
    borderRadius: "full",
    color: "textSecondary",
    fontWeight: "600",
    _hover: { bg: "mutedBg", color: "text" },
};

export const volidamOutlineButton = {
    variant: "outline",
    borderRadius: "full",
    borderWidth: "1.5px",
    borderColor: "border",
    color: "text",
    fontWeight: "600",
    bg: "surface",
    _hover: {
        borderColor: "brand.400",
        bg: "mutedBg",
    },
};

export const volidamDangerButton = {
    colorScheme: "red",
    borderRadius: "full",
    fontWeight: "600",
    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.2)",
};

export const volidamDangerIconButton = {
    size: "sm",
    variant: "ghost",
    colorScheme: "red",
    borderRadius: "lg",
    opacity: 0.75,
    _hover: {
        opacity: 1,
        bg: "red.50",
        _dark: { bg: "whiteAlpha.100" },
    },
};

export const volidamSectionShadow = {
    base: "sm",
    _light: "0 4px 24px rgba(233, 30, 99, 0.06)",
};

/** Admin / Operator jadvallari */
export const dataTableContainerProps = {
    overflowX: "auto",
    borderRadius: "xl",
    borderWidth: "1px",
    borderColor: "border",
    bg: "surface",
};

export const dataTableHeadRowProps = {
    bg: "tableHeadBg",
};

export const dataTableRowHoverProps = {
    _hover: { bg: "tableRowHover", color: "text" },
};

/** Modal yopish (×) */
export const volidamModalCloseButton = {
    borderRadius: "full",
    _hover: { bg: "mutedBg", color: "text" },
    _focusVisible: {
        boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.22)",
    },
};

/** Jadval amallaridagi icon tugmalar */
export const volidamEditIconButton = {
    size: "sm",
    variant: "ghost",
    colorScheme: "pink",
};

export const volidamLockIconButton = {
    size: "sm",
    variant: "ghost",
    colorScheme: "orange",
};

export const volidamDeleteIconButton = {
    size: "sm",
    variant: "ghost",
    colorScheme: "red",
};
