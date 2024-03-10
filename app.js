// const bodyParser = require('body-parser')
const session = require('express-session');
const express = require('express'),
    mysql2 = require('mysql2'),
    port = 3030,
    bcrypt = require('bcrypt')

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'clinic',
    password: 'iSardor_7410'
})

const pool2 = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: 'iSardor_7410'
})

const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static('public'));

app.use(
    session({
      secret: 'iSardor_7410',
      resave: false,
      saveUninitialized: true,
    })
  );

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/mysql-tutorial', (req, res) => {
    res.render('tutorial')
})

app.get('/mysql-editor', (req, res) => {
    const search_query = req.query.search_query;
    let errorStatus
    pool.query(`SELECT*FROM departments`, (error, results) => {
      if (error) {
        console.log('Error executing query:', error);
  
        const errorMessage = 'ERROR '+ error.errno +  ' (' + error.sqlState + '): ' + error.sqlMessage;
        errorStatus = true
        return res.render('editor', { error: errorMessage, errorStatus, search_query, tabStatus: errorStatus ? 'Errors' : 'Output' });
      }
      errorStatus = false
      const elements = results;
      const columnNames = Object.keys(results[0]);
      res.render('editor', { columnNames, elements, search_query, errorStatus, tabStatus: errorStatus ? 'Errors' : 'Output' });
    });
})

app.get('/mysql-editor/results', (req, res) => {
    const search_query = req.query.search_query
    let errorStatus

    pool.query(search_query, (error, results) => {
        if (error) {
            console.error('Error retrieving data:', error)
            let errorMessage = 'ERROR '+ error.errno +  ' (' + error.sqlState + '): ' + error.sqlMessage;
            errorStatus = true
            return res.render('editor', { error: errorMessage, search_query, errorStatus, tabStatus: errorStatus ? 'Errors' : 'Output' })
        } else {
            if (!results[0]) {
                return res.redirect('/mysql-editor')
            }
            const elements = results
            errorStatus = false
            const columnNames = Object.keys(results[0]);
            res.render('editor', { columnNames, elements, search_query, errorStatus, tabStatus: errorStatus ? 'Errors' : 'Output' })
        }
    })
})

app.get('/registration', (req, res) => {
    res.render('registration')
})

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body

    const query = `INSERT INTO user_info ( username, email, password) VALUES (?, ?, ?)`

    const hashedPassword = await bcrypt.hash(password, 10);  
    
    pool2.query(query, [ username, email, hashedPassword ], (err, result) => {
        if(err){
            console.error('Error retrieving user:', err);
            return res.send('Error signing up');
        }
        console.log('Data inserted into MySQL')
        res.redirect('/home')
    })
    }
)

app.post('/signin', async (req, res) => {
    const { username, password } = req.body

    const query = `SELECT * FROM user_info WHERE username = ?`

    pool2.query(query, [username], async (err, result) => {
        if(err){
            console.error('Error retrieving user:', err);
            return res.send('Error signing in');
        }

        if(result.length === 0){
            return res.send('User not found')
        }

        const user = result[0]

        try {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                // Successful sign-in
                res.redirect('/home')
            } else {
            // Incorrect password
            res.send('Incorrect password');
            }
        } catch (err) {
            console.error('Error comparing passwords:', err)
            res.send('Error signing in')
        }
    })
});

app.get('/forgotten-password', (req, res) => {
    res.render('forgotten-password')
})

app.post('/forgotten-password', (req, res) => {
    const { email } = req.body

    const query = `UPDATE user_info SET password = NULL where email = ?`

    pool2.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error resetting password:', err);
            return res.send('Error resetting password');
        }

        console.log('Password deleted successfully');
        res.redirect('/new-password');
    })
})

app.get('/new-password', (req, res) => {
    res.render('new-password')
})

app.post('/new-password', async (req, res) => {
    const { password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
        res.send('Passwords do not match. Please try again.')
    } else {
        const query = `UPDATE user_info SET password = ? WHERE password IS NULL`

        const hashedPassword = await bcrypt.hash(password, 10);

        pool2.query(query, [hashedPassword], (err, result) => {
            if (err) {
                console.error('Error setting password:', err);
                return res.send('Error setting password');
            }
            console.log('New password setted successfully!')
            res.redirect('/home')
        })
    }
})

app.listen(port, () => {
    console.log(`App listening on ${port}!`)
})