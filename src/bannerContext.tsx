"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Banner = {
  id: number;
  title: string;
  description: string;
  template: string;
  image: string;
  action: string;
};

type BannerContextType = {
  banners: Banner[];
  updateBanner: (id: number, updateData: Partial<Banner>) => void;
};

const BannerContext = createContext<BannerContextType>({
  banners: [],
  updateBanner: () => {},
});

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "Lorem Ipsum",
      template: "/templates/1.jpg",
      image:
        "https://images.unsplash.com/photo-1719328554830-29c0553bb5dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mzg5MTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzY2NTZ8&ixlib=rb-4.0.3&q=80&w=400",
      action: "Learn More",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description: "Lorem Ipsum",
      template: "/templates/2.jpg",
      image:
        "https://images.unsplash.com/photo-1719952167476-d229531f3dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mzg5MTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI0MzI5Nzh8&ixlib=rb-4.0.3&q=80&w=400",
      action: "Learn More",
    },
  ]);

  const updateBanner = (id: number, updateData: Partial<Banner>) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, ...updateData } : banner
      )
    );
  };

  return (
    <BannerContext.Provider value={{ banners, updateBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
