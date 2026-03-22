import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TaskModel} from '../models';
import {TaskModelRepository} from '../repositories';

export class TasksController {
  constructor(
    @repository(TaskModelRepository)
    public taskModelRepository : TaskModelRepository,
  ) {}

  @post('/tasks')
  @response(200, {
    description: 'TaskModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(TaskModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskModel, {
            title: 'NewTaskModel',
            exclude: ['id'],
          }),
        },
      },
    })
    taskModel: Omit<TaskModel, 'id'>,
  ): Promise<TaskModel> {
    return this.taskModelRepository.create(taskModel);
  }

  @get('/tasks/count')
  @response(200, {
    description: 'TaskModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TaskModel) where?: Where<TaskModel>,
  ): Promise<Count> {
    return this.taskModelRepository.count(where);
  }

  @get('/tasks')
  @response(200, {
    description: 'Array of TaskModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TaskModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TaskModel) filter?: Filter<TaskModel>,
  ): Promise<TaskModel[]> {
    return this.taskModelRepository.find(filter);
  }

  @patch('/tasks')
  @response(200, {
    description: 'TaskModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskModel, {partial: true}),
        },
      },
    })
    taskModel: TaskModel,
    @param.where(TaskModel) where?: Where<TaskModel>,
  ): Promise<Count> {
    return this.taskModelRepository.updateAll(taskModel, where);
  }

  @get('/tasks/{id}')
  @response(200, {
    description: 'TaskModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TaskModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TaskModel, {exclude: 'where'}) filter?: FilterExcludingWhere<TaskModel>
  ): Promise<TaskModel> {
    return this.taskModelRepository.findById(id, filter);
  }

  @patch('/tasks/{id}')
  @response(204, {
    description: 'TaskModel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskModel, {partial: true}),
        },
      },
    })
    taskModel: TaskModel,
  ): Promise<void> {
    await this.taskModelRepository.updateById(id, taskModel);
  }

  @put('/tasks/{id}')
  @response(204, {
    description: 'TaskModel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() taskModel: TaskModel,
  ): Promise<void> {
    await this.taskModelRepository.replaceById(id, taskModel);
  }

  @del('/tasks/{id}')
  @response(204, {
    description: 'TaskModel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.taskModelRepository.deleteById(id);
  }
}
