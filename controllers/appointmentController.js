const Appointment = require("../model/appointmentModel");
const catchAsync = require("../utils/catchAsync");

//Get All the appointments
exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    message: "successful",
    No_of_appointments: appointments.length,
    data: {
      appointments,
    },
  });
});

//Create a new appointment
exports.createAnAppointment = catchAsync(async (req, res, next) => {
  const newAppointment = await Appointment.create({
    ...req.body,
    _consumerId: req.user.id,
  });
  res.status(201).json({
    message: "successful",
    data: {
      newAppointment,
    },
  });
});

//Cancel an appointment
exports.cancelAnAppointmnet = catchAsync(async (req, res, next) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "successfully canceled",
  });
});

exports.writePrescription = catchAsync(async (req, res, next) => {
  if (req.user.role === "consumer") {
    return next(new AppError("unauthorizeed", 400));
  }
  const { diagnosis, prescription } = req.body

  const newPrescription = await Appointment.findByIdAndUpdate(req.params.id, {
    diagnosis,
    prescription
  })



  res.status(200).json({
    message: "successfully updated",
    data: {
      newPrescription
    }
  });
});