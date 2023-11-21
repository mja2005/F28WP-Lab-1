const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    //checking if all the fields are empty 
       if (!name || !email || !password || !passwordConfirm) {
        return res.render('register', {
            message: 'Please enter all the fields'
        });
    }

    db.query('SELECT email FROM users WHERE email=?', [email], async (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length > 0) {    
            return res.render('register', {
                message: 'This email is already taken..'
            });
        }  
        if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Internal Server Error');
            }

            console.log(result);
            return res.render('register', {
                message: 'User registered'
            });
        });



    });

};



// code for login
exports.loginp = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email=?', [email], async (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.render('loginp', {
                message: 'This email is not registered'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, result[0].password);
        if (!isPasswordValid) {
            return res.render('loginp', {
                message: 'Password is incorrect'
            });
        }

        // Assuming the user is authenticated successfully

        if (isPasswordValid) {
            // Redirect to the profile page
            return res.redirect('/profile');
        } else {
            // Render the login page with an error message
            return res.render('loginp', {
                message: 'Invalid credentials. Please try again.',
            });
        }

    });
};

exports.profile = (req, res) => {
    // Implementation for handling profile
    res.render('profile'); // Assuming you want to render the profile page
  };



  exports.logout = (req, res) => {
    console.log(req); // Log the entire request object to the console

    // Perform any logout logic (e.g., destroy session, clear cookies) if needed
    if (req.session) {
        req.session.destroy();
    }

    // Render the logout page
    res.render('logout');
};







