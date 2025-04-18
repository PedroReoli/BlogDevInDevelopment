"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { supabase } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"
import NotificationItem from "./NotificationItem"

interface Notification {
  id: string
  user_id: string
  content: string
  link: string
  read: boolean
  created_at: string
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isAuthenticated || !user) return

      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error

        if (data) {
          setNotifications(data as Notification[])
          setUnreadCount(data.filter((n: Notification) => !n.read).length)
        }
      } catch (err) {
        console.error("Erro ao buscar notificações:", err)
      }
    }

    fetchNotifications()

    // Configurar subscription para notificações em tempo real
    if (isAuthenticated && user) {
      const subscription = supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification = payload.new as Notification
            setNotifications((prev) => [newNotification, ...prev])
            setUnreadCount((prev) => prev + 1)
          },
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [isAuthenticated, user])

  const markAsRead = async (id: string) => {
    if (!isAuthenticated || !user) return

    try {
      await supabase.from("notifications").update({ read: true }).eq("id", id)

      setNotifications((prev) =>
        prev.map((n) => {
          if (n.id === id) {
            return { ...n, read: true }
          }
          return n
        }),
      )

      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error("Erro ao marcar notificação como lida:", err)
    }
  }

  const markAllAsRead = async () => {
    if (!isAuthenticated || !user || notifications.length === 0) return

    try {
      await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false)

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error("Erro ao marcar todas notificações como lidas:", err)
    }
  }

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        aria-label="Notificações"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true"></div>

          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">Notificações</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Marcar todas como lidas
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">Nenhuma notificação</div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationSystem
