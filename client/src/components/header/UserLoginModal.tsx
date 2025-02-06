import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader
} from "@/src/components/ui/dialog"

import { FaUserCircle } from "react-icons/fa";
import FormLogin from "../formUser/FormLogin";
import { Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "@/src/lib/store";
import { setLoginModalIsOpen } from "@/src/lib/features/globalSlicer";
import { Button } from "../ui/button";

const UserLoginModal = () => {
  const loginModalIsOpen = useAppSelector((state) => state.global.loginModalIsOpen);

  const dispatch = useAppDispatch();

  return (
    <Dialog open={loginModalIsOpen} onOpenChange={(open) => dispatch(setLoginModalIsOpen(open))}>
      <DialogTrigger asChild>
        <Button className='bg-black dark:bg-primaryWhite text-white dark:text-black py-2 px-8 rounded-md text-lg font-semibold'>Login</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 2xl:h-1/2 w-4/5 flex flex-col items-center">
        <DialogHeader className="flex flex-col justify-end">
          <DialogTitle className="text-black text-center text-2xl font-bold">
            Login
          </DialogTitle>
          <DialogDescription className="text-black text-center text-sm font-semibold">
            Insira suas credenciais para fazer login.
          </DialogDescription>
        </DialogHeader>
        <FormLogin />
        <Toaster richColors closeButton position="bottom-center" />
      </DialogContent>
      <DialogClose />
    </Dialog>
  )
}

export default UserLoginModal