import { Box, Typography } from '@mui/material'; 

function ImagePlaceholder({variant, height, width = "auto", background}) {
    return (
        <Box sx={{height: height, width: width, background: background, display: "flex", alignItems: "center"  }}>
            <Typography
                sx={{margin: "auto"}} 
                variant={variant}
                align='center'
            >Добавьте фотографии</Typography>
        </Box>
    );
}

export default ImagePlaceholder;