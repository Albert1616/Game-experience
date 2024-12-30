import { FaDesktop, FaXbox, FaPlaystation, FaSteam } from 'react-icons/fa'

type Props = {
    platform: string
}

const Platform = ({ platform }: Props) => {
    const IconPlatform = () => {
        switch (platform) {
            case "pc":
                return <FaDesktop />
            case "playstation":
                return <FaPlaystation />
            case "xbox":
                return <FaXbox />
            case "steam":
                return <FaSteam />
        }
    }
    return (
        <>
            <p className="text-primaryDark text-xl">
                {IconPlatform()}
            </p>
        </>
    )
}
export default Platform