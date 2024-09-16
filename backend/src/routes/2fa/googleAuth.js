import express from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const authRouter = express.Router();

authRouter.post('/generate-secret', async (req, res) => {
    try {
        const secret = speakeasy.generateSecret({ name: 'codeUp' });
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        res.json({ secret: secret.base32, qrCodeUrl });
    } catch (err) {
        res.status(500).json({ error: 'Error generating QR code' });
    }
});

export default authRouter;