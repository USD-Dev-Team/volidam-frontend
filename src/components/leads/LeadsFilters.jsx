import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Icon,
    FormControl,
    FormLabel,
    useColorModeValue,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { filterFieldProps } from "./leadStyles";

export default function LeadsFilters({
    statuses,
    statusId,
    onStatusIdChange,
    search,
    onSearchChange,
}) {
    const labelColor = useColorModeValue("gray.700", "gray.300");

    return (
        <Flex
            gap={4}
            mb={4}
            flexWrap="wrap"
            align={{ base: "stretch", md: "flex-end" }}
        >
            <FormControl maxW={{ base: "full", md: "220px" }}>
                <FormLabel fontSize="sm" color={labelColor} mb={1}>
                    Status
                </FormLabel>
                <Select
                    {...filterFieldProps}
                    value={statusId}
                    onChange={(e) => onStatusIdChange(e.target.value)}
                >
                    <option value="">Barcha statuslar</option>
                    {statuses.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl flex={1} minW={{ base: "full", md: "280px" }}>
                <FormLabel fontSize="sm" color={labelColor} mb={1}>
                    Qidiruv
                </FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents="none" h="full">
                        <Icon as={Search} color="gray.400" boxSize={4} />
                    </InputLeftElement>
                    <Input
                        {...filterFieldProps}
                        pl={10}
                        placeholder="FIO, telefon yoki yaratuvchi..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
        </Flex>
    );
}
