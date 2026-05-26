import { Box, Text, useColorModeValue } from "@chakra-ui/react";

/** TaskDetailsModal dagi maydon kartochkasi */
export default function DetailFieldTile({ label, value, children }) {
    const panelBg = useColorModeValue("gray.50", "whiteAlpha.100");
    const borderCol = useColorModeValue("gray.200", "whiteAlpha.200");

    return (
        <Box
            p={3}
            borderRadius="md"
            bg={panelBg}
            borderWidth="1px"
            borderColor={borderCol}
        >
            <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={1}
            >
                {label}
            </Text>
            {children ?? (
                <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="text"
                    wordBreak="break-word"
                >
                    {value ?? "—"}
                </Text>
            )}
        </Box>
    );
}
