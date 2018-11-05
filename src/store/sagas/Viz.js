import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { CANCEL_API_CALL } from '../actions';

export function* watcherSaga() {
  yield takeLatest('INIT_API_CALL', workerSaga);
}

function getInitData() {
  return axios({
    method: 'GET',
    url: 'https://react-assessment-api.herokuapp.com/api/drone'
  })
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}


function* workerSaga() {
  while (true) {
    try {
      // make the api call
      const response = yield call(getInitData)
      // grab the first item from the payload
      const data = response.data.data[0]
      const dataDump = response.data
      // test the api call
      console.log(data)
      console.log(dataDump.data)
      // change the state and output data
      yield put({ type: 'API_CALL_SUCCESS', data, dataDump })
      // add data to the store
      yield put({ type: 'ADD_DATA', data })
      // wait 4 seconds and call again
      yield call(delay, 4000)
    } catch (error) {
      // uh oh
      yield put({ type: 'API_CALL_FAILURE', error })
    }
  }

}