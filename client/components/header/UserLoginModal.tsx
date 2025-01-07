import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { FaUserCircle } from "react-icons/fa";
import FormLogin from "../formUser/FormLogin";
  
const UserLoginModal = () => {
  return (
    <Dialog>
        <DialogTrigger><FaUserCircle size={25} className="text-black dark:text-white"/></DialogTrigger>
        <DialogContent className="h-3/4 w-[25em] p-0">
            <FormLogin />
        </DialogContent>
    </Dialog>
  )
}

export default UserLoginModal