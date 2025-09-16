import { aj } from '../utils/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';

const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: 'To many request. Please try again later' });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: 'No bots allowed' });
            } else {
                return res
                    .status(403)
                    .json({ message: 'Forbidden: Access denied by security Policy' });
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: 'Spoofed bot dected',
                message: 'Malicious bot activity dected',
            });
        }
        next();
    } catch (error) {
        console.error('ARCJET PROTECTION ERROR: ', error);
        next();
    }
};

export { arcjetProtection };
