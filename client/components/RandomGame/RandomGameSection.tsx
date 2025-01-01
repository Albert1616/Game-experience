import React, { useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import CardRandomGame from './CardRandomGame';
import RandomGame from './RandomGame';
import { FaSync } from 'react-icons/fa';


const RandomGameSection = () => {
    const [genre, setGenre] = useState<string>("action");
    const [active, setActive] = useState(false);
    const handleChangeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!active) {
            const value = e.target.value;
            setGenre(value as string);
        }
    }
    return (
        <div className='w-full md:h-[30em] grid grid-cols-1 md:grid-cols-6 gap-4 pt-10 px-4 bg-primaryWhite dark:bg-primaryGray'>
            <div className='flex flex-col md:items-center md:justify-center col-span-3'>
                <div className='flex flex-col items-center'>
                    <p className="text-black dark:text-white text-[16px] md:text-xl font-medium text-center w-fit leading-tight">Interressado em novas experiências?</p>
                    <h2 className='text-black dark:text-white text-xl md:text-4xl font-extrabold text-center w-fit leading-tight'> Vamos achar um novo game para você!</h2>
                </div>
                <div className='mt-8'>
                    <p className='text-black dark:text-white text-sm md:text-lg text-center font-medium w-fit leading-tight'>Selecione o gênero que você mais gosta e nos vamos encontrar um game fantástico 😉</p>
                    <div className='mt-4 flex items-center justify-center gap-2'>
                        <select
                            id="genre"
                            value={genre}
                            onChange={handleChangeGenre}
                            disabled={active}
                            className='bg-[#424B54] rounded-lg p-0 h-[1.7em] text-[15px] md:p-1 md:text-lg'>
                            <option value="action">Ação</option>
                            <option value="indie">Indie</option>
                            <option value="adventure">Aventura</option>
                            <option value="strategy">Estratégia</option>
                            <option value="shooter">Tiro</option>
                            <option value="casual">Casual</option>
                            <option value="simulation">Simulation</option>
                            <option value="puzzle">Puzzle</option>
                            <option value="casual">Casual</option>
                            <option value="arcade">Arcade</option>
                            <option value="platformer">Platformer</option>
                            <option value="racing">Racing</option>
                            <option value="racing">Racing</option>
                            <option value="sports">Sports</option>
                            <option value="fighting">Fighting</option>
                            <option value="family">Family</option>
                            <option value="educational">Educational</option>
                            <option value="card">Card</option>
                        </select>
                        <Button onClick={() => {
                            if (!active) {
                                setActive(true);
                            }
                        }}
                            disabled={active}
                            className='font-extrabold bg-primaryDark h-[2em] p-1 md:p-4 md:text-lg'>
                            Novo game ✨
                        </Button>
                        <Button onClick={() => setActive(false)} className={`${active ? 'flex h-[2em] md:p-4 md:text-lg bordernone shadow-none bg-transparent hover:bg-transparent text-primary dark:text-primaryDark' : 'hidden'}`}>
                            <FaSync size={15} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='col-span-3 h-full'>
                {active ? (
                    <RandomGame genre={genre} />
                ) : (
                    <Image
                        alt='Imagem de animada, escrito "seu game aqui"'
                        src="/gameCard.jpeg"
                        height={200}
                        width={200}
                        quality={100}
                        className='rounded-2xl w-full md:h-full' />
                )}
            </div>
        </div>
    )
}

export default RandomGameSection