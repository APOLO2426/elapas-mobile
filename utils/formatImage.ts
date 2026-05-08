import { CameraCapturedPicture } from "expo-camera"

interface ImageFileData {
    uri: string,
    name: string,
    type: string
}

export const formatImageUpload = (photo: CameraCapturedPicture | null): ImageFileData | null => {
    if (!photo || !photo.uri) return null

    const filename = photo.uri.split('/').pop() || 'upload.jpg'
    
    // Mapeo de formatos soportados por el backend
    let fileType = 'image/jpeg'; // default
    const format = photo.format?.toLowerCase();
    
    if (format === 'png') {
        fileType = 'image/png';
    } else if (format === 'webp') {
        fileType = 'image/webp';
    } else if (format === 'jpeg' || format === 'jpg') {
        fileType = 'image/jpeg';
    }
    
    return {
        name: filename,
        type: fileType,
        uri: photo.uri
    }
}
