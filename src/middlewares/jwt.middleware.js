import JwtService from "../services/auth/jwt.service.js";
// import AccountService from "../services/auth/account.service.js";

const requireToken = (token, roles, req, res, next) => {
    if (token) {
        try {
            for (const role of roles) {
                let account = JwtService.verify(token, process.env[`JWT_${role !== '' ? role.toUpperCase()+ '_' : ''}SECRET_KEY`], (err, decoded) => {
                    if (err) {
                        return null;
                    }
                    return decoded;
                });
                if (account) {
                    req.account = account;
                    next();
                }
            }
            if (!req.account)
                res.status(401).json({ message: "Unauthorized" });
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

const requireAnonymousToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, [''], req, res, next);
}

const requireCostumerToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['costumer'], req, res, next);
}

const requireDelivererToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['deliverer'], req, res, next);
}

const requirePartnerToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['partner'], req, res, next);
}

const requireAdminToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['admin'], req, res, next);
}

const requireAnyToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['admin', 'costumer', 'deliverer', 'partner'], req, res, next);
}

const requireAdminOrPartnerToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['admin', 'partner'], req, res, next);
}

const requireAdminOrDelivererToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['admin', 'deliverer'], req, res, next);
}

const requireCostumerOrDelivererToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['costumer', 'deliverer'], req, res, next);
}

const requireCostumerOrPartnerToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['costumer', 'partner'], req, res, next);
}

const requireCostumerOrAdminToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['costumer', 'admin'], req, res, next);
}

const requireDelivererOrPartnerToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    requireToken(token, ['deliverer', 'partner'], req, res, next);
}

const verifyToken = async (req, res, next) => {
    const token = JwtService.getTokenFromHeaders(req);
    if (token) {
        try {
            const decoded = await JwtService.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).send({ message: "Unauthorized" });
                }
                return decoded;
            });
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

const checkIdentity = async (req, res, next) => {
    const { id } = req.params;
    // request location
    const location = req.originalUrl.split('/')[4].toUpperCase().slice(0, -1);
    const token = JwtService.getTokenFromHeaders(req);
    const decoded = JwtService.decode(token, location);

    if (decoded.userId !== id) {
        res.status(403).json({ message: "Forbidden" });
    } else {
        next();
    }
}

const checkAuthenticity = async (req, res, next) => {
    const location = req.originalUrl.split('/')[4].toUpperCase().slice(0, -1);
    const token = JwtService.getTokenFromHeaders(req);
    const decoded = JwtService.decode(token, location);
    const account = await AccountService.checkIfExist(decoded);
    if (!account) {
        res.status(403).json({ message: "Token corrupted" });
    } else {
        next();
    }
}


export default {
    checkAuthenticity,
    checkIdentity,
    verifyToken,
    requireAnonymousToken,
    requireAnyToken,
    requireAdminToken,
    requireCostumerToken,
    requireDelivererToken,
    requirePartnerToken,
    requireAdminOrPartnerToken,
    requireAdminOrDelivererToken,
    requireCostumerOrDelivererToken,
    requireCostumerOrPartnerToken,
    requireCostumerOrAdminToken,
    requireDelivererOrPartnerToken,
}