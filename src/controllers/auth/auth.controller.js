import AccountService from "../../services/auth/account.service.js";
import JwtService from "../../services/auth/jwt.service.js";
import validator from "../../utils/integrety.utills.js";

const login = async (req, res) => {
    const { login, password } = req.body;

    let isEmail = validator.isEmail(login);

    // Check if user exists
    let dbRes;
    if (isEmail) {
         dbRes = await AccountService.findByEmail(login);
    } else {
        dbRes = await AccountService.findByPhone(login);
    }

    if (dbRes.status === 500) {
        return res.status(dbRes.status).json({ message: "Login or password is incorrect"});
    }



    // Check if password is correct
    const account = dbRes.data;
    const passwordIsValid = await AccountService.comparePassword(password, account.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: "Login or password is incorrect" });
    }

    // Generate token
    const token = JwtService.generateToken(account);

    res.json({
        message: "Login successful",
        token: token,
        account: {
            id: account.userId,
            email: account.email,
            phone: account.phone,
            role: account.role
        }
    });
}

const register = async (req, res) => {
    const { email, phone, username, password, countryCode  } = req.body;

    // Check if user exists
    let dbRes = await AccountService.findByEmail(email);
    if (dbRes.status === 200) {
        return res.status(400).json({ message: "User already exists" });
    }

    dbRes = await AccountService.findByPhone(phone);
    if (dbRes.status === 200) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create account
    const account = {
        email: email,
        phone: phone,
        countryCode: countryCode,
        username: username,
        password: password,
        role: "user"
    };
    dbRes = await AccountService.createAccount(account);
    if (dbRes.status !== 201) {
        return res.status(dbRes.status).json({ message: dbRes.message });
    }

    res.status(201).json({ message: "Account created" });
}



const logout = async (req, res) => {
    res.json({ message: "Logout successful!" });
}

const forgotPassword = async (req, res) => {
    res.json({ message: "Forgot password" });
}

export default {
    register,
    login,
    logout,
    forgotPassword
}