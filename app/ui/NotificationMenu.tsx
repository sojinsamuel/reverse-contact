"use client";

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { Badge } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUser } from "@clerk/nextjs";
const NotificationMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { isLoaded, isSignedIn, user } = useUser();
  // const { error, isLoading, user } = useUser();
  return (
    <div className="">
      {isLoaded && user && isSignedIn ? (
        <KnockProvider
          apiKey={"pk_test_ZKevzwmYo7ghzDTxUralAqCGiFoGcTKnD5IPxAN_FRg"}
          //@ts-ignore
          userId={user.id}
        >
          <KnockFeedProvider feedId={"32045c3d-8c54-4258-b858-30ca2d2faa73"}>
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
              />
            </>
          </KnockFeedProvider>
        </KnockProvider>
      ) : (
        <Icon
          className="text-default-500 ring-1 "
          icon="solar:bell-linear"
          width={22}
          color="black"
        />
      )}
    </div>
  );
};

export default NotificationMenu;
