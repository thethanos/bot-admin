import { Box, Typography } from '@mui/material'; 

function ImagePlaceholder({variant, height, background}) {
    return (
        <Box sx={{height: height, background: background, display: "flex", alignItems: "center"  }}>
            <Typography
                sx={{margin: "auto"}} 
                variant={variant}
                align='center'
            >Добавьте фотографии</Typography>
        </Box>
    );
}

export default ImagePlaceholder;