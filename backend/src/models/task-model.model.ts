import {Entity, model, property} from '@loopback/repository';

@model()
export class TaskModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    default: "pending",
  })
  status?: string;

  @property({
    type: 'date',
  })
  dueDate?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'number',
  })
  assignedTo?: number;


  constructor(data?: Partial<TaskModel>) {
    super(data);
  }
}

export interface TaskModelRelations {
  // describe navigational properties here
}

export type TaskModelWithRelations = TaskModel & TaskModelRelations;
