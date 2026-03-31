const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {/* 2.1: Usando .map para renderizar qualquer número de partes */}
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Total = ({ parts }) => {
  // 2.3: Usando reduce para somar os exercícios
  const total = parts.reduce((sum, part) => {
    console.log('somando...', sum, part.exercises)
    return sum + part.exercises
  }, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course