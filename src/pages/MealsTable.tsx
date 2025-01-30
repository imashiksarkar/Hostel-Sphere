import TablePagination from '@/components/TablePagination'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import useFetchMeals from '@/hooks/useFetchMeals'
import { Meal } from '@/types'

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
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const useColumns = (): ColumnDef<Meal>[] => {
  return [
    {
      accessorKey: 'title',
      header: () => <div className='text-center'>Meal Title</div>,
      cell: ({ row }) => (
        <div className='capitalize text-center'>{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'distributor',
      header: () => {
        return <div className='text-center'>Distributor</div>
      },
      cell: ({ row }) => (
        <div className='lowercase text-center'>
          {row.getValue('distributor')}
        </div>
      ),
    },
    {
      accessorKey: 'rating',
      header: () => <div className='text-center'>Rating</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('rating')}
          </div>
        )
      },
    },
    {
      accessorKey: 'likes',
      header: () => <div className='text-center'>Number Of Likes</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('likes') || 0}
          </div>
        )
      },
    },
    {
      accessorKey: 'reviews',
      header: () => <div className='text-center'>Number Of Reviews</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            {row.getValue('reviews') || 0}
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
                  <Link to={`/meals/${currentCell._id}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

const sortingFields = [
  {
    id: 1,
    title: 'Likes - Asc',
    value: 'likes',
  },
  {
    id: 2,
    title: 'Likes - Desc',
    value: '-likes',
  },
  {
    id: 3,
    title: 'Reviews - Asc',
    value: 'reviews',
  },
  {
    id: 4,
    title: 'Reviews - Desc',
    value: '-reviews',
  },
]

const MealsTable = () => {
  const [sort, setSort] = useState({
    title: 'Sort',
    value: 'likes',
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const resultPerPage = 10

  const [currentPage, setCurrentPage] = useState(1)
  const [skip, setSkip] = useState((currentPage - 1) * resultPerPage)

  const { data: res, isLoading } = useFetchMeals('', sort.value, skip)

  const [totalPages] = useState(
    Math.ceil((res?.totalDocs || 0) / resultPerPage) || 1
  )

  const columns = useColumns()

  const table = useReactTable({
    data: res?.meals || [],
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
      <div className='flex items-center py-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              {sort.title} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {sortingFields.map((field) => (
              <DropdownMenuCheckboxItem
                key={field.id}
                className='capitalize'
                checked={sort.value === field.value}
                onCheckedChange={() =>
                  setSort({ title: field.title, value: field.value })
                }
              >
                {field.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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

export default MealsTable
