"use client"
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';


const TodaysHiglights = () => {
    return (
        <div className='w-full mx-auto rounded-xl'>
            <CldVideoPlayer
                width="1920"
                height="1080"
                className='rounded-lg'
                src="Ariana_Grande_We_Can_t_Be_Friends_-_AMV_-_Anime_MV_swqwlw"
            />
        </div>
    )
}

export default TodaysHiglights
