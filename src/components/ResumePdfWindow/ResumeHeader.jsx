const ResumeHeader = ({ person }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{person.name}</h1>
      <p className="mt-0.5 text-sm text-[#555]">{person.title}</p>
      <p className="mt-2 text-xs text-[#777]">
        {person.email} &middot; {person.location}
      </p>
    </>
  )
}

export default ResumeHeader
