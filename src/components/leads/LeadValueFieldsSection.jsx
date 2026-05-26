import {
    Text,
    HStack,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Badge,
    SimpleGrid,
    Divider,
} from "@chakra-ui/react";
import { Save } from "lucide-react";
import { filterFieldProps } from "./leadStyles";
import LeadDetailSection from "./LeadDetailSection";

export default function LeadValueFieldsSection({
    columns = [],
    values = {},
    onChange,
    onSave,
    saving = false,
    readOnly = false,
    dirty = false,
}) {
    if (!columns.length) {
        return (
            <LeadDetailSection
                title="Qo'shimcha maydonlar"
                subtitle="Hozircha columnlar mavjud emas"
            >
                <Text fontSize="sm" color="textSecondary">
                    Super Admin yangi column qo&apos;shishi mumkin.
                </Text>
            </LeadDetailSection>
        );
    }

    const saveAction =
        !readOnly && onSave ? (
            <Button
                size="sm"
                colorScheme="blue"
                borderRadius="lg"
                leftIcon={<Save size={15} />}
                isLoading={saving}
                loadingText="Saqlanmoqda..."
                isDisabled={!dirty && !saving}
                onClick={onSave}
            >
                Saqlash
            </Button>
        ) : null;

    return (
        <LeadDetailSection
            title="Qo'shimcha maydonlar"
            subtitle="Har bir column uchun qiymat. Bo'sh qoldirish — o'chiriladi."
            action={
                <HStack spacing={2} flexShrink={0}>
                    {dirty && !readOnly ? (
                        <Badge colorScheme="orange" variant="subtle">
                            Saqlanmagan
                        </Badge>
                    ) : null}
                    {saveAction}
                </HStack>
            }
        >
            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                spacing={{ base: 3, md: 4 }}
                w="100%"
            >
                {columns.map((col) => (
                    <FormControl key={col.id} isRequired={false}>
                        <FormLabel
                            fontSize="sm"
                            mb={1.5}
                            fontWeight="600"
                            color="text"
                            requiredIndicator={<></>}
                        >
                            <HStack spacing={2} flexWrap="wrap">
                                <Text as="span">{col.label}</Text>
                                {col.is_required ? (
                                    <Text as="span" fontSize="xs" color="orange.500">
                                        majburiy
                                    </Text>
                                ) : null}
                            </HStack>
                        </FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={values[col.id] ?? ""}
                            isReadOnly={readOnly}
                            placeholder="Qiymat kiriting"
                            onChange={(e) => onChange?.(col.id, e.target.value)}
                        />
                    </FormControl>
                ))}
            </SimpleGrid>

            {!readOnly && onSave && dirty ? (
                <>
                    <Divider my={5} borderColor="border" display={{ base: "block", md: "none" }} />
                    <Flex justify="flex-end" display={{ base: "flex", md: "none" }}>
                        <Button
                            w="full"
                            colorScheme="blue"
                            borderRadius="lg"
                            leftIcon={<Save size={16} />}
                            isLoading={saving}
                            onClick={onSave}
                        >
                            O&apos;zgarishlarni saqlash
                        </Button>
                    </Flex>
                </>
            ) : null}
        </LeadDetailSection>
    );
}
