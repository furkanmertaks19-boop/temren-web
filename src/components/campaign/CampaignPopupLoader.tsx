"use client";

import dynamic from "next/dynamic";

const CampaignPopup = dynamic(() => import("@/components/campaign/CampaignPopup"), {
  ssr: false,
});

export default function CampaignPopupLoader() {
  return <CampaignPopup />;
}
