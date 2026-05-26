import { Outlet } from "react-router";
import { Box } from "@chakra-ui/react";
import LeadsPanelHeader from "../components/common/LeadsPanelHeader";

/** Admin / Operator — faqat lidlar, sidebar yo'q. */
export default function LeadsPanelLayout() {
    return (
        <Box h="100vh" bg="bg" display="flex" flexDirection="column" overflow="hidden">
            <LeadsPanelHeader />
            <Box as="main" flex="1" minH={0} overflow="hidden">
                <Outlet />
            </Box>
        </Box>
    );
}
