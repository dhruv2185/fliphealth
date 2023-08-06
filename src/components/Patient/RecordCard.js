import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../assets/images/IMG.png";
import pdf from "../../assets/images/PDF.png";
const RecordCard = (props) => {
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
