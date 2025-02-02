import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, UserPlus, Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Users() {
  const { addUser, removeUser, users } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(username, password);
    setUsername('');
    setPassword('');
  };

  const handleDelete = (username: string) => {
    removeUser(username);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 space-y-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary text-center">إضافة مستخدم جديد</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-right block">اسم المستخدم</Label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right"
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">كلمة المرور</Label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
                placeholder="أدخل كلمة المرور"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة مستخدم
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <UsersIcon className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary text-center">قائمة المستخدمين</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
              <div key={user.username} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.username)}
                  className="hover:bg-red-600"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg">{user.username}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}