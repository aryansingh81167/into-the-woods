
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { List, UserCheck, UserX } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold font-headline text-primary mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products">
            <Card className="hover:bg-muted transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <List /> Product Moderation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Review and approve new product submissions.</p>
            </CardContent>
            </Card>
        </Link>
         <Link href="/admin/vendors">
            <Card className="hover:bg-muted transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <UserCheck /> Vendor Management
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Approve new vendors and manage existing ones.</p>
            </CardContent>
            </Card>
        </Link>
      </div>
    </div>
  );
}
