import Image from 'next/image'

import { getCurrentUser } from '@/lib/session'
import { getArtist } from '@/lib/spotify'

export default async function Artist({ params: { slug } }) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const artist = await getArtist(slug, user.accessToken).then(res => res.json())

  return (
    <div className="flex h-full flex-col items-center justify-center gap-[30px] text-center">
      <div className="relative h-[200px] w-[200px] rounded-full shadow-card md:h-[300px] md:w-[300px]">
        <Image
          src={artist.images[0].url}
          alt="Artist's photo"
          fill
          className="rounded-full object-cover"
        />
      </div>

      <h1 className="text-[10vw] font-extrabold tracking-tight md:text-[60px]">
        {artist.name}
      </h1>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div>
          <div className="text-xl font-bold capitalize text-[#509bf5] md:text-2xl">
            {artist.followers.total.toLocaleString()}
          </div>
          <p className="mt-[5px] text-[12px] uppercase tracking-[1px] text-gray-200">
            Followers
          </p>
        </div>

        <div>
          <div className="text-xl font-bold capitalize text-[#509bf5]">
            {artist.genres.map((genre, index) => (
              <div key={index}>{genre}</div>
            ))}
          </div>
          <p className="mt-[5px] text-[12px] uppercase tracking-[1px] text-gray-200">
            Genres
          </p>
        </div>

        <div>
          <div className="text-xl font-bold capitalize text-[#509bf5] md:text-2xl">
            {artist.popularity}%
          </div>
          <p className="mt-[5px] text-[12px] uppercase tracking-[1px] text-gray-200">
            Popularity
          </p>
        </div>
      </div>
    </div>
  )
}
