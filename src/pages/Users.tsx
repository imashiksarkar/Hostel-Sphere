import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import UsersTable from '@/components/UsersTable'
import useDebounceSearch from '@/hooks/useDebounceSearch'
import useFetchUsers from '@/hooks/useFetchUsers'
import User from '@/types/User'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const useColumns = (): ColumnDef<User>[] => {
  const onToggleAdmin = useCallback(
    (userId: string) => () => {
      console.log(userId)
    },
    []
  )

  return [
    {
      accessorKey: 'name',
      header: () => <div className='text-center'>User Name</div>,
      cell: ({ row }) => (
        <div className='capitalize text-center'>{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: () => <div className='text-center'>Email</div>,
      cell: ({ row }) => (
        <div className='lowercase text-center'>{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'subscription',
      header: () => <div className='text-center'>Subscription Badge</div>,
      cell: ({ row }) => {
        return (
          <div className='text-center font-medium'>
            <Badge className='uppercase'>
              {row.getValue('subscription') || 'Bronze'}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'role',
      header: () => <div className='text-center'>Action</div>,
      cell: ({ cell }) => {
        const isAdmin = cell.row.original.role === 'admin'
        const userId = cell.row.original._id
        return (
          <div className='text-center font-medium'>
            <Button
              onClick={onToggleAdmin(userId)}
              disabled={isAdmin}
              variant='outline'
            >
              {isAdmin ? 'Admin' : 'Make Admin'}
            </Button>
          </div>
        )
      },
    },
  ]
}

const Users = () => {
  const { data, isLoading } = useFetchUsers()
  const cells = data?.data

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns = useColumns()

  const table = useReactTable({
    data: cells,
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className='users-page'>
      <div className='con py-8'>
        <h4 className='sr-only'>users list</h4>
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
        {!isLoading && <UsersTable table={table} columns={columns} />}
      </div>
    </section>
  )
}

export default Users
