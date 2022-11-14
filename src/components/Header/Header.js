import SearchForm from "./SearchForm";
import MenuBar from "./MenuBar";
import Box from '@mui/material/Box';
import { Stack } from "@mui/material";

function Header() {
  return (
    <Box>
      <Stack sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 1 }} spacing={1} direction="row">
        <SearchForm />
        <MenuBar />
      </Stack>
    </ Box>
  );
}

export default Header;