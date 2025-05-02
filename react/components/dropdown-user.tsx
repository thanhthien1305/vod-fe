import { logoutApp } from "@/app/actions/auth";
import { useAppContext } from "@/app/context/AppContext";
import { Popover, PopoverTrigger, PopoverContent, Avatar, Divider, Listbox, ListboxItem } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function DropdownUser() {
    const { user } = useAppContext();
    const router = useRouter();
    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Avatar src={`https://i.pravatar.cc/150?u=${user?.name}`} />

            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-medium-body font-bold">{user?.username}</div>
                    <div className="text-medium-caption2">{user?.email}</div>
                </div>
                <Divider />
                <Listbox aria-label="Actions">
                    <ListboxItem >Edit profile</ListboxItem>
                    <ListboxItem className="text-danger" color="danger"
                    onPress={() => {
                        logoutApp();
                        router.push("/auth");
                    }
                    }>
                        Log out
                    </ListboxItem>
                </Listbox>
            </PopoverContent>
        </Popover>
    );
}
