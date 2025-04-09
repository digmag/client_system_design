import { useLoginFinish } from "../../widgets/LoginFinish/hook"

const LoginFinish = () => {
    const {Component} = useLoginFinish()
    return (
        <><Component /></>
    )
}

export default LoginFinish