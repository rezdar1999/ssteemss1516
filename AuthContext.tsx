import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  username: string;
}

interface UserWithPassword {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  users: UserWithPassword[];
  login: (username: string, password: string) => void;
  logout: () => void;
  addUser: (username: string, password: string) => void;
  removeUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultUsers = [
  { username: 'rezdar', password: '1234' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [users, setUsers] = useState<UserWithPassword[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });
  
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userObj = { username: foundUser.username };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      navigate('/send');
      toast.success('تم تسجيل الدخول بنجاح');
    } else {
      toast.error('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const addUser = (username: string, password: string) => {
    if (users.some(u => u.username === username)) {
      toast.error('اسم المستخدم موجود بالفعل');
      return;
    }
    const newUsers = [...users, { username, password }];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    toast.success('تم إضافة المستخدم بنجاح');
  };

  const removeUser = (username: string) => {
    if (username === 'rezdar') {
      toast.error('لا يمكن حذف المستخدم الرئيسي');
      return;
    }
    const newUsers = users.filter(u => u.username !== username);
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    toast.success('تم حذف المستخدم بنجاح');
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, addUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}