import UsersTable from '@/components/UsersTable'

const Users = () => {
  return (
    <section className='users-page'>
      <div className='con py-8'>
        <h4 className='sr-only'>users list</h4>
        <UsersTable />
      </div>
    </section>
  )
}

export default Users
