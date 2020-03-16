import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import Slider from 'rc-slider';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container, Current, Volume,
  Progress, Controls, Time,
  ProgressSlider,
} from './styles';

import VolumeIcon from '../../assets/images/volume.svg';
import ShuffleIcon from '../../assets/images/shuffle.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import PlayIcon from '../../assets/images/play.svg';
import PauseIcon from '../../assets/images/pause.svg';
import ForwardIcon from '../../assets/images/forward.svg';

const Player = ({
  player, play, pause,
  prev, next, playing,
  position, duration, handlePosition,
  setPosition, positionShown, progress,
  setVolume,
}) => (
    <Container>
      {!!player.currentSong && (
        <Sound
          url={player.currentSong.file}
          playStatus={player.status}
          onFinishedPlaying={next}
          onPlaying={playing}
          position={player.position}
          volume={player.volume}
        />
      )}
      <Current>
        {!!player.currentSong && (
          <>
            <img
              src={player.currentSong.thumbnail}
              alt={player.currentSong.title}
            />
            <div>
              <span>{player.currentSong.title}</span>
              <smal>{player.currentSong.author}</smal>
            </div>
          </>
        )}
      </Current>

      <Progress>
        <Controls>
          <button>
            <img src={ShuffleIcon} alt="Shuffle" />
          </button>
          <button onClick={prev}>
            <img src={BackwardIcon} alt="Backward" />
          </button>
          <button>
            {!!player.currentSong && player.status === Sound.status.PLAYING
              ? (
                <button onClick={pause}>
                  <img src={PauseIcon} alt="Play" />
                </button>
              ) : (
                <button onClick={play}>
                  <img src={PlayIcon} alt="Play" />
                </button>
              )}
          </button>
          <button onClick={next}>
            <img src={ForwardIcon} alt="Forward" />
          </button>
        </Controls>

        <Time>
          <span>{positionShown || position}</span>
          <ProgressSlider>
            <Slider
              railStyle={{ background: '#404040', borderRaidus: 10 }}
              trackStyle={{ background: '#1ED760' }}
              handleStyle={{ border: 0 }}
              max={1000}
              onChange={(value) => handlePosition(value / 1000)}
              onAfterChange={(value) => setPosition(value / 1000)}
              value={progress}
            />
          </ProgressSlider>
          <span>{duration}</span>
        </Time>
      </Progress>

      <Volume>
        <img src={VolumeIcon} alt="Volume" />
        <Slider
          railStyle={{ background: '#404040', borderRaidus: 10 }}
          trackStyle={{ background: '#FFF' }}
          handleStyle={{ display: 'none' }}
          value={player.volume}
          onChange={setVolume}
        />
      </Volume>
    </Container>
  );

Player.propTypes = {
  player: PropTypes.shape({
    currentSong: PropTypes.shape({
      file: PropTypes.string,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  playing: PropTypes.func.isRequired,
  duration: PropTypes.string.isRequired,
  handlePosition: PropTypes.func.isRequired,
  setPosition: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  positionShown: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  setVolume: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
};

const msToTime = (duration) => {
  if (!duration) return null;

  let seconds = parseInt((duration / 1000) % 60, 10);
  const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};


const mapStateToProps = (state) => ({
  player: state.player,
  position: msToTime(state.player.position),
  duration: msToTime(state.player.duration),
  positionShown: msToTime(state.player.positionShown),
  progress: parseInt(
    (state.player.positionShown || state.player.position) * (1000 / state.player.duration),
    10,
  ) || 0,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  PlayerActions,
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(Player);