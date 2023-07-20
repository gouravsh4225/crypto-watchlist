 const findAndUpdateAssetInWatchList = (
    allAsset: any,
    currentSelectedAsset: any
  ) => {
    if (Array.isArray(allAsset)) {
      const hasPresentInAsset = allAsset.filter(
        (item: any) => item.id === currentSelectedAsset.id
      );
      if (hasPresentInAsset.length) {
        return allAsset;
      } else {
        return [...allAsset, currentSelectedAsset];
      }
    } else {
      return [currentSelectedAsset];
    }
  };

  export {findAndUpdateAssetInWatchList}