"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);
    setIsToggled(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin/dashboard");
      } else {
        setIsToggled(false);
        setIsLoading(false);
        setError(data.error || "Kullanıcı adı veya şifre hatalı.");
      }
    } catch {
      setIsToggled(false);
      setIsLoading(false);
      setError("Sunucuya bağlanılamadı. Veritabanını kontrol et.");
    }
  };

  return (
    <main className="admin-auth-page">
      <div className="auth-bg-grid" />
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className={`auth-wrapper ${isToggled ? "toggled" : ""} ${error ? "has-error" : ""}`}>
        <div className="background-shape" />
        <div className="secondary-shape" />

        <div className="credentials-panel signin">
          <div className="brand-box slide-element">
            <ShieldCheck size={40} />
          </div>

          <h2 className="slide-element">
            TEMREN<span>.OS</span>
          </h2>

          <p className="panel-desc slide-element">
            Yönetim paneline güvenli erişim sağlayın.
          </p>

          {error && (
            <div className="error-box slide-element">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="field-wrapper slide-element">
              <input
                type="text"
                required
                value={formData.username}
                disabled={isLoading}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <label>Kullanıcı Adı</label>
              <User size={18} />
            </div>

            <div className="field-wrapper slide-element">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                disabled={isLoading}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <label>Şifre</label>

              <button
                type="button"
                className="eye-btn"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>

              <Lock className="lock-icon" size={18} />
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Kontrol Ediliyor
                    <Loader2 size={18} className="spin-icon" />
                  </>
                ) : (
                  <>
                    Sisteme Bağlan
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="welcome-section signin">
          <h2 className="slide-element">
            WELCOME
            <br />
            BACK!
          </h2>
          <p className="slide-element">
            Temren Makina içerik, slider, blog ve ürün yönetim sistemine giriş yapın.
          </p>
        </div>

        <div className="credentials-panel signup loading-panel">
          <div className="loading-orb slide-element">
            <Loader2 size={54} />
          </div>

          <h2 className="slide-element">Doğrulanıyor</h2>

          <p className="loading-text slide-element">
            Bilgiler kontrol ediliyor, lütfen bekleyin.
          </p>

          <div className="loading-line slide-element">
            <span />
          </div>
        </div>

        <div className="welcome-section signup">
          <h2 className="slide-element">
            PANEL
            <br />
            AÇILIYOR
          </h2>
          <p className="slide-element">
            Yetki doğrulaması tamamlandığında yönetim ekranına aktarılacaksınız.
          </p>
        </div>
      </div>

      <p className="auth-footer">TEMREN MAKINA INDUSTRIAL OS • 2026</p>

      <style jsx global>{`
        .admin-auth-page {
          min-height: 100vh;
          width: 100%;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: "Poppins", sans-serif;
          color: #fff;
        }

        .auth-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 212, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.045) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.8;
        }

        .auth-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(120px);
          pointer-events: none;
        }

        .auth-glow-one {
          width: 430px;
          height: 430px;
          top: -140px;
          left: -120px;
          background: rgba(0, 212, 255, 0.18);
          animation: floatOne 9s ease-in-out infinite;
        }

        .auth-glow-two {
          width: 520px;
          height: 520px;
          right: -130px;
          bottom: -160px;
          background: rgba(0, 100, 255, 0.18);
          animation: floatTwo 11s ease-in-out infinite;
        }

        .auth-wrapper {
          position: relative;
          width: 100%;
          max-width: 860px;
          height: 520px;
          border: 2px solid #00d4ff;
          box-shadow: 0 0 30px #00d4ff;
          overflow: hidden;
          background: rgba(26, 26, 46, 0.96);
          z-index: 5;
          transition: 0.45s ease;
        }

        .auth-wrapper.has-error {
          border-color: #ff4d6d;
          box-shadow: 0 0 35px rgba(255, 77, 109, 0.8);
          animation: errorShake 0.45s ease;
        }

        .auth-wrapper.has-error .background-shape {
          background: linear-gradient(45deg, #1a1a2e, #ff4d6d);
        }

        .auth-wrapper.has-error .secondary-shape {
          border-top-color: #ff4d6d;
        }

        .credentials-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          z-index: 3;
        }

        .credentials-panel.signin {
          left: 0;
          padding: 0 42px;
        }

        .credentials-panel.signin .slide-element {
          transform: translateX(0%);
          transition: 0.7s ease;
          opacity: 1;
          filter: blur(0);
        }

        .credentials-panel.signin .slide-element:nth-child(1) {
          transition-delay: 2.1s;
        }

        .credentials-panel.signin .slide-element:nth-child(2) {
          transition-delay: 2.2s;
        }

        .credentials-panel.signin .slide-element:nth-child(3) {
          transition-delay: 2.3s;
        }

        .credentials-panel.signin .slide-element:nth-child(4) {
          transition-delay: 2.4s;
        }

        .credentials-panel.signin .slide-element:nth-child(5) {
          transition-delay: 2.5s;
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element {
          transform: translateX(-120%);
          opacity: 0;
          filter: blur(8px);
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(1) {
          transition-delay: 0s;
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(2) {
          transition-delay: 0.1s;
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(3) {
          transition-delay: 0.2s;
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(4) {
          transition-delay: 0.3s;
        }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(5) {
          transition-delay: 0.4s;
        }

        .credentials-panel.signup {
          right: 0;
          padding: 0 60px;
        }

        .credentials-panel.signup .slide-element {
          transform: translateX(120%);
          transition: 0.7s ease;
          opacity: 0;
          filter: blur(10px);
        }

        .credentials-panel.signup .slide-element:nth-child(1) {
          transition-delay: 0s;
        }

        .credentials-panel.signup .slide-element:nth-child(2) {
          transition-delay: 0.1s;
        }

        .credentials-panel.signup .slide-element:nth-child(3) {
          transition-delay: 0.2s;
        }

        .credentials-panel.signup .slide-element:nth-child(4) {
          transition-delay: 0.3s;
        }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element {
          transform: translateX(0%);
          opacity: 1;
          filter: blur(0);
        }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(1) {
          transition-delay: 1.7s;
        }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(2) {
          transition-delay: 1.8s;
        }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(3) {
          transition-delay: 1.9s;
        }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(4) {
          transition-delay: 2s;
        }

        .brand-box {
          width: 70px;
          height: 70px;
          border: 1px solid rgba(0, 212, 255, 0.35);
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.08);
          box-shadow: 0 0 22px rgba(0, 212, 255, 0.25);
          margin-bottom: 22px;
        }

        .credentials-panel h2 {
          font-size: 42px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.06em;
          color: #fff;
        }

        .credentials-panel h2 span {
          color: #00d4ff;
        }

        .panel-desc {
          margin-top: 14px;
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
          font-weight: 600;
        }

        .field-wrapper {
          position: relative;
          width: 100%;
          height: 50px;
          margin-top: 25px;
        }

        .field-wrapper input {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 15px;
          color: #fff;
          font-weight: 600;
          border-bottom: 2px solid rgba(255, 255, 255, 0.78);
          padding-right: 56px;
          transition: 0.5s;
        }

        .field-wrapper input:focus,
        .field-wrapper input:valid {
          border-bottom: 2px solid #00d4ff;
        }

        .auth-wrapper.has-error .field-wrapper input {
          border-bottom-color: rgba(255, 77, 109, 0.75);
        }

        .field-wrapper label {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-size: 15px;
          color: rgba(255, 255, 255, 0.82);
          transition: 0.5s;
          pointer-events: none;
          font-weight: 600;
        }

        .field-wrapper input:focus ~ label,
        .field-wrapper input:valid ~ label {
          top: -5px;
          color: #00d4ff;
          font-size: 13px;
        }

        .field-wrapper svg {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.75);
          transition: 0.5s;
        }

        .field-wrapper input:focus ~ svg,
        .field-wrapper input:valid ~ svg {
          color: #00d4ff;
        }

        .lock-icon {
          right: 34px !important;
        }

        .eye-btn {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
          z-index: 5;
          color: rgba(255, 255, 255, 0.7);
        }

        .eye-btn svg {
          position: static;
          transform: none;
        }

        .submit-button {
          position: relative;
          width: 100%;
          height: 46px;
          background: transparent;
          border-radius: 40px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 900;
          border: 2px solid #00d4ff;
          overflow: hidden;
          z-index: 1;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .submit-button::before {
          content: "";
          position: absolute;
          height: 300%;
          width: 100%;
          background: linear-gradient(#1a1a2e, #00d4ff, #1a1a2e, #00d4ff);
          top: -100%;
          left: 0;
          z-index: -1;
          transition: 0.5s;
        }

        .submit-button:hover::before,
        .submit-button:disabled::before {
          top: 0;
        }

        .submit-button:disabled {
          cursor: wait;
          opacity: 0.9;
        }

        .welcome-section {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          z-index: 3;
        }

        .welcome-section.signin {
          right: 0;
          text-align: right;
          padding: 0 40px 60px 150px;
        }

        .welcome-section.signin .slide-element {
          transform: translateX(0);
          transition: 0.7s ease;
          opacity: 1;
          filter: blur(0);
        }

        .welcome-section.signin .slide-element:nth-child(1) {
          transition-delay: 2s;
        }

        .welcome-section.signin .slide-element:nth-child(2) {
          transition-delay: 2.1s;
        }

        .auth-wrapper.toggled .welcome-section.signin .slide-element {
          transform: translateX(120%);
          opacity: 0;
          filter: blur(10px);
        }

        .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(1) {
          transition-delay: 0s;
        }

        .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(2) {
          transition-delay: 0.1s;
        }

        .welcome-section.signup {
          left: 0;
          text-align: left;
          padding: 0 150px 60px 38px;
          pointer-events: none;
        }

        .welcome-section.signup .slide-element {
          transform: translateX(-120%);
          transition: 0.7s ease;
          opacity: 0;
          filter: blur(10px);
        }

        .welcome-section.signup .slide-element:nth-child(1) {
          transition-delay: 0s;
        }

        .welcome-section.signup .slide-element:nth-child(2) {
          transition-delay: 0.1s;
        }

        .auth-wrapper.toggled .welcome-section.signup .slide-element {
          transform: translateX(0%);
          opacity: 1;
          filter: blur(0);
        }

        .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(1) {
          transition-delay: 1.7s;
        }

        .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(2) {
          transition-delay: 1.8s;
        }

        .welcome-section h2 {
          text-transform: uppercase;
          font-size: 42px;
          line-height: 1.2;
          font-weight: 900;
        }

        .welcome-section p {
          margin-top: 22px;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
          font-weight: 600;
        }

        .background-shape {
          position: absolute;
          right: 0;
          top: -5px;
          height: 620px;
          width: 900px;
          background: linear-gradient(45deg, #1a1a2e, #00d4ff);
          transform: rotate(10deg) skewY(40deg);
          transform-origin: bottom right;
          transition: 1.5s ease;
          transition-delay: 1.6s;
          z-index: 1;
        }

        .auth-wrapper.toggled .background-shape {
          transform: rotate(0deg) skewY(0deg);
          transition-delay: 0.5s;
        }

        .secondary-shape {
          position: absolute;
          left: 270px;
          top: 100%;
          height: 730px;
          width: 900px;
          background: #1a1a2e;
          border-top: 3px solid #00d4ff;
          transform: rotate(0deg) skewY(0deg);
          transform-origin: bottom left;
          transition: 1.5s ease;
          transition-delay: 0.5s;
          z-index: 2;
        }

        .auth-wrapper.toggled .secondary-shape {
          transform: rotate(-11deg) skewY(-41deg);
          transition-delay: 1.2s;
        }

        .loading-panel {
          text-align: center;
          align-items: center;
        }

        .loading-orb {
          width: 100px;
          height: 100px;
          border-radius: 32px;
          border: 1px solid rgba(0, 212, 255, 0.45);
          background: rgba(0, 212, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00d4ff;
          box-shadow: 0 0 32px rgba(0, 212, 255, 0.35);
          margin: 0 auto 24px;
        }

        .loading-orb svg,
        .spin-icon {
          animation: spin 1s linear infinite;
        }

        .loading-text {
          margin-top: 18px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 14px;
          line-height: 1.6;
        }

        .loading-line {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          margin-top: 28px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .loading-line span {
          display: block;
          width: 45%;
          height: 100%;
          border-radius: 999px;
          background: #00d4ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.9);
          animation: loadingLine 1s ease-in-out infinite;
        }

        .error-box {
          border: 1px solid rgba(255, 77, 109, 0.4);
          background: rgba(255, 77, 109, 0.12);
          color: #ffd0d8;
          border-radius: 14px;
          padding: 11px 13px;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12px;
          font-weight: 700;
          animation: errorShake 0.45s ease;
        }

        .auth-footer {
          position: absolute;
          bottom: 26px;
          z-index: 4;
          color: rgba(255, 255, 255, 0.18);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.35em;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loadingLine {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(230%);
          }
        }

        @keyframes errorShake {
          0%, 100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-8px);
          }
          40% {
            transform: translateX(8px);
          }
          60% {
            transform: translateX(-5px);
          }
          80% {
            transform: translateX(5px);
          }
        }

        @keyframes floatOne {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(35px, -25px);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-35px, 35px);
          }
        }

        @media (max-width: 768px) {
          .auth-wrapper {
            height: auto;
            min-height: 520px;
          }

          .credentials-panel,
          .welcome-section {
            width: 100%;
            position: relative;
          }

          .credentials-panel.signin,
          .credentials-panel.signup {
            padding: 40px 30px;
            left: 0;
            right: 0;
          }

          .credentials-panel.signup {
            display: none;
          }

          .auth-wrapper.toggled .credentials-panel.signin {
            display: none;
          }

          .auth-wrapper.toggled .credentials-panel.signup {
            display: flex;
          }

          .welcome-section,
          .background-shape,
          .secondary-shape {
            display: none;
          }

          .credentials-panel.signin .slide-element,
          .credentials-panel.signup .slide-element,
          .auth-wrapper.toggled .credentials-panel.signup .slide-element {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
          }

          .credentials-panel h2 {
            font-size: 34px;
          }

          .auth-footer {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}