/* eslint-disable no-undef */
const askDarkSky = (citiesSelectedByName, cb) => {
  return fetch(
    `/api?lat=${citiesSelectedByName[0].coord.lat}&lon=${citiesSelectedByName[0].coord.lon}`,
    {
      // accept: "application/json",
      // "X-Requested-With": "XMLHttpRequest",
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

const askDictionaryAPI = (word, cb) => {
  return fetch(`/api?word=${word}`, {
    // accept: "application/json",
    // "X-Requested-With": "XMLHttpRequest",
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log("err: ", error); // eslint-disable-line no-console
  throw error;
};

const parseJSON = response => {
  console.log("response before parse: ", response);
  return response.json();
};

const Client = { askDarkSky, askDictionaryAPI };
export default Client;
