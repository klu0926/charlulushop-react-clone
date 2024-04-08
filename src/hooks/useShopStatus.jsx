import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'

function useShopStatus() {
  const shopStatusUrl = url.server + '/shop-status'
  const { data, isLoading, error } = useSWRFetcher(shopStatusUrl)

  return { shopStatus: data?.data, isLoading, fetchShopStatusError: error }
}

export default useShopStatus
