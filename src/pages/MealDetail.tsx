import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import useFetchMeal from '@/hooks/useFetchMeal'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FaThumbsUp } from 'react-icons/fa'

const FoodDetail = () => {
  const { user, loading } = useAuth()
  const { mealId } = useParams()
  const navigate = useNavigate()

  const { data: meal, isFetching } = useFetchMeal(mealId as string)

  useEffect(() => {
    console.log(meal)
  }, [meal])

  const [isAuthor, setIsAuthor] = useState<boolean | null>(null)

  user
    ?.getIdTokenResult(true)
    .then((res) => setIsAuthor(res.claims.role === 'admin'))

  const handleMakeRequest = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createFoodRequestMutation.mutate(null, {
      onSuccess: () => {
        navigate(`/foods/${mealId}`)
      },
    })
  }

  // const { data: numLikes } = useQuery({
  //   queryKey: ['food-likes', mealId],
  //   queryFn: () => api.get(`/likes/${mealId}`).then((res) => res.data.data),
  // })

  return (
    <section className='food-detail'>
      <div className='con py-12'>
        {isFetching || loading ? (
          <div className='h-screen w-full flex gap-7 flex-col justify-center items-center'>
            <p>Fetching Food...</p>
          </div>
        ) : (
          meal && (
            <div>
              <div className='meal grid gird-cols-1 sm:grid-cols-[2fr,_3fr] gap-8'>
                <div className='banner'>
                  <figure className='w-full aspect-square overflow-hidden'>
                    <img
                      className='w-full h-full object-cover'
                      src={meal.image}
                      alt={meal.title}
                      loading='lazy'
                    />
                  </figure>
                </div>
                <div className='details flex flex-col gap-4'>
                  <h1 className='text-4xl font-bold'>{meal.title}</h1>
                  <Badge className='w-max capitalize text-md'>
                    {meal.category}
                  </Badge>
                  <p>{meal.description}</p>
                  <p>Distributor: {meal.distributor.name}</p>
                  <span className='capitalize'>
                    Ingredients:
                    <ul className='list-disc list-inside'>
                      {meal.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                  </span>
                  <p className='capitalize'>Rating: {meal.rating}</p>
                  <p className='capitalize'>
                    Posted At: {new Date(meal.createdAt).toLocaleString()}
                  </p>
                  <div className='flex items-center gap-4'>
                    <Button
                      size={'icon'}
                      variant={'link'}
                      className={cn(
                        'p-2 w-max h-max [&_svg]:size-auto [&:hover>_svg]:opacity-60',
                        !meal?.isLikedByUser &&
                          '[&:hover>_svg]:opacity-100 [&:hover>_svg]:text-green-500'
                      )}
                    >
                      <FaThumbsUp
                        className={cn(
                          'text-3xl transition-[opacity] duration-200 text-gray-500 dark:text-green-50',
                          meal?.isLikedByUser && 'text-green-500',
                          meal?.isLikedByUser && 'dark:text-green-500'
                        )}
                      />
                    </Button>
                    <p className='w-max capitalize rounded-md mt-3 text-xl'>
                      {meal.numLikes || (meal?.isLikedByUser ? 1 : 0)} Likes
                    </p>
                  </div>
                  <div className='flex items-center gap-4'>
                    {isAuthor === false && meal.status === 'available' && (
                      <Button onClick={handleMakeRequest} className='w-max'>
                        Request Food
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* reviews */}
              <div className='reviews mt-8'>
                <h2 className='text-2xl font-bold text-center'>Reviews</h2>
                <ul className='mt-4'>
                  <li className='bg-gray-400 dark:bg-gray-800 p-2 rounded-md'>
                    <span className='flex items-center justify-between gap-4'>
                      <h5 className='text-xl font-semibold'>Alex.</h5>
                      <Badge className='w-max'>4.3</Badge>
                    </span>
                    <p className='ms-2'>Awesome Meal.</p>
                  </li>
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default FoodDetail
