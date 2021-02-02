import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITAILIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

export const register = createAction(REGISTER, ({username, password}) => ({
    username, password
}));

export const login = createAction(LOGIN, ({username, password}) => ({
    username, password
}));

//REDUX-SAGA
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function*authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form,  //register || login
        key,   //username, password, passwordConfirm 
        value  //current value
    })
);

export const initailizeForm = createAction(INITAILIZE_FORM, form => form);

const initailState = {
    login : {
        username : '',
        password : ''
    },
    register : {
        username : '',
        password : '',
        passwordConfirm : ''
    },
    auth : null,
    authError : null
};

const auth = handleActions(
    {
        [CHANGE_FIELD] : (state, { payload : { form, key, value } }) => 
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITAILIZE_FORM] : (state, { payload : form }) => ({
            ...state,
            [form] : initailState[form]
        }),
        [REGISTER_SUCCESS] : (state, { payload : auth }) => ({
            ...state,
            authError : null,
            auth,
        }),
        [REGISTER_FAILURE] : (state, { payload : error }) => ({
            ...state,
            authError : error
        }),
        [LOGIN_SUCCESS] : (state, { payload : auth }) => ({
            ...state,
            authError : null,
            auth,
        }),
        [LOGIN_FAILURE] : (state, { payload : error }) => ({
            ...state,
            authError : error
        }),
    },
    initailState
);

export default auth;