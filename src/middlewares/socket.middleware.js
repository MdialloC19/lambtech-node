// import AccountService from "../services/auth/account.service.js";
// import JwtService from "../services/auth/jwt.service.js";

const authMiddleware = async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        if (token) {
            JwtService.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return next(new Error('Authentication error'));
                }
                socket.account = await AccountService.findById(decoded.userId);
                next();
            }).then(r => {
                console.log(r);
            });
        } else {
            next(new Error('Authentication error'));
        }
    } catch (error) {
        next(new Error('Authentication error'));
    }
}

export default {
    authMiddleware
}