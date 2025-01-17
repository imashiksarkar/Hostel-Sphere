import { categories } from '@/constants'
import { fetchCategories } from '@/services/categoryService'
import { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useFetchCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
    initialData: categories,
  })
}

export default useFetchCategories
