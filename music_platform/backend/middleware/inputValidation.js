function validateRegister(req, res, next) {
    const { username, email, password, name, dob, country } = req.body;

    if (!username || !email || !password || !name || !dob || !country) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Username length only (at least 6 characters)
    if (username.length < 6) {
        return res.status(400).json({
            message: 'Username must be at least 6 characters long.'
        });
    }

    // Password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // ---- DOB validation ----
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date of birth.' });
    }

    // Minimum age check (13 years)
    const today = new Date();
    const ageDifMs = today - birthDate;
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 13) {
        return res.status(400).json({ message: 'You must be at least 13 years old to register.' });
    }

    next();
}

module.exports = validateRegister;
