"use client"

import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Notification {
  id: string
  content: string
  link: string
  read: boolean
  created_at: string
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Link
      to={notification.link}
      className={`block p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
      }`}
      onClick={handleClick}
    >
      <div className="text-sm">{notification.content}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeAgo}</div>
    </Link>
  )
}

export default NotificationItem
