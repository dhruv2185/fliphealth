import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import pdf from "../../assets/images/File.png";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DiagRecordCard = (props) => {

    const { data } = props;
    return (
        <>
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
                </CardActions>
            </Card>
        </>
    );
}

export default DiagRecordCard;
