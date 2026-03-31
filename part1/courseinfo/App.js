import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const parts = [
    { name: 'Fundamentos da biblioteca React', exercises: 10 },
    { name: 'Usando props para passar dados', exercises: 7 },
    { name: 'Estado de um componente', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
