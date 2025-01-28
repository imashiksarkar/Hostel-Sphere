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
import useFetchMealsReq from '@/hooks/useFetchMealsReq'
import { MealsRequest } from '@/types/Meal'

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

export const useColumns = (): ColumnDef<MealsRequest>[] => {
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
      accessorKey: 'status',
      header: () => <div className='text-center'>Meal Status</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            <Badge className='uppercase'>{row.getValue('status')}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center'>Action</div>,
      cell: ({ cell }) => {
        const currentCell = cell.row.original
        const isServed = currentCell.status === 'delivered'

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
  const { data: res = [], isLoading } = useFetchMealsReq()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns = useColumns()

  const table = useReactTable({
    data: res,
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
      {!isLoading && (
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
      )}
    </div>
  )
}

export default ServeMeals
