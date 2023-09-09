import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import "./log.css";

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        document.getElementById('LoginButton').innerHTML = 'Signing in...';
        user.email = user.email.toLowerCase();

        // await axios.post("https://api.iamivy.online/login", user)
        await axios.post("http://localhost:8080/login", user)
            .then(res => {
                if (res.data.user && res.data.user._id) {
                    toast.success(res.data.message,{duration:2000});
                    localStorage.setItem('currentUser2', JSON.stringify({ _id: res.data.user._id, email: res.data.user.email, name: res.data.user.name }));
                    if(window.location.pathname==='/campaign') navigate("/campaigns");
                    else navigate("/campaign");
                }
                else{
                    toast.error(res.data.message, { duration: 2000 });
                }
                document.getElementById('LoginButton').innerHTML = 'Sign in';
            })
            .catch(err => {
                document.getElementById('LoginButton').innerHTML = 'Sign in';
                toast.error("Something went wrong. Try again later!",{ duration: 2000});
                console.log(err);
            })
    }

    return (
        <div className="main">
            <div className="log">
                <h1 className="head1">Welcome back!</h1>
                <form action="" onSubmit={(e) => login(e)}>
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email Address" required />
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                    <button className="button" id="LoginButton">Sign in</button>
                </form>
                <div className="or">
                    Don't have an account?
                    <span onClick={() => navigate("/getInvite")} className="alt">Get an Invite</span>
                    {/* <span onClick={() => navigate("/signup")} className="alt">Sign up</span> */}
                </div>
            </div>
        </div>
    )
}

export default Login;