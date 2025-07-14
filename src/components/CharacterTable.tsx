import { flexRender, useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { Character } from '@/api/rickAndMorty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface Props {
  data: Character[];
  onRowClick: (id: number) => void;
}

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
  switch (status.toLowerCase()) {
    case 'alive':
      return `${baseClasses} bg-portal-green/20 text-portal-green border border-portal-green/30`;
    case 'dead':
      return `${baseClasses} bg-destructive/20 text-destructive border border-destructive/30`;
    default:
      return `${baseClasses} bg-muted/20 text-muted-foreground border border-muted/30`;
  }
};

const CharacterTable: React.FC<Props> = ({ data, onRowClick }) => {
  const columns: ColumnDef<Character>[] = [
    {
      header: 'Character',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-foreground">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.species}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <span className={getStatusBadge(row.original.status)}>
          {row.original.status}
        </span>
      ),
    },
    {
      header: 'Origin',
      accessorKey: 'origin.name',
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-muted-foreground">
          {row.original.origin.name}
        </div>
      ),
    },
    {
      header: 'Location',
      accessorKey: 'location.name',
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-muted-foreground">
          {row.original.location.name}
        </div>
      ),
    },
  ];

  const table = useReactTable({ 
    data, 
    columns, 
    getCoreRowModel: getCoreRowModel() 
  });

  return (
    <Card className="bg-card border-border/50">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border/50 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead 
                  key={header.id}
                  className="text-foreground font-semibold py-4"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onRowClick(row.original.id)}
              className="cursor-pointer border-border/30 hover:bg-muted/50 transition-all duration-200 hover:shadow-glow group"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell 
                  key={cell.id}
                  className="py-4 group-hover:text-foreground transition-colors"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CharacterTable;