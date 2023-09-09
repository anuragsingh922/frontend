import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { v1 } from 'uuid';

import classes from "./home2.module.css";
import Login from "../Sign/login";
import Campaigns from "../Campaigns/campaigns";
import NavBar from "../UI/NavBar1/NavBar";
import Modal from "../UI/Modal/modal";

const Home2 = props => {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [vis, setVis] = useState(false);
    const [inputState, setInputState] = useState({});
    const [fileName, setFileName] = useState("");
    // const [destination, setDestination] = useState("");
    const currentUser2 = JSON.parse(localStorage.getItem('currentUser2'));

    useEffect(() => {
        if (currentUser2 && currentUser2._id) props.setNavVis(true)
        // eslint-disable-next-line
    }, []);

    const handleSubmit = () => {
        if (excelFile != null) {
            props.setCampaigns(() => {
                return [{ name: fileName}, ...props.campaigns];
            });
            props.setVis1(() => {
                return [true, ...props.vis1];
            });
            props.setVis2(() => {
                return [false, ...props.vis2];
            });
            setFileName('');
            // setDestination('');
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            const data1 = [];
            // eslint-disable-next-line 
            data.map((fileData) => {
                if (fileData['Phone number'] && fileData['Client Email'] && fileData['First Name'] && fileData['Physical Address'] && fileData['Carrier '] && fileData['PLan summary of benefit URL']) {
                    const id = v1();
                    data1.push({
                        Name: fileData['First Name'],
                        Email: fileData['Client Email'],
                        Customer_Address: fileData['Physical Address'],
                        Number: fileData['Phone number'],
                        id: id,
                        plan_name:fileData['Carrier '],
                        plan_url: fileData['PLan summary of benefit URL'],
                        Status: "Pending"
                    });
                }
                else if((fileData['Phone number'] && fileData['Client Email'] && fileData['First Name'] && fileData['Physical Address'] && fileData['Carrier '])){
                    const id = v1();
                    data1.push({
                        Name: fileData['First Name'],
                        Email: fileData['Client Email'],
                        Customer_Address: fileData['Physical Address'],
                        Number: fileData['Phone number'],
                        id: id,
                        plan_name:fileData['Carrier '],
                        Status: "Pending"
                    });
                }
            });
            props.setExceldata(() => {
                return [data1, ...props.excelData];
            }); // display data
            props.setTime(() => {
                return [new Date(Date.now()).toDateString(), ...props.time];
            });
            setVis(false);
        }
    }

    const handleChange = () => {
        let selectedFile = document.getElementById("csvUpload").files[0];
        setInputState(document.getElementById("csvUpload").files[0]);
        let fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        if (selectedFile) {
            if (selectedFile.type) {
                if (fileType.includes(selectedFile.type)) {
                    setExcelFile(selectedFile);
                    setTypeError(null);

                    let reader = new FileReader();
                    reader.readAsArrayBuffer(selectedFile);
                    reader.onload = (e) => {
                        setExcelFile(e.target.result);
                    }
                    setVis(true);
                }
                else {
                    setVis(false);
                    setTypeError('Please select valid excel sheet!');
                }
                document.getElementById("csvUpload").value = null;
            }
        }
        else {
            console.log("Please select your file");
        }
    }

    return (
        !currentUser2
            ? <div className={classes.mainHome}>
                <NavBar navVis={props.navVis} setNavVis={props.setNavVis} />
                <div className={classes.camp}>
                    <h2 className={classes.head1}>Campaigns</h2>
                    {props.newVis
                        ? <label htmlFor="csvUpload" className={classes.new}>
                            + New Campaign
                        </label>
                        : null
                    }
                    <input type="file" id="csvUpload" className={classes.newMain} onChange={handleChange} />
                </div>
                {
                    vis && (
                        <Modal setVis={setVis}>
                            <form onSubmit={handleSubmit}>
                                <h4 className={classes.uploadHead}>{inputState.name.split(' ').join('').toLowerCase()}</h4>
                                <input className={classes.inp} type="text" name="fileName" value={fileName} onChange={e => { setFileName(e.target.value) }} placeholder="Enter campaign name..." required />
                                {/* <input className={classes.inp} type="number" name="destination" value={destination} onChange={e => { setDestination(e.target.value) }} placeholder="Enter destination number (Ex: 91XXXXXXXXXX)..." required /> */}
                                <button className={classes.upload}>Upload</button>
                                <button className={classes.cancel} onClick={() => { setVis(false) }}>Cancel</button>
                            </form>
                        </Modal>
                    )
                }
                {
                    typeError && (
                        <div className={classes.error}>{typeError}</div>
                    )
                }
                {
                    props.campaigns && props.campaigns.length
                        ? props.campaigns.map((campaign, index) => {
                            return <Campaigns
                                title={campaign.name}
                                // destination={campaign.destination}
                                key={index}
                                index={index}
                                excelData={props.excelData}
                                setExceldata={props.setExceldata}
                                vis1={props.vis1}
                                setVis1={props.setVis1}
                                vis2={props.vis2}
                                setVis2={props.setVis2}
                                setInd={props.setInd}
                                time={props.time}
                                setNewVis={props.setNewVis}
                            />
                        })
                        : <h3 className={classes.nodata}>No campaigns yet :(</h3>
                }
            </div>
            : <Login />
    )
};

export default Home2;