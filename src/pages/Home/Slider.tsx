import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

const sliders = [
  {
    id: 1,
    title: 'Vibrant Quinoa Power Bowl',
    image:
      'https://res.cloudinary.com/imashiksarkar/image/upload/v1735514705/ph-hosting/food-sharing/banner/banner-3_c0irgq.png',
    description:
      'A colorful and nutritious bowl featuring fluffy quinoa, fresh greens, crunchy croutons, vibrant pickled onions, creamy feta cheese, and a mix of sweet and tangy diced fruits and veggies. Perfect for a wholesome meal packed with flavor and texture!',
  },
  {
    id: 2,
    title: 'Burger Meal Combo',
    image:
      'https://res.cloudinary.com/imashiksarkar/image/upload/v1735514706/ph-hosting/food-sharing/banner/banner-1_tdc4on.png',
    description:
      'A colorful and nutritious bowl featuring fluffy quinoa, fresh greens, crunchy croutons, vibrant pickled onions, creamy feta cheese, and a mix of sweet and tangy diced fruits and veggies. Perfect for a wholesome meal packed with flavor and texture!',
  },
  {
    id: 3,
    title: 'Chicken Biryani Delight',
    image:
      'https://res.cloudinary.com/imashiksarkar/image/upload/v1735514706/ph-hosting/food-sharing/banner/banner-4_duexld.png',
    description:
      'A colorful and nutritious bowl featuring fluffy quinoa, fresh greens, crunchy croutons, vibrant pickled onions, creamy feta cheese, and a mix of sweet and tangy diced fruits and veggies. Perfect for a wholesome meal packed with flavor and texture!',
  },
]

const Slider = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null)

  const handleSwipe = (direction: 'next' | 'prev') => {
    if (direction === 'prev') swiperRef?.current?.slidePrev()
    else if (direction === 'next') swiperRef?.current?.slideNext()
  }

  return (
    <div className='swiper-container relative w-full text-white cursor-pointer bg-purple-700'>
      <Swiper
        loop
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className='h-full'
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1
          '
            >
              <div
                className='w-full bg-indigo-300 dark:bg-indigo-700 h-max md:h-[30rem] mt-20
            flex items-center justify-center py-8 md:py-0 px-8
            '
              >
                <div className='details flex flex-col gap-6 lg:self-center text-slate-700 dark:text-slate-200'>
                  <h1 className='text-xl md:text-4xl font-semibold md:font-bold'>
                    {slide.title}
                  </h1>
                  <p className='text-lg'>{slide.description}</p>
                  <Button
                    variant={'ghost'}
                    className='self-start bg-orange-500'
                    asChild
                  >
                    {/* TODO: this will be search input button with query params */}
                    <Link to={`/product/${slide.id}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
              <div
                className='w-full bg-violet-400 dark:bg-violet-700 h-full
            flex items-center justify-center'
              >
                <figure className='banner p-4'>
                  <img
                    className='h-full w-full object-cover'
                    src={slide.image}
                    alt={slide.title}
                    loading='lazy'
                  />
                </figure>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='slider-seeker absolute bottom-10 right-10 z-10'>
        <button
          onClick={() => handleSwipe('prev')}
          className='bg-slate-950/30 hover:bg-slate-950/80 transition-all me-4 p-1 rounded-full'
        >
          <IoIosArrowBack className='text-4xl' />
        </button>
        <button
          onClick={() => handleSwipe('next')}
          className='bg-slate-950/30 hover:bg-slate-950/80 transition-all p-1 rounded-full'
        >
          <IoIosArrowForward className='text-4xl' />
        </button>
      </div>
    </div>
  )
}

export default Slider
