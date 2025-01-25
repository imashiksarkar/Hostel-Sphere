import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
  totalPages: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const TablePagination = ({
  className,
  totalPages,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    onPageChange(page)
  }, [page, onPageChange])

  return (
    <div
      className={cn('flex items-center justify-end space-x-2 py-4', className)}
    >
      <div className='flex-1 text-sm text-muted-foreground'>
        {page} / {totalPages}
      </div>
      <div className='space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage((prev) => (prev <= 1 ? 1 : prev - 1))}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setPage((prev) => (prev >= totalPages ? totalPages : prev + 1))
          }
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default TablePagination
