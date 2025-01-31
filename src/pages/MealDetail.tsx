import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import useFetchMeal from '@/hooks/useFetchMeal'
import api from '@/services/axiosService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const FoodDetail = () => {
  const { user, loading } = useAuth()
  const { mealId } = useParams()
  const navigate = useNavigate()

  const { data: meal, isFetching } = useFetchMeal(mealId as string)

  const [isAuthor, setIsAuthor] = useState(false)

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

  const { data: numLikes } = useQuery({
    queryKey: ['food-likes', mealId],
    queryFn: () => api.get(`/likes/${mealId}`).then((res) => res.data.data),
  })

  return (
    <section className='food-detail'>
      <div className='con py-12 grid gird-cols-1 sm:grid-cols-[2fr,_3fr] gap-4'>
        {isFetching || loading ? (
          <div className='h-screen w-full flex gap-7 flex-col justify-center items-center'>
            <p>Fetching Food...</p>
          </div>
        ) : (
          meal && (
            <>
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
                <p>{meal.description}</p>
                <p>Donated By: {meal.distributor}</p>
                <p className='capitalize'>Category: {meal.category}</p>
                <p className='p-2 bg-red-600/15 w-max capitalize rounded-md'>
                  {meal.status}
                </p>
                <p className='p-2 bg-red-600/15 w-max capitalize rounded-md'>
                  Likes {numLikes}
                </p>
                <Button className='w-max'>Like</Button>

                <div className='flex items-center gap-4'>
                  {!isAuthor && meal.status === 'available' && (
                    <Button onClick={handleMakeRequest} className='w-max'>
                      Make Request
                    </Button>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </section>
  )
}

export default FoodDetail
