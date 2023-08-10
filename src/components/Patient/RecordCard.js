import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../assets/images/IMG.png";
import pdf from "../../assets/images/PDF.png";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { deleteDocument } from '../../Utils/SmartContractUtils';

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const RecordCard = (props) => {

    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });

    const unpinFromInfura = async (hash) => {
        const res = await ipfs.pin.rm(hash);
        console.log(res);
    }

    const removeDocFromBlock = async (accountAddress, hash) => {
        const res = await deleteDocument(accountAddress, hash)
        console.log(res);
    }

    const handleRemove = async () => {
        const res = await unpinFromInfura(props.cid);
        // account address is hardcoded for now
        const result = await removeDocFromBlock("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", props.cid);
    }

    return (
        <>
            <Card sx={{ maxWidth: 400, minWidth: 190 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image={props.type === "pdf" ? pdf : image}
                    sx={{ marginTop: "8px" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Heart.pdf
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Report
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button size="small">View</Button>
                    <Button size="small">Remove</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default RecordCard;
