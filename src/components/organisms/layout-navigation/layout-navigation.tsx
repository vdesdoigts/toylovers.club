"use client";

import { InterviewCounter } from "@/components/organisms/interview-counter/interview-counter";
import { NavigationLinks } from "@/components/organisms/navigation-links/navigation-links";
import type { Article } from "@/lib/mdx";
import { useViewTransitions } from "@/lib/use-view-transitions";

interface LayoutNavigationProps {
  articles: Article[];
}

export function LayoutNavigation({ articles }: LayoutNavigationProps) {
  const { transitionTo } = useViewTransitions();

  return (
    <nav className="fixed w-full flex flex-row items-center justify-between top-0 z-50 h-[54px] bg-black view-transition-nav">
      <div className="h-full w-full flex flex-row items-center text-white">
        <button
          onClick={() => transitionTo("/")}
          className="h-full w-[60px] md:w-[100px] grow-0 flex flex-row flex-shrink-0 justify-center items-center border-r border-[#212128] cursor-pointer hover:bg-gray-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22.76 19.62"
            width={80}
            height={24}
          >
            <path
              d="M14.75 15.63 16.94 0H.53L0 3.82h5.6l-2.22 15.8H7.7l2.22-15.8h2.16l-2.2 15.8H22.2l.56-3.99h-8.01z"
              fill="#fff"
            />
          </svg>
        </button>
        {/* <div className="h-full w-[54px] flex justify-center items-center cursor-pointer">
          <Menu className="w-6 h-6 text-white" />
        </div> */}
        <div className="pl-4">
          <InterviewCounter articles={articles} />
        </div>
      </div>
      <div>
        <NavigationLinks articles={articles} />
      </div>
    </nav>
  );
}
