import store from '../../../store/store'
import userDetailsApiService from '../userDetailsApiService'
import userDetailsActionTypes from './userDetailsActionTypes'

export const fetchUserDetails = () => {
  return (dispatch) => {
    userDetailsApiService
      .getUsersDetails()
      .then((response) => {
        dispatch(onUsersDetailsFetched(response.data))
      })
      .catch((error) => {
        dispatch(
          onUsersDetailsFetchedError(
            error.response ? error.response.data : error
          )
        )
      })
  }
}

export const onUsersDetailsFetched = (userDetails) => {
  return {
    type: userDetailsActionTypes.ON_USER_DETAILS_FETCHED,
    userDetails
  }
}

export const onUsersDetailsFetchedError = (error) => {
  return {
    type: userDetailsActionTypes.ON_USER_DETAILS_FETCHED_ERROR,
    error
  }
}
