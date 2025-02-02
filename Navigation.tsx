import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Send, ReceiptText, History, Users } from 'lucide-react';

export default function Navigation() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <Button
            variant={isActive('/send') ? 'secondary' : 'ghost'}
            className="hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            asChild
          >
            <Link to="/send">
              <Send className="w-4 h-4" />
              <span>إرسال</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/receive') ? 'secondary' : 'ghost'}
            className="hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            asChild
          >
            <Link to="/receive">
              <ReceiptText className="w-4 h-4" />
              <span>استلام</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/history') ? 'secondary' : 'ghost'}
            className="hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            asChild
          >
            <Link to="/history">
              <History className="w-4 h-4" />
              <span>السجل</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/users') ? 'secondary' : 'ghost'}
            className="hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            asChild
          >
            <Link to="/users">
              <Users className="w-4 h-4" />
              <span>المستخدمين</span>
            </Link>
          </Button>
        </div>
        <Button 
          variant="destructive" 
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </nav>
  );
}