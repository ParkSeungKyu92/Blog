import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initailizeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError]  = useState(null);
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
        if ([username, password, passwordConfirm].includes('')) {
            setError("빈 칸을 모두 입력하세요.");
            return;
        }
        if (password !== passwordConfirm) {
            setError("패스워드가 서로 일치하지 않습니다.");
            dispatch(changeField({form : 'register', key : 'password', value : ''}));
            dispatch(changeField({form : 'register', key : 'passwordConfirm', value : ''}));
            return;
        }
        dispatch(register({username, password}));
    }

    useEffect(() => {
        if (authError) {
            console.log("회원가입 실패 : ", authError);
            setError('회원가입 실패');
            return;
        }
        if (auth) {
            console.log("회원가입 성공");
            dispatch(check());
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
            error={error}
        />
    );
}

export default withRouter(RegisterForm);