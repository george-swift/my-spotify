import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs) => twMerge(clsx(inputs))

export const RangeEnums = {
  LONG: 'long_term',
  MEDIUM: 'medium_term',
  SHORT: 'short_term'
}

export const EntityEnums = {
  ARTISTS: 'artists',
  TRACKS: 'tracks'
}

/**
 * Audio Features: *Key* property.
 * For more information read the Spotify Web API reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
 */
export const pitchMap = {
  0: 'C',
  1: 'D♭',
  2: 'D',
  3: 'E♭',
  4: 'E',
  5: 'F',
  6: 'G♭',
  7: 'G',
  8: 'A♭',
  9: 'A',
  10: 'B♭',
  11: 'B'
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * For more info: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const shuffle = array => {
  let currentIndex = array.length
  let temporaryValue, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
