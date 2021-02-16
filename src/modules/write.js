import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';


export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ( {key, value}));

const initialState = {
    title : '',
    body : '',
    tags : []
};

const write = handleActions(
    {
        [INITIALIZE] : (state) => {
            console.log(state);
            return initialize;
        },
        [CHANGE_FIELD] : (state, {payload : {key, value}}) => ({
            ...state,
            [key] : value
        })
    },
    initialState
);

export default write;
