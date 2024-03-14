export const API_ROOT =
  process.env.NODE_ENV === 'production'
    ? `http://192.168.11.5/menu_register/api`
    : `http://192.168.11.5/menu_register/api`;
//  :    `http://192.168.11.5:8000/api`;
