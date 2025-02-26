import TablePagination from '@/components/TablePagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useFetchPaymentsHistory, {
  IPaymentHistoryResponse,
} from '@/hooks/useFetchPaymentsHistory'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

const useColumns = (): ColumnDef<IPaymentHistoryResponse['data'][number]>[] => {
  return [
    {
      accessorKey: 'userId',
      header: () => <div className='text-center'>User Id</div>,
      cell: ({ row }) => (
        <div className='capitalize text-center'>{row.getValue('userId')}</div>
      ),
    },
    {
      accessorKey: 'plan',
      header: () => {
        return <div className='text-center'>Plan</div>
      },
      cell: ({ row }) => (
        <div className='lowercase text-center'>{row.getValue('plan')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: () => <div className='text-center'>Price</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            ${((row.getValue('price') as number) / 100).toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: () => <div className='text-center'>Payment Method</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('paymentMethod')}
          </div>
        )
      },
    },
    {
      accessorKey: 'expiresAt',
      header: () => <div className='text-center'>Expires At</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('expiresAt')}
          </div>
        )
      },
    },
  ]
}

const PaymentHistory = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const resultPerPage = 10

  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSkip] = useState((currentPage - 1) * resultPerPage)

  const { data: res, isLoading } = useFetchPaymentsHistory()

  const [totalPages] = useState(
    Math.ceil((res?.length || 0) / resultPerPage) || 1
  )

  const columns = useColumns()

  const table = useReactTable({
    data: res || [],
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <h1 className='text-2xl font-bold'>Payment History</h1>
      </div>
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

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(tablePage) => {
          setCurrentPage(tablePage)
          setSkip((tablePage - 1) * resultPerPage)
        }}
      />
    </div>
  )
}

export default PaymentHistory
