import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Lütfen isim giriniz"] 
  },
  role: { 
    type: String, 
    default: "Müşteri" 
  },
  quote: { 
    type: String, 
    required: [true, "Lütfen yorumunuzu yazınız"] 
  },
  // 🚀 VİDEO VE GÖRSEL DESTEĞİ İÇİN EKLENENLER:
  type: { 
    type: String, 
    enum: ["text", "video"], 
    default: "text" // Admin panelinden 'video' olarak değiştirebilirsin
  },
  youtubeId: { 
    type: String, 
    default: "" // Sadece videonun sonundaki ID (Örn: qPWWUNZzz04)
  },
  avatar: { 
    type: String, 
    default: "/assets/images/default-avatar.jpg" // Müşteri resmi gerekirse
  },
  badge: { 
    type: String, 
    default: "Doğrulanmış Müşteri" // Yorumun üstündeki küçük etiket
  },
  isActive: { 
    type: Boolean, 
    default: false // Sen admin panelinden onaylayana kadar kapalı kalır
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);