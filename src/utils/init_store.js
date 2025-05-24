import { getLocalStorage } from '@src/utils/crud_functions'

const isNotApi = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'false'

// init store data from local storage
export const initStore = (key) => {
  if (isNotApi) {
    return getLocalStorage(key)
  } else {
    return null
  }
}
