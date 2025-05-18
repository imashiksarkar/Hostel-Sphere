import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const FAQ = () => {
  const questions = [
    {
      id: Math.random().toString(36).substring(2),
      question: 'What is this website about?',
      answer:
        'This website is a meal management platform designed to help users manage daily meals, calculate costs, and track member contributions in a shared living or mess environment.',
    },
    {
      id: Math.random().toString(36).substring(2),
      question: 'Who can use this platform?',
      answer:
        'The platform is ideal for students, hostel residents, shared apartments, or anyone who manages meals in a group setting.',
    },
    {
      id: Math.random().toString(36).substring(2),
      question: 'How does the meal calculation work?',
      answer:
        'Meal calculation is based on the total meals consumed and the total cost for a given period. The system divides expenses and shows how much each person owes or gets back.',
    },
    {
      id: Math.random().toString(36).substring(2),
      question: 'Can I add multiple members to a mess?',
      answer:
        'Yes, you can add multiple members to a mess and assign meal counts to each member on a daily basis.',
    },
    {
      id: Math.random().toString(36).substring(2),
      question: 'Is my data safe on this platform?',
      answer:
        'Yes, your data is securely stored. Only authorized users can view or modify their mess information.',
    },
  ]

  return (
    <section className='faq'>
      <div className='con py-8'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Frequently Asked Questions</h1>
        </header>

        <Accordion type='single' collapsible>
          {questions.map((question) => (
            <AccordionItem value={question.id} key={question.id}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
