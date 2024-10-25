import { HiPlus } from "react-icons/hi";
import { Button, TextInput, Tooltip } from "flowbite-react";
import { useSemStore } from "../zustand/store";
import SemInput from "./semInput";
import { HiMagnifyingGlass } from "react-icons/hi2";

const ContentHeader = ({ event, title, Icon, tooltip, setSearch, cart }) => {
  const { currentUser } = useSemStore();
  const isAdmin = currentUser.role == "Admin";
  return (
    <div className="content-header flex flex-row justify-between items-center mb-3">
      {!cart && (
        <SemInput
          event={(event) => setSearch(event.target.value)}
          placeholder={"Search here..."}
          icon={HiMagnifyingGlass}
        />
      )}

      {isAdmin && (
        <div className="wrapper">
          <Tooltip content={tooltip}>
            <Button onClick={event} gradientMonochrome="success">
              <HiPlus color="white" className="mr-2 h-5 w-5" />
              {title}
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ContentHeader;
