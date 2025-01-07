import { setIsDarkMode } from '@/lib/features/globalSlicer';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { Sun, Moon } from 'lucide-react'

type props = {
    className?: string
}

const ButtonSetMode = ({ className = "" }: props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const dispatch = useAppDispatch();

    const handleViewMode = () => {
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        dispatch(setIsDarkMode(!isDarkMode));
    }
    return (
        <button onClick={() => handleViewMode()} className={`text-lg md:text-xl bg-transparent 
        border-none ${className}`}>
            {isDarkMode ? (
                <Sun />
            ) : (
                <Moon />
            )}
        </button>
    )
}

export default ButtonSetMode