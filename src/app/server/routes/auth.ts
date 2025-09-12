// // server/routes/auth.ts
// import express from 'express';

// import bcrypt from 'bcrypt';
// import db from '@/utils/db';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password)
//     return res.status(400).json({ error: 'All fields are required' });

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//     db.query(sql, [username, email, hashedPassword], (err, result) => {
//       if (err) return res.status(500).json({ error: 'Database error', details: err });
//       return res.status(201).json({ message: 'User registered', userId: result.insertId });
//     });
//   } catch (err) {
//     return res.status(500).json({ error: 'Server error', details: err });
//   }
// });

// export default router;
