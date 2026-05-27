import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    Flex,
    Text,
    Box,
    Badge,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Save } from "lucide-react";
import {
    filterFieldProps,
    volidamFormLabel,
    volidamPrimaryButton,
} from "./leadStyles";

function FieldCard({ children, ...rest }) {
    const bg = useColorModeValue("rgba(255,255,255,0.8)", "whiteAlpha.50");
    return (
        <Box
            p={4}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border"
            bg={bg}
            {...rest}
        >
            {children}
        </Box>
    );
}

export default function LeadDetailLidSection({
    lid,
    statuses = [],
    canEdit = false,
    onSave,
    saving = false,
}) {
    const [fio, setFio] = useState("");
    const [telefon, setTelefon] = useState("");
    const [statusId, setStatusId] = useState("");

    useEffect(() => {
        if (!lid) return;
        setFio(lid.fio || "");
        setTelefon(lid.telefon_raqam || "");
        setStatusId(lid.status_id || lid.status?.id || "");
    }, [lid]);

    const dirty = useMemo(() => {
        if (!lid) return false;
        const baseStatus = lid.status_id || lid.status?.id || "";
        return (
            fio !== (lid.fio || "") ||
            telefon !== (lid.telefon_raqam || "") ||
            statusId !== baseStatus
        );
    }, [lid, fio, telefon, statusId]);

    const selectedStatus = statuses.find((s) => s.id === statusId);
    const statusColor = selectedStatus?.color || lid?.status?.color || "#e91e63";

    const handleSubmit = () => {
        if (!canEdit || !dirty) return;
        onSave?.({ fio: fio.trim(), telefon_raqam: telefon.trim(), statusId });
    };

    if (!lid) return null;

    if (!canEdit) {
        return (
            <Flex direction="column" gap={3}>
                {selectedStatus?.name || lid.status?.name ? (
                    <Badge
                        alignSelf="flex-start"
                        px={3}
                        py={1}
                        borderRadius="full"
                        variant="outline"
                        borderColor={statusColor}
                        color={statusColor}
                        fontWeight="700"
                    >
                        {selectedStatus?.name || lid.status?.name}
                    </Badge>
                ) : null}
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="text">
                    {fio || "—"}
                </Text>
                {telefon ? (
                    <Text fontSize="md" fontWeight="600" color="textSecondary">
                        {telefon}
                    </Text>
                ) : null}
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FieldCard>
                    <FormControl>
                        <FormLabel {...volidamFormLabel}>Status</FormLabel>
                        <Select
                            {...filterFieldProps}
                            value={statusId}
                            onChange={(e) => setStatusId(e.target.value)}
                        >
                            <option value="">Status tanlang</option>
                            {statuses.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </FieldCard>
                <FieldCard>
                    <FormControl>
                        <FormLabel {...volidamFormLabel}>FIO</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={fio}
                            onChange={(e) => setFio(e.target.value)}
                            placeholder="To'liq ism"
                        />
                    </FormControl>
                </FieldCard>
                <FieldCard gridColumn={{ md: "1 / -1" }}>
                    <FormControl>
                        <FormLabel {...volidamFormLabel}>Telefon raqam</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={telefon}
                            onChange={(e) => setTelefon(e.target.value)}
                            placeholder="+998 90 123 45 67"
                        />
                    </FormControl>
                </FieldCard>
            </SimpleGrid>

            <Flex
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={3}
                pt={1}
                borderTopWidth="1px"
                borderColor="border"
            >
                {dirty ? (
                    <Badge colorScheme="orange" variant="subtle" borderRadius="full" px={3}>
                        Saqlanmagan o&apos;zgarishlar
                    </Badge>
                ) : (
                    <Box />
                )}
                <Button
                    {...volidamPrimaryButton}
                    leftIcon={<Save size={16} />}
                    isLoading={saving}
                    isDisabled={!dirty && !saving}
                    onClick={handleSubmit}
                >
                    Saqlash
                </Button>
            </Flex>
        </Flex>
    );
}
