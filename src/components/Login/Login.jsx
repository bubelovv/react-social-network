import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = props => {

    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors }
    } = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <input {...register("Login")} type={"text"} placeholder={"login"}/>
            </div>
            <div>
                <input {...register("Password")} type={"text"} placeholder={"password"}/>
            </div>
            <div>
                <input {...register("checkbox")} type={"checkbox"}/> remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
};

const Login = () => {
    const onSubmit = data => console.log(data);
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
};

export default Login;