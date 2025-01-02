import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for cloudinary uploads
const uploadToCloduinary = async(file) => {
    try {
      const result = await cloudinary.upload(file.tempFilePath,{
        resource_type: "auto",

      })  
      return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloduinary",error);
        throw new Error("Error in uploadToCloduinary");
    }
}

export const createSong = async(req,res,next) => {
      try {
        if(!req.files || !req.files.audioFile || !req.file.imageFile){
            return res.status(400).json({message:"Please upload all files"});
        }

        const {title,artist,albumId,duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloduinary(audioFile);
        const imageUrl = await uploadToCloduinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId:albumId || null
        })

        await song.save();

        //if song belongs to any albumId update its details in the array
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push: {songs:song._id},
            });
        }
        res.status(201).json(song);
      } catch (error) {
        console.log("Error in createSong",error);
        next(error);
      }
};

export const deleteSong = async(req,res,next) =>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id},
            })
        }
        await Song.findByIdAndDelete(id)

        res.status(200).json({message : "Song deleted successfully"});
    } catch (error) {
        console.log("Error in deleteSong",error);
        next(error);
    }
}

export const createAlbum = async(req,res,next) =>{
    // try {
    //     const {title,artist,releaseYear} = req.body
    // } catch (error) {
        
    // }
};

export const deleteAlbum = async(req,res,next) =>{};