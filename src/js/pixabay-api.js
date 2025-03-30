import axios from 'axios';

export function searchImage(request) {
  const API_KEY = '49598777-3dc21f1e795110eeeec900fde';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(request) +
    '&image_type=photo' +
    '&orientation=horizontal' +
    '&safesearch=true';

  return axios.get(URL).then(response => [...response.data.hits]);
}
