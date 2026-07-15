// ainterface waitlist capture -> Resend email notification (Vercel serverless).
// Configure in Vercel > Settings > Environment Variables (All Environments):
//   RESEND_API_KEY   (required to actually send)
//   WAITLIST_TO      (optional, defaults to patrick@aiforcanadians.org)
//   WAITLIST_FROM    (optional, defaults to a verified aiforcanadians.org sender)
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (_) { body = {}; } }
    body = body || {};
    const email = (body.email || '').toString().trim();
    const source = (body.source || 'ainterface.org waitlist').toString();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }
    const KEY  = process.env.RESEND_API_KEY;
    const TO   = process.env.WAITLIST_TO   || 'patrick@aiforcanadians.org';
    const FROM = process.env.WAITLIST_FROM || 'ainterface <noreply@aiforcanadians.org>';
    // Graceful fallback so the form works in preview before the key is set.
    if (!KEY) {
      console.log('[waitlist] RESEND_API_KEY not set; captured (not emailed):', email);
      return res.status(200).json({ ok: true, demo: true });
    }
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: 'ainterface waitlist: ' + email,
        text: 'New early-access request.\n\nEmail: ' + email + '\nSource: ' + source + '\nTime: ' + new Date().toISOString()
      })
    });
    if (!r.ok) {
      const t = await r.text();
      console.error('[waitlist] resend error', r.status, t);
      return res.status(502).json({ ok: false, error: 'Send failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[waitlist] error', e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
};
