/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getScreenshotURL } from "@/lib/screenshot";
import { siteConfig } from "@/config/site";

/**
 * @name Screenshot Template
 * @description Take a screenshot of a website
 */
export function GET() {
  const width = 1200;
  const height = 630;
  const screenshot = getScreenshotURL({
    url: `${siteConfig.url.base}`,
    width: 1200 - 80 - 80,
    height: 630 - 80,
  });
  return new ImageResponse(
    (
      <div tw="flex w-full h-full pt-[80px] px-[80px]">
        <img
          tw="w-full h-full rounded-t-2xl shadow-2xl"
          style={{ background: "#f0f0f0" }}
          src={screenshot}
          alt=""
        />
      </div>
    ),
    {
      width,
      height,
      headers: {
        // 'Cache-Control': 'public, max-age=3600, immutable',
      },
    },
  );
}
