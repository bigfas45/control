export const bufferToString = (media: any) => {
  return `data:${media.mimetype};base64,${media.data.toString('base64')}`;
};
