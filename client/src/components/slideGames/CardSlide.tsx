import { Game, typesGames } from '@/src/utils/types'
import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import { useFavoriteGameMutation, useGameIsFavoriteQuery } from '@/src/services/api';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { setLoginModalIsOpen } from '@/src/lib/features/globalSlicer';
import { toast } from 'sonner';

interface PropsCard extends Game {
    type: typesGames
}

function CardSlide({ type, ...props }: PropsCard) {
    const isAuth = useAppSelector((state) => state.global.isAuth);
    const dispatch = useAppDispatch();

    const [favorite, setFavorite] = useState<Boolean>(false);

    const { data: isFavorite, isError, isLoading } = isAuth ? 
        useGameIsFavoriteQuery(props.id) : { data: null, isError: false, isLoading: false };
    const [FavoriteGame] = useFavoriteGameMutation();

    const route = useRouter();

    const openDetails = (id: string) => {
        route.push(`/game/${id}`);
    }

    const handleChangeToFavorite = async (id: string) => {
        if (!isAuth) {
            toast.warning("Faça login para poder adicionar games a os seus favoritos.");
            dispatch(setLoginModalIsOpen(true));
        } else {
            try {
                const response = await FavoriteGame(id);
                if (!isLoading && response.data?.method === "Add"){
                    setFavorite(true);
                }else if (response.data?.method === "Delete"){
                    setFavorite(false);
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao adicionar o jogo aos favoritos.");
            }
        }
    }

    useEffect(() => {
        if (!isLoading && isFavorite) {
            setFavorite(isFavorite);
        }
    }, [isLoading]);

    return (
        <div className='relative rounded-lg w-full h-[15em] md:h-[22em] bg-center bg-cover'
            style={{
                backgroundImage: `url(${props.background_image})`,
            }}>
            <button
                className='absolute top-1 right-1 text-3xl'
                onClick={() => handleChangeToFavorite(props.id)}>
                {isAuth && favorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <div className='h-full w-full p-3 bg-gradient-to-b from-transparent to-black/70 flex flex-col gap-4 justify-end items-center'>
                <h1
                    className='text-lg md:text-2xl sm:text-xl text-center font-extrabold cursor-pointer
                    text-gray-300 hover:text-white hover:font-extrabold'
                    onClick={() => openDetails(props.id)}>{props.name}</h1>
                {type === typesGames.RATING &&
                    <div className='flex flex-col items-center gap-2'>
                        <Rating value={props.rating} icon={<StarIcon />}
                            emptyIcon={<StarBorderIcon sx={{ color: 'white' }} />} precision={0.5} size='small' readOnly />
                        <h3 className='font-extrabold text-sm md:text-lg'>{props.rating}/5</h3>
                    </div>
                }
            </div>
        </div>
    );
}

export default CardSlide;
