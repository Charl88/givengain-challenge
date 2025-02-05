import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todos.dto'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodosService {
  private todos = new Map<number, Todo>()
  private idCounter = 1

  findAll(): Todo[] {
    return Array.from(this.todos.values())
  }

  findOne(id: number): Todo | undefined {
    return this.todos.get(id)
  }

  create(body: CreateTodoDto): Todo {
    const todo = { id: this.idCounter++, completed: false, ...body }
    this.todos.set(todo.id, todo)
    return todo
  }

  update(id: number, body: UpdateTodoDto): Todo | undefined {
    const todo = this.todos.get(id)
    if (!todo) return todo
    const updatedTodo = { id, ...body }
    this.todos.set(id, updatedTodo)
    return updatedTodo
  }

  remove(id: number): boolean {
    return this.todos.delete(id)
  }
}
