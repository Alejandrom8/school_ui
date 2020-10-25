import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import HomeLayout from '../components/layauts/HomeLayout'

import Loading from '../components/Loading'

import './styles/Activities.css'

function Task (props) {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {provided => (
        <div
          className='task__container'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  )
}

function Column (props) {
  return (
    <div className='column__container'>
      <h3 className='column__title'>{props.column.title}</h3>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <div
            className='column__taskList'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((t, i) => <Task key={t.id} task={t} index={i} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default class Activities extends React.Component {
  constructor (props) {
    super()
    this.state = {
      loading: false,
      error: null,
      data: {
        tasks: {
          'task-1': { id: 'task-1', content: 'HOlasdasdasdadss' },
          'task-2': { id: 'task-2', content: 'adiosasdasd' },
          'task-3': { id: 'task-3', content: 'buenas tardes' },
          'task-4': { id: 'task-4', content: 'opokaskdaksdkaoskdpakspdoasd' },
          'task-5': { id: 'task-5', content: 'lalalalalalaalla' }
        },
        columns: {
          'column-1': {
            id: 'column-1',
            title: 'Tareas por hacer',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
          }
        },
        columnOrder: ['column-1']
      }
    }
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  handleDragEnd (result) {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) return

    const column = this.state.data.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newData = {
      ...this.state.data,
      columns: {
        ...this.state.data.columns,
        [newColumn.id]: newColumn
      }
    }

    this.setState({ data: newData })
  }

  render () {
    if (this.state.loading) return <Loading />

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        {this.state.data.columnOrder.map(columnId => {
          const column = this.state.data.columns[columnId]
          const tasks = column.taskIds.map(t => this.state.data.tasks[t])
          return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    )
  }
}
