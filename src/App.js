import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function App() {

  const initTasks = [
    { id: 1, text: 'HTML/CSS' },
    { id: 2, text: 'JavaScript' },
    { id: 3, text: 'Golang' },
    { id: 4, text: 'Reacjs' }
  ]

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 0,
      height: '100vh',
      backgroundColor: '#ff6347'
    },
    listContainer: {
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin:0,
      padding: '5px',
      listStyle: 'none',
      border: '2px solid #f00',
      borderRadius: '5px'
    },
    itemTask: {
      width: '80%',
      backgroundColor: '#fff',
      fontSize: '24px',
      margin: '20px',
      padding: '20px',
      border: '2px solid #000',
      borderRadius: '5px',
      boxShadow: '5px 4px #a0a0a0',
    }
  }

  const [tasks, setTasks] = useState(initTasks)

  const reorder = (list, startIdx, endIdx) => {
    const result = [...list]
    const [ removed ] = result.splice(startIdx, 1)
    result.splice(endIdx, 0, removed)

    return result
  }

  return (
    <DragDropContext onDragEnd={ (result) => {
      console.log(result)
      const {source, destination } = result
      if (!destination) {
        return;
      }
      if (source.index === destination.index && source.droppableId === destination.droppableId){
        return;
      } 
      setTasks(prevTasks => reorder(prevTasks, source.index, destination.index))
    }}>
      <div style={styles.container}>
        <h1>Estudiar</h1>
        <Droppable droppableId='tasks'>
          {(droppableProvided) => (
            <ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} style={styles.listContainer}>
              {tasks.map((task, idx) =>
                <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                  {(draggableProvided) => (
                    <li {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} style={styles.itemTask}>
                      {task.text}
                    </li>
                  )}
                </Draggable>
              )}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
