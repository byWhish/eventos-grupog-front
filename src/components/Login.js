import { useContext } from 'react';
import AppContext from '../utils/context';

const Login = () => {
    const value = useContext(AppContext);
    const { rootStore: { Auth: auth } } = value;
    auth.login();
    return null;
};

export default Login;
