import { useContext } from "react";
import UserContext from "../context/UserContent";
import { Button } from "@mui/material";

function TopBar() {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <div className="fixed top-0 left-0 w-full px-4 py-2 h-16 bg-gray-200 shadow-md z-50">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-medium">Road Safety</p>

        <div className="flex justify-end items-center gap-2">
          {/* <p className="">{user?.name}</p> */}
          <Button className="" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
