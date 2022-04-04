// Event emitter to listen for and respond to events
export const EventBus = {
  events: {},
  emit(event, data) {
    if (!this.events[event]) return;

    this.events[event].forEach(callback => callback(data));
  },
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }
};

/**
 * Audio Features: *Key* property.
 * For more information read the Spotify Web API reference:
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
 */

const pitchMap = new Map([
  [0, 'C'],
  [1, 'D♭'],
  [2, 'D'],
  [3, 'E♭'],
  [4, 'E'],
  [5, 'F'],
  [6, 'G♭'],
  [7, 'G'],
  [8, 'A♭'],
  [9, 'A'],
  [10, 'B♭'],
  [11, 'B']
]);

export const parsePitchClass = key => pitchMap.get(key);

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * For more info: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Format milliseconds to digital time format (MM:SS)
export const formatDuration = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Get year from YYYY-MM-DD datetime
export const getYear = date => date.split('-')[0];

// Get a unique set of words
export const makeUnique = string => [...new Set(string.split(' '))].join(' ');
