import React from 'react';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";

const NotFound = () => {
    return (
        <Box
            component="img"
            sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt="404 Page not found"
            src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?t=st=1655294869~exp=1655295469~hmac=0c0973d321a3f95a04da9ae5c94ba88645198ff81b292e76e8c08113224f4583&w=1060"
        />)
};

export default NotFound;