const mysql = require('mysql'); //import mysql

// import jwt and bcrypt for hassing pasword
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');

//connect to database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//function of register
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



//function of login 
exports.loginp = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM users WHERE email=?', [email], async (error, result) => {
            console.log(result);
            if (!result || !(await bcrypt.compare(password, result[0].password))) {
                res.status(401).render('loginp', {
                    message: "Email or Password is incorrect"
                });
            } else {
                const id = result[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                // For testing
                console.log("The token is: " + token);

                // Stores JWT in a cookie
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                };

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


        
//function for profile
exports.profile = (req, res) => {
    const userId = req.user.id; 

    // Fetch user information from the database
    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            // User not found
            return res.status(404).send('User not found');
        }

        const user = results[0];

        // Render the profile page with user information
        res.render('profile', { user });
    });
};

//function for logout 
  exports.logout = async (req, res) => {
    console.log(req); // Log the entire request object to the console
    res.cookie('jwt','logout',{
        expires:new Date(Date.now() +2*1000),
        httpOnly:true
    });

    // Perform any logout logic 
    res.status(200).redirect('/');
}
//function for isLoggedIn 
exports.isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            // Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded);

            // Check if user exists
            const result = await promisify(db.query).bind(db)('SELECT * FROM users WHERE id=?', [decoded.id]);

            if (!result || result.length === 0) {
                return next();
            }

            req.user = result[0];
            console.log("User is: ");
            console.log(req.user);
            return next();
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return next();
    }
};
