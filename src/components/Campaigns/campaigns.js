import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import classes from "./campaigns.module.css";

const Campaigns = props => {
    const navigate = useNavigate();

    const handleClick = () => {
        props.setInd(props.index);
        const title = props.title.split(' ').join('').toLowerCase();
        navigate(`/file/${title}`);
    };

    const getCallStatus = async (call, i) => {
        const response = await axios.post('https://api.iamivy.online/vonage/voice/handleCallEvents', { uuid: call });

        const dataTemp = [];
        // eslint-disable-next-line 
        props.excelData[props.index].map((user, index) => {
            if (response.data && response.data.status) {
                if (i === index) {
                    dataTemp.push({
                        ...user,
                        Status: response.data.status
                    });
                }
                else if (index < i) {
                    dataTemp.push({
                        ...user,
                        Status: "completed"
                    });
                }
                else {
                    dataTemp.push(user);
                }
            }
            else {
                dataTemp.push({
                    ...user,
                    Status: "error"
                });
            }
        });

        const finalData = props.excelData.map((initData, index) => {
            if (index === props.index) return dataTemp;
            else return initData;
        });
        await props.setExceldata(finalData);

        if (response.data && response.data.status) return response.data.status;
        else return 'completed';
    }

    async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleClickButton = async () => {
        const data = props.excelData[props.index];

        if (data && data.length) {
            props.setNewVis(false);
            const visAlt1 = props.vis1.map((item, i) => {
                return !item;
            });
            props.setVis1(visAlt1);

            const visAlt2 = props.vis2.map((item, i) => {
                if (i === props.index) return !item;
                else return item;
            });
            props.setVis2(visAlt2);

            let i = 0;
            for (let record of data) {
                let k = i;
                await axios.post("https://api.iamivy.online/vonage/voice/handleCalls", { ...record, destination: props.destination })
                // await axios.post("https://api.iamivy.online/vonage/voice/handleCalls", record)
                    .then(async res => {
                        let callStatus;
                        if (res.data.uuid) {
                            callStatus = await getCallStatus(res.data.uuid, k);
                        }
                        else {
                            callStatus = 'completed';
                        }
                        // wait for 3 seconds
                        while (callStatus !== "completed") {
                            await sleep(3000);
                            callStatus = await getCallStatus(res.data.uuid, k);
                        }
                    })
                    .catch(err => {
                        toast.error(`Error while calling ${record.Number}`, { duration: 2000 });
                        console.log(err);
                    });
                i++;
            };

            props.setNewVis(true);
            const visAlt4 = visAlt1.map((item, i) => {
                return !item;
            });
            props.setVis1(visAlt4);

            const visAlt5 = visAlt2.map((item, i) => {
                if (i === props.index) return !item;
                else return item;
            });
            props.setVis2(visAlt5);
        }
        else {
            toast.error(
                "File does not contains the field 'First Name' or 'Phone number' or 'Client Email' or 'Physical Address' or 'Plan Name' or 'PLan summary of benefit URL'\n\n Please add all the fields in the file.",
                {duration: 10000}
            );
        }
    }

    return <div className={classes.main}>
        <div className={classes.name}>
            <p className={classes.title} onClick={handleClick}>{props.title}</p>
            <div>
                {props.vis1[props.index] && <button className={classes.but} onClick={handleClickButton}>Make Calls</button>}
                {props.vis2[props.index] && <p className={classes.init}>Calls Started</p>}
            </div>
        </div>
        <p className={classes.date}>{props.excelData[props.index].length} leads ● created on {props.time[props.index]}</p>
    </div>
};

export default Campaigns;