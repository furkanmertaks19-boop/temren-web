import mongoose, { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { AdminRole } from '@/lib/adminPermissions';

export interface IAdmin extends Document {
    username: string;
    password: string;
    displayName: string;
    email?: string;
    role: AdminRole;
    isActive: boolean;
    lastLogin?: Date;
    createdBy?: mongoose.Types.ObjectId;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: [true, 'Kullanıcı adı zorunludur'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Şifre zorunludur'],
        minlength: [6, 'Şifre en az 6 karakter olmalıdır'],
    },
    displayName: {
        type: String,
        required: [true, 'Görünen ad zorunludur'],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'editor', 'viewer'],
        default: 'admin',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
}, {
    timestamps: true,
});

AdminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const Admin = (models.Admin as mongoose.Model<IAdmin>) || model<IAdmin>('Admin', AdminSchema);

export default Admin;
