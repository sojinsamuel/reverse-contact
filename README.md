# Reverse Contact AI Agent

This project is a submission for the [Twilio Challenge](https://dev.to/challenges/twilio).

## What I Built

The Reverse Contact AI Agent is a robust tool designed to enhance recruitment processes by fetching candidate details from an email or LinkedIn profile URL. Users can share this information with partners or co-founders via various channels:

- [Twilio Call](https://www.twilio.com/docs/voice/make-calls)
- [SMS](https://www.twilio.com/en-us/messaging/channels/sms)
- [Email](https://app.sendgrid.com/)

Additionally, by inputting a candidate's phone number, the agent can use the [Twilio Phone Lookup service](https://help.twilio.com/articles/15515453000859) to verify phone number details and availability.

The agent enhances user interaction by displaying real-time notifications. For example, when a recipient opens an email, the AI Agent dashboard immediately alerts the user.

Example Notification:

```
Hey sojinsamue2001@gmail.com just opened their mail.
```

User data events such as signup, login, message exchanges, and page visits are meticulously tracked using [Twilio Segment](https://segment.com/).

## Demo

Experience the functionality of the Reverse Contact AI Agent through the links below:

- [Live Project](https://reversecontact.vercel.app)
- Demo Video: {% youtube O8hQnAyhUB4 %}

## Twilio and AI

This project integrates the [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) with GPT-4 to render React components. These components interact with the Twilio SDK to send messages via SMS, email, and voice calls. This setup allows for the execution of actions using natural language, leveraging the combined power of Twilio's services and advanced AI.

[View the Source Code on GitHub](https://github.com/sojinsamuel/reverse-contact)

## Additional Prize Categories

This submission qualifies for the following categories in the Twilio Challenge:

- **Twilio Times Two**: Utilizes multiple Twilio services including Segment, Phone Lookup, SMS, Programmable Voice, and SendGrid for dynamic email template generation.
- **Impactful Innovators**: Streamlines networking and recruitment by fetching detailed contact information with just an email address.
- **Entertaining Endeavors**: Enhances user engagement with real-time notifications for critical recruitment activities.

The implementation of Twilio's SendGrid Webhook to handle event notifications is managed through another component of this project, available at [this GitHub repository](https://github.com/sojinsamuel/email-webhook). This setup passes webhook events to the frontend, ensuring seamless communication across various channels.
