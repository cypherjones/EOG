import { INIT_API_CALL, API_CALL_SUCCESS, API_CALL_FAILURE } from "../actions";

const initialState = {
  fetching: false,
  data: [],
  error: null,
  stream: [],
  dataDump: []
}

export function getInitData(state = initialState, action) {
  switch (action.type) {
    case INIT_API_CALL:
      return { ...state, fetching: true, error: null }
    case API_CALL_SUCCESS:
      return {
        ...state,
        fetching: true,
        data: action.data,
        dataDump: action.dataDump,
        stream: state.stream.concat([action.data])
      }
    case API_CALL_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error }
    default:
      return state
  }
}