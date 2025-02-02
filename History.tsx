import { useTransactions } from '../contexts/TransactionContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function History() {
  const { transactions } = useTransactions();

  return (
    <Card className="max-w-6xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">سجل الحوالات</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">رقم الحوالة</TableHead>
              <TableHead className="text-right">المرسل</TableHead>
              <TableHead className="text-right">المستلم</TableHead>
              <TableHead className="text-right">المبلغ</TableHead>
              <TableHead className="text-right">الوجهة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.code}>
                <TableCell className="text-right">{transaction.code}</TableCell>
                <TableCell className="text-right">{transaction.senderName}</TableCell>
                <TableCell className="text-right">{transaction.receiverName}</TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
                <TableCell className="text-right">{transaction.destination}</TableCell>
                <TableCell className="text-right">
                  {transaction.received ? 'تم الاستلام' : 'قيد الانتظار'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}