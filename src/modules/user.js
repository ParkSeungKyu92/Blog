import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

//Action Type 정의
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 임시 로그인 처리
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

//Action Create Function
export const tempSetUser = createAction(TEMP_SET_USER);
export const check = createAction(CHECK);


//Redux-Saga MiddleWare
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
}

//Initail value
const initailState = {
    user : null,
    checkError : null
};

//Reducers
export default handleActions(
    {
        [TEMP_SET_USER] : (state, { payload : user }) => ({
            ...state,
            user
        }),
        [CHECK_SUCCESS] : (state, { payload : user }) => ({
            ...state,
            user,
            checkError : null
        }),
        [CHECK_FAILURE] : (state, { payload : error }) => ({
            ...state,
            checkError : error
        }),

    },
    initailState
);
