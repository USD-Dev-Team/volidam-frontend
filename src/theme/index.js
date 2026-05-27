import { extendTheme } from "@chakra-ui/react";
import colors from "./tokens/colors";
import semanticTokens from "./tokens/semanticTokens";

// Components
import Button from "./components/Button";
import Select from "./components/Select";
import Modal from "./components/Modal";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Switch from "./components/Switch";
import Table from "./components/Table";
import IconButton from "./components/IconButton";
const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
}

const theme = extendTheme({
    config,
    colors,
    semanticTokens,
    components: {
        Button,
        Select,
        Modal,
        Input,
        Checkbox,
        Switch,
        Table,
        IconButton,
    },
    styles: {
        global: {
            body: {
                bg: "bg",
                color: "text",
            },
            
        },
    },
});

export default theme