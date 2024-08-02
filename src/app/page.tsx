"use client";

import { useBanner } from "@/bannerContext";
import { Banner } from "@/components/banner";

export default function Home() {
  const { banners } = useBanner();
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {banners.map((banner) => (
        <div className="h-96" key={banner.id}>
          <Banner
            id={banner.id}
            title={banner.title}
            description={banner.description}
            template={banner.template}
            image={banner.image}
            action={banner.action}
            isEditModal={true}
          />
        </div>
      ))}
    </div>
  );
}
