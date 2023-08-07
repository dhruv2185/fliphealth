import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import UserAccessBox from './UserAccessBox';

const ManageAccess = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
