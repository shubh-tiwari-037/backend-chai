import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res ,)=>{
//    get users details from frontend
//    validate not empty
//    check if user already exists: username email 
//    check for images  check for avtar 
//    upload to them cloudinary,avtar
//      create user object- creat entry in db
//      remove password and refresh tocken field from response
//      check user creation
//      return response

const {fullname, email ,username, password}= req.body
console.log("email:" , email);

// if(fullname === ""){   +=++++++ esa sabhi me karna padega to accha way second vala h
//     throw new ApiError(404, "fullname is required")
// }

if([fullname, password, email ,username].some((field)=> field?.trim()==="")) 
    {
        throw new ApiError(404, "All fields are required")
  }

  const existeUser = User.findOne({
    $or:[{username},{email}]
  })

  if(existeUser){
    throw new ApiError(409, "User with email or username alredy exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(404,"Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(404,"Avatar file is required")
  }

  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createUser = await User.findById(User._id).select("-password -refreshtoken" ) //yaha pe user.id small me sir nr lika h

  if(!createUser){
     throw new ApiError(500,"something went wrong while registering  the user")
  }

  return res.status(201).json(
    new ApiResponse(200,"user registred successfully",createdUser)
  )
  

})

export {registerUser}