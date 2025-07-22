const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    
    const authHeader = req.header("Authorization");
    const token =
      
      (authHeader && authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null);

    
    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
   
    // Move to next middleware or route handler
    next();
  } catch (err) {

    console.error(" Token Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



// exports.isUser = (req, res, next) =>{
//     try{
//         if(req.user.role !== "User"){
//             return res.status(401).json({
//                 success:false,
//                 message:"this route is protected for students"
//             })
//         }
//         next();
//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"user role is not matching"
//         })
//     }
// }



// exports.isAdmin = (req, res, next) =>{
//     try{
//         if(req.user.role !== "Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"this route is protected for admin"
//             })
//         }
//         next();
//     }
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"user role is not matching"
//         })
//     }
// }