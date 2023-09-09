import { useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import toast from 'react-hot-toast';

const NavBar = props => {
    const currentUser2 = JSON.parse(localStorage.getItem('currentUser2'));
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem('currentUser2');
        props.setNavVis(false);
        toast.success('Signed out successfully!',{duration:2000});
        navigate("/");
    }

    const handleSignin = () => {
        navigate("/campaign");
    }

    const handleSignup = () => {
        navigate("/getInvite");
    }

    return <ul>
        <li><a className={classes.logo} href="#logo">Ivy</a></li>
        {
            props.navVis
                ? <div>
                    <button className={classes.butt} onClick={handleSignout}>Signout</button>
                    <li className={classes.firstName}><a href="#username">{currentUser2.name.split(' ')[0]}</a></li>
                </div>
                : <div>
                    <button className={classes.butt} onClick={handleSignup}>Get an Invite</button>
                    {/* <button className={classes.butt} onClick={handleSignup}>Signup</button> */}
                    <button className={classes.butt} onClick={handleSignin}>Signin</button>
                </div>
        }
    </ul>
};

export default NavBar;