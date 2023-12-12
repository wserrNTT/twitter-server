export const extractHashtags = (body: string) =>
  body
    .split(' ') // converts body to array
    .filter((word) => word.startsWith('#')) // filters only hashtags
    .map((word) => word.split('#')[1]); // removes the # character
