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
import { Toaster } from "sonner";
  
const UserLoginModal = () => {
  return (
    <Dialog>
        <DialogTrigger><FaUserCircle size={25} className="text-black dark:text-white"/></DialogTrigger>
        <DialogContent className="h-3/4 2xl:h-1/2 w-4/5 flex flex-col items-center">
            <FormLogin />
            <Toaster richColors closeButton position="bottom-center"/>
        </DialogContent>
    </Dialog>
  )
}

export default UserLoginModal