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
        <FormLogin />
        <Toaster richColors closeButton position="bottom-center" />
      </DialogContent>
    </Dialog>
  )
}

export default UserLoginModal