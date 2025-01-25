import TablePagination from '@/components/TablePagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

const data: Meal[] = [
  {
    id: 'm5gr84i9',
    title: 'Chicken',
    userName: 'John Doe',
    userEmail: 'ashik@aa.com',
    mealStatus: 'Available',
  },
  {
    id: 'm5gr84ia9',
    title: 'Chicken',
    userName: 'John Doe',
    userEmail: 'ashik@aa.com',
    mealStatus: 'Delivered',
  },
]

export type Meal = {
  id: string
  title: string
  userName: string
  userEmail: string
  mealStatus: 'Available' | 'Delivered'
}

export const useColumns = (): ColumnDef<Meal>[] => {
  // const onToggleAdmin = useCallback(
  //   (userId: string) => () => {
  //     console.log(userId)
  //   },
  //   []
  // )

  return [
    {
      accessorKey: 'title',
      header: () => <div className='text-center'>Meal Title</div>,
      cell: ({ row }) => (
        <div className='capitalize text-center'>{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'userEmail',
      header: () => <div className='text-center'>User Email</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('userEmail')}
          </div>
        )
      },
    },
    {
      accessorKey: 'userName',
      header: () => <div className='text-center'>User Name</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('userName')}
          </div>
        )
      },
    },
    {
      accessorKey: 'mealStatus',
      header: () => <div className='text-center'>Meal Status</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            <Badge>{row.getValue('mealStatus')}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center'>Action</div>,
      cell: ({ cell }) => {
        const currentCell = cell.row.original
        const isServed = currentCell.mealStatus === 'Delivered'

        return (
          <div className='text-center font-medium'>
            <Button disabled={isServed} variant={'outline'}>
              Serve{isServed && 'd'}
            </Button>
          </div>
        )
      },
    },
  ]
}

const ServeMeals = () => {
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

  return (
    <div className='w-full'>
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
      <TablePagination
        totalPages={5}
        onPageChange={(tablePage) => console.log(tablePage)}
      />
    </div>
  )
}

export default ServeMeals
