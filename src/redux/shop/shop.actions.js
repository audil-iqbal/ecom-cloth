import collection from "../../pages/collection/collection";

export const UPDATE_COLLECTIONS = 'UPDATE_COLLECTIONS';

export const updateCollections = collectionMap => ({
    type: UPDATE_COLLECTIONS,
    payload: collectionMap
})