import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import {watcherSaga } from './Viz'

export default [...ApiErrors, ...WeatherSagas, watcherSaga];
