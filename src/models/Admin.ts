import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Eğer model zaten tanımlıysa onu kullan, yoksa yeni oluştur
const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;