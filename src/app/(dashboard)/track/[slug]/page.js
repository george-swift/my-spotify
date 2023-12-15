import Image from 'next/image'

import { getCurrentUser } from '@/lib/session'
import {
  getTrack,
  getTrackAudioAnalysis,
  getTrackAudioFeatures
} from '@/lib/spotify'
import { cn, pitchMap } from '@/lib/utils'
import { buttonVariants } from '@/components/core/button'

async function getTrackSummary(trackId, token) {
  const data = await Promise.all([
    getTrack(trackId, token),
    getTrackAudioAnalysis(trackId, token),
    getTrackAudioFeatures(trackId, token)
  ]).then(responses => Promise.all(responses.map(response => response.json())))

  return data
}

export default async function Track({ params: { slug } }) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const [track, audioAnalysis, audioFeatures] = await getTrackSummary(
    slug,
    user.accessToken
  )

  const features = [
    {
      label: 'Duration',
      value: new Date(audioFeatures.duration_ms).toISOString().substr(14, 5)
    },
    {
      label: 'Key',
      value: pitchMap[audioFeatures.key] ?? '--'
    },
    {
      label: 'Modality',
      value: audioFeatures.mode === 1 ? 'Major' : 'Minor'
    },
    {
      label: 'Time Signature',
      value: audioFeatures.time_signature
    },
    {
      label: 'Tempo (BPM)',
      value: Math.round(audioFeatures.tempo)
    },
    {
      label: 'Popularity',
      value: `${track.popularity}%`
    },
    {
      label: 'Bars',
      value: audioAnalysis.bars.length
    },
    {
      label: 'Beats',
      value: audioAnalysis.beats.length
    },
    {
      label: 'Sections',
      value: audioAnalysis.sections.length
    },
    {
      label: 'Segments',
      value: audioAnalysis.segments.length
    }
  ]

  return (
    <>
      <div className="mb-[30px] flex flex-col items-center sm:mb-[70px] sm:flex-row sm:items-start">
        <div className="relative h-[200px] w-[200px] shrink-0 md:mr-10 md:h-[250px] md:w-[250px]">
          <Image src={track.album.images[0].url} alt="Track album art" fill />
        </div>
        <div className="mt-[30px] flex grow flex-col gap-1.5 text-center md:mt-0 md:text-left">
          <h1 className="text-[30px] font-extrabold tracking-tight md:text-[42px]">
            {track.name}
          </h1>
          <h2 className="text-center text-xl font-bold text-gray-100 sm:text-left">
            {track.artists.map(({ name }, i) => (
              <span key={name}>
                {name}
                {!!track.artists.length && i === track.artists.length - 1
                  ? ''
                  : ','}
                &nbsp;
              </span>
            ))}
          </h2>
          <h3 className="text-base font-normal text-gray-200">
            <a
              href={track.album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {track.album.name}
            </a>{' '}
            &middot; {track.album.release_date.split('-')[0]}
          </h3>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'success', size: 'sm' }),
              'w-fit mt-5 text-[12px] tracking-[1px] px-6'
            )}
          >
            Play on Spotify
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] border-l border-t border-gray-300 text-center sm:grid-cols-[repeat(2,_minmax(100px,_1fr))] md:grid-cols-[repeat(5,_minmax(120px,_1fr))]">
          {features.map(feature => (
            <div
              key={feature.label}
              className="border-b border-r border-gray-300 px-2.5 py-[15px]"
            >
              <h4 className="mb-0 text-2xl font-bold text-gray-100 md:text-[30px]">
                {feature.value}
              </h4>
              <p className="mb-0 text-[12px] text-gray-100">{feature.label}</p>
            </div>
          ))}
        </div>

        <a
          className="mt-5 border-b border-transparent text-gray-100 hover:border-white hover:text-white focus:border-white focus:text-white"
          href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features/"
          target="_blank"
          rel="noopener noreferrer"
        >
          See full description of Audio Features
        </a>
      </div>
    </>
  )
}
