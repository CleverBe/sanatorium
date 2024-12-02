import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UsersPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Administrar usuarios</h1>

      <div className="mt-4 flex justify-between">
        <Input type="text" placeholder="Buscar..." className="max-w-xs" />

        <Button>Agregar</Button>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
