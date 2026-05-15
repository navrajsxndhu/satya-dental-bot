require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Tool Call Handler (Webhook)
// This endpoint will be called by Vapi/Retell when Aria triggers the 'book_appointment' tool.
app.post('/api/book-appointment', async (req, res) => {
    try {
        console.log('--- Received Booking Request ---');
        console.log(req.body);

        // Vapi usually sends tool calls in a specific format
        // Depending on the platform, we might need to parse it differently.
        // Assuming the AI sends: { name, phone, service, time }
        
        const { name, phone, service, time } = req.body.message?.toolCalls?.[0]?.function?.arguments 
                                             ? JSON.parse(req.body.message.toolCalls[0].function.arguments) 
                                             : req.body;

        if (!name || !phone || !time) {
            return res.status(400).json({ 
                results: [{ 
                    toolCallId: req.body.message?.toolCalls?.[0]?.id,
                    result: "Missing required booking information." 
                }] 
            });
        }

        const newAppointment = new Appointment({
            patientName: name,
            phoneNumber: phone,
            service: service || 'General Consultation',
            appointmentTime: new Date(time)
        });

        await newAppointment.save();
        console.log('✅ Appointment saved successfully!');

        // Response format for Vapi to confirm tool execution
        res.status(200).json({
            results: [{
                toolCallId: req.body.message?.toolCalls?.[0]?.id,
                result: `Successfully booked appointment for ${name} at ${time}.`
            }]
        });

    } catch (error) {
        console.error('❌ Error processing booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Health Check
app.get('/', (req, res) => {
    res.send('Satya Dental Bot Receiver Server is Running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
