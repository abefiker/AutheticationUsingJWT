const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
app.use(express.json())
const posts = [
    {
        username : "Abemelek",
        title : "waiting her"
    },
    {
        username : "Abresh",
        title : "sleeping"
    }
]
app.get('/posts',AuthenticateToken,(req,res) =>{
    res.json(posts.filter(post => post.username == res.user.name))
})


function AuthenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        res.user = user
        next()
    })
}
app.listen(3000)