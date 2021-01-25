const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

// buat connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root1234',
    database: 'user_db'
})

const port = 3003


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read user
app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users;', (error, results) => {
        if (!error) res.json(results)
    })
})

// read user
app.get('/user/:id', (req, res) =>  {
    connection.query('SELECT * FROM users WHERE id=?', req.params.id, (err, result) => {
        if (!err) res.json(result[0])
    })
})

// create user
app.post('/user', (req, res) => {
    const fullname = {
        fullname: req.body.fullname,
        username: req.body.username,
        password_: req.body.password_, 
    }

    connection.query('INSERT INTO users SET ?', fullname, (error, results) => {
        if (!error) {
            res.json({ message: 'data created' })
        } else {
            res.status(500).json({ error: error })
        }
    })
})

// update user
app.patch('/user/:id', (req, res) => {
    const sql = {
        fullname: req.body.fullname,
        username: req.body.username,
        password_: req.body.password_, 
    }

    connection.query(`UPDATE users SET ? WHERE id=?`, [sql, req.params.id], (err, result) => {
        if (!err) {
            res.json({ message: 'data updated' })
        } else {
            res.status(500).json({ error: err })
        }
    })
})

// delete user
app.delete('/user/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?', req.params.id, (err, result) => {
        if (!err) {
            res.json({ message: 'data deleted' })
        } else {
            res.status(500).json({ error: err })
        }
    })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})