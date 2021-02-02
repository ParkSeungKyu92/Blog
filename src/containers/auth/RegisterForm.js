import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initailizeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
            form : auth.register,
            auth : auth.auth,
            authError : auth.authError,
            user : user.user
        })
    );

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(changeField({
            form : 'register',
            key : name,
            value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if (password !== passwordConfirm) {
            return;
        }
        dispatch(register({username, password}));
    }

    useEffect(() => {
        if (auth) {
            console.log("회원가입 성공");
            dispatch(check());
        }
        if (authError) {
            console.log("회원가입 실패 : ", authError);
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        dispatch(initailizeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            console.log(user);
            history.push('/');
        }
    }, [user])

    return (
        <AuthForm
            type='register'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default withRouter(RegisterForm);