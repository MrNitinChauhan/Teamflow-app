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
import {CommentModel} from '../models';
import {CommentModelRepository} from '../repositories';

export class CommentController {
  constructor(
    @repository(CommentModelRepository)
    public commentModelRepository : CommentModelRepository,
  ) {}

  @post('/comments')
  @response(200, {
    description: 'CommentModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(CommentModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentModel, {
            title: 'NewCommentModel',
            exclude: ['id'],
          }),
        },
      },
    })
    commentModel: Omit<CommentModel, 'id'>,
  ): Promise<CommentModel> {
    return this.commentModelRepository.create(commentModel);
  }

  @get('/comments/count')
  @response(200, {
    description: 'CommentModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CommentModel) where?: Where<CommentModel>,
  ): Promise<Count> {
    return this.commentModelRepository.count(where);
  }

  @get('/comments')
  @response(200, {
    description: 'Array of CommentModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CommentModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CommentModel) filter?: Filter<CommentModel>,
  ): Promise<CommentModel[]> {
    return this.commentModelRepository.find(filter);
  }

  @patch('/comments')
  @response(200, {
    description: 'CommentModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentModel, {partial: true}),
        },
      },
    })
    commentModel: CommentModel,
    @param.where(CommentModel) where?: Where<CommentModel>,
  ): Promise<Count> {
    return this.commentModelRepository.updateAll(commentModel, where);
  }

  @get('/comments/{id}')
  @response(200, {
    description: 'CommentModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CommentModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CommentModel, {exclude: 'where'}) filter?: FilterExcludingWhere<CommentModel>
  ): Promise<CommentModel> {
    return this.commentModelRepository.findById(id, filter);
  }

  @patch('/comments/{id}')
  @response(204, {
    description: 'CommentModel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentModel, {partial: true}),
        },
      },
    })
    commentModel: CommentModel,
  ): Promise<void> {
    await this.commentModelRepository.updateById(id, commentModel);
  }

  @put('/comments/{id}')
  @response(204, {
    description: 'CommentModel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() commentModel: CommentModel,
  ): Promise<void> {
    await this.commentModelRepository.replaceById(id, commentModel);
  }

  @del('/comments/{id}')
  @response(204, {
    description: 'CommentModel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.commentModelRepository.deleteById(id);
  }
}
