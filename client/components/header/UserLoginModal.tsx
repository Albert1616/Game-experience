import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FaUserCircle } from "react-icons/fa";
import FormLogin from "../formUser/FormLogin";
import { Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setLoginModalIsOpen } from "@/lib/features/globalSlicer";

const UserLoginModal = () => {
  const loginModalIsOpen = useAppSelector((state) => state.global.loginModalIsOpen);

  const dispatch = useAppDispatch();
  console.log(loginModalIsOpen)

  return (
    <Dialog open={loginModalIsOpen} onOpenChange={(open) => dispatch(setLoginModalIsOpen(open))}>
      <DialogTrigger><FaUserCircle size={25} className="text-black dark:text-white" /></DialogTrigger>
      <DialogContent className="h-3/4 2xl:h-1/2 w-4/5 flex flex-col items-center">
        <FormLogin />
        <Toaster richColors closeButton position="bottom-center" />
        <p className="text-black text-xl">MODAL: {loginModalIsOpen}</p>
      </DialogContent>
    </Dialog>
  )
}

export default UserLoginModal