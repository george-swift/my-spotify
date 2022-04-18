import { useParams } from 'react-router-dom';
import useTrackInfoQuery from './queries';
import FeatureChart from '../Visualiser';
import { Main } from '../../../styles';
import {
  TrackContainer,
  Artwork,
  Info,
  Title,
  ArtistName,
  Album,
  PlayTrackButton,
  AudioFeatures,
  Features,
  Feature,
  FeatureText,
  FeatureLabel,
  DescriptionLink
} from './styles';
import Loader from '../Loader';
import { formatDuration, getYear, parsePitchClass } from '../../../utils';

const Track = () => {
  const { trackId } = useParams();
  const { data, isLoading } = useTrackInfoQuery(trackId);

  if (isLoading) return <Loader />;

  const { track, audioAnalysis, audioFeatures } = data;

  return (
    <Main>
      <TrackContainer>
        <Artwork>
          <img src={track.album.images[0].url} alt="Album artwork" />
        </Artwork>
        <Info>
          <Title>{track.name}</Title>
          <ArtistName>
            {track.artists.map(({ name }, i) => (
              <span key={name}>
                {name}
                {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                &nbsp;
              </span>
            ))}
          </ArtistName>
          <Album>
            <a href={track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              {track.album.name}
            </a>{' '}
            &middot; {getYear(track.album.release_date)}
          </Album>
          <PlayTrackButton
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Play on Spotify
          </PlayTrackButton>
        </Info>
      </TrackContainer>
      <AudioFeatures>
        <Features>
          <Feature>
            <FeatureText>{formatDuration(audioFeatures.duration_ms)}</FeatureText>
            <FeatureLabel>Duration</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
            <FeatureLabel>Key</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</FeatureText>
            <FeatureLabel>Modality</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioFeatures.time_signature}</FeatureText>
            <FeatureLabel>Time Signature</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
            <FeatureLabel>Tempo (BPM)</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{track.popularity}%</FeatureText>
            <FeatureLabel>Popularity</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioAnalysis.bars.length}</FeatureText>
            <FeatureLabel>Bars</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioAnalysis.beats.length}</FeatureText>
            <FeatureLabel>Beats</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioAnalysis.sections.length}</FeatureText>
            <FeatureLabel>Sections</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureText>{audioAnalysis.segments.length}</FeatureText>
            <FeatureLabel>Segments</FeatureLabel>
          </Feature>
        </Features>

        <FeatureChart audioFeatures={audioFeatures} />

        <DescriptionLink
          href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/"
          target="_blank"
          rel="noopener noreferrer"
        >
          See full description of Audio Features
        </DescriptionLink>
      </AudioFeatures>
    </Main>
  );
};

export default Track;
