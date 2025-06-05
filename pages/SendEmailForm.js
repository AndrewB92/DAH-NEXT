import { useState } from 'react';

export default function SendEmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendEmail = async () => {
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject,
          html: `<p>${message}</p>`, // HTML email body
        }),
      });

      const result = await res.json();
      if (result.success) {
        setResponse('Email sent successfully!');
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <input
        type="email"
        placeholder="Recipient email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <p>{response}</p>
    </div>
  );


}