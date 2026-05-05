const cloudinary = require('cloudinary').v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    options.timeout = 120000;
    options.chunk_size = 6000000;

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            return await cloudinary.uploader.upload(file.tempFilePath, options);
        } catch (error) {
            console.error(`Error uploading image to Cloudinary (attempt ${attempt}):`, error);
            if (attempt === maxAttempts) {
                throw new Error('Failed to upload image');
            }
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
    }
}