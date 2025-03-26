export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentsController'),
  ExceptionFilter: Symbol.for('ExceptionFilter')
} as const;
