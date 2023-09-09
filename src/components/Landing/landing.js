import { useNavigate } from "react-router-dom";
import classes from "./landing.module.css";
import NavBar from "../UI/NavBar1/NavBar";
// import PlayAudio from "./playAudio";
import particlesImg from "./particlesImg.png";

const Landing = props => {
    const navigate = useNavigate();
 
    return <div className={classes.main}>
        <NavBar navVis={props.navVis} setNavVis={props.setNavVis} />
        <div className={classes.header}>
            <h1 className={classes.head1}>Why <span className={classes.span1}>Ivy?</span></h1>
            <p className={classes.para}>Ivy is like a super smart AI assistant for your phone. It can hold long conversations with people and sound like a real person. It never forgets anything and can remember everything perfectly. Ivy is so good that it can do a job without needing any training, supervision, or rewards, just like a full-time worker. And the best part is, it works all the time, every day.</p>
            <p className={classes.para}>You can even give Ivy documents like Excel files, CSV files, or PDFs, and it will understand them. Also, while it's on a call, it can transfer the call to other number if you want.</p>
            {/* <PlayAudio /> */}
            <div className={classes.particlesDiv}>
                <img src={particlesImg} alt="particles" className={classes.particles} />
            </div>
            <button className={classes.but} onClick={() => { navigate('/getInvite') }}>Continue  {">"}{">"}</button>
        </div>
    </div>
};

export default Landing;