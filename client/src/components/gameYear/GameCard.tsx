import { Game } from '@/src/utils/types';

interface GameTabs extends Game {
  isSelected?: boolean,
  onChange?: (game: Game) => void,
}

function GameCard({ ...props }: GameTabs) {
  return (
    <div className='rounded-lg h-[80%] w-full flex items-end bg-cover sm:bg-center'
      style={{
        backgroundImage: `url(${props.background_image})`,
      }}>
      <div className={`w-full h-full cursor-pointer rounded-lg 
        ${props.isSelected && 'border-[2px] border-primary dark:border-primaryDark bg-black/30'}`}
        onClick={() => props.onChange!({ ...props })}>
      </div>
    </div>
  )
}

export default GameCard;