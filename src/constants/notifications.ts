export interface Notification {
    id: string; // Identificador único
    message: string; // Mensagem da notificação
    link?: string; // Link opcional para mais detalhes
    from: string; // Nome ou origem da notificação
    date: string; // Data da notificação no formato ISO ou amigável
    viewed: boolean; // Indica se a notificação foi lida
  }
  
  export const notificationsData: Notification[] = [
    {
      id: "1",
      message: "Nova aula disponível: 'Introdução ao React'",
      link: "/lesson/introducao-ao-react",
      from: "Sistema",
      date: "2024-12-16T10:30:00Z",
      viewed: false,
    },
    {
      id: "2",
      message: "Projeto colaborativo atualizado: 'E-commerce em Node.js'",
      link: "/project/ecommerce-node",
      from: "Pedro Lucas Reis",
      date: "2024-12-15T15:45:00Z",
      viewed: false,
    },
    {
      id: "3",
      message: "Seu comentário foi respondido!",
      link: "/post/como-usar-tailwind-css",
      from: "João Silva",
      date: "2024-12-14T12:20:00Z",
      viewed: false,
    },
  ];
  