import { useState } from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Receive() {
  const { getTransaction, markAsReceived } = useTransactions();
  const [searchCode, setSearchCode] = useState('');
  const [transaction, setTransaction] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getTransaction(Number(searchCode));
    setTransaction(found);
  };

  const handleReceive = () => {
    if (transaction) {
      markAsReceived(transaction.code);
      setTransaction(null);
      setSearchCode('');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">استلام حوالة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex space-x-2">
            <Button type="submit">بحث</Button>
            <Input
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="ادخل رقم الحوالة"
              className="text-right"
            />
          </div>
        </form>

        {transaction && (
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>اسم المرسل</Label>
                <div className="mt-1">{transaction.senderName}</div>
              </div>
              <div>
                <Label>رقم هاتف المرسل</Label>
                <div className="mt-1">{transaction.senderPhone}</div>
              </div>
              <div>
                <Label>اسم المستلم</Label>
                <div className="mt-1">{transaction.receiverName}</div>
              </div>
              <div>
                <Label>رقم هاتف المستلم</Label>
                <div className="mt-1">{transaction.receiverPhone}</div>
              </div>
              <div>
                <Label>الوجهة</Label>
                <div className="mt-1">{transaction.destination}</div>
              </div>
              <div>
                <Label>المبلغ</Label>
                <div className="mt-1">{transaction.amount}</div>
              </div>
              <div>
                <Label>حالة العمولة</Label>
                <div className="mt-1">
                  {transaction.commissionPaid ? 'تم الدفع' : 'لم يتم الدفع'}
                </div>
              </div>
            </div>

            {!transaction.received && (
              <Button onClick={handleReceive} className="w-full">
                تأكيد الاستلام
              </Button>
            )}

            {transaction.received && (
              <div className="text-center text-green-600 font-bold">
                تم استلام هذه الحوالة
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}