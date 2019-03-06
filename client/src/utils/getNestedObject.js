/**
 * Access arrays nested inside objects. Just pass in array index as an element the path array.
 *
 * Example:
 * const launchInfo = {
 *  _id: "5c7f08c30df7015e5cc9dcec",
 *  flight_number: 7,
 *  links: {
 *    flicker_images: [
 *    0: https://flickr.com/4514.jpg,
 *    1: https://flickr.com/1486.jpg
 *    ]
 *  }
 * }
 *
 * const photo = getNestedObject(launchInfo, ['links', 'flickr_images', 0]);
 *
 * You can also use use getNestedObject to retrieve plain nested objects instead of nested arrays.
 * You don't need this function for that, because you can use something like:
 *
 * const badge = ((launchInfo || {}).links || {}).mission_patch;
 *
 * It looks pretty messy though and what it does isn't immediately clear.
 *
 * @param {object} nestedObj - The object
 * @param {array} pathArr - An array of the path to the desired element.
 *
 */

export const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
      (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}
