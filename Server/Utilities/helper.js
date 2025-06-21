const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dvoho0ams', 
    api_key: '717875474348952',       
    api_secret: '6EDcPmtEmKw19st3gVa1H42fiHw' 
  });

const uploadImg = (fileBuffer, publicId) => {    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { publicId },
            (error, uploadResult) => {
                if (error) {
                    return reject({ error: "Upload failed", details: error });
                }
                else{
                    resolve(uploadResult.secure_url);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = {uploadImg};