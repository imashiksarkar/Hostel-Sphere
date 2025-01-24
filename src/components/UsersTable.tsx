import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from './ui/badge'
import { useCallback, useEffect, useState } from 'react'
import useDebounceSearch from '@/hooks/useDebounceSearch'

const data: User[] = [
  {
    id: 'm5gr84i9',
    username: 'johndoe',
    email: '9Ht6R@example.com',
    badge: 'silver',
    role: 'admin',
  },
  {
    id: '4hgj4i9',
    username: 'johndoe',
    email: '9Ht6R@example.com',
    badge: 'gold',
    role: 'user',
  },
]

export type User = {
  id: string
  username: string
  email: string
  badge: 'silver' | 'gold' | 'platinum'
  role: 'admin' | 'user'
}

export const useColumns = (): ColumnDef<User>[] => {
  const onToggleAdmin = useCallback(
    (userId: string) => () => {
      console.log(userId)
    },
    []
  )

  return [
    {
      accessorKey: 'username',
      header: 'User Name',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: () => <div className='text-center'>Action</div>,
      cell: ({ cell }) => {
        const isAdmin = cell.row.original.role === 'admin'
        const userId = cell.row.original.id
        return (
          <div className='text-center font-medium'>
            <Button
              onClick={onToggleAdmin(userId)}
              disabled={isAdmin}
              variant='ghost'
            >
              {isAdmin ? 'Admin' : 'Make Admin'}
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: 'badge',
      header: () => <div className='text-right'>Subscription Badge</div>,
      cell: ({ row }) => {
        return (
          <div className='text-right font-medium'>
            <Badge className='uppercase'>{row.getValue('badge')}</Badge>
          </div>
        )
      },
    },
  ]
}

const UsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns = useColumns()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const [debouncedSearch, search, setSearch] = useDebounceSearch('', 1000)

  useEffect(() => {
    console.log(debouncedSearch)
  }, [debouncedSearch])

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by username and email...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UsersTable
