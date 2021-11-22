import axios from 'axios';

const token = process.env.TWITTER_BEARER_TOKEN;

export const twitter = axios.create({
  baseURL: 'https://api.twitter.com/1.1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});
