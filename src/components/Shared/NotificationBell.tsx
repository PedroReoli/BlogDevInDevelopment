import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { notificationsData } from "@/constants/notifications";

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [isOpen, setIsOpen] = useState(false);
  const hasUnread = notifications.some((notification) => !notification.viewed);

  const handleBellClick = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, viewed: true }))
      );
    }
  };

  const unreadCount = notifications.filter((n) => !n.viewed).length;

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className={`relative hover:text-[var(--accent-color)] transition ${
          hasUnread ? "animate-bounce" : ""
        }`}
      >
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-[var(--text-secondary)]">Nenhuma notificação</div>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li key={n.id} className="p-4 border-b border-[var(--border-color)]">
                  <div className="flex justify-between">
                    <span className="font-bold">{n.from}</span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {new Date(n.date).toLocaleString()}
                    </span>
                  </div>
                  <p>{n.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
