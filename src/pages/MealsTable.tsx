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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const data: Meal[] = [
  {
    id: 'm5gr84i9',
    title: 'Chicken',
    distributorName: 'Ashik',
    likesCount: 150,
    rating: 4.5,
    reviewsCount: 1023,
  },
  {
    id: 'm5gr84ia9',
    title: 'Chicken',
    distributorName: 'Ashik',
    likesCount: 150,
    rating: 4.5,
    reviewsCount: 1023,
  },
]

export type Meal = {
  id: string
  title: string
  likesCount: number
  reviewsCount: number
  rating: number
  distributorName: string
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
      accessorKey: 'distributorName',
      header: ({ column }) => {
        return (
          <div className='text-center'>
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Distributor
              <ArrowUpDown />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase text-center'>
          {row.getValue('distributorName')}
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
                  <Link to={'./'}>View</Link>
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

  const [sort, setSort] = useState({
    title: 'Sort',
    value: null as string | null,
  })

  useEffect(() => {
    console.log(sort)
  }, [sort])

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

export default MealsTable
