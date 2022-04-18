import PropTypes from 'prop-types';
import { formatDuration } from '../../../utils';
import { IconInfo } from '../../icons';
import {
  TrackContainer,
  TrackArtwork,
  Mask,
  TrackMeta,
  TrackLeft,
  TrackName,
  TrackAlbum,
  TrackRight,
  TrackDuration
} from './styles';

const TrackItem = ({ track }) => {
  const { id, album, name, artists, duration_ms } = track;
  return (
    <li>
      <TrackContainer to={`/tracks/${id}`}>
        <div>
          <TrackArtwork>
            {album.images.length && <img src={album.images[2].url} alt="Album Artwork" />}
            <Mask>
              <IconInfo />
            </Mask>
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            {name && <TrackName>{name}</TrackName>}
            {artists && album && (
              <TrackAlbum>
                {artists.map(({ name: artistName, id: artistID }, i) => (
                  <span key={artistID}>
                    {artistName}
                    {artists.length && i === artists.length - 1 ? '' : ','}&nbsp;
                  </span>
                ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {album.name}
              </TrackAlbum>
            )}
          </TrackLeft>
          <TrackRight>
            {duration_ms && <TrackDuration>{formatDuration(duration_ms)}</TrackDuration>}
          </TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  );
};

TrackItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  track: PropTypes.object.isRequired
};

export default TrackItem;
