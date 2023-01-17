
import { useAuthContext } from  './useAuthContext';

export  const useLogout =()=>{
    const { dispatch } = useAuthContext();

    const logoutdata = ()=>{
        localStorage.removeItem("user");

        // update context
        dispatch({type: "LOGOUT"});
    };

    return {logoutdata}
}