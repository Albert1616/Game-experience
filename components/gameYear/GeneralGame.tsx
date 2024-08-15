import { Game } from "@/utils/types";

interface GeneralGame extends Game{
    //description: string
}

function GeneralGame({...props}:GeneralGame) {
  return (
    <div className='w-full bg-cover bg-no-repeat  rounded-xl
     row-span-2 relative'
    style={{
        backgroundImage: `url(${props.background_image})`,
    }}>
        <div className="absolute inset-0 opacity-80 bg-black flex items-end justify-end">
            <div className="flex flex-col bg-black">
                <h1 className="text-6xl font-extrabold relative text-white ">{props.name}</h1>
                <p className="text-balance text-base relative text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis eum, 
                    quos numquam nemo repudiandae recusandae atque voluptatem ab itaque. Enim officiis nam dolor. Voluptatem, ipsa obcaecati rerum recusandae eius ut!</p>
            </div>
        </div>   
    </div>
  )
}

export default GeneralGame