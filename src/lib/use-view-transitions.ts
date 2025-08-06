"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useViewTransitions() {
  const router = useRouter();

  const transitionTo = useCallback(
    (url: string) => {
      console.log("🎬 Attempting to transition to:", url);

      // Check if the browser supports the View Transition API
      if (!document.startViewTransition) {
        console.log(
          "❌ Browser doesn't support View Transitions, using fallback"
        );
        router.push(url);
        return;
      }

      console.log("✅ Starting view transition");

      // Start the view transition
      const transition = document.startViewTransition(() => {
        console.log("🚀 Executing navigation callback");
        // Navigate to the new page using router.push
        router.push(url);
      });

      // Handle transition events
      transition.ready
        .then(() => {
          console.log("🎭 View transition ready");
        })
        .catch((error) => {
          console.log("⚠️ View transition ready failed:", error);
        });

      transition.finished
        .then(() => {
          console.log("✨ View transition finished");
        })
        .catch((error) => {
          console.log("⚠️ View transition finished with error:", error);
        });
    },
    [router]
  );

  return { transitionTo };
}
