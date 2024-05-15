const zod  = require('zod');

 const User  = zod.object({
    userName : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})


const UpdatedUser = zod.object({
    lastName : zod.string().optional(),
    firstName : zod.string().optional(),
    password : zod.string().optional()
})

module.exports = {
    zodUser : User,
    UpdatedUser  : UpdatedUser
}