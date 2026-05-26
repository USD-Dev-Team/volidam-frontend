import {
    Box,
    Button,
    Text,
    VStack,
    SimpleGrid,
    Badge,
    Skeleton,
    HStack,
    Flex,
    Icon,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Phone, User, Clock } from "lucide-react";
import { apiLids } from "../../Services/api/Lids";
import { apiLidColumns } from "../../Services/api/LidColumns";
import { unwrapEntity } from "../../utils/api/parsePagination";
import { normalizeLidFromApi } from "../../utils/lidBoard";
import {
    buildColumnValueFormState,
    buildLidValuesPayload,
    parseLidColumnsResponse,
} from "../../utils/lidColumns";
import { getLeadsBasePath } from "../../utils/leadsPaths";
import { getApiErrorMessage } from "../../utils/lidStatus";
import { toastService } from "../../utils/toast";
import { useAuthStore } from "../../store/authStore";
import { isAdmin, isOperator, isSuperAdmin } from "../../utils/roles";
import LeadDetailSection from "../../components/leads/LeadDetailSection";
import LidColumnsManageSection from "../../components/leads/LidColumnsManageSection";
import LeadValueFieldsSection from "../../components/leads/LeadValueFieldsSection";
import { formatDateTime } from "../../utils/tools/formatDateTime";

