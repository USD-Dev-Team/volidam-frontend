import { Box, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export default function AdminHome() {
    return (
        <Box p={8} minH="100vh" bg="gray.50">
            <Heading size="lg" mb={2}>
                Admin panel
            </Heading>
            <Text color="gray.600" mb={8}>
                Boshqaruv bo'limlarini tanlang
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} maxW="lg">
                <Button
                    as={RouterLink}
                    to="/admin/leads"
                    h="auto"
                    py={6}
                    flexDirection="column"
                    gap={2}
                    colorScheme="pink"
                    variant="outline"
                    bg="white"
                >
                    <TrendingUp size={28} />
                    <Text fontWeight="700">Lidlar</Text>
                    <Text fontSize="xs" fontWeight="normal" color="gray.500">
                        Kanban doskasi
                    </Text>
                </Button>
            </SimpleGrid>
        </Box>
    );
}
