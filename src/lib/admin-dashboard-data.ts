/**
 * Geriye dönük uyumluluk: demo veriler demo dosyasından re-export edilir.
 * Gerçek dashboard verileri /api/admin/dashboard üzerinden gelir.
 */
export {
    websiteAnalytics,
    socialPlatforms,
    socialFollowerGrowth,
    topSocialPosts,
    formatDuration,
    type SocialPlatform,
    type TrendPoint,
} from "./admin-dashboard-demo-data";
