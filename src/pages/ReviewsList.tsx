import TablePagination from '@/components/TablePagination'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const data: Review[] = [
  {
    id: 'm5gr84i9',
    title: 'Chicken',
    likesCount: 150,
    reviewsCount: 1023,
  },
  {
    id: 'm5gr84ia9',
    title: 'Chicken',
    likesCount: 150,
    reviewsCount: 1023,
  },
]

export type Review = {
  id: string
  title: string
  likesCount: number
  reviewsCount: number
}

const useColumns = (): ColumnDef<Review>[] => {
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
      accessorKey: 'likesCount',
      header: () => <div className='text-center'>Number Of Likes</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('likesCount')}
          </div>
        )
      },
    },
    {
      accessorKey: 'reviewsCount',
      header: () => <div className='text-center'>Number Of Reviews</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('reviewsCount')}
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center'>Action</div>,
      cell: ({ cell }) => {
        const currentCell = cell.row.original

        return (
          <div className='text-center font-medium'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='space-y-2'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to={'./'}>View Meal</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Delete Meal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

const ReviewsList = () => {
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

export default ReviewsList
