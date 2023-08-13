import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import pdf from "../../assets/images/PDF.png";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { deleteDocument } from '../../Utils/SmartContractUtils';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const RecordCard = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const accountAddress = useSelector(state => state.accountAddress);
    const { refresh, setRefresh, data } = props;
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });

    const unpinFromInfura = async (hash) => {
        await ipfs.pin.rm(hash);
        // console.log(res);
    }

    const removeDocFromBlock = async (hash) => {
        await deleteDocument(accountAddress, hash)
        // console.log(res);
    }

    const handleRemove = async () => {
        setIsLoading(true);
        try {
            // console.log(data.documentPath);

            await unpinFromInfura(data.documentPath);
            await removeDocFromBlock(data.documentCid);



            enqueueSnackbar("Record DELETED successfully!", { variant: "success" });
        }
        catch (err) {
            enqueueSnackbar("Failed to DELETE record!", { variant: "error" });
        }
        setIsLoading(false);
        setRefresh(!refresh);
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card sx={{ maxWidth: 400, width: 200 }}>
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
                        {new Date(data.date).toLocaleDateString() + " " + new Date(data.date).toLocaleTimeString("en-IN")}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <a href={`https://skywalker.infura-ipfs.io/ipfs/${data.documentPath}`} target='_blank' rel='noreferrer'><IconButton><VisibilityIcon /></IconButton></a>
                    <IconButton onClick={handleRemove}><DeleteIcon /></IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default RecordCard;
