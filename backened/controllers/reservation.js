import ErrorHandeler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, resp, next) => {
const {firstName, lastName, email, phone, time, date } = req.body;
if(!firstName || !lastName || !email || !phone || !time || !date) {
    return next(new ErrorHandeler("Plz fill the complete form" , 400));
}
try {   
await Reservation.create({firstName, lastName, email, phone, time, date});
resp.status(200).
json({
    success: true,
    message:"Reservation sent succesfully"
});
} catch(err) {
if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map(e => e.message);
    return next(new ErrorHandeler(validationErrors.join(", "), 400));
}

}
}