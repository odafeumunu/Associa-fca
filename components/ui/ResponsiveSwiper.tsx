"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface ResponsiveSwiperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  spaceBetween?: number;
  showNavigation?: boolean;
  autoplayDelay?: number;
}

export default function ResponsiveSwiper<T>({
  items,
  renderItem,
  spaceBetween = 20,
  showNavigation = true,
  autoplayDelay = 3000,
}: ResponsiveSwiperProps<T>) {
  return (
    <Swiper
      modules={[ Autoplay]}
      spaceBetween={spaceBetween}
      navigation={showNavigation}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
      loop
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-10">
      {items.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
