export const extractHashtags = (body: string) =>
  body
    .split(' ') // converts body to array
    .filter((word) => word.startsWith('#')); // filters only hashtags
