import { cn } from '@/lib/utils'
import { Button } from './ui/button'

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
  return (
    <div
      className={cn('flex items-center justify-end space-x-2 py-4', className)}
    >
      <div className='flex-1 text-sm text-muted-foreground'>
        {currentPage} / {totalPages}
      </div>
      <div className='space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default TablePagination