export default function LeadDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const user = useAuthStore((s) => s.user);
    const role = user?.role;
    const canManageColumns = isSuperAdmin(role);
    const canEditColumn =
        canManageColumns || isAdmin(role) || isOperator(role);
    const canEditValues = canEditColumn;

    const listPath = getLeadsBasePath(pathname);

    const [lid, setLid] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [columnDefs, setColumnDefs] = useState([]);
    const [valueForm, setValueForm] = useState({});
    const [savedSnapshot, setSavedSnapshot] = useState({});
    const [savingValues, setSavingValues] = useState(false);

    const loadData = useCallback(async () => {
        if (!id) return;
        setFetching(true);
        try {
            const [colRes, lidRes] = await Promise.all([
                apiLidColumns.getAll(),
                apiLids.getById(id),
            ]);
            const cols = parseLidColumnsResponse(colRes);
            const entity = normalizeLidFromApi(unwrapEntity(lidRes.data));
            const form = buildColumnValueFormState(entity, cols);
            setColumnDefs(cols);
            setLid(entity);
            setValueForm(form);
            setSavedSnapshot(form);
        } catch (err) {
            toastService.error(getApiErrorMessage(err) || "Lid yuklanmadi");
            setLid(null);
        } finally {
            setFetching(false);
        }
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const dirty = useMemo(() => {
        return columnDefs.some(
            (c) => (valueForm[c.id] ?? "") !== (savedSnapshot[c.id] ?? "")
        );
    }, [columnDefs, valueForm, savedSnapshot]);

    const handleValueChange = (columnId, next) => {
        setValueForm((prev) => ({ ...prev, [columnId]: next }));
    };

    const handleSaveValues = async () => {
        if (!lid?.id) return;
        setSavingValues(true);
        try {
            const values = buildLidValuesPayload(columnDefs, valueForm);
            await apiLids.update(lid.id, {
                fio: lid.fio,
                telefon_raqam: lid.telefon_raqam,
                values,
            });
            await loadData();
            toastService.success("Maydonlar saqlandi");
        } catch (err) {
            toastService.error(getApiErrorMessage(err) || "Saqlanmadi");
        } finally {
            setSavingValues(false);
        }
    };

    const statusName = lid?.status?.name ?? null;
    const statusColor = lid?.status?.color || "#378ADD";
    const creatorName = lid?.created_by_name || lid?.creator?.full_name || "—";

    const isPanel =
        pathname.startsWith("/admin") || pathname.startsWith("/operator");

    return (
        <Box
            minH={isPanel ? "100%" : "100vh"}
            overflowY="auto"
            overflowX="hidden"
            w="100%"
            bg="bg"
            pb={{ base: 8, md: 12 }}
        >
            <Box
                w="100%"
                px={{ base: 3, sm: 4, md: 6, lg: 8 }}
                py={{ base: 3, md: 6 }}
            >
                <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<ArrowLeft size={16} />}
                    mb={{ base: 3, md: 5 }}
                    px={0}
                    color="text"
                    onClick={() => navigate(listPath)}
                >
                    Barcha lidlar
                </Button>

                {fetching ? (
                    <VStack spacing={4} align="stretch">
                        <Skeleton h="120px" borderRadius="xl" />
                        <Skeleton h="280px" borderRadius="xl" />
                    </VStack>
                ) : !lid ? (
                    <LeadDetailSection title="Lid topilmadi">
                        <Text color="textSecondary" textAlign="center" py={8}>
                            Ma&apos;lumot mavjud emas
                        </Text>
                    </LeadDetailSection>
                ) : (
                    <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="100%">
                        <Box
                            borderRadius={{ base: "xl", md: "2xl" }}
                            borderWidth="1px"
                            borderColor="border"
                            bg="surface"
                            overflow="hidden"
                        >
                            <Flex direction={{ base: "column", sm: "row" }}>
                                <Box
                                    w={{ base: "100%", sm: "4px" }}
                                    h={{ base: "4px", sm: "auto" }}
                                    flexShrink={0}
                                    bg={statusColor}
                                />
                                <Box flex={1} p={{ base: 4, md: 6 }} minW={0}>
                                    {statusName ? (
                                        <Badge
                                            mb={3}
                                            px={2.5}
                                            py={0.5}
                                            borderRadius="md"
                                            variant="outline"
                                            borderColor={statusColor}
                                            color={statusColor}
                                            fontWeight="700"
                                            fontSize="xs"
                                        >
                                            {statusName}
                                        </Badge>
                                    ) : null}

                                    <Text
                                        fontSize={{ base: "xl", md: "2xl" }}
                                        fontWeight="800"
                                        color="text"
                                        lineHeight="short"
                                        mb={3}
                                        wordBreak="break-word"
                                    >
                                        {lid.fio || "—"}
                                    </Text>

                                    {lid.telefon_raqam ? (
                                        <HStack
                                            as="a"
                                            href={`tel:${lid.telefon_raqam}`}
                                            spacing={2}
                                            color="text"
                                            fontWeight="600"
                                            fontSize={{ base: "sm", md: "md" }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Icon as={Phone} boxSize={4} color="green.500" />
                                            <Text wordBreak="break-all">{lid.telefon_raqam}</Text>
                                        </HStack>
                                    ) : null}

                                    <SimpleGrid
                                        columns={{ base: 1, sm: 2, lg: 3 }}
                                        spacing={{ base: 3, md: 4 }}
                                        mt={6}
                                        pt={5}
                                        borderTopWidth="1px"
                                        borderColor="border"
                                    >
                                        <MetaRow
                                            icon={User}
                                            label="Yaratuvchi"
                                            value={creatorName}
                                        />
                                        <MetaRow
                                            icon={Clock}
                                            label="Yaratilgan"
                                            value={formatDateTime(lid.createdAt)}
                                        />
                                        <MetaRow
                                            icon={Clock}
                                            label="Yangilangan"
                                            value={formatDateTime(lid.updatedAt)}
                                        />
                                    </SimpleGrid>
                                </Box>
                            </Flex>
                        </Box>

                        <Grid
                            templateColumns={{
                                base: "1fr",
                                xl: "1fr minmax(280px, 320px)",
                            }}
                            gap={{ base: 4, md: 6 }}
                            w="100%"
                            alignItems="start"
                        >
                            <GridItem minW={0} w="100%">
                                <LeadValueFieldsSection
                                    columns={columnDefs}
                                    values={valueForm}
                                    dirty={dirty}
                                    readOnly={!canEditValues}
                                    onChange={handleValueChange}
                                    onSave={canEditValues ? handleSaveValues : undefined}
                                    saving={savingValues}
                                />
                            </GridItem>

                            <GridItem minW={0} w="100%">
                                <Box
                                    position={{ base: "static", xl: "sticky" }}
                                    top={4}
                                >
                                    <LidColumnsManageSection
                                        columns={columnDefs}
                                        loading={fetching}
                                        onRefresh={loadData}
                                        canManage={canManageColumns}
                                        canEditColumn={canEditColumn}
                                    />
                                </Box>
                            </GridItem>
                        </Grid>
                    </VStack>
                )}
            </Box>
        </Box>
    );
}

function MetaRow({ icon, label, value }) {
    return (
        <HStack spacing={3} align="flex-start" minW={0}>
            <Icon as={icon} boxSize={4} color="textSecondary" mt={0.5} flexShrink={0} />
            <Box minW={0}>
                <Text fontSize="xs" color="textSecondary" fontWeight="600">
                    {label}
                </Text>
                <Text fontSize="sm" fontWeight="600" color="text" mt={0.5} wordBreak="break-word">
                    {value}
                </Text>
            </Box>
        </HStack>
    );
}
