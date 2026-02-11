import mongoose, { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
    username: { 
        type: String, 
        required: [true, 'Kullanıcı adı zorunludur'], 
        unique: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, 'Şifre zorunludur'],
        minlength: [6, 'Şifre en az 6 karakter olmalıdır']
    },
}, { 
    timestamps: true 
});

/**
 * Şifreleme (Hashing) İşlemi
 * Modern Mongoose'da async middleware kullanırken 'next' parametresine gerek yoktur.
 */
AdminSchema.pre('save', async function () {
    // Şifre değişmemişse işlemi durdur
    if (!this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err: any) {
        throw new Error(err);
    }
});

/**
 * Şifre Doğrulama Metodu
 */
AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = (models.Admin as mongoose.Model<IAdmin>) || model<IAdmin>("Admin", AdminSchema);

export default Admin;