import userDetailsActionTypes from './userDetailsActionTypes'

const initialState = []

function userDetailsReducer (state = initialState, action) {
  let userDetails = {}
  switch (action.type) {
    case userDetailsActionTypes.ON_USER_DETAILS_FETCHED:
      return [...action.userDetails ]

    case userDetailsActionTypes.ON_USER_DETAILS_FETCHED_ERROR:
      return state
    default:
      return state
  }
}

export default userDetailsReducer
