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

        // Normalise to get id + email
        req.user = {
            id: decoded.sub || decoded.id,
            email: decoded.email,
        };

        return next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res
            .status(401)
            .json({ ok: false, error: "Invalid or expired token" });
    }
}
