const { uuid } = require("uuidv4");
const path = require('path');


const uploadFiles = (files, validextension = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) =>{

    return new Promise((resolve, reject) => {

        let {arch} = files;
        const splitname = arch.name.split('.');
        const extension = splitname[ splitname.length - 1];


        if(!validextension.includes(extension)){
            return reject(`ERROR wrong extention. the valid extention are ${validextension}`);
        };
        
    
        let uploadPath;
        
        if (!files || Object.keys(files).length === 0) {
            return reject(`No files were uploaded.`);
        }
        
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const newFileName = uuid() + '.' + extension;
        uploadPath = path.join(__dirname , '../uploads/', folder , newFileName);
        
        // Use the mv() method to place the file somewhere on your server
        arch.mv(uploadPath, (err) => {
            if (err){
                return reject(err);
            }
            
            
            resolve(newFileName);
        });
    })
    
    
};

module.exports = {
    uploadFiles
};