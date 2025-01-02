import {clerkClient} from '@clerk/express';

//to check if the user is locked in
export const protectRoute = async (req , res , next) => {
    if(!req.auth.userId){
        user.status(401).json({message : "Unauthorized - you must be logged in"});
        return;
    }

    next();
}

//to see if the user is admin
export const requireAdmin = async(req,res,next) => {
    try{
        const currentUser = await clerkClient.user.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

        if(!isAdmin){
            return res.status(403).json({message:"Unauthorized - you must be an admin"});
        }

        next();
    } catch(error){
      return res.status(500).json({message:"Internal server error",error});
    }
};