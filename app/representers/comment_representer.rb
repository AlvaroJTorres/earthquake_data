class CommentRepresenter < Representable::Decorator
  include Representable::JSON

  property :id
  property :feature, exec_context: :decorator
  property :body

  def feature
    represented.feature.title
  end
end