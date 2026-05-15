# Satya Dental Clinic AI Voice Bot

This is the backend receiver server for **Aria**, the AI Voice Receptionist for Satya Dental Clinic.

## Tech Stack
- **Voice Engine:** Vapi.ai / Retell AI
- **Brain:** OpenAI GPT-4o
- **Backend:** Node.js / Express
- **Database:** MongoDB

## Project Structure
- `server.js`: Main entry point and webhook handler.
- `models/Appointment.js`: MongoDB schema for appointments.
- `prompts/aria_system_prompt.txt`: The system prompt for the AI.
- `.env`: Environment variables (API keys, DB URI).

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Edit the `.env` file and provide your MongoDB URI and API keys.

3. **Run the Server:**
   ```bash
   node server.js
   ```

4. **Expose to Internet:**
   Since this is a local server, use **ngrok** to expose it so Vapi/Retell can reach it.
   ```bash
   ngrok http 5000
   ```
   Copy the ngrok URL (e.g., `https://xyz.ngrok-free.app`) and use it in your Vapi Tool configuration as the **Server URL**.

## Vapi Tool Configuration
In Vapi, create a tool named `book_appointment` with the following parameters:
- `name` (string): Patient's full name.
- `phone` (string): Patient's contact number.
- `service` (string): The dental service requested.
- `time` (string): The requested appointment date and time.

Set the **URL** to: `https://your-ngrok-url/api/book-appointment`

## About Aria
Aria is designed to be empathetic and professional. She never gives medical advice and focuses on booking appointments for:
- Implants
- Root Canal
- Orthodontics
- Kids Dentistry
