const Select = {
  parts: ["field", "icon"],

  baseStyle: {
    field: {
      borderRadius: "xl",
      fontWeight: "500",
      _placeholder: {
        color: "neutral.500",
      },
    },
    icon: {
      color: "neutral.600",
    },
  },

  sizes: {
    xl: {
      field: {
        fontSize: "lg",
        px: 4,
        py: 3,
      },
      icon: {
        w: 6,
        h: 6,
      },
    },
  },

  variants: {
    filledPrimary: {
      field: {
        borderColor: "neutral.200",
        borderWidth: "1px",
        _hover: {
          borderColor: "neutral.400",
        },
        _focusVisible: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.12)",
        },
      },
    },

    outlinePrimary: {
      field: {
        borderWidth: "1px",
        borderColor: "neutral.300",
        _hover: {
          borderColor: "neutral.400",
        },
        _focusVisible: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.12)",
        },
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "filledPrimary",
  },
};

export default Select;
