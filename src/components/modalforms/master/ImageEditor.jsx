import {
    Box,
    Button,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { getColors } from "../../../services/providers/theme";
import { ImageMetaData, EditStatus, ImageType } from "../../../utils/images";
import ImagePlaceholder from "./ImagePlaceholder";

function imageStyle(status) {
    if (status === EditStatus.DELETED) {
        return {
            height: "100px",
            color: "red",
            border: "solid 2px"
        }
    }
    if (status === EditStatus.DEFAULT) {
        return {
            height: "100px"
        }
    }
    if (status === EditStatus.EDITED) {
        return {
            height: "100px"
        }
    }
}

function ImageEditor({open, setOpen, images, setImages}) {

    const theme = useTheme();
    const colors = getColors(theme.palette.mode);

    const [selectedImage, setSelectedImage] = useState(0);
    const [editedImages, setEditedImages] = useState(images);
    const [newImages, setNewImages] = useState([]);
    const imageInput = useRef(null);

    const onCropChange = (point) => {
        let cropped = editedImages.map((item) => {
            if (item.url === editedImages[selectedImage].url) {
                item.setCroppedPosition(point);
                item.setStatus(EditStatus.EDITED);
            }
            return item;
        });

        setEditedImages(cropped);
    }

    const onZoomChange = (zoom) => {
        let zoomed = editedImages.map((item) => {
            if (item.url === editedImages[selectedImage].url) {
                item.setZoom(zoom);
            }
            return item;
        });

        setEditedImages(zoomed);
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        let cropped = editedImages.map((item) => {
            if (item.url === editedImages[selectedImage].url) {
                item.setCroppedArea(croppedArea);
                item.setCroppedAreaPixels(croppedAreaPixels);
            }
            return item;
        });

        setEditedImages(cropped);
    }

    const onImagesAdd = () => {
        imageInput.current.click();
    }

    const onImageRestore = () => {
        let restored = editedImages.map((image) => {
            if (image.url === editedImages[selectedImage].url) {
                image = new ImageMetaData(image.name, image.url);
            }
            return image;
        });
        setEditedImages(restored);
    }

    const onImageDelete = () => {
        let filtered = [];
        if (editedImages[selectedImage].type === ImageType.NEW) {
            filtered = editedImages.filter((item) => {
                return item.url !== editedImages[selectedImage].url;
            });
            setSelectedImage(selectedImage > 0?selectedImage - 1:0);
        }

        if (editedImages[selectedImage].type === ImageType.FROM_SERVER) {
            filtered = editedImages.map((item) => {
                if (item.url === editedImages[selectedImage].url) {
                    item.setStatus(EditStatus.DELETED);
                }
                return item;
            });
        }
        setEditedImages(filtered);
    };

    const onSave = () => {
        setImages(editedImages);
        setOpen(false);
    }

    const onCancel = () => {
        setImages(images);
        setOpen(false);
    }

    useEffect(()=> {
        let tempState = [...editedImages];
        for (let image of newImages) {
            tempState.push(new ImageMetaData(image.name, URL.createObjectURL(image), ImageType.NEW));
        }
        setEditedImages(tempState);
    }, [newImages]);

    return (
        <Dialog open={open} fullWidth>
            <Input 
                sx={{display: "none"}}
                inputRef={imageInput}
                type="file"
                inputProps={{ multiple: true }}
                files={newImages}
                onChange={(event)=>setNewImages(event.target.files)}
            />
            <Box sx={{ background: colors.primary[400] }}>
                <DialogTitle>Фотографии</DialogTitle>
                <DialogContent sx={{padding: "0px 24px"}}>
                    <Stack spacing={2}>
                        <Box sx={{"& .reactEasyCrop_Container": {height: "350px !important", position: "relative !important"}}}>
                            {editedImages.length === 0 && <ImagePlaceholder variant="h1" height="350px" background="#585c64"/>}
                            {editedImages.length >0 && <Cropper
                                image={editedImages[selectedImage].url} 
                                crop={editedImages[selectedImage].cropperPosition}
                                zoom={editedImages[selectedImage].zoomValue}
                                aspect={1/1}
                                onCropChange={onCropChange}
                                onCropComplete={onCropComplete}
                                onZoomChange={onZoomChange}
                            />}
                            <Box sx={{margin: "8px",display: "flex", justifyContent: "end"}}>
                                <Button sx={{color: "white"}} onClick={onImagesAdd}><AddIcon />Добавить</Button>
                                <Button sx={{color: "white"}} onClick={onImageRestore}><EditIcon />Восстановить</Button>
                                <Button sx={{color: "white"}} onClick={onImageDelete}><DeleteIcon />Удалить</Button>
                            </Box>
                            <ImageList cols={editedImages.length < 4?4:editedImages.length} sx={{height: "130px"}}>
                                {editedImages.length === 0 && <ImagePlaceholder variant="h4" height="100px" background="#585c64" />}
                                {editedImages.length > 0 && editedImages.map((item, index) => (
                                    <ImageListItem key={index}>
                                    <Box component="img" sx={imageStyle(item.status)}
                                        src={item.url}
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