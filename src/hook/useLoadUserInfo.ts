import {useEffect, useState} from "react";
import {useGetUserInfo} from "./useGetUserInfo";
import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user";
import {useDispatch} from "react-redux";
import {loginReducer} from "../store/userReducer";

function useLoadUserInfo() {
    const [waitingUserData, setWaitingUserData] = useState(true)
    const dispatch = useDispatch()

    const {run} = useRequest(getUserInfoService,  {
        manual: true,
        onSuccess: (data) => {
            const {name, email} = data
            dispatch(loginReducer({email, name}))
        }, onFinally: () => {
            setWaitingUserData(false)
        }
    })

    const {email} = useGetUserInfo()
    useEffect(() => {
        if(email){
            setWaitingUserData(false)
            return
        }
        run()
    }, [email])

    return {waitingUserData}
}

export default useLoadUserInfo;