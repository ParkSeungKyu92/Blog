import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITAILIZE_FORM = 'auth/INITIALIZE_FORM';

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
    }
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
        })
    },
    initailState
);

export default auth;