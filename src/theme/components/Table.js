const Table = {
    parts: ["table", "thead", "tbody", "tr", "th", "td", "caption"],
    variants: {
        simple: {
            th: {
                color: "textSecondary",
                fontWeight: "700",
                fontSize: "xs",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderColor: "border",
            },
            td: {
                color: "text",
                borderColor: "border",
            },
            tbody: {
                tr: {
                    transition: "background 0.15s ease",
                    _hover: {
                        bg: "tableRowHover",
                        color: "text",
                    },
                },
            },
        },
    },
    defaultProps: {
        variant: "simple",
    },
};

export default Table;
