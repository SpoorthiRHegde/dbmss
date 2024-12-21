const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // Import the db.js file

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
app.use(bodyParser.json());

// API endpoint to get all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEE';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// API endpoint to add a new employee
app.post('/add-employee', (req, res) => {
    console.log(req.body); // Log the received data
    const data = req.body;
    const sql = 'INSERT INTO EMPLOYEE SET ?';
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error(err); // Log SQL error
        return res.status(500).send(err);
      }
      res.json({ message: 'Employee added successfully', id: result.insertId });
    });
  });
  app.post('/add-salary', (req, res) => {
    const { EID, BASIC_SAL, AGP, ESI, LOAN, IT } = req.body;

    const sql = 'INSERT INTO SALARY (EID, BASIC_SAL, AGP, ESI, LOAN, IT) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [EID, BASIC_SAL, AGP, ESI, LOAN, IT], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding salary details');
        } else {
            res.status(200).send('Salary details added successfully');
        }
    });
});

// View Salary Details
app.get('/salaries', (req, res) => {
    const sql = 'SELECT * FROM SALARY';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching all salary details');
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/salaries/:eid', (req, res) => {
    const { eid } = req.params;

    const sql = 'SELECT * FROM SALARY WHERE EID = ?';
    db.query(sql, [eid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching salary details for the employee');
        } else {
            res.status(200).json(results);
        }
    });
});
// API endpoint to add family details
app.post('/add-family', (req, res) => {
    let { EID, FNAME, F_DOB, MNAME, M_DOB } = req.body;

    // Convert dates to MySQL format (YYYY-MM-DD)
    const formatDate = (date) => {
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    try {
        F_DOB = formatDate(F_DOB); // Convert F_DOB to correct format
        M_DOB = formatDate(M_DOB); // Convert M_DOB to correct format
    } catch (error) {
        return res.status(400).send('Invalid date format. Use DD-MM-YYYY.');
    }

    const sql = 'INSERT INTO FAMILY (EID, FNAME, F_DOB, MNAME, M_DOB) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [EID, FNAME, F_DOB, MNAME, M_DOB], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding family details');
        } else {
            res.status(200).send('Family details added successfully');
        }
    });
});


// View Family Details
app.get('/families', (req, res) => {
    const sql = 'SELECT * FROM FAMILY';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching family details');
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
