import useSWR from 'swr';

// Updated fetcher to include credentials for cross-site cookies/session
const fetcher = (url) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

export default function useSWRFetcher(url) {
  return useSWR(url, fetcher, {});
}
