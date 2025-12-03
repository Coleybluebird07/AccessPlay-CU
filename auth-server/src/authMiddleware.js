import jwt from "jsonwebtoken";


export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");

    if (!token) {
        return res
            .status(401)
            .json({ ok: false, error: "Missing authorization token" });
    }

    try {
        const secret = process.env.JWT_SECRET || "dev_secret";
        const decoded = jwt.verify(token, secret);

        // Normalise to get id + email + is_admin
        req.user = {
            id: decoded.sub || decoded.id,
            email: decoded.email,
            is_admin: !!decoded.is_admin,
        };

        return next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res
            .status(401)
            .json({ ok: false, error: "Invalid or expired token" });
    }
}

export function requireAdmin(req, res, next) {
    if (!req.user || !req.user.is_admin) {
        return res.status(403).json({ ok: false, error: "Admin access required" });
    }
    return next();
}
