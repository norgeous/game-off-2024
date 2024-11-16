const getActualTiledDimensions = (level: Phaser.Tilemaps.Tilemap) => {
  const { bottom, right } = level?.layers[0].data
    .flat()
    .findLast(({ index }) => index !== -1) || { bottom: 0, right: 0 };
  return {
    width: right,
    height: bottom,
  };
};
export default getActualTiledDimensions;
