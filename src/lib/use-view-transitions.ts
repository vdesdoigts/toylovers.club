"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export function useViewTransitions() {
  const router = useRouter();
  const isTransitioning = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const queuedUrl = useRef<string | null>(null);

  const preloadRoute = useCallback(
    (url: string) => {
      // Preload the route using Next.js router prefetch
      router.prefetch(url);
    },
    [router]
  );

  // Process queued navigation after transition completes
  const processQueue = useCallback(() => {
    if (queuedUrl.current && !isTransitioning.current) {
      const nextUrl = queuedUrl.current;
      queuedUrl.current = null;
      console.log("🎯 Processing queued URL:", nextUrl);
      // Use setTimeout to avoid recursive calls within the same execution context
      setTimeout(() => {
        // Call transitionTo directly since we have access to it within the same scope
        if (!document.startViewTransition) {
          router.push(nextUrl);
          return;
        }
        // For simplicity, just use router.push for queued items to avoid complexity
        router.push(nextUrl);
      }, 10);
    }
  }, [router]);

  const transitionTo = useCallback(
    async (url: string) => {
      // Handle rapid clicking by queuing the next transition
      if (isTransitioning.current) {
        console.log("⏳ Transition in progress, queuing new URL:", url);
        queuedUrl.current = url;
        // Preload the queued route while waiting
        router.prefetch(url);
        return;
      }

      console.log("🎬 Attempting to transition to:", url);

      // Check if the browser supports the View Transition API
      if (!document.startViewTransition) {
        console.log(
          "❌ Browser doesn't support View Transitions, using fallback"
        );
        router.push(url);
        return;
      }

      isTransitioning.current = true;
      setIsLoading(true);

      try {
        // Preload the target route first
        console.log("📦 Preloading route...");
        router.prefetch(url);

        // Give a slightly longer delay for prefetching to complete
        // This helps ensure the target page resources are cached
        await new Promise((resolve) => setTimeout(resolve, 100));

        console.log("✅ Starting view transition");

        // Start the view transition
        const transition = document.startViewTransition(async () => {
          console.log("🚀 Executing navigation callback");

          // Add a small delay to ensure the prefetched content is ready
          await new Promise((resolve) => setTimeout(resolve, 20));

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

        // Add a timeout to prevent hanging transitions
        const transitionTimeout = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Transition timeout")), 2000);
        });

        await Promise.race([
          transition.finished
            .then(() => {
              console.log("✨ View transition finished successfully");
              // Reset transition flag immediately when transition completes
              isTransitioning.current = false;
              setIsLoading(false);
              processQueue();
            })
            .catch((error) => {
              console.log("⚠️ View transition finished with error:", error);
              // Reset transition flag even on error
              isTransitioning.current = false;
              setIsLoading(false);
              processQueue();
            }),
          transitionTimeout,
        ]).catch((error) => {
          if (error.message === "Transition timeout") {
            console.log("⏰ Transition timed out, continuing anyway");
          }
          // Reset transition flag on timeout too
          isTransitioning.current = false;
          setIsLoading(false);
          processQueue();
        });
      } catch (error) {
        console.log("❌ Error during transition setup:", error);
        // Reset transition flag immediately on error
        isTransitioning.current = false;
        setIsLoading(false);
        processQueue();
        // Fallback to regular navigation
        router.push(url);
      } finally {
        // Safety net: reset transition flag after a short delay if not already reset
        // This handles edge cases where the transition events don't fire properly
        setTimeout(() => {
          if (isTransitioning.current) {
            console.log(
              "🔒 Safety reset: transition flag still locked, resetting..."
            );
            isTransitioning.current = false;
            setIsLoading(false);
            processQueue();
          }
        }, 200); // Much shorter delay, just as a safety net
      }
    },
    [router, processQueue]
  );

  return { transitionTo, preloadRoute, isLoading };
}
