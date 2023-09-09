// import Login from "./components/Sign/login.jsx";
// import Register from "./components/Sign/register.jsx";
// import Failure from "./components/UI/Failure/failure.js";
import Home from "./components/Home/home.js";
import Home2 from "./components/Home/home2.js";
import File from "./components/File/file.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import Landing from "./components/Landing/landing.js";
// import { Toaster } from "react-hot-toast";

const App = () => {
  const [excelData, setExceldata] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [vis1, setVis1] = useState([]);
  const [vis2, setVis2] = useState([]);
  const [vis3, setVis3] = useState([]);
  const [ind, setInd] = useState();
  const [time, setTime] = useState([]);
  const [newVis, setNewVis] = useState(true);
  const [navVis, setNavVis] = useState(false);

  return <div>
    {/* <Toaster /> */}
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Landing navVis={navVis} setNavVis={setNavVis} />} /> */}

        <Route path="/" element={<Home
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          excelData={excelData}
          setExceldata={setExceldata}
          vis1={vis1}
          setVis1={setVis1}
          vis2={vis2}
          setVis2={setVis2}
          vis3={vis3}
          setVis3={setVis3}
          setInd={setInd}
          time={time}
          setTime={setTime}
          newVis={newVis}
          setNewVis={setNewVis}
          navVis={navVis}
          setNavVis={setNavVis}
        />} />

        <Route path="/" element={<Home2
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          excelData={excelData}
          setExceldata={setExceldata}
          vis1={vis1}
          setVis1={setVis1}
          vis2={vis2}
          setVis2={setVis2}
          vis3={vis3}
          setVis3={setVis3}
          setInd={setInd}
          time={time}
          setTime={setTime}
          newVis={newVis}
          setNewVis={setNewVis}
          navVis={navVis}
          setNavVis={setNavVis}
        />} />

        <Route path="/file/:title" element={<File ind={ind} excelData={excelData} />} />
        {/* <Route path="/signin" element={<Login setNavVis={setNavVis}/>} /> */}
        {/* <Route path="/signup" element={<Register />} /> */}
        {/* <Route path="/getInvite" element={<Register />} /> */}
        {/* <Route path="/*" element={<Failure />} /> */}
      </Routes>
    </Router>
  </div>
}

export default App;