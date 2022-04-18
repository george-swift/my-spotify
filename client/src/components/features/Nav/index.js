import { Link, NavLink } from 'react-router-dom';
import {
  IconSpotify,
  IconUser,
  IconTime,
  IconMicrophone,
  IconPlaylist,
  IconMusic,
  IconGithub
} from '../../icons';

import { Container, Logo, Github, Menu, MenuItem } from './styles';

const Nav = () => (
  <Container>
    <Logo>
      <Link to="/">
        <IconSpotify />
      </Link>
    </Logo>
    <Menu>
      <MenuItem>
        <NavLink to="/">
          <IconUser />
          <div>Profile</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="artists">
          <IconMicrophone />
          <div>Top Artists</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="tracks">
          <IconMusic />
          <div>Top Tracks</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="recent">
          <IconTime />
          <div>Recent</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="playlists">
          <IconPlaylist />
          <div>Playlists</div>
        </NavLink>
      </MenuItem>
    </Menu>
    <Github>
      <a href="https://github.com/george-swift" target="_blank" rel="noopener noreferrer">
        <IconGithub />
      </a>
    </Github>
  </Container>
);

export default Nav;
