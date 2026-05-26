import { Box, Text } from "@chakra-ui/react";

/** Detail sahifadagi bo‘lim — tema tokenlari (light/dark) */
export default function LeadDetailSection({
    title,
    subtitle,
    children,
    action = null,
    noPadding = false,
}) {
    return (
        <Box
            w="100%"
            borderRadius={{ base: "xl", md: "2xl" }}
            borderWidth="1px"
            borderColor="border"
            bg="surface"
            overflow="hidden"
        >
            {title ? (
                <Box
                    px={{ base: 3, md: 5 }}
                    py={{ base: 3, md: 4 }}
                    borderBottomWidth="1px"
                    borderColor="border"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={3}
                    flexWrap="wrap"
                >
                    <Box minW={0} flex={1}>
                        <Text fontWeight="700" fontSize={{ base: "sm", md: "md" }} color="text">
                            {title}
                        </Text>
                        {subtitle ? (
                            <Text fontSize="sm" color="textSecondary" mt={0.5}>
                                {subtitle}
                            </Text>
                        ) : null}
                    </Box>
                    {action}
                </Box>
            ) : null}
            <Box p={noPadding ? 0 : { base: 3, md: 5 }}>{children}</Box>
        </Box>
    );
}
