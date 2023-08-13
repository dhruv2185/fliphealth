import { Avatar, Card, IconButton } from '@mui/material';
import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { enqueueSnackbar } from 'notistack';

const ClinDocBox = (props) => {
    const { data } = props;
    const name = data.name;
    const specialisation = data.degreeName;
    const grNumber = Number(data.grNum);
    const address = data.myAdd;

    const handleClick = async () => {
        await navigator.clipboard.writeText((address.toString()));
        enqueueSnackbar("Address Copied to Clipboard", { variant: "success" });
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. {name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{specialisation} | GR : {grNumber}</p>
                    </div>

                </div>
                <div style={{ margin: "auto 15px" }}>
                    <IconButton onClick={handleClick} >
                        <ContentCopyIcon />
                    </IconButton>
                </div>

            </Card>
        </>
    );
}

export default ClinDocBox;
