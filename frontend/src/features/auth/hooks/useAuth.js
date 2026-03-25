import { setUser,setError,setLoading } from "../auth.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";  
import { register,login,logout,getCurrentUser,checkVerificationStatus } from "../services/auth.api";

const useAuth = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const handleRegister = async (username, email, password) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await register(username, email, password);
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return true;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Registration failed'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogin = async (cred, password) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
           
            const data = await login(cred, password);
            dispatch(setUser(data.user));
            dispatch(setError(null));
            return true;
            
        }
        catch (error) {
            console.log(error)
            dispatch(setError(error.response?.data?.message || 'Login failed'));
        }
        dispatch(setLoading(false));
        
    };

    const handleLogout = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            await logout();
            dispatch(setUser(null));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Logout failed'));
        }
        dispatch(setLoading(false));
        
    };

    const fetchCurrentUser = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getCurrentUser();
            dispatch(setUser(data.user));
            dispatch(setError(null));
        } catch (error) {
            if (error.response?.status !== 401) {
            dispatch(setError(error.response?.data?.message || 'Failed to fetch user'));
            }
        }
        dispatch(setLoading(false));
    };

    const handleCheckVerificationStatus = async (username) => {
        
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await checkVerificationStatus(username);
            console.log("Verification status:", data);
            return data.verified;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to check verification status'));
            return false;
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    return {
        authState,
        handleRegister,
        handleLogin,
        handleLogout,
        fetchCurrentUser,
        handleCheckVerificationStatus
    };
}
export default useAuth;     
