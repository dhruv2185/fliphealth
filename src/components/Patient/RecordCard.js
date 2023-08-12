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
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from 'react-redux';
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const RecordCard = (props) => {
    const accountAddress = useSelector(state => state.accountAddress);
    const { refresh, setRefresh, data } = props;
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

    const removeDocFromBlock = async (hash) => {
        const res = await deleteDocument(hash)
        console.log(res);
    }

    const handleRemove = async () => {
        const res = await unpinFromInfura(data.cid);
        // account address is hardcoded for now
        const result = await removeDocFromBlock(data.cid);
        setRefresh(!refresh);
    }

    return (
        <>
            <Card sx={{ maxWidth: 400, minWidth: 190 }}>
                <CardMedia
                    component="img"
                    alt="No image Found"
                    height="180"
                    image={pdf}
                    sx={{ marginTop: "8px" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.documentName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.documentType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.organisation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {Date(data.date)}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton><DownloadIcon /></IconButton>
                    <IconButton onClick={handleRemove}><DeleteIcon /></IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default RecordCard;
