import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

//Action Type 정의
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 임시 로그인 처리
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';
//Action Create Function
export const tempSetUser = createAction(TEMP_SET_USER);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    }
    catch(e) {
        console.log(e);
    }
}

function checkFailureSaga() {
    try {
        localStorage.removeItem('user');
    }
    catch(e) {
        console.log(e);
    }
}

//Redux-Saga MiddleWare
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
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
        [LOGOUT] : (state) => ({
            ...state,
            user : null
        })
    },
    initailState
);
