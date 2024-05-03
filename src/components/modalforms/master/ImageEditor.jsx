import {
    Box,
    Button,
    TextField,
    Input,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    ImageList,
    ImageListItem
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { getColors } from "../../../services/providers/theme";

/*
                        { mode === Mode.CREATE && 
                            <Input
                                type="file"
                                inputProps={{ multiple: true }}
                                files={state.images.values}
                                error={state.images.error}
                                onChange={(event) => dispatch({ type: Reduce.UpdateImages, value: { values: event.target.files } })}
                            />
                         }
*/


function ImageEditor({open, setOpen, images, imageURLs, setImages}) {

    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [urls, setUrls] = useState(imageURLs);
    const [selectedImage, setSelectedImage] = useState(0);
    const imageInput = useRef(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }

    const omImagesAdd = () => {
        imageInput.current.click();
    }

    const onSave = () => {
        setOpen(false);
    }

    const onCancel = () => {
        setOpen(false);
    }

    useEffect(()=> {
        const newURLs = [...urls];
        for (let i = 0; i < images.length; i++) {
            newURLs.push(URL.createObjectURL(images[i]));
        }
        setUrls(newURLs);
    }, [images]);

    return (
        <Dialog open={open} fullWidth>
            <Input 
                sx={{display: "none"}}
                inputRef={imageInput}
                type="file"
                inputProps={{ multiple: true }}
                files={images}
                onChange={setImages}
            />
            <Box sx={{ background: colors.primary[400] }}>
                <DialogTitle>Фотографии</DialogTitle>
                <DialogContent sx={{padding: "0px 24px"}}>
                    <Stack spacing={2}>
                        <Box sx={{"& .reactEasyCrop_Container": {height: "350px !important", position: "relative !important"}}}>
                            <Cropper
                                image={urls[selectedImage]} 
                                crop={crop}
                                zoom={zoom}
                                aspect={1/1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                            <Box sx={{margin: "8px",display: "flex", justifyContent: "end"}}>
                                <Button sx={{color: "white"}} onClick={omImagesAdd}><AddIcon />Добавить</Button>
                                <Button sx={{color: "white"}}><DeleteIcon />Удалить</Button>
                            </Box>
                            <ImageList cols={urls.length < 4?4:urls.length} sx={{height: "130px"}}>
                                {urls.length > 0 && urls.map((item, index) => (
                                    <ImageListItem key={index}>
                                    <Box component="img" sx={{ maxHeight: "100px"}}
                                        src={item}
                                        alt={"nice image"}
                                        loading="lazy"
                                        onClick={()=>setSelectedImage(index)}
                                    />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ margin: "0 15px 15px 0" }}>
                    <Button onClick={onCancel} color="secondary" variant="contained">Отмена</Button>
                    <Button onClick={onSave} color="secondary" variant="contained">Сохранить</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default ImageEditor;