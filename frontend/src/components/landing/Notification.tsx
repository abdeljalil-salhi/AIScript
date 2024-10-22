// Dependencies
import { FC } from "react";

// Assets
import { AIScriptNotification } from "@/assets/landing";
import { notificationImages } from "@/constants";
// Constants

// Interfaces
interface NotificationProps {
  className?: string;
  title: string;
}

/**
 * Notification Component
 *
 * @interface NotificationProps
 * @returns {JSX.Element} - Notification Component
 * @exports Notification
 */
export const Notification: FC<NotificationProps> = ({
  title,
  className,
}): JSX.Element => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5`}
    >
      <img
        src={AIScriptNotification}
        className="rounded-xl"
        width={62}
        height={62}
        alt="AIScript Notification"
        draggable={false}
      />
      <div className="flex-1">
        <h6 className="mb-1 font-semibold text-base">{title}</h6>
        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            {notificationImages.map((image: string, index: number) => (
              <li
                key={index}
                className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden"
              >
                <img
                  src={image}
                  className="w-full"
                  width={20}
                  height={20}
                  alt="Notification"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
          <div className="body-2 text-n-13">1m ago</div>
        </div>
      </div>
    </div>
  );
};
