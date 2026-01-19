import mongoose from 'mongoose';

// Slider verilerinin veritabanı şablonu
const SliderSchema = new mongoose.Schema({
    order: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Slider görseli zorunludur']
    },
    title: {
        type: String,
        required: [true, 'Slider başlığı zorunludur']
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    buttonText: {
        type: String,
        default: "İNCELE"
    },
    buttonLink: {
        type: String,
        default: "/"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Oluşturulma ve güncellenme tarihlerini otomatik tutar
});

// Next.js hot reload sırasında modelin tekrar tekrar oluşturulmasını engellemek için kontrol
export default mongoose.models.Slider || mongoose.model('Slider', SliderSchema);