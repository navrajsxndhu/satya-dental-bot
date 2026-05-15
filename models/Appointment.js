const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        enum: ['Implants', 'Root Canal', 'Orthodontics', 'Kids Dentistry', 'General Consultation'],
        default: 'General Consultation'
    },
    appointmentTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
